const fs = require('fs')
var path = require('path')


const totalFiles = 2

//// helper functions start

function checkforFileArr(fileArray) {
  if (!Array.isArray(fileArray)) throw new Error('fileArr must be an array');
  return true
}

// check that correct amount of files were passed into array argument
function checkFileCount(fileArray, expectedCount) {
  if (fileArray.length !== expectedCount) throw new Error(`fileArr has unexpected amount of files`)
  return true
}

// checks if each file string has .csv extension 
function checkForCsvExt(file) {
  if (path.extname(file) !== '.csv') {
    throw new Error(`One or more files in fileArr is not a CSV`)
  }
  return true
}

// checks that files in array exist
function checkForValidfile(file) {
  if (path.extname(file) !== '.csv') {
    throw new Error(`One or more files in fileArr is not a CSV`)
  }

  if (!fs.existsSync(file)) {
    // throw new Error(`File not found at '${file}'`);
    throw new Error(`File not found at '${file}'`);
  }
}

// checks for duplicate files in array
function checkForDuplicates(fileArray) {
  const dedupedArr = fileArray.filter((file, i) => fileArray.indexOf(file) === i)
  if (dedupedArr.length !== fileArray.length) throw new Error(`fileArr cannot have duplicate files`);
}

//// helper functions end


// checks that all files in file array are  
function isValidFileArray(fileArr, fileCount = totalFiles) {
  // checks if fileArr an array
  checkforFileArr(fileArr)

  // checks if fileArr has expected count of files
  checkFileCount(fileArr, fileCount)

  // checks each file to confirm all are csv and are are valid existing files
  for (let file of fileArr) {
    checkForCsvExt(file)
    checkForValidfile(file)
  }

  // checks if there are duplicate files within fileArr 
  checkForDuplicates(fileArr)

  return true
}


// const b1 = "Store1b.csv"
// const b2 = "Store2b.csv"
// console.log(isValidFileArray(['intersection.js', 'store.csv'], totalFiles)) // false
// console.log(isValidFileArray([b1, b2], totalFiles)) // true  
// console.log(isValidFileArray([b1, b1], totalFiles)) // true  
// console.log(isValidFileArray([], totalFiles)) // 
// console.log(isValidFileArray(['isReal', 'testfolder/diff.csv'], totalFiles)) // false

module.exports = {
  isValidFileArray,
  totalFiles,
  checkforFileArr,
  checkFileCount,
  checkForCsvExt,
  checkForValidfile,
  checkForDuplicates
}