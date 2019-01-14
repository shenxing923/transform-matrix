import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
  	name: 'TransformMatrix',
    file: pkg.main,
    format: 'umd'
  },
  plugins:[
    resolve(),
    babel({exclude: 'node_modules/**'})
  ]
}