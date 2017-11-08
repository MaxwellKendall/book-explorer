import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';
import Icon from './common/Icon';

export default class BookImage extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
    selectBook: PropTypes.func.isRequired,
    handleDeleteBook: PropTypes.func.isRequired,
    handleAddToMyLibrary: PropTypes.func.isRequired,
  }

  state = {
    imageFailed: false,
  };

  componentDidMount() {
    this.renderImage();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.book.id !== this.props.book.id) {
      this.renderImage();
    }
  }

  imageFail = () => {
    this.props.setLoading(false);
    this.setState({ imageFailed: true });
  }

  imageSuccess = () => {
    this.props.setLoading(false);
  }

  renderImage = () => {
    const { setLoading, library, activeLibraryBook, activeSearchedBook } = this.props;
    setLoading(true);
    const activeBook = library ? activeLibraryBook : activeSearchedBook;

    const google = window.google;
    const bookImage = document.getElementsByClassName('book-image')[0];
    const viewer = new google.books.DefaultViewer(bookImage);
    viewer.load(activeBook.id, () => this.imageFail(bookImage), () => this.imageSuccess());
  }

  renderDetails = () => {
    const { setLoading, library, activeLibraryBook, activeSearchedBook } = this.props;
    const activeBook = library ? activeLibraryBook : activeSearchedBook;
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
    const { library, activeLibraryBook, activeSearchedBook } = this.props;
    const activeBook = library ? activeLibraryBook : activeSearchedBook;

    return (
      <div className="modal-icons">
        <span className="modal__button--right">
          <Icon onClick={() => this.props.goNext(activeBook)} icon="arrow-right" />
        </span>
        <span className="modal__button--left">
          <Icon onClick={() => this.props.goPrevious(activeBook)} icon="arrow-left" />
        </span>
        <span className="modal__button--add">
          <Icon onClick={() => this.props.handleAddToMyLibrary(activeBook)} icon="plus-circle" />
        </span>
        <span className="modal__button--delete">
          <Icon onClick={() => this.props.handleDeleteBook(activeBook, { modal: true })} icon="trash" />
        </span>
      </div>
    );
  }

  render() {
    const { loading, library, activeLibraryBook, activeSearchedBook } = this.props;
    const activeBook = library ? activeLibraryBook : activeSearchedBook;
    const { pageCount, publishedDate, publisher, subtitle } = activeBook;
    return (
      <div className="book-image__container">
        {this.renderModalIcons()}
        <div className="book-image">
          {loading && <Loading />}
          {this.state.imageFailed && this.renderDetails()}
        </div>
        <div className="basic-details">
          {subtitle && <p className="subtitle">{`Subtitle: ${subtitle}`}</p>}
          {pageCount && <p className="page-count">{`Page Count: ${pageCount}`}</p>}
          {publisher && publishedDate && <p className="publishing-info">{`Published by ${publisher} on ${publishedDate}`}</p>}
        </div>
      </div>
    );
  }
}
