const fs = require("fs");

// gets an array of strings, each that represent a user that is seen in all files 
function findUserIntersection(allFileArr) {

    // reduces 2d array into array of strings representinng intersecting users
    // init value is the last elem of input arr, deduplicated

    let init = allFileArr.pop()
    init = init.filter((x, i) => init.indexOf(x) === i)
    let intersection = allFileArr.reduce((acc, b) => acc.filter(x => b.includes(x)), init)
    console.log(intersection)

    // makes each string element into an array 
    intersection = intersection.map(x => x.split(','))

    // filters to remove any invalid users (e.g [',,18,',]) 
    intersection = intersection.filter(x => x.every(x => !!x === true))
    console.log(intersection)

    // makes user object for each item returns them as an array
    return intersection.map(x => ({ 'First Name': x[0], 'Last Name': x[1], 'Age': Number(x[2]), 'State': x[3] }))

}

module.exports = findUserIntersection