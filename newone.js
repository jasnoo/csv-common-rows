const { getIntersectionOfArr } = require('./getIntersection')
const { isValidFileArray } = require('./confirmValidFiles')



const totalFiles = 2 // how many files will be compared - is 2 based on readme 
const expectedHeaders = ["First Name", "Last Name", "Age", "State"]
const ageIndex = 2 // index of the "age" field to handle converting ages to number type

const b1 = "Store1b.csv"
const b2 = "Store2b.csv"




function intersection(fileArr, headerArr = expectedHeaders, fileCount = totalFiles, indexOfAge = ageIndex) {

    try {
        console.log('filecount in intersection:', fileCount)
        console.log('isValidFileArray(fileArr, fileCount)', isValidFileArray(fileArr, fileCount))
        if (isValidFileArray(fileArr, fileCount)) {

            return (async () => {
                let userInterSection = await getIntersectionOfArr(fileArr, headerArr, indexOfAge).catch(err => console.log(err))
                console.log(userInterSection)
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

const test1 = './testCSV/TestStore1.csv'
const test2 = './testCSV/TestStore2.csv'

// console.log(intersection([test1, test2]))
console.log(intersection([b1, b2]))
// console.log(intersection([b1], headers, 2))
// console.log(intersection(['jas.csv', 'empty.csv'], headers))
// console.log(intersection(['./nope/nope.csv', b2], headers))// console.log(answer)
// console.log(intersection([], headers))// console.log(answer)