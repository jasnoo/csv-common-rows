const { readCsvFile, headers, headerLength, indexOfAge } = require('./convertCSVdata')
// const fs = require("fs");



// helper functions

// takes set containing strings representing users and returns an array of user objects
function createUserObject(userSet, headerArray, ageIndex) {
    if (!(userSet instanceof Set)) {
        throw new Error('User set should be a set')
    } else if (!headerArray || !Array.isArray(headerArray)) {
        throw new Error('Header array should be an array')
    } else {
        return [...userSet].map(row => {
            let tempArr = row.split(',')
            let customerObj = {}
            if (ageIndex !== undefined) {
                tempArr.forEach((value, i) => {
                    i === ageIndex ? customerObj[headerArray[i]] = parseInt(value) : customerObj[headerArray[i]] = value
                })
            } else {
                tempArr.forEach((value, i) => {
                    customerObj[headerArray[i]] = value
                })
            }
            return customerObj
        })
    }


}


// used to reduce sets 
function reduceUserSets(arrayOfUserSets) {
    if (Array.isArray(arrayOfUserSets)) {
        const init = arrayOfUserSets.pop()
        return arrayOfUserSets.reduce((acc, b) => {
            //start of what to do with a set
            b.forEach(x => {
                // start of each line in acc set
                if (!acc.has(x)) {
                    b.delete(x)
                }
                // end of each line in set
            })
            return b
            //end of what to do with the set
        }, init)
    }
    else throw new Error('arrayOfUserSets should be an array')

}



async function getIntersectionOfArr(fileArray, headerArr,) {
    // input: arary of all file paths, array of header fields expected

    // creates an array of 
    let fileDataArray = await Promise.all(fileArray.map(file => readCsvFile(file, headerArr)))
    // console.log('fileDataArray', fileDataArray)

    // takes an array containing a set of user promises
    let intersection = reduceUserSets(fileDataArray)


    // takes input of set containing strings representing each intersection user and outputs array of user object 
    let final = createUserObject(intersection, headerArr, indexOfAge)

    return final
}




// function getUserIntersection(fileArr, headerArr) {

//     (async () => {
//         let userInterSection = await getIntersectionOfArr(fileArr, headerArr)
//         console.log(userInterSection)
//         return userInterSection
//     })();


// }






module.exports = { createUserObject, reduceUserSets, getIntersectionOfArr }