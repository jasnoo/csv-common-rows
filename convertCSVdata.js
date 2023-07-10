const fs = require("fs");
const readline = require("readline");

const b1 = "Store1b.csv"
const b2 = "Store2b.csv"


//////////////////////////////////////////////// HELPER FUNCTIONS //////////////////////////////////////////////// 



// check if its a header
function validateHeader(arr, headerArray) {
  if (headerArray.length !== arr.length) return false
  let hasValidHeaders = true
  arr.forEach((elem, i) => {
    if (!elem || (elem.trim().toLowerCase() !== headerArray[i].toLowerCase())) {
      hasValidHeaders = false
    }
  })
  return hasValidHeaders;
}



// check if each individual row has appropriate number/string data included
function rowHasValidFields(rowArr) {
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






//////////////////////////////////////////////// HELPER FUNCTIONS //////////////////////////////////////////////// 



const headers = ["First Name", "Last Name", "Age", "State"]
const headerLength = headers.length
const indexOfAge = headers.indexOf("Age")


async function readCsvFile(filePath, headerArr) {
  const dataSet = new Set();

  return new Promise((resolve, reject) => {
    let checkedForHeader = false
    const csvStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: csvStream })

    rl.on('line', (row) => {

      let tempLineArr = row.split(',')
      // it will check for header conditions, since this starts at false it should start for the first line

      if (!checkedForHeader) {
        if (!validateHeader(tempLineArr, headerArr)) {
          reject(new Error(`Headers are invalid for ${filePath}`))
        }
        checkedForHeader = true;
      }
      //if row has same # of fields as header and if row values are valid
      if ((tempLineArr.length === headerLength) && (rowHasValidFields(tempLineArr))) {
        dataSet.add(tempLineArr.join(",").toLowerCase())
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







/*
const readCsvFile = async (filePath, headerArr) => new Promise((resolve, reject) => {
    let checkedForHeader = false
    let isValidFile = true

    const dataSet = new Set();

    const csvStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: csvStream })

    rl.on('line', (row) => {
        if (!isValidFile) {
            rl.close()
            throw `Invalid file at ${filePath}`
        } else {
            let isValidLine = true;
            let tempLineArr = row.split(',')
            // it will check for header conditions, since this starts at false it should start for the first line

            if (!checkedForHeader) {
                if (!validateHeader(tempLineArr, headerArr)) {
                    isValidFile = false;
                    rl.close();
                }
                checkedForHeader = true;
            }


            //if row has different # of fields than header or if row values are invalid
            if ((tempLineArr.length !== headerLength) || (!rowHasValidFields(tempLineArr))) {
                isValidLine = false;
            }
            if (isValidLine) {
                dataSet.add(tempLineArr.join(",").toLowerCase())
            }
        }

        // conditions that mean the line is invalid

    })

    rl.on('error', function (err) {
        reject(err)
    });

    rl.on("close", () => {
        // console.log(dataSet)
        csvStream.destroy();
        resolve(dataSet)
    })
})
// let answer = readCsvFile(b1, headers)

// console.log(answer)

// (async () => {
//     let answer = await readCsvFile(b1, headers)
//     console.log("this is my answer:", answer)

//     // console.log('intersectionOfUsers:', intersectionOfUsers)
// })();
*/

module.exports = { readCsvFile, headers, headerLength, indexOfAge }
