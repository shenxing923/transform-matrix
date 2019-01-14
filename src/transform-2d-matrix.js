import Matrix from './matrix.js'

export default class Transform2DMatrix {
		constructor(a, b, c, d, e, f) {
			this.matrix = Matrix.createUnitMatrix(3)
			this.apply(a, b, c, d, e, f)
		}
		apply(a, b, c, d, e, f) {
			if (typeof a === 'undefined') a = 1
			if (typeof b === 'undefined') b = 0
			if (typeof c === 'undefined') c = 0
			if (typeof d === 'undefined') d = 1
			if (typeof e === 'undefined') e = 0
			if (typeof f === 'undefined') f = 0
			let array = [
                [a, c, e],
                [b, d, f],
                [0, 0, 1]
			]
			this.matrix.multiplyLeft(new Matrix(array))
			return this
		}
		applyTranslate(x, y) {
		    this.apply(1, 0, 0, 1, x, y)
		    return this
		}
		applyRotate(angel) {
			let alph = angel/180*Math.PI
			this.apply(Math.cos(alph), Math.sin(alph), -Math.sin(alph),  Math.cos(alph), 0, 0)
		    return this
		}
		applyScale(sx, sy) {
		  this.apply(sx, 0, 0, sy, 0, 0)
		  return this
		}
        getCurMatrix() {
          return this.matrix
        }
        getTransformArgs() {
        	let mx = this.getCurMatrix().getArrayData()
        	let a = mx[0][0]
    		let b = mx[1][0]
    		let c = mx[0][1]
    		let d = mx[1][1]
   		    let e = mx[0][2]
    		let f = mx[1][2]
            return [a, b, c, d, e, f]
        }
        setTransform(el) {
        	let args = this.getTransformArgs()
        	el.style.transform = el.style.msTransform = el.style.webkitTransform = el.style.mozTransform = `matrix(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]}, ${args[4]}, ${args[5]})`
        }
	}