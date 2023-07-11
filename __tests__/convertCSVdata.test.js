const { readCsvFile, headers, headerLength, indexOfAge, validateHeader, rowHasValidFields } = require('../convertCSVdata')
const fs = require("fs");
const readline = require("readline");


describe('validateHeader function', () => {
  const testHeaders = ['First Name', 'Last Name', 'Age', 'State']
  test('validateHeader returns true when row array strxwings match expected headers (case insensitive)', () => {
    const testRowArr = ['first name', 'last Name', 'Age', 'State']
    expect(validateHeader(testRowArr, testHeaders)).toBe(true)
  })
  test('validateHeader returns false when row array strings do not match match expected headers', () => {
    const testRowArr = ['First Name', 'Last Name', 'Age', 'Country']
    expect(validateHeader(testRowArr, testHeaders)).toBe(false)
  })
  test('validateHeader returns false when row array does equal amount of fields as the headers', () => {
    const testRowArr = ['first name', 'last Name', 'Age']
    expect(validateHeader(testRowArr, testHeaders)).toBe(false)
  })
  test('validateHeader returns false when row array is not an array', () => {
    const testRowArr = 'First Name, Last Name, Age, State'
    expect(validateHeader(testRowArr, testHeaders)).toBe(false)
  })
  test('validateHeader returns false with only one parameter passed', () => {
    const testRowArr = ['Age', 'State', 'first name', 'last Name']
    expect(validateHeader(testRowArr)).toBe(false)
  })

});


describe('rowHasValidFields', () => {

  const testRow = ['Anna', 'Bonanna', '30', 'New York']
  const ageIndex = 2

  test('rowHasValidFields returns true when row elem and index of age are valid', () => {
    expect(rowHasValidFields(testRow, ageIndex)).toBe(true)
  })
  test('rowHasValidFields returns false when row array is not an array', () => {
    const rowString = 'Anna, Bonanna, 30, New York'
    expect(rowHasValidFields(rowString, ageIndex)).toBe(false)
  })
  test('rowHasValidFields returns false when age index is undefined', () => {
    expect(rowHasValidFields(testRow)).toBe(false)
  })
  test('rowHasValidFields returns false when now row array is passed', () => {
    expect(rowHasValidFields(ageIndex)).toBe(false)
  })
  test('rowHasValidFields returns false when age string cannot be converted to a valid number ', () => {
    const rowWrittenAge = ['Anna', 'Bonanna', 'thirty', 'New York']
    const emptyAge = ['Anna', 'Bonanna', '', 'New York']
    expect(rowHasValidFields(rowWrittenAge, ageIndex)).toBe(false)
    expect(rowHasValidFields(emptyAge, ageIndex)).toBe(false)
  })
  test('rowHasValidFields returns false when a non-age field is empty', () => {
    const rowMissingField = ['Anna', '', '30', 'New York']
    expect(rowHasValidFields(rowMissingField, ageIndex)).toBe(false)
  })
  test('rowHasValidFields returns false when age is a negative number', () => {
    const rowNegativeAge = ['Anna', 'Bonanna', '-31', 'New York']
    expect(rowHasValidFields(rowNegativeAge, ageIndex)).toBe(false)
  })

});




describe('readCsvFile', () => {

  const store2 = './testCSV/TestStore2.csv'
  const testHeaders = ["First Name", "Last Name", "Age", "State"]
  const ageIndex = 2

  // afterEach(() => {
  //   jest.restoreAllMocks();
  // });


  // test('readCsvFile correctly reads valid file and returns set of valid rows as lowercase trimmed strings', async () => {
  //   const store = './testCSV/TestStore1.csv' // valid csv with header and both valid and invalid lines
  //   const createReadStream = jest.spyOn(fs, 'createReadStream');
  //   const data = await readCsvFile(store, testHeaders, ageIndex)
  //   expect(createReadStream).toHaveBeenCalledWith(store);
  // })

  test('readCsvFile correctly reads valid file and returns set of valid rows as lowercase trimmed strings', async () => {
    const store = './testCSV/TestStore1.csv' // valid csv with header and both valid and invalid lines
    const data = await readCsvFile(store, testHeaders, ageIndex)

    expect(data instanceof Set).toBe(true)
    expect(data.size).toBe(3)
    expect(data.has('noah,williams,82,south carolina')).toBe(true)
    expect(data.has('Noah , Williams ,82 , South Carolina')).toBe(false)
    expect(data.has('emma,nguyen,57,kentucky')).toBe(true)
    expect(data.has('olivia,johnson,45,utah')).toBe(true)
    expect(data.has(',nunez,,alaska')).toBe(false)
    expect(data.has(',,,')).toBe(false)

  })




  // const video = require('./video');



  // test('plays video', () => {
  //   const spy = jest.spyOn(video, 'play');
  //   const isPlaying = video.play();

  //   expect(spy).toHaveBeenCalled();
  //   expect(isPlaying).toBe(true);
  // });






  test('readCsvFile correctly reads file with valid data when headers have leading/trailing white-space and different capitaliaiton', async () => {
    const store = './testCSV/TestStore2.csv' // valid csv, with all-caps headers and extra whitespace 
    const data = await readCsvFile(store, testHeaders, ageIndex)

    expect(data instanceof Set).toBe(true)
    expect(data.size).toBe(3)

  })

  test('readCsvFile throws an error when file does not have a header row', async () => {
    const store = './testCSV/TestStore3_noheader.csv' // valid csv without header row
    await expect(readCsvFile(store, testHeaders, ageIndex)).rejects.toThrow(`Headers are invalid for ${store}`)
  })

  test('readCsvFile throws an error when file header role does not match', async () => {
    const store = './testCSV/TestStore4_wrongheader.csv' // valid csv without header row
    await expect(readCsvFile(store, testHeaders, ageIndex)).rejects.toThrow(`Headers are invalid for ${store}`)
  })

  test('readCsvFile throws an error when error event occurs', async () => {
    const store = './notRealCsv.csv' // not a real csv
    await expect(readCsvFile(store, testHeaders, ageIndex)).rejects.toThrow(`Someting went wrong at ${store}`)
  })

  test('readCsvFile throws an error when error event occurs', async () => {
    const store = './notRealCsv.csv' // not a real csv
    await expect(readCsvFile(store, testHeaders, ageIndex)).rejects.toThrow(`Someting went wrong at ${store}`)
  })


  test('readCsvFile returns empty set when file only has header without valid rows', async () => {
    const store = 'testCSV/TestStore5_onlyheader.csv' // not a real csv
    const data = await readCsvFile(store, testHeaders, ageIndex)

    expect(data instanceof Set).toBe(true)
    expect(data.size).toBe(0)
  })
});


// describe('validateHeader function', () => {
//     const testRowArr = ['First Name', 'Last Name', 'Age', 'State']
//     const testHeaders = ['First Name', 'Last Name', 'Age', 'State']
//     test('validateHeader', () => {
//         expect(validateHeader(testRowArr, testHeaders)).toBe(true)
//     })
// });



// describe('test', () => {
//     test('placeholder', () => {
//         expect(true).toBe(true)
//     })
// });