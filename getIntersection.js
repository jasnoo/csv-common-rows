const { readCsvFile, headers, headerLength, indexOfAge } = require('./convertCSVdata')
const fs = require("fs");

/////////// Helper functions for getIntersectionOfArr function begin /////////// 

// Takes in a set of user strings returns an array of user objects based on headers and optional index of age field 
function createUserObject(userSet, headerArray, ageIndex) {
  if (!(userSet instanceof Set)) {
    throw new Error('User set should be a set')
  } else if (!headerArray || !Array.isArray(headerArray)) {
    throw new Error('Header array should be an array')
  } else {
    // Makes string into a row of elements with non-Age values as strings and age as a number value
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

// Takes an array of user sets and reduces them into one set that is intersection of them 
function reduceUserSets(arrayOfUserSets) {
  if (Array.isArray(arrayOfUserSets)) {
    const init = arrayOfUserSets.pop()
    return arrayOfUserSets.reduce((acc, b) => {
      b.forEach(x => {
        if (!acc.has(x)) {
          b.delete(x)
        }
      })
      return b
    }, init)
  }
  else throw new Error('arrayOfUserSets should be an array')
}

/////////// Helper functions for getIntersectionOfArr function end /////////// 


// getIntersectionOfArr is used to take all input CSV files as an array with respective headers 
async function getIntersectionOfArr(fileArray, headerArr, indexOfAge) {

  // creates an array of sets where each invdividual set is the   
  let fileDataArray = await Promise.all(fileArray.map(file => readCsvFile(file, headerArr, indexOfAge)))
  // takes an array containing a set of user promises
  let intersection = reduceUserSets(fileDataArray)
  // takes input of set containing strings representing each intersection user and outputs array of user object 
  let final = createUserObject(intersection, headerArr, indexOfAge)
  console.log('final', final)

  return final
}



module.exports = { createUserObject, reduceUserSets, getIntersectionOfArr }