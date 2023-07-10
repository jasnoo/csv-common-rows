

const fs = require("fs");
const readline = require("readline");
const path = require('path')



const b1 = "Store1b.csv"
const b2 = "Store2b.csv"



// confirm there are only csv and at least 2 files 


// edge case: checking for valid states?
// make sure at least 2 files are used
// edge case: file needs to have data in it, not an empty file


// initial pass of files => check their file sizes and order by file size, check if they have valid header
// if everything 

// read first file
// first line, you check if it has first name, if so it is the correct 
// find header length and it represents the amount of columns
// when splittig the data, trim edges, capitalize first letter, ensure age is valid, array has correct amount of fields
// after cleaning the data, put it back into a string and return it into a set 


// for each line, you 


// you have an initial file as a set
// you have second file where you've process the file and then do the reducing 
// check first file 



// let data = new Set 





// const fileSize = new Map()


//////////////////////////////////////////////// HELPER FUNCTIONS //////////////////////////////////////////////// 


// check if file is CSV
function isCorrectFileExt(filePath, extension) {
  return path.extname(filePath) === extension ? true : false
}




// check if its a header
function checkIfHeader(arr, headerArray) {
  arr.forEach((elem, i) => {
    if (!elem || (elem.trim().toLowerCase() !== headerArray[i].toLowerCase())) {
      return false
    }
  })
  return true;
}

// check if the row is has valid field count
function hasCorrectFieldCount(arr, headerArrLength) {
  return (arr.length === headerArrLength) ? true : false;
}


// // validate and format row values 
// function hasValidTextValues(value, index, headerArray){
//   let indexOfAge = 
// }







//////////////////////////////////////////////// HELPER FUNCTIONS //////////////////////////////////////////////// 


// console.log(getFileSize(b1))

const headers = ["First Name", "Last Name", "Age", "State"]
const indexOfAge = headers.indexOf("Age")


const readCsvFile = async (filePath, headerInfo) => new Promise((resolve, reject) => {
  let checkedForHeader = false
  let isValidfile = true
  let headerArr = [...headers]
  const headerCount = headers.length
  let dataSet = new Set();

  const csvStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: csvStream })


  rl.on('line', (row) => {
    let isValidLine = true;
    let tempLineArr = row.split(',')
    // it will check for header conditions, since this starts at false it should start for the first line

    if (checkedForHeader === false) {

      if (!checkIfHeader(tempLineArr, headerArr)) {
        hasValidHeader = false;
        isValidfile = false
      }
      else {
        hasValidHeader = true
      }
      checkedForHeader = true;

    }

    if (isValidfile) {
      // all functionality around when headercheck has happened already and file is still valid

      //conditions that would mean the file is invalid
      if (!hasCorrectFieldCount(tempLineArr, headerCount)) { isValidfile = false }

      // conditions that mean the line is invalid
      else {
        tempLineArr.forEach((x, i) => {
          tempLineArr[i] = tempLineArr[i].trim()

          if (i === indexOfAge) {
            // removes spaces just in case, uses radix 10
            tempLineArr[i] = parseInt(tempLineArr[i], 10);
            if (Number.isNaN(tempLineArr[i])) {
              isValidLine = false
            }

          } else if (!!x === false || x === '') {
            // if not looking at number, checks for the string

            isValidLine = false

          }
          // end of checking each individual object
        })

      }

      // after doing all the checks of individual elements of the array
      if (isValidLine) {
        // console.log('tempLineArr of valid line', tempLineArr)
        dataSet.add(tempLineArr.join(",").toLowerCase())
      }

    }

    else {
      // when file is not valid
      rl.close()
    }


  })

  rl.on('error', function (error) {
    reject(error)
  });

  rl.on("close", () => {
    csvStream.destroy();
    // console.log('closing:', dataSet)
    resolve(dataSet)
  })
})


function allOfThis(allfiles, theHeaders) {


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


  (async () => {
    let answer = await findUserIntersection([...allfiles], theHeaders)
    console.log("this is my answer:", answer)

    // console.log('intersectionOfUsers:', intersectionOfUsers)
  })();


}

allOfThis([b1, b2], headers)



























// function readCSV(filePath) {

//     const csvStream = fs.createReadStream(filePath);
//     const rl = readline.createInterface({ input: csvStream })

//     let data = []

//     rl.on('line', (row) => {
//         data.push(row.split(","))
//     })
//     rl.on("close", () => {
//         console.log(data)
//     })

// }





// function readCSV(filePath) {

//     const csvStream = fs.createReadStream(filePath);
//     const rl = readline.createInterface({ input: csvStream })

//     fs.stat(filePath, (err, stats) => {
//         if (err) { console.log(err) }
//         else { console.log('stats:', stats.size) }
//     })


//     rl.on('line', (row) => {
//         data.push(row.split(","))
//         if (data.length === 1) { rl.close() }
//     })
//     rl.on("close", () => {
//         console.log(data)
//     })

// }

























////////////////////





// const fs = require("fs");
// const readline = require("readline");



// const b1 = "Store1b.csv"
// const b2 = "Store2b.csv"

// // edge case: checking for valid states?
// // make sure at least 2 files are used
// // edge case: file needs to have data in it, not an empty file


// // initial pass of files => check their file sizes and order by file size, check if they have valid header
// // if everything 

// // read first file
// // first line, you check if it has first name, if so it is the correct 
// // find header length and it represents the amount of columns
// // when splittig the data, trim edges, capitalize first letter, ensure age is valid, array has correct amount of fields
// // after cleaning the data, put it back into a string and return it into a set 


// // for each line, you 


// // you have an initial file as a set
// // you have second file where you've process the file and then do the reducing 
// // check first file 



// // let data = new Set 





// // const fileSize = new Map()


// //////////////////////////////////////////////// HELPER FUNCTIONS //////////////////////////////////////////////// 


// // gets file size of file
// function getFileSize(fiplePath) {
//   return fs.stat(fiplePath, (err, stats) => {
//     if (err) { console.log(err) }
//     else { console.log('stats:', stats.size) }
//   })

// }


// // check if its a header

// function checkIfHeader(arr, headerArr) {
//   arr.forEach((elem, i) => {
//     if (!elem || (elem.trim().toLowerCase() !== headerArr[i].toLowerCase())) {
//       return false
//     }
//   })
//   return true;
// }

// if (checkedForHeader === false) {
//   tempLineArr.forEach((x, i) => {
//     // console.log("x:", x, i, headerArr, 'this is headerarrI', headerArr[i])
//     if (!x || (x.trim().toLowerCase() !== headerArr[i].toLowerCase())) {
//       hasValidHeader = false;
//       isValidfile = false
//     }
//     else {
//       hasValidHeader = true
//     }
//   })
//   checkedForHeader = true;
// }


// //////////////////////////////////////////////// HELPER FUNCTIONS //////////////////////////////////////////////// 


// // console.log(getFileSize(b1))

// const headers = ["First Name", "Last Name", "Age", "State"]
// const indexOfAge = headers.indexOf("Age")

// function readCsvFile(filePath, headerInfo) {
//   let checkedForHeader = false
//   let hasValidHeader = false
//   let isValidfile = true
//   let headerArr = [...headers]
//   let fieldCount = headerArr.length
//   let dataSet = new Set();


//   const csvStream = fs.createReadStream(filePath);
//   const rl = readline.createInterface({ input: csvStream })
//   let firstLine = []
//   // console.log('still running 1')

//   rl.on('line', (row) => {
//     let isValidLine = true;

//     let tempLineArr = row.split(',')

//     // it will check for header conditions, since this starts at false it should start for the first line
//     if (checkedForHeader === false) {
//       tempLineArr.forEach((x, i) => {
//         // console.log("x:", x, i, headerArr, 'this is headerarrI', headerArr[i])
//         if (!x || (x.trim().toLowerCase() !== headerArr[i].toLowerCase())) {
//           hasValidHeader = false;
//           isValidfile = false
//         }
//         else {
//           hasValidHeader = true
//         }
//       })
//       checkedForHeader = true;
//     }

//     else if (isValidfile) {
//       // all functionality around when headercheck has happened already and file is still valid

//       //conditions that would mean the file is invalid
//       if (tempLineArr.length !== fieldCount) {
//         isValidfile = false
//       }

//       // conditions that mean the line is invalid
//       else {
//         tempLineArr.forEach((x, i) => {
//           tempLineArr[i] = tempLineArr[i].trim()

//           if (i === indexOfAge) {
//             // removes spaces just in case, uses radix 10
//             tempLineArr[i] = parseInt(tempLineArr[i], 10);
//             if (Number.isNaN(tempLineArr[i])) {
//               isValidLine = false
//             }

//           } else if (!x === true || x === '') {
//             // if not looking at number, checks for the string

//             isValidLine = false

//           }


//           // end of checking each inddividual object
//         })

//       }

//       // after doing all the checks of individual elements of the array
//       if (isValidLine) {
//         console.log('tempLineArr of valid line', tempLineArr)
//         dataSet.add(tempLineArr.join(",").toLowerCase())
//       }

//     }

//     else {
//       // when file is not valid
//       rl.close()
//     }


//   })


//   rl.on("close", () => {
//     csvStream.destroy();
//     console.log('closing:', dataSet)
//   })

// }



// console.log(readCsvFile('jas.csv', headers))
// // console.log(checkForheader(b1))
// // console.log('this also happens')






// // console.log(readCSV(b1))















// // function readCSV(filePath) {

// //     const csvStream = fs.createReadStream(filePath);
// //     const rl = readline.createInterface({ input: csvStream })

// //     let data = []

// //     rl.on('line', (row) => {
// //         data.push(row.split(","))
// //     })
// //     rl.on("close", () => {
// //         console.log(data)
// //     })

// // }





// // function readCSV(filePath) {

// //     const csvStream = fs.createReadStream(filePath);
// //     const rl = readline.createInterface({ input: csvStream })

// //     fs.stat(filePath, (err, stats) => {
// //         if (err) { console.log(err) }
// //         else { console.log('stats:', stats.size) }
// //     })


// //     rl.on('line', (row) => {
// //         data.push(row.split(","))
// //         if (data.length === 1) { rl.close() }
// //     })
// //     rl.on("close", () => {
// //         console.log(data)
// //     })

// // }