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
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeBook: PropTypes.object.isRequired,
    updateLibrary: PropTypes.func.isRequired,
    selectBook: PropTypes.func.isRequired,
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
    // // solution 2
    if (nextProps.activeBook.id !== this.props.activeBook.id && nextProps.activeBook) {
      this.renderImage(nextProps.activeBook);
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   // // solution 1
  //   let rtrn = false;
  //   if (nextProps.activeBook.id !== this.props.activeBook.id && nextProps.activeBook) {
  //     rtrn = true;
  //   }
  //
  //   return rtrn;
  // }

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

  goNext = () => {
    const { activeBook, selectBook, books, loading } = this.props;
    const nextBookIndex = books.indexOf(activeBook) + 1;
    if (nextBookIndex < books.length && !loading) {
      selectBook(books[nextBookIndex].id);
    } else if (nextBookIndex >= books.length - 1) {
      this.closeModal();
    }
  }

  goPrevious = () => {
    const { selectBook, books, activeBook, loading } = this.props;
    const previousBookIndex = books.indexOf(activeBook) - 1;

    if (previousBookIndex > -1 && !loading) {
      selectBook(books[previousBookIndex].id);
    } else if (previousBookIndex === -1) {
      this.closeModal();
    }
  }

  imageFail = () => {
    this.props.setLoading(false);
    this.setState({ imageFailed: true });
  }

  imageSuccess = () => {
    this.props.setLoading(false);
  }

  renderImage = (book = this.props.activeBook) => {
    // // solution 2
    const { setLoading } = this.props;

    setLoading(true);
    const google = window.google;
    const bookImage = document.querySelector('.book-image');
    const viewer = new google.books.DefaultViewer(bookImage);
    viewer.load(book.id, () => this.imageFail(), () => this.imageSuccess());
  }

  // renderImage = () => {
  // // solution 1
  //   const { setLoading, activeBook } = this.props;
  //   setLoading(true);
  //   if (document.querySelector('.book-image')) {
  //     const google = window.google;
  //     const bookImage = document.querySelector('.book-image');
  //     const viewer = new google.books.DefaultViewer(bookImage);
  //     viewer.load(activeBook.id, this.imageFail, this.imageSuccess);
  //   }
  // }

  renderDetails = () => {
    const { activeBook } = this.props;
    const { pageCount, previewLink, publishedDate, publisher, subtitle, description } = activeBook;
    return (
      <div className="modal-details">
        {subtitle && <h3 className="subtitle">{`Subtitle: ${subtitle}`}</h3>}
        {pageCount && <h3 className="page-count">{`Page Count: ${pageCount}`}</h3>}
        {publisher && publishedDate && <h3 className="publishing-info">{`Published by ${publisher} on ${publishedDate}`}</h3>}
        {description && <div className="description">
          <h3 className="description">Description: </h3><p className="description">{description}</p>
        </div>}
        {previewLink && <a target="_blank" href={previewLink}>Link for more Details</a>}
        {!previewLink && !subtitle && !description && <a target="_blank" href={previewLink}>Link for more Details</a>}
        {!previewLink && !description && !subtitle && <p>No data available</p>}
      </div>
    );
  }

  renderModalIcons = () => {
    const { loading } = this.props;
    const library = cx({ hidden: window.location.href.substr(46) === '/library' });
    const searchedBooks = cx({ hidden: window.location.href.substr(32) === '/book-explorer' });

    return (
      <div className="modal-icons">
        <span className="modal__button--right">
          <Icon icon="arrow-right" onClick={this.goNext} />
        </span>
        <span className="modal__button--left">
          <Icon icon="arrow-left" onClick={this.goPrevious} />
        </span>
        <span className={`${library} modal__button--add`}>
          <Icon icon="plus-circle" onClick={!loading ? this.handleAddToMyLibrary : null} />
        </span>
        <span className={`${searchedBooks} modal__button--delete`}>
          <Icon icon="trash" onClick={!loading ? this.handleDeleteBook : null} />
        </span>
      </div>
    );
  }

  render() {
    const { activeBook, loading } = this.props;
    return (
      <div className="book-image__container">
        {this.renderModalIcons()}
        <div className="book-image">
          {loading && <Loading />}
          {/* Solution 1 */}
          {/* {this.renderImage()} */}
          {this.state.imageFailed && !loading && this.renderDetails()}
        </div>
        <div className="basic-details">
          {activeBook.authors ? <p className="page-count">{`Author(s):${activeBook.authors.map(e => ` ${e}`)}`}</p> : null}
        </div>
      </div>
    );
  }
}
