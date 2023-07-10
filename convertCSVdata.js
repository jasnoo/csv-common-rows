const fs = require("fs");
const readline = require("readline");

const b1 = "Store1b.csv"
const b2 = "Store2b.csv"


//////////////////////////////////////////////// HELPER FUNCTIONS //////////////////////////////////////////////// 


// check if file is CSV
function isCorrectFileExt(filePath, extension) {
    return path.extname(filePath) === extension ? true : false
}


// check if its a header
function validateHeader(arr, headerArray) {
    if (headerArray.length !== arr.length) return false
    arr.forEach((elem, i) => {
        if (!elem || (elem.trim().toLowerCase() !== headerArray[i].toLowerCase())) {
            return false
        }
    })
    return true;
}

// check if the row is has valid field count
function hasCorrectFieldCount(arr, headerArrLength) {
    return (arr.length === headerArrLength) ? true : false;
}

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


const readCsvFile = async (filePath, headerArr) => new Promise((resolve, reject) => {
    let checkedForHeader = false
    let isValidFile = true

    const dataSet = new Set();

    const csvStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: csvStream })

    rl.on('line', (row) => {
        if (!isValidFile) {
            rl.close()
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

    rl.on('error', function (error) {
        reject(error)
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


module.exports = { readCsvFile, headers, headerLength, indexOfAge }
