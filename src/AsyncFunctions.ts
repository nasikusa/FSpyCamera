import { FSpyCameraJson } from 'type';

export default class AsyncFunctions {
  protected xhr: XMLHttpRequest;

  constructor() {
    this.xhr = new XMLHttpRequest();
    this.xhr.responseType = 'json';
  }

  open(path: string, callback: (result: FSpyCameraJson) => void): void {
    this.xhr.open('GET', path);
    this.xhr.addEventListener('load', function () {
      const result = this.response;
      callback(result);
    });
    this.xhr.send();
  }
}
