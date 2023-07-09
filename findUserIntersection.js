const fs = require("fs");




async function findUserIntersection(allFileArr, headerArr) {

    // reduces 2d array into array of strings representinng intersecting users
    // init value is the last elem of input arr, deduplicated
    let result = await Promise.all(allFileArr.map(x => readCsvFile(x, headerArr)))

    let init = result.pop()
    let intersection = result.reduce((acc, b) => {
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

    // let customerObj = {}
    // intersection.forEach(x=>{
    //   console.log('x', x)
    // })



    return [...intersection].map(x => {
        let tempArr = x.split(',')
        let customerObj = {}
        tempArr.forEach((y, i) => {
            i === indexOfAge ? customerObj[headers[i]] = parseInt(y) : customerObj[headers[i]] = y
        })
        return customerObj
    })

}

(async ([allFileArr], headers) => {
    let answer = await findUserIntersection([allFileArr], headers)
    console.log("this is my answer:", answer)

})([...allFileArr], headers);

// (async () => {
//     let answer = await findUserIntersection(allFileArr, headers)
//     console.log("this is my answer:", answer)

// })();


module.exports = findUserIntersection