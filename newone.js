const fs = require("fs");
const { readCsvFile, headers, headerLength, indexOfAge } = require('./convertCSVdata')
const { getIntersectionOfArr } = require('./getIntersection')
const { isValidFileArray, totalFiles } = require('./confirmValidFiles')



const b1 = "Store1b.csv"
const b3 = "Store4b.csv"
const b2 = "Store2b.csv"

let thisAns

function intersection(fileArr, headerArr) {

    if (!isValidFileArray(fileArr)) return 'Invalid File Array'
    else {
        (async () => {
            let userInterSection = await getIntersectionOfArr(fileArr, headerArr).catch(err => console.log(err))
            console.log(userInterSection)
            return userInterSection
        })();
    }


}

// console.log(intersection([b1, b2], headers))



let answer = intersection([b1, b2], headers)

setTimeout(() => {
    console.log('i set time')
}, 5000);

setTimeout(() => {
    console.log(answer)

}, 5000);

console.log(thisAns)
