import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.ts',
  external: [
		'three',
	],
	output: [
		{
			format: 'umd',
			name: 'FSpyCameraLoader',
			file: pkg.main,
			// banner: license,
			indent: '\t',
			globals: {
				three: 'THREE',
			}
		},
		{
			format: 'es',
			file: pkg.module,
			// banner: license,
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