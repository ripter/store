import resolve from 'rollup-plugin-node-resolve';
// import babel from 'rollup-plugin-babel';

export default {
	input: 'src/index.js',
	output: [{
		name: 'Store',
		file: 'dist/store-iife.js',
		format: 'iife',
	}, {
		name: 'Store',
		file: 'dist/store-umd.js',
		format: 'umd'
	}, {
		file: 'dist/store-cjs.js',
		format: 'cjs',
	}, {
		file: 'dist/store-es.js',
		format: 'es',
	}],
	plugins: [
		resolve(), // tells Rollup how to find libraries in node_modules
    // babel({
    //   exclude: 'node_modules/**' // only transpile our source code
    // }),
	],
};
