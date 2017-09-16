const leftPad = (str, width) => ' '.repeat(width - str.length) + str;
const rightPad = (str, width) => str + ' '.repeat(width - str.length);
const getCol = (data, index) => data.map(row => row[index]);

function transpose(data) {
  return data[0].map((_, i) => {
    return data.map(r => r[i]);
  });
}


// function getMaxWidths(data) {
//   const strData = data.map(row => row.map(String));
//   const zeroes = strData[0].slice().fill(0);
//   return strData.reduce((maxes, row) => {
//     return row.map((str, i) => Math.max(str.length, maxes[i]));
//   }, zeroes);
// }

function getMaxWidths(cols) {
  return cols.map(col =>  col.map(String).reduce((acc, str) => Math.max(str.length, acc), 0));
}

function formatData(cols, precision) {
  const hasFloats = col => col.some(x => typeof x === 'number' && !Number.isInteger(x));

  return cols.map(col => {
    if (hasFloats(col)) {
      return col.map(val => typeof val === 'number' ? val.toFixed(precision) : String(val));
    } else {
      return col.map(String);
    }
  });
}

// data: (str | number)[][]
function makeTable(data, maxPrecision = 2, hasHeader = true) {
  const maxWidths = 'xyc'
}




















function makeGrid(nRows = 1, nCols = 1, hRow = 4, wCol = 9) {
  function sandwich(bread, meat, nLayers) {
    return (bread + meat).repeat(nLayers) + bread;
  }

  const edge = sandwich('+', '-'.repeat(wCol), nCols) + '\n';
  const space = sandwich('|', ' '.repeat(wCol), nCols) + '\n';
  const row = space.repeat(hRow);
  return '\n' + sandwich(edge, row, nRows);
}

export {makeGrid, makeTable};
