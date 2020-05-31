import FSpyCameraLoaderExample from "./FSpyCameraLoaderExample";
import { jsonString } from "./fSpyCameraJsonString";

const targetCanvas = document.querySelector("#myCanvas");
const json = JSON.parse(jsonString);
console.log(json);
if (
  targetCanvas != null &&
  targetCanvas instanceof HTMLCanvasElement &&
  json != null
) {
  console.log("hoge");
  const example = new FSpyCameraLoaderExample(json, targetCanvas);
  example.startAnimation();
}
