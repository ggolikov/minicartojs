import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/index.js',
		format: 'esm', // immediately-invoked function expression — suitable for <script> tags
		// format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: false
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
		}),
		resolve(), // tells Rollup how to find date-fns in node_modules
		commonjs(), // converts date-fns to ES modules
		terser() // minify, but only in production
	]
};
