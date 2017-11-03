import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';

import * as utils from '../utils/utils';

export default class BookImage extends Component {

  static propTypes = {
    activeBook: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
  }

  state = {
    imageFailed: false,
  };

  componentDidMount() {
    this.renderImage(this.props.activeBook);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeBook !== this.props.activeBook) {
      this.renderImage(nextProps.activeBook);
    }
  }

  imageFail = () => {
    console.log("imageFail");
    this.props.setLoading(false);
    this.setState({ imageFailed: true });
  }

  imageSuccess = () => {
    this.props.setLoading(false);
  }

  renderImage = (activeBook) => {
    this.props.setLoading(true);
    const google = window.google;
    const bookImage = document.getElementsByClassName('book-image')[0];
    const viewer = new google.books.DefaultViewer(bookImage);
    if (activeBook.googleVolumeId) {
      viewer.load(activeBook.googleVolumeId, () => this.imageFail(bookImage), () => this.imageSuccess());
    } else if (activeBook.industryIdentifiers[0].type.startsWith('OCLC' || 'LCCN' || 'ISBN')) {
      viewer.load(`${activeBook.industryIdentifiers[0].type}: ${activeBook.industryIdentifiers[0].identifer}`, () => this.imageFail(bookImage), () => this.imageSuccess());
    }
    const test = setInterval(() => {
      console.log('test is executing, please stop');
      if (viewer.isLoaded() === true) {
        this.props.setLoading(false);
      }
      if (this.props.loading === false) {
        console.log('interval stopped!');
        clearInterval(test);
      }
    }, 250);
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
      </div>
    );
  }

  render() {
    const { loading, activeBook } = this.props;
    const { pageCount, previewLink, publishedDate, publisher, subtitle, description } = activeBook;
    return (
      <div className="book-image__container">
        <div className="book-image">
          {loading && <Loading />}
          {this.state.imageFailed && this.renderDetails()}
        </div>
        <div className="basic-details">
          {subtitle && <p className="subtitle">{`Subtitle: ${subtitle}`}</p>}
          {pageCount && <p className="page-count">{`Page Count: ${pageCount}`}</p>}
          {publisher && publishedDate &&<p className="publishing-info">{`Published by ${publisher} on ${publishedDate}`}</p>}
        </div>
      </div>
    );
  }
}
