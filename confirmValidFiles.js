const fs = require('fs')
var path = require('path')

/////////// Helper functions for isValidFileArray function begin ///////////

// Checks if file array argument is an array
function checkforFileArr(fileArray) {
  if (!Array.isArray(fileArray)) {
    throw new Error('File array should be an array')
  }
  return true
}

// Checks if file array has as many files as is expected
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

// Checks if a file argument (string) has .csv extension 
function checkForCsvExt(file) {
  if (file === undefined) { throw new Error('File is undefined') }
  if (typeof file !== 'string' || path.extname(file) !== '.csv') {
    throw new Error(`${file} is not a CSV`)
  }
  else return true
}

// Checks if a file argument (string) is a real file (fs.existsSync)
function checkFileExists(file) {
  if (typeof file !== 'string' || !file) {
    throw new Error('File argument should be a string')
  } else if (!fs.existsSync(file)) {
    throw new Error(`File does not exist at ${file}`);
  } else return true
}

// Checks if a file array has 
function checkForNoDuplicates(fileArray) {
  if (!Array.isArray(fileArray)) {
    throw new Error(`File array should be an array`)
  } else {
    const dedupedArr = fileArray.filter((file, i) => fileArray.indexOf(file) === i)
    if (dedupedArr.length !== fileArray.length) throw new Error(`File array cannot have duplicate files`);
    return true
  }
}

/////////// Helper functions for isValidFileArray function end ///////////

// isValidFileArray checks for valid files before reading through them line by line
// If a file is invalid, it will throw error in respective helper function
function isValidFileArray(fileArr, fileCount) {

  // checks if fileArr an array
  checkforFileArr(fileArr)

  // checks if fileArr has expected count of files
  checkFileCount(fileArr, fileCount)

  // checks if fileArr has any duplicates count of files
  checkForNoDuplicates(fileArr)

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
  checkForNoDuplicates
}




