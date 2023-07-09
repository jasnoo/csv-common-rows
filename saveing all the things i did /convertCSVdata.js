const fs = require("fs");


function convertCSVdata(...files) {

    // takes CSV file path as input and to read file and return data from file a long multi-lined string
    function readCSV(filePath) {
        return fs.readFileSync(filePath, "utf-8", (err, data) => {
            if (err) {
                console.log(err)
            }
        });
    }

    //  takes single-string csv data as input and returns array with string elements representing each line of csv
    function splitArr(data) {
        // console.log(data)
        return data.split('\r\n')
    }

    // checks if first string of data is a header (if it includes "first name") and removes it 
    function removeHeader(arr) {
        // console.log(arr)
        return arr[0].includes('First Name') ? arr.slice(1) : arr
    }


    // takes a file path and array of helper function, 
    function convertCSVdata(file, helperFuncArray) {
        return helperFuncArray.reduce((acc, b) => b(acc), file)
    }

    // array of helper functions used to manipulate CSV data
    let modifyFuncArr = [readCSV, splitArr, removeHeader]


    //  manipulated file data 
    let arrayOfFileData = [...files].map(file => convertCSVdata(file, modifyFuncArr))

    return arrayOfFileData
}


module.exports = convertCSVdata
