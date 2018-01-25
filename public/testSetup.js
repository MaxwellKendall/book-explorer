const { JSDOM } = require('jsdom'); // eslint-disable-line import/no-extraneous-dependencies

const jsdom = new JSDOM('<!doctype html><html><head></head><body></body></html>');
const { window } = jsdom;

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));

  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.navigator = {
  userAgent: 'node.js',
};

copyProps(window, global);
