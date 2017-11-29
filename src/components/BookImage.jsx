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
    this.props.setLoading(false);
  }

  closeModal = () => {
    document.body.classList.remove('modal--open');
    Modal.closeModal();
    this.props.selectBook('0');
    this.props.setModal(false);
  }

  handleAddToMyLibrary = (e, book = this.props.activeBook) => {
    e.preventDefault();
    this.props.updateLibrary(book, 'add');
  }

  handleDeleteBook = (e, book = this.props.activeBook) => {
    e.preventDefault();
    const { updateLibrary, books, modal } = this.props;
    if (modal && books.length === 1) {
      this.closeModal();
    } else if (modal && books.length > 1) {
      this.goNext();
    }
    updateLibrary(book, 'remove');
  }

  imageFail = () => {
    this.props.setLoading(false);
    this.setState({ imageFailed: true });
  }

  imageSuccess = () => {
    this.props.setLoading(false);
  }

  renderImage = (book = this.props.activeBook) => {
    if (this.state.imageFailed === true) {
      this.setState(prevState => ({ ...prevState, imageFailed: false }));
    }
    const { setLoading } = this.props;
    setLoading(true);
    const google = window.google;
    const bookImage = document.querySelector('.book-image');
    const viewer = new google.books.DefaultViewer(bookImage);
    viewer.load(book.id, () => this.imageFail(), () => this.imageSuccess());
  }

  renderModalIcons = () => {
    const { loading, previousBook, nextBook, activeBook, location, books, updateLibrary } = this.props;
    const library = cx({ hidden: location === '/book-explorer/library' });
    const searchedBooks = cx({ hidden: location === '/book-explorer' });

    return (
      <div className="modal-icons">
        <span className="modal__button--right">
          <Icon icon="chevron-right" onClick={!loading ? () => nextBook(activeBook, books, loading, this.closeModal) : null} />
        </span>
        <span className="modal__button--left">
          <Icon icon="chevron-left" onClick={!loading ? () => previousBook(activeBook, books, loading, this.closeModal) : null} />
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
    const { activeBook, loading } = this.props;
    const { pageCount, previewLink, publishedDate, publisher, subtitle, description } = activeBook;
    const hidden = cx({ hidden: this.state.imageFailed });
    return (
      <div className="book-image__container">
        <div className={`book-image ${hidden}`}>
          {loading && <Loading />}
        </div>
        {this.state.imageFailed && <div className="modal-details">
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
          {activeBook.authors ? <p className="page-count">{`Author(s):${activeBook.authors.map(e => ` ${e}`)}`}</p> : null}
        </div>
        {this.renderModalIcons()}
      </div>
    );
  }
}
