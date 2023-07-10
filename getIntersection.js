const fs = require("fs");
const { readCsvFile, headers, headerLength, indexOfAge } = require('./convertCSVdata')



// helper functions

// takes set containing strings representing users and returns an array of user objects
function createUserObject(userSet, headerArray) {
    return [...userSet].map(row => {
        let tempArr = row.split(',')
        let customerObj = {}
        tempArr.forEach((value, i) => {
            i === indexOfAge ? customerObj[headers[i]] = parseInt(value) : customerObj[headers[i]] = value
        })
        return customerObj
    })
}


// used to reduce sets 
function reduceUserSets(arrayOfUserSets) {
    // console.log('arrayOfUserSets', arrayOfUserSets)
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



async function getIntersectionOfArr(fileArray, headerArr) {
    // input: arary of all file paths, array of header fields expected

    // creates an array of 
    let fileDataArray = await Promise.all(fileArray.map(file => readCsvFile(file, headerArr)))
    // console.log('fileDataArray', fileDataArray)

    // takes an array containing a set of user promises
    let intersection = reduceUserSets(fileDataArray)


    // takes input of set containing strings representing each intersection user and outputs array of user object 
    let final = createUserObject(intersection, headerArr)

    console.log(final)
    return final
}




// function getUserIntersection(fileArr, headerArr) {

//     (async () => {
//         let userInterSection = await getIntersectionOfArr(fileArr, headerArr)
//         console.log(userInterSection)
//         return userInterSection
//     })();


// }






module.exports = { getIntersectionOfArr }