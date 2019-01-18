# s-transform-matrix

### Introduction
`s-transform-matrix` is a simple matrix transform tool for css transform, also can apply to other scenario like canvas transform.

# Getting Started
### Installation
``` bash
npm i s-transform-matrix
``` 
### Usage

**Example** 

```js
const TransformMatrix = require('s-transform-matrix');
let m = new TransformMatrix.Transform2DMatrix()
m.applyTranslate(100, 0)
m.applyRotate(30)
m.setTransform(document.querySelector('#el'))
```
