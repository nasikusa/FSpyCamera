import { FSpyCameraJson } from 'type';
import getBrowserName from './utils/getBrowserName';

export default class AsyncFunctions {
  protected xhr: XMLHttpRequest;

  constructor() {
    this.xhr = new XMLHttpRequest();
  }

  open(path: string, callback: (result: FSpyCameraJson) => void): void {
    this.xhr.open('GET', path);
    this.xhr.responseType = 'json';
    this.xhr.addEventListener('load', function () {
      const browserName = getBrowserName();

      const result = browserName === 'ie' ? JSON.parse(this.response) : this.response;
      callback(result);
    });
    this.xhr.send();
  }
}
