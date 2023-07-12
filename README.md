## How to Run
1. Main function is `mutualCustomers` which can be found in _mutualCustomers.js_ along with its inputs (see [Adjusting Inputs](#adjusting-inputs) )
2. From this directory, in terminal run the following to get an array of user objects that are mutual to your input files. 
```
node mutualCustomers.js
```

If two files are valid and have any users intersection, the results will show like this:

```javascript
[
  {
    'First Name': 'james',
    'Last Name': 'davis',
    Age: 19,
    State: 'alabama'
  },
  {
    'First Name': 'emily',
    'Last Name': 'kim',
    Age: 72,
    State: 'north dakota'
  },
  ....
]
```
* Note all values will be lowercase in the results

## Unit Tests

Unit tests can be found in `__tests__` folder and can be run in terminal with `npm run test`



## Adjusting Inputs:
In mutualCustomers.js, the function `mutualCustomers(allCSVFileArray)` can be executed to get the mutual customers between two customer CSVs. 


Path to each CSV file:
```javascript
const store1 = 'Store1 copy.csv'
const store2 = 'Store2 copy.csv'
```
Array containing the CSV file paths
```javascript
const allCSVFileArray = [store1, store2]
```

Expected header for all of the files:
```javascript
const expectedHeaders = ["First Name", "Last Name", "Age", "State"] 
```
* Note: The first row of all the CSV files should include these headers, or else the function will throw an error

Other Constants that can be optionally changed:
```javascript
const totalFiles = 2 // how many files should be expected, set to 2
const ageIndex = 2 // index of "Age" field in our headers
```



## How the Code Works:

#### 1. The main function is `mutualCustomers` which can be found in _mutualCustomers.js_. This function has the following inputs:
  - fileArr - array of strings representing the paths to the CSV files
  - headerArr - array of strings repressenting expected headers on all of the files
  - fileCount - number representing how many files are expected in fileArr
  - ageIndex - index of "Age" element within headerArr

This file additionally contains constants such as the CSV file paths, the expected file headers, and additionally the count of files expected and the index of the "Age" field.

When `mutualCustomers` is invoked with valid arguments, the function will invoke a check via `isValidFileArray` to see if the inputs to `mutualCustomers` are valid. If so, `getIntersectionOfArr` will be invoked.

#### 2. The `isValidFileArray` function can be found in _confirmValidFiles.js_ and its purpose is to determine if the fileArr argument is valid through the use of multiple helper functions within the same file

  - `checkforFileArr` function confirms that the fileArray argument is an array
  - `checkFileCount` function confirms the elements with fileArray is equal to the expectedCount argument
  - `checkForCsvExt` function confirms that the file path passed in is a CSV
  - `checkFileExists` function that confirms that the file path passed in is an existing file
  - `checkForNoDuplicates` function that confirms that there are no duplicate file paths within the file array

#### 3. `getIntersectionOfArr` function is found in _getIntersection.js_ and is invoked if all of the files in the file array are valid. This function has 3 main steps:

  - Creating an array of Sets where each set represents the data from one CSV which occurs through the `readCsvFile` function found in _convertCSVdata.js_.
  - Reducing the array of sets into a single set of common customers between the files via `reduceUserSets` function in the same file
  - Creating a final user array via the `createUserObject` function that formats the data from the intersection set into an array of user objects

#### 4. `readCsvFile` function is found in _convertCSVdata.js_ and is invoked for the first portion of `getIntersectionOfArr` to read a CSV file and convert its data into a Set with strings repreenging this data:

- Using `fs.createReadStream`and `readline.createInterface`, it will read a CSV file line by line
- The `validateHeader` helper function is invoked on first like of the data to determine if the fields match the expeted headers
- Subsequent lines will be validated (e.g. no empty fields, remove leading/trailing whitespace) and added to a Set in order to remove repeated rows within a file 
