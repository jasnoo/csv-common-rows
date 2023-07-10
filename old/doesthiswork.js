

const fs = require("fs");
const readline = require("readline");
const path = require('path');
const { stringify } = require("querystring");



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




async function findUserIntersection(allFileArr, headerArr) {

    // reduces 2d array into array of strings representinng intersecting users
    // init value is the last elem of input arr, deduplicated
    try {
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

        let finalResult = [...intersection].map(x => {
            let tempArr = x.split(',')
            let customerObj = {}
            tempArr.forEach((y, i) => {
                i === indexOfAge ? customerObj[headers[i]] = parseInt(y) : customerObj[headers[i]] = y
            })
            return customerObj
        })
        return finalResult
    }


    catch (error) {
        throw error;
    }





}

// (async () => {
//     try {
//         let intersectionOfUsers = await findUserIntersection([b1, b2], headers);
//         console.log("Intersection of Users:", intersectionOfUsers);
//     } catch (error) {
//         console.error("Error occurred:", error);
//     }
// })();

// let result2 = await findUserIntersection([b1, b2], headers);
// console.log("Result 2:", result2);

let newThing
findUserIntersection([b1, b2], headers)
    .then(data => {
        // console.log("Intersection of Users:", intersectionOfUsers);

        let strData = JSON.stringify.data
        fs.writeFile('test.txt', data, err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });
        return intersectionOfUsers

    })
    .catch(error => {
        console.error("Error occurred:", error);
    });


