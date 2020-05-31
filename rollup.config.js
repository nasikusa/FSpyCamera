import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { terser } from "rollup-plugin-terser";

const license = `/*!
 * three-fspy-camera-loader
 * https://github.com/nasikusa/three-fspy-camera-loader
 * (c) 2020 @nasikusa
 * Released under the MIT License.
 */`;

const develop = {
  input: 'src/index.ts',
  external: [
    'three',
  ],
  output: [
    {
      format: 'umd',
      name: 'FSpyCameraLoader',
      file: pkg.main,
      banner: license,
      indent: '\t',
      globals: {
        three: 'THREE',
      },
      // exports: 'named',
      // extend: true,
    },
    {
      format: 'es',
      file: pkg.module,
      banner: license,
      indent: '\t',
      globals: {
        three: 'THREE',
      }
    }
  ],
  plugins: [
    typescript( { typescript: require( 'typescript' ) } ),
  ],
};

const build = {
  input: 'src/index.ts',
  external: [
    'three',
  ],
  output: [
    {
      format: 'umd',
      name: 'FSpyCameraLoader',
      file: pkg.mainMin,
      banner: license,
      indent: '\t',
      globals: {
        three: 'THREE',
      }
    },
  ],
  plugins: [
    typescript( { typescript: require( 'typescript' ) } ),
    terser({ output: { comments: /@license/i } }),
  ],
};

export default [
  develop,
  build,
];