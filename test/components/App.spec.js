import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import App from '../../src/components/app';

describe('App Component:', () => {
  let wrapper;

  it('exists?', () => {
    wrapper = shallow(<App />);
    expect(wrapper).to.exist;
  });
});
