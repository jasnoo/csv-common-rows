const { isValidFileArray,
    totalFiles,
    checkforFileArr,
    checkFileCount,
    checkForCsvExt,
    checkForValidfile,
    checkForDuplicates } = require("../confirmValidFiles");


test('checkforFileArr should throw an error when no arguments are passed', () => {
    const t = () => (checkforFileArr())
    expect(t).toThrow(Error)
    expect(t).toThrow('fileArr must be an array')
})

test('checkforFileArr should throw an error when no array argument is passed', () => {
    const t = () => (checkforFileArr('file.csv'))
    expect(t).toThrow(Error)
    expect(t).toThrow('fileArr must be an array')
})

test('checkforFileArr should return true when a array is passed in', () => {
    expect(checkforFileArr(['file1.csv'])).toBe(true);
    expect(checkforFileArr([])).toBe(true);

})


checkFileCount

test('checkFileCount should throw an error when file array length is not equal to expected file count ', () => {
    const t = () => (checkFileCount(['file2.csv'], 2))
    expect(t).toThrow(Error)
    expect(t).toThrow('fileArr has unexpected amount of files')
})

test('checkFileCount should return true when count of files in array is equal to expected count', () => {
    (checkFileCount(['file1.csv', 'file2.csv'], 2)).toBe(true)
})

// test('checkFileCount should throw an error when file array length is not equal to expected file count ', () => {
//     const t = () => (checkFileCount(['file2.csv', 'file3.csv']))
//     expect(t).toThrow(Error)
//     expect(t).toThrow('fileArr has unexpected amount of files')
// })