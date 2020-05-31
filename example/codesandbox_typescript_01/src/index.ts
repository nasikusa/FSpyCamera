import FSpyCameraLoaderExample from './FSpyCameraLoaderExample';
import { jsonString } from './fSpyCameraJsonString';

const targetCanvas = document.querySelector('#myCanvas');
const json = JSON.parse(jsonString);
if (
  targetCanvas != null &&
  targetCanvas instanceof HTMLCanvasElement &&
  json != null
) {
  const example = new FSpyCameraLoaderExample(json, targetCanvas);
  example.startAnimation();
}
