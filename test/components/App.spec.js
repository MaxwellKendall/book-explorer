import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import App from '../../src/components/App';

/*
 * This is an example of a component level test.
 * We are confirming the successful render of the Parent most component
 */

describe('App Component:', () => {
  let wrapper;

  it('exists?', () => {
    wrapper = shallow(<App />);
    expect(wrapper).to.exist;
  });
});
