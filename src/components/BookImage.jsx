import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames'

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
    this.renderImage(this.props.activeBook);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeBook.id !== this.props.activeBook.id) {
      this.renderImage(nextProps.activeBook);
    }
  }

  imageFail = () => {
    this.props.setLoading(false);
    this.setState({ imageFailed: true });
  }

  imageSuccess = () => {
    this.props.setLoading(false);
  }

  renderImage = (activeBook) => {
    const { setLoading } = this.props;
    setLoading(true);

    const google = window.google;
    const bookImage = document.getElementsByClassName('book-image')[0];
    const viewer = new google.books.DefaultViewer(bookImage);
    viewer.load(activeBook.id, () => this.imageFail(bookImage), () => this.imageSuccess());
  }

  renderDetails = () => {
    const { activeBook, setLoading } = this.props;
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
    const { loading, activeBook, goNext, goPrevious } = this.props;
    return (
      <div className="modal-icons">
        <span className="modal__button--right">
          <Icon onClick={!loading ? () => goNext(activeBook) : null} icon="arrow-right" />
        </span>
        <span className="modal__button--left">
          <Icon onClick={!loading ? () => goPrevious(activeBook) : null} icon="arrow-left" />
        </span>
      </div>
    );
  }

  render() {
    const { loading, activeBook } = this.props;
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
