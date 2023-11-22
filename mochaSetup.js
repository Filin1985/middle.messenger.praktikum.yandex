import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<body><div id="app"></div></body>', { url: 'http://localhost/' });

globalThis.window = jsdom.window;
globalThis.document = jsdom.window.document;
globalThis.Node = jsdom.window.Node;
