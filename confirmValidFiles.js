const fs = require('fs')
var path = require('path')



//// helper functions start

function checkforFileArr(fileArray) {
  if (!Array.isArray(fileArray)) {
    throw new Error('File array should be an array')
  }
  return true
}

// check that correct amount of files were passed into array argument
function checkFileCount(fileArray, expectedCount) {
  if (!Array.isArray(fileArray)) {
    throw new Error(`File array should be an array`)
  } else if (
    typeof expectedCount !== 'number' ||
    expectedCount <= 1 ||
    (!expectedCount)
  ) {
    throw new Error(`Invalid expected file count`)
  } else if (fileArray.length === 0 || fileArray.length !== expectedCount) {
    throw new Error(`File array has unexpected amount of files`)
  } else return true
}

// checks if each file string has .csv extension 
function checkForCsvExt(file) {
  if (file === undefined) { throw new Error('File is undefined') }
  if (typeof file !== 'string' || path.extname(file) !== '.csv') {
    throw new Error('File is not a CSV')
  }
  else return true

}

// checks that files in array exist
function checkFileExists(file) {
  if (typeof file !== 'string' || !file) {
    throw new Error('File argument should be a string')
  } else if (!fs.existsSync(file)) {
    throw new Error(`File does not exist`);
  } else return true
}

// checks for duplicate files in array
function checkForDuplicates(fileArray) {
  if (!Array.isArray(fileArray)) {
    throw new Error(`File array should be an array`)
  } else {
    const dedupedArr = fileArray.filter((file, i) => fileArray.indexOf(file) === i)
    if (dedupedArr.length !== fileArray.length) throw new Error(`File array cannot have duplicate files`);
    return true
  }

}

//// helper functions end


// checks that all files in file array are  
function isValidFileArray(fileArr, fileCount) {


  // checks that fileArr is an array, has expected number of files and are no duplicates

  // checks if fileArr an array
  checkforFileArr(fileArr)
  // checks if fileArr has expected count of files
  checkFileCount(fileArr, fileCount)
  // checks if fileArr has any duplicates count of files
  checkForDuplicates(fileArr)

  // checks each file to confirm all are csv and are are valid existing files
  for (let file of fileArr) {
    checkForCsvExt(file)
    checkFileExists(file)
  }

  return true

}

module.exports = {
  isValidFileArray,
  checkforFileArr,
  checkFileCount,
  checkForCsvExt,
  checkFileExists,
  checkForDuplicates
}




