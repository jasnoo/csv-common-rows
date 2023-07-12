const { getIntersectionOfArr } = require('./getIntersection')
const { isValidFileArray } = require('./confirmValidFiles')

///////////  Constants for mutualCustomer fuction begin ///////////

const store1 = 'Store1.csv'
const store2 = 'Store2.csv'
const allCSVFileArray = [store1, store2]

const totalFiles = 2 // how many files will be compared - is 2 based on readme 
const expectedHeaders = ["First Name", "Last Name", "Age", "State"] // expected headers of the files
const ageIndex = 2 // index of the "age" field to handle converting ages to number type

///////////  Constants for mutualCustomer fuction end ///////////

async function mutualCustomers(fileArr, headerArr = expectedHeaders, fileCount = totalFiles, indexOfAge = ageIndex) {
  try {
    if (isValidFileArray(fileArr, fileCount)) {
      let userInterSection = await getIntersectionOfArr(fileArr, headerArr, indexOfAge)
      console.log(userInterSection)
      return userInterSection
    }
  }
  catch (err) {
    throw err
  }
}


mutualCustomers(allCSVFileArray)



module.exports = {
  mutualCustomers,
  totalFiles,
  expectedHeaders,
  ageIndex
}