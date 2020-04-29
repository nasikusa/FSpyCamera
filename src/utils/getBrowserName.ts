export default function (): string {
  let browser = '';
  const userAgent: string = window.navigator.userAgent.toLowerCase();

  if (userAgent.indexOf('msie') !== -1 || userAgent.indexOf('trident') !== -1) {
    browser = 'ie';
  } else if (userAgent.indexOf('edge') !== -1) {
    browser = 'edge';
  } else if (userAgent.indexOf('chrome') !== -1) {
    browser = 'chrome';
  } else if (userAgent.indexOf('safari') !== -1) {
    browser = 'safari';
  } else if (userAgent.indexOf('firefox') !== -1) {
    browser = 'firefox';
  } else if (userAgent.indexOf('opera') !== -1) {
    browser = 'opera';
  } else {
    browser = 'other';
  }
  return browser;
}
