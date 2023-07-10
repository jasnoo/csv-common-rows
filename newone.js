
const fs = require("fs");
const readline = require("readline");
const path = require('path')
const { readCsvFile, headers, headerLength, indexOfAge } = require('./convertCSVdata')


const b1 = "Store1b.csv"
const b3 = "Store1b.html"
const b2 = "Store2b.csv"

const fileCount = 2
const ext = '.csv'

// readCsvFile(b1, headers).then(data => console.log('thisisdata', data))

function findIntersection(...files) {
    // confirm there are at least 2 files 
    if (files.length !== fileCount) return false

    // confirm all files in files argument are csv
    for (let file of [...files]) {
        if (path.extname(file) !== ext) {
            return false
        }
    }

}


//////////////////////////////////////////////// HELPER FUNCTIONS START //////////////////////////////////////////////// 

//////////////////////////////////////////////// HELPER FUNCTIONS END //////////////////////////////////////////////// 












// console.log(findIntersection(b1, b2))
// console.log(findIntersection(b1, b2))