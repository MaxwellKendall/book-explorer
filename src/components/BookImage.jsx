import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';
import Icon from './common/Icon';

export default class BookImage extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired, //not redux
    goNext: PropTypes.func.isRequired,
    goPrevious: PropTypes.func.isRequired,
  }

  state = {
    imageFailed: false,
  };

  componentDidMount() {
    this.renderImage(this.props.book);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.book.id !== this.props.book.id) {
      this.renderImage(nextProps.book);
    }
  }

  imageFail = () => {
    this.props.setLoading(false);
    this.setState({ imageFailed: true });
  }

  imageSuccess = () => {
    this.props.setLoading(false);
  }

  renderImage = (book) => {
    const { setLoading } = this.props;
    setLoading(true);

    const google = window.google;
    const bookImage = document.getElementsByClassName('book-image')[0];
    const viewer = new google.books.DefaultViewer(bookImage);
    viewer.load(book.id, () => this.imageFail(bookImage), () => this.imageSuccess());
  }

  renderDetails = () => {
    const { book } = this.props;
    const { pageCount, previewLink, publishedDate, publisher, subtitle, description } = book;
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
    const { goNext, goPrevious } = this.props;
    return (
      <div className="modal-icons">
        <span className="modal__button--right">
          <Icon onClick={goNext} icon="arrow-right" />
        </span>
        <span className="modal__button--left">
          <Icon onClick={goPrevious} icon="arrow-left" />
        </span>
      </div>
    );
  }

  render() {
    const { book, loading } = this.props;
    const { authors } = book;
    return (
      <div className="book-image__container">
        {this.renderModalIcons()}
        <div className="book-image">
          {loading && <Loading />}
          {this.state.imageFailed && this.renderDetails()}
        </div>
        <div className="basic-details">
          {authors && <p className="page-count">{`Author(s):${authors.map(e => ` ${e}`)}`}</p>}
        </div>
      </div>
    );
  }
}
