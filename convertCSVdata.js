const fs = require("fs");
const readline = require("readline");

/////////// Helper functions for readCsvFile function begin ///////////

// Compares elements in rowArr to expectedHeaders array to see if rowArr is a header row (if the rowArr has matching elements)
function validateHeader(rowArr, expectedHeaders) {
  if (!rowArr || !expectedHeaders) return false
  if (!Array.isArray(rowArr)) return false
  if (expectedHeaders.length !== rowArr.length) return false
  let hasValidHeaders = true
  rowArr.forEach((elem, i) => {
    if (!elem || (elem.trim().toLowerCase() !== expectedHeaders[i].toLowerCase())) {
      hasValidHeaders = false
    }
  })
  return hasValidHeaders;
}

// Checks if all elements in rowArr have valid values (non-empty strings except age which should be able to parse into a number >=0))
function rowHasValidFields(rowArr, indexOfAge) {

  if (!rowArr || !Array.isArray(rowArr)) return false
  if (indexOfAge !== undefined && (typeof indexOfAge !== 'number')) return false
  let isValid = true
  rowArr.forEach((value, i) => {

    rowArr[i] = rowArr[i].trim()
    if (i === indexOfAge) {
      if (!rowArr[i]) {
        isValid = false
      }
      rowArr[i] = parseInt(rowArr[i], 10);
      if (Number.isNaN(rowArr[i]) || rowArr[i] < 0) {
        isValid = false
      }
    } else if (!!value === false) {
      isValid = false
    }

  })
  return isValid
}

/////////// Helper functions for readCsvFile function end /////////// 


// readCsvFile takes a single CSV filepath and return set of valid rows as strings from csv   
async function readCsvFile(filePath, headerArr, indexOfAge) {
  const dataSet = new Set();

  return new Promise((resolve, reject) => {
    const csvStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: csvStream })
    let checkedForHeader = false // flag to see if header has been checked for in file

    rl.on('line', (row) => {
      let tempLineArr = row.split(',')

      // if header hasn't been checked for, check to see if it's a valid header
      if (!checkedForHeader) {
        if (!validateHeader(tempLineArr, headerArr)) {
          reject(new Error(`Headers are invalid for ${filePath}`))
        }
        checkedForHeader = true;

        // when header has already been checked for so these are user rows
      } else {
        //adds data to set if row has same # of fields as header and if row values are valid
        if ((tempLineArr.length === headerArr.length) && (rowHasValidFields(tempLineArr, indexOfAge))) {
          dataSet.add(tempLineArr.join(",").toLowerCase())
        }
      }
    })

    rl.on('error', function (err) {
      reject(new Error(`Someting went wrong at ${filePath}`))
    });

    rl.on("close", () => {
      resolve(dataSet)
    })
  })
}

module.exports = {
  readCsvFile,
  validateHeader,
  rowHasValidFields,
}

