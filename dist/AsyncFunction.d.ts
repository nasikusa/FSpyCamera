import { FSpyCameraJson } from './type';
export default class AsyncFunction {
    protected xhr: XMLHttpRequest;
    constructor();
    load(path: string, onLoad: (result: FSpyCameraJson) => void): void;
}
