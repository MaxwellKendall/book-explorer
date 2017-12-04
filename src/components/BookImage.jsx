import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Loading from './common/Loading';
import Icon from './common/Icon';
import * as Modal from './common/ModalWrapper';

export default class BookImage extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    modal: PropTypes.object,
    location: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeBook: PropTypes.object.isRequired,
    updateLibrary: PropTypes.func.isRequired,
    selectBook: PropTypes.func.isRequired,
    previousBook: PropTypes.func.isRequired,
    nextBook: PropTypes.func.isRequired,
  }

  static defaultProps = {
    modal: {},
  }

  state = {
    imageFailed: false,
  };

  componentDidMount() {
    this.renderImage();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeBook.id !== this.props.activeBook.id && nextProps.activeBook) {
      this.renderImage(nextProps.activeBook);
    }
  }

  componentWillUnmount() {
    this.props.setLoading(false); // actionCreator
  }

  closeModal = () => {
    document.body.classList.remove('modal--open');
    Modal.closeModal();
    this.props.selectBook('0'); // actionCreator
    this.props.setModal(false); // actionCreator
  }

  handleAddToMyLibrary = (e, book = this.props.activeBook) => {
    e.preventDefault();
    this.props.updateLibrary(book, 'add'); // actionCreator
  }

  handleDeleteBook = (e, book = this.props.activeBook) => {
    e.preventDefault();
    const { updateLibrary, books, modal } = this.props;
    if (modal && books.length === 1) {
      this.closeModal();
    } else if (modal && books.length > 1) {
      this.goNext();
      updateLibrary(book, 'remove'); // actionCreator
    }
  }

  imageFail = () => {
    this.props.setLoading(false);
    this.setState(prevState => ({ ...prevState, imageFailed: true }));
  }

  imageSuccess = () => {
    this.props.setLoading(false); // actionCreator
  }

  renderImage = (book = this.props.activeBook) => {
    if (this.state.imageFailed === true) {
      this.setState(prevState => ({ ...prevState, imageFailed: false }));
    }
    const { setLoading } = this.props;
    setLoading(true);
    const google = window.google;
    const viewer = new google.books.DefaultViewer(this.bookImage);
    viewer.load(book.id, () => this.imageFail(), () => this.imageSuccess());
  }

  renderModalIcons = () => {
    const { loading, previousBook, nextBook, activeBook, location, books, updateLibrary } = this.props;
    const library = cx({ hidden: location === '/book-explorer/library' });
    const searchedBooks = cx({ hidden: location === '/book-explorer' });

    return (
      <div className="modal-icons">
        <span className="modal__button--left">
          <Icon icon="chevron-left" onClick={!loading ? () => previousBook(activeBook, books, loading, this.closeModal) : null} />
        </span>
        <span className="modal__button--right">
          <Icon icon="chevron-right" onClick={!loading ? () => nextBook(activeBook, books, loading, this.closeModal) : null} />
        </span>
        <span className={`${library} modal__button--add`}>
          <Icon icon="plus-circle" onClick={!loading ? () => updateLibrary(activeBook, 'add') : null} />
        </span>
        <span className={`${searchedBooks} modal__button--delete`}>
          <Icon icon="trash" onClick={!loading ? () => updateLibrary(activeBook, 'remove', true, books, this.closeModal) : null} />
        </span>
      </div>
    );
  }

  render() {
    const { activeBook, loading } = this.props; // ES6 object deconstruction
    const { pageCount, previewLink, publishedDate, publisher, subtitle, description } = activeBook; // ES6 object deconstruction
    const hidden = cx({ hidden: this.state.imageFailed }); // if true, hidden will be true
    return (
      <div className="book-image__container">
        {this.renderModalIcons()}
        <div ref={(bookImage) => { this.bookImage = bookImage; }} className={`book-image ${hidden}`}>
          {loading && <Loading />}
        </div>
        {this.state.imageFailed && <div className="book-image__failed">
          {subtitle && <h3 className="subtitle">{`Subtitle: ${subtitle}`}</h3>}
          {pageCount && <h3 className="page-count">{`Page Count: ${pageCount}`}</h3>}
          {publisher && publishedDate && <h3 className="publishing-info">{`Published by ${publisher} on ${publishedDate}`}</h3>}
          {description && <div className="description">
            <h3 className="description">Description: </h3><p className="description">{description}</p>
          </div>}
          {previewLink && <a target="_blank" href={previewLink}>Link for more Details</a>}
          {!previewLink && !subtitle && !description && <a target="_blank" href={previewLink}>Link for more Details</a>}
          {!previewLink && !description && !subtitle && <p>No data available</p>}
        </div>}
        <div className="basic-details">
          {activeBook.authors ? <p className="basic-details__author">{`Author(s):${activeBook.authors.map(e => ` ${e}`)}`}</p> : null}
        </div>
      </div>
    );
  }
}
/**
 * I. The 'ref' attribute: Line 125
 *   - a reference marker to the virtual DOM
 *   - the benefit of refering to the virtual DOM rather than the actual DOM via document.*('selector') is that the latter will
 *     return undefined unless the selected element is mounted, but with react mounting/updating/unmounting the more certain method
 *     for selectin elements is by utilizing the ref attribute
 *   - documentation: https://reactjs.org/docs/refs-and-the-dom.html
 *
 * II. defaultProps: Line 78
 *   renderImage utilizes default props
 *     - this.props.activeBook will be used as props unless explicitly instructed otherwise during
 *     invocation
 */
