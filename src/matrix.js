export default class Matrix {
  constructor(array) {
    this.fromArray(array)
  }
  fromArray (array) {
    if (Object.prototype.toString.call(array) !== '[object Array]') {
      throw new Error('params type wrong')
    }
    if (array.length === 0) {
      throw new Error('params wrong')
    }
    if (Object.prototype.toString.call(array[0]) !== '[object Array]') {
      throw new Error('params type wrong')
    }
    let row = array.length
    let col = array[0].length
    if (col === 0) {
      throw new Error('params wrong')
    }
    let data = []
    for (let i = 0; i < row; i++) {
      let dataRow = []
      if (array[i].length !== col) {
        throw new Error('params wrong')
      }
      for (let j = 0; j < col; j++) {
        dataRow.push(array[i][j])
      }
      data.push(dataRow)
    }
    this._data = data
    this.rowNum = row
    this.colNum = col
    return this
  }
  fromMatrix (matrix) {
    if (!matrix instanceof Matrix) {
      throw new Error('params type wrong')
    }
    return this.fromArray(matrix.getArrayData())
  }
  getByIndex (row, col) {
    return this._data[row][col]
  }
  getArrayData () {
    return this._data
  }
  multiplyLeft (matrix) {
    return this.fromMatrix(Matrix.multiply(matrix, this))
  }
  multiplyRight (matrix) {
    return this.fromMatrix(Matrix.multiply(this, matrix))
  }
}

Matrix.multiply = function (mxLeft, mxRight) {
  if (!mxLeft instanceof Matrix || !mxRight instanceof Matrix) {
    throw new Error('params type wrong')
  }
  if (mxLeft.colNum !== mxRight.rowNum) {
    throw new Error('the row or column of matrix not match')
  }
  let tRow = mxLeft.rowNum
  let tCol = mxRight.colNum
  let tmp = new Array(tRow)
  for (let i = 0; i < tRow; i++) {
    tmp[i] = new Array(tCol)
    for (let j = 0; j < tCol; j++) {
      tmp[i][j] = 0
      for (let k = 0; k < mxLeft.colNum; k++) {
        tmp[i][j] += mxLeft.getByIndex(i, k) * mxRight.getByIndex(k, j)
      }
    }
  }
  return new Matrix(tmp)
}
Matrix.createUnitMatrix = function (n) {
  return Matrix.createMatrix(n, n, function (array, row, col) {
    if (row === col) {
      return 1
    } else {
      return 0
    }
  })
}
Matrix.createMatrix = function (m, n, fn) {
  let array = new Array(m)
  for (let i = 0; i < m; i++) {
    array[i] = new Array(n)
    for (let j = 0; j < n; j++) {
      array[i][j] = fn && fn(array, i, j) || 0
    }
  }
  return new Matrix(array)
}