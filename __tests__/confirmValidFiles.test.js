const { checkforFileArr, checkFileCount, checkForCsvExt, checkFileExists, isValidFileArray, checkForNoDuplicates } = require("../confirmValidFiles");

describe('checkforFileArr function', () => {

  const store1 = './testCSV/TestStore1.csv'

  test('checkforFileArr throws an error when no arguments are passed', () => {
    const t = () => checkforFileArr()
    expect(t).toThrow('File array should be an array')
  })

  test('checkforFileArr throws an error when no array argument is passed', () => {
    const t = () => checkforFileArr('store1')
    expect(t).toThrow('File array should be an array')
  })

  test('checkforFileArr returns true when a array is passed in', () => {
    expect(checkforFileArr([store1])).toBe(true);
    expect(checkforFileArr([])).toBe(true);
  })
});

describe('checkFileCount', () => {

  const store1 = './testCSV/TestStore1.csv'
  const store2 = './testCSV/TestStore2.csv'

  test('checkFileCount throws an error when first argument is not an array', () => {
    const t = () => (checkFileCount(store1, 2))
    expect(t).toThrow('File array should be an array')
  })

  test('checkFileCount throws an error when file array length is not equal to expected file count ', () => {
    const t = () => (checkFileCount([store1], 2))
    expect(t).toThrow('File array has unexpected amount of files')
  })

  test('checkFileCount throws an error when expected count is 1', () => {
    const t = () => (checkFileCount([store1], 2))
    expect(t).toThrow('File array has unexpected amount of files')
  })

  test('checkFileCount throws an error when expected count is not a number', () => {
    const t = () => (checkFileCount([store1], 'one'))
    expect(t).toThrow('Invalid expected file count')
  })

  test('checkFileCount throws an error when expected count is undefined', () => {
    const t = () => (checkFileCount([store1]))
    expect(t).toThrow('Invalid expected file count')
  })

  test('checkFileCount throws an error when an empty file array is passed in', () => {
    const t = () => (checkFileCount([], 2))
    expect(t).toThrow('File array has unexpected amount of files')
  })

  test('checkFileCount returns true when count of files in array is equal to expected count', () => {
    expect((checkFileCount([store1, store2], 2))).toBe(true)
  })
})


describe('checkForCsvExt function', () => {
  const store = './testCSV/TestStore1.csv'
  const invalidCsV = 'file.html'

  test('checkForCsvExt returns throws an error when no file argument is passed in', () => {
    const t = () => checkForCsvExt()
    expect(t).toThrow('File is undefined')
  })

  test('checkForCsvExt throws an error when file extension is not .csv', () => {
    const t = () => checkForCsvExt(invalidCsV)
    expect(t).toThrow(`${invalidCsV} is not a CSV`)
  })

  test('checkForCsvExt throws an error when argument is not a string', () => {
    const notAString = [store]
    const t = () => checkForCsvExt(notAString)
    expect(t).toThrow(`${notAString} is not a CSV`)
  })

  test('checkForCsvExt returns true when file extension is .csv', () => {
    expect(checkForCsvExt(store)).toBe(true)
  })
})

describe('checkFileExists function', () => {

  const store = './testCSV/TestStore1.csv'
  const invalidCsV = 'notReal.csv'

  test('checkFileExists throws an error if file argument is not a string', () => {
    const t = () => checkFileExists([store])
    expect(t).toThrow('File argument should be a string')
  })

  test('checkFileExists throws an error if no argument is passed', () => {
    const t = () => checkFileExists()
    expect(t).toThrow('File argument should be a string')
  })

  test('checkFileExists throws an error when fs.existsSync returns false', () => {
    const t = () => checkFileExists(invalidCsV)
    expect(t).toThrow(`File does not exist at ${invalidCsV}`)
  })

  test('checkFileExists throws an error when fs.existsSync returns false', () => {
    expect(checkFileExists(store)).toBe(true)
  })
})


describe('checkForNoDuplicates function', () => {
  test('checkForNoDuplicates throws an error when there are duplicate strings passed in array', () => {
    const fileArr = ['file1.csv', 'file2.csv', 'file1.csv']
    const t = () => checkForNoDuplicates(fileArr)
    expect(t).toThrow(`File array cannot have duplicate files`)
    expect(t).not.toBe(true)
  })

  test('checkForNoDuplicates throws and error when file array is not an array', () => {
    const t = () => (checkForNoDuplicates('file1.csv', 'file2.csv'))
    expect(t).toThrow(`File array should be an array`)
    expect(t).not.toBe(true)
  })

  test('checkForNoDuplicates returns true when there are no duplicate strings in fileArr', () => {
    const fileArr = ['file1.csv', 'file2.csv', 'file3.csv']
    expect(checkForNoDuplicates(fileArr)).toBe(true)
  })
})

describe('isValidFileArray function', () => {

  const store1 = './testCSV/TestStore1.csv'
  const store2 = './testCSV/TestStore2.csv'
  const store3 = 'notReal.csv'
  const store4 = 'test.txt'

  test('isValidFileArray throws error when first argument is not an array', () => {
    const fileArr = store1
    const expectedCount = 2
    const t = () => isValidFileArray(fileArr, expectedCount)
    expect(t).toThrow('File array should be an array')
  })

  test('isValidFileArray throws error when file array does not have expected file count', () => {
    const fileArr = [store1, store2]
    const expectedCount = 3
    const t = () => isValidFileArray(fileArr, expectedCount)
    expect(t).toThrow('File array has unexpected amount of files')
  })

  test('isValidFileArray throws error when fs.existsSync returns false', () => {
    const fileArr = [store1, store3]
    const expectedCount = 2
    const t = () => isValidFileArray(fileArr, expectedCount)
    expect(t).toThrow('File does not exist')
  })

  test('isValidFileArray throws error when a file is not csv', () => {
    const fileArr = [store1, store4]
    const expectedCount = 2
    const t = () => isValidFileArray(fileArr, expectedCount)
    expect(t).toThrow(`${store4} is not a CSV`)
  })

  test('isValidFileArray throws error when file array has file duplicates', () => {
    const fileArr = [store1, store1]
    const expectedCount = 2
    const t = () => isValidFileArray(fileArr, expectedCount)
    expect(t).toThrow('File array cannot have duplicate files')
  })

  test('isValidFileArray returns true when file array has valid files and expected count is valid', () => {
    const fileArr = [store1, store2]
    const expectedCount = 2
    expect(isValidFileArray(fileArr, expectedCount)).toBe(true)
  })
})
