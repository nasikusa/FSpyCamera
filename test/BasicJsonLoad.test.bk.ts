import FSpyCameraLoader from '../src/index';
import { PerspectiveCamera } from 'three';

describe('basic json load test', (): void => {
  test('is instance of PerspectiveCamera ?', done => {
    const loader = new FSpyCameraLoader();
    loader.load("../example/assets/json/stair.json" , ( camera ) => {
      console.log('hoge');
      try{
        expect(camera).toBeInstanceOf(PerspectiveCamera);
        done();
      }catch(err){
        done(err);
      }
    });
  });  
})
