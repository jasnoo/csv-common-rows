const convertCSVdata = require('./convertCSVdata')
const findUserIntersection = require('./findUserIntersection')

// import convertCSVdata from "./convertCSVdata"
// import findUserIntersection from "./findUserIntesection"


const b1 = "Store1b.csv"
const b2 = "Store2b.csv"



let result = convertCSVdata(b1, b2)
console.log(findUserIntersection(result))



