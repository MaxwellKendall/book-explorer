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

  componentDidMount() {
    this.renderImage(this.props.activeBook);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeBook !== this.props.activeBook) {
      this.renderImage(nextProps.activeBook);
    }
  }

  imageFail = (bookImage) => {
    this.props.setLoading(false);
    const nodeToDisplayError = bookImage;
    utils.removeClass(nodeToDisplayError, 'hidden');
    nodeToDisplayError.innerHTML = 'Sorry Book is Broken';
  }

  imageSuccess = (bookImage) => {
    this.props.setLoading(false);
    utils.removeClass(bookImage, 'hidden');
  }

  renderImage = (activeBook) => {
    this.props.setLoading(true);
    const google = window.google;
    const bookImage = document.getElementsByClassName('modal__content')[0];
    utils.addClass(bookImage, 'hidden');
    const viewer = new google.books.DefaultViewer(bookImage);
    viewer.load(`ISBN:${activeBook.industryIdentifiers[0].identifier}`, () => this.imageFail(bookImage), () => this.imageSuccess(bookImage));
  };

  render() {
    const { loading } = this.props;
    console.log('waatatatata', document.querySelector('#test123'));
    return (
      <div className="test">{loading ? <Loading /> : null}</div>
    );
  }
}
