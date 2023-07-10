const fs = require("fs");
const { readCsvFile, headers, headerLength, indexOfAge } = require('./convertCSVdata')
const { getIntersectionOfArr } = require('./getIntersection')
const { isValidFileArray, totalFiles } = require('./confirmValidFiles')



const b1 = "Store1b.csv"
const b3 = "Store4b.csv"
const b2 = "Store2b.csv"


// async function intersection(fileArr, headerArr) {
//     let real
//     try {
//         if (isValidFileArray(fileArr)) {

//             let real = await getIntersectionOfArr(fileArr, headerArr).catch(err => console.log(err))
//             // console.log(userInterSection)
//             return real
//         }
//     }
//     catch (err) {
//         console.log(err)
//     }
//     finally {
//         console.log(real)
//         let strData = JSON.stringify(real)
//         fs.writeFile('test.txt', strData, err => {
//             if (err) {
//                 console.error(err);
//             }
//             // file written successfully
//         });
//     }

// }


function intersection(fileArr, headerArr) {

    try {
        if (isValidFileArray(fileArr)) {
            return (async () => {
                let userInterSection = await getIntersectionOfArr(fileArr, headerArr).catch(err => console.log(err))
                // console.log(userInterSection)
                return userInterSection
            })();
        }
    }
    catch (err) {
        console.log(err)
    }

}





// function intersection(fileArr, headerArr) {

//     try {
//         if (isValidFileArray(fileArr)) {
//             (async () => {
//                 let userInterSection = await getIntersectionOfArr(fileArr, headerArr).catch(err => console.log(err))
//                 // console.log(userInterSection)
//                 return userInterSection
//             })();
//         }
//     }
//     catch (err) {
//         console.log(err)
//     }

// }



console.log(intersection([b1, b2], headers))
// console.log(intersection(['jas.csv', 'empty.csv'], headers))
// console.log(intersection(['./nope/nope.csv', b2], headers))// console.log(answer)
// console.log(intersection([], headers))// console.log(answer)