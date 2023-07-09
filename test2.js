const fs = require("fs");

const storeLedger1 = "Store1.csv"
const storeLedger2 = "Store2.csv"

const b1 = "Store1b.csv"
const b2 = "Store2b.csv"



function findUserIntersection(...files) {

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
    return data.split('\r\n')
  }

  // checks if first string of data is a header (if it includes "first name") and removes it 
  function removeHeader(arr) {
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



  // gets an array of strings, each that represent a user that is seen in all files 
  function getIntersection(allFileArr) {

    // reduces 2d array into array of strings representinng intersecting users
    // init value is the last elem of input arr, deduplicated

    let init = allFileArr.pop()
    init = init.filter((x, i) => init.indexOf(x) === i)
    let intersection = allFileArr.reduce((acc, b) => acc.filter(x => b.includes(x)), init)
    console.log(intersection)

    // makes each string element into an array 
    intersection = intersection.map(x => x.split(','))

    // filters to remove any invalid users (e.g [',,18,',]) 
    intersection = intersection.filter(x => x.every(x => !!x === true))
    console.log(intersection)

    // makes user object for each item returns them as an array
    return intersection.map(x => ({ 'First Name': x[0], 'Last Name': x[1], 'Age': Number(x[2]), 'State': x[3] }))

  }

  return (getIntersection(arrayOfFileData))
}


console.log(findUserIntersection(b1, b2))

