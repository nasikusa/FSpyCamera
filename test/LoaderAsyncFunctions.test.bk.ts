import FSpyCameraLoader from '../src/index';

describe('loader async functions test', (): void => {
  let loader: FSpyCameraLoader;
  const jsonPath = '/example/assets/json/stair.json';
  // beforeAll(() => {
  //   // loader.parse(JSON.parse(exampleJsonString01));
  // });
  test('is result data exist ?', async () => {
    expect.assertions(0);
    loader = new FSpyCameraLoader();
    loader.loadAsync(jsonPath);
    return loader.loadAsync(jsonPath).then(res => {  // (2)
      expect(res.data.id).toBe(3)
    })
  });
});
