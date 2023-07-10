const fs = require('fs')
var path = require('path')


const totalFiles = 2


// checks that all files in file array are  
function isValidFileArray(fileArr, fileCount = totalFiles) {
    // checks if fileArr an array
    if (!Array.isArray(fileArr)) return false

    // checks if fileArr has expected count of files
    if (fileArr.length !== fileCount) return false

    // checks if each file string has .csv extension 
    for (let file of fileArr) {
        if (path.extname(file) !== '.csv') {
            return false
        }
    }

    // checks if there are duplicate files iwthin fileArr 
    let dedupedArr = fileArr.filter((file, i) => fileArr.indexOf(file) === i)
    if (dedupedArr.length !== fileArr.length) return false

    return true
}


// const b1 = "Store1b.csv"
// const b2 = "Store2b.csv"
// console.log(isValidFileArray(['intersection.js', 'store.csv'], totalFiles)) // false
// console.log(isValidFileArray([b1, b2], totalFiles)) // true  
// console.log(isValidFileArray([b1, b1], totalFiles)) // true  
// console.log(isValidFileArray([], totalFiles)) // 
// console.log(isValidFileArray(['isReal', 'testfolder/diff.csv'], totalFiles)) // false

module.exports = { isValidFileArray, totalFiles }