import React from 'react';

import Icon from '../components/common/Icon';

export const removeClass = (el, className) => { el.classList.remove(className); };
export const addClass = (el, className) => { el.classList.add(className); };

export const renderBookImage = config => (
  <li key={config.index} value={config.book.id}>
    <Icon icon="plus-circle" onClick={event => config.onClickIcon(event)} />
    <a href="" onClick={event => config.onClickImage(event, config.book.id)} >
      <img src={config.book.imageLinks.thumbnail} alt="whateva" />
    </a>
  </li>
);
