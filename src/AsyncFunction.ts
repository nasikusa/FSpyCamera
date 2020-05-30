import { FSpyCameraJson } from './type';

export default class AsyncFunction {
  protected xhr: XMLHttpRequest;

  constructor() {
    this.xhr = new XMLHttpRequest();
  }

  load(path: string, onLoad: (result: FSpyCameraJson) => void): void {
    this.xhr.open('GET', path);
    this.xhr.responseType = 'json';
    this.xhr.addEventListener('load', function () {
      const result = JSON.parse(this.response);
      onLoad(result);
    });
    this.xhr.send();
  }
}
