import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.ts',
  
	output: [
		{
			format: 'umd',
			name: 'FSpyCamera',
			file: pkg.mainMin,
			// banner: license,
			indent: '\t',
		},
		{
			format: 'es',
			file: pkg.moduleMin,
			// banner: license,
			indent: '\t',
		}
	],
	plugins: [
		typescript( { typescript: require( 'typescript' ) } ),
		terser({ output: { comments: /@license/i } }),
	],
};