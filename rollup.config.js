import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  
	output: [
		{
			format: 'umd',
			name: 'FSpyCamera',
			file: pkg.main,
			// banner: license,
			indent: '\t',
		},
		{
			format: 'es',
			file: pkg.module,
			// banner: license,
			indent: '\t',
		}
	],
	plugins: [
		typescript( { typescript: require( 'typescript' ) } ),
	],
};