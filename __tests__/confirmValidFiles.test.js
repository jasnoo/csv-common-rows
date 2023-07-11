const { checkforFileArr, checkFileCount, checkForCsvExt, checkFileExists, checkForDuplicates, isValidFileArray } = require("../confirmValidFiles");
const fs = require('fs')

jest.mock('fs');


describe('checkforFileArr function', () => {
    test('checkforFileArr throws an error when no arguments are passed', () => {
        const t = () => checkforFileArr()
        expect(t).toThrow('File array should be an array')
    })
    test('checkforFileArr throws an error when no array argument is passed', () => {
        const t = () => checkforFileArr('file.csv')
        expect(t).toThrow('File array should be an array')
    })
    test('checkforFileArr returns true when a array is passed in', () => {
        expect(checkforFileArr(['file1.csv'])).toBe(true);
        expect(checkforFileArr([])).toBe(true);

    })
});

describe('checkFileCount', () => {
    test('checkFileCount throws an error when first argument is not an array', () => {
        const t = () => (checkFileCount('file1.csv', 2))
        expect(t).toThrow('File array should be an array')
    })
    test('checkFileCount throws an error when file array length is not equal to expected file count ', () => {
        const t = () => (checkFileCount(['file1.csv'], 2))
        expect(t).toThrow('File array has unexpected amount of files')
    })
    test('checkFileCount throws an error when expected count is 1', () => {
        const t = () => (checkFileCount(['file1.csv'], 1))
        expect(t).toThrow('Invalid expected file count')
    })
    test('checkFileCount throws an error when expected count is not a number', () => {
        const t = () => (checkFileCount(['file1.csv'], 'one'))
        expect(t).toThrow('Invalid expected file count')
    })
    test('checkFileCount throws an error when expected count is undefined', () => {
        const t = () => (checkFileCount(['file1.csv']))
        expect(t).toThrow('Invalid expected file count')
    })
    test('checkFileCount throws an error when an empty file array is passed in', () => {
        const t = () => (checkFileCount([], 2))
        expect(t).toThrow('File array has unexpected amount of files')
    })
    test('checkFileCount returns true when count of files in array is equal to expected count', () => {
        expect((checkFileCount(['file1.csv', 'file2.csv'], 2))).toBe(true)
    })
})


describe('checkForCsvExt function', () => {
    test('checkForCsvExt throws an error when file extension is not .csv', () => {
        const t = () => checkForCsvExt('file.html')
        expect(t).toThrow(`File is not a CSV`)
    })
    test('checkForCsvExt throws an error when argument is not a string', () => {
        const t = () => checkForCsvExt(['file.csv'])
        expect(t).toThrow('File is not a CSV')
    })

    test('checkForCsvExt returns true when file extension is .csv', () => {
        expect(checkForCsvExt('file.csv')).toBe(true)
    })
})

describe('checkFileExists function', () => {
    beforeEach(() => {
        fs.existsSync.mockClear()
    })
    test('checkFileExists throws an error if file argument is not a string', () => {
        const t = () => checkFileExists(['file.csv'])
        expect(t).toThrow('File argument should be a string')
    })
    test('checkFileExists throws an error if no argument is passed', () => {
        const t = () => checkFileExists()
        expect(t).toThrow('File argument should be a string')
    })
    test('checkFileExists throws an error when fs.existsSync returns false', () => {
        fs.existsSync.mockReturnValue(false)
        const t = () => checkFileExists('file.csv')
        expect(t).toThrow('File does not exist')
        expect(fs.existsSync).toHaveBeenCalledTimes(1)
    })
    test('checkFileExists throws an error when fs.existsSync returns false', () => {
        fs.existsSync.mockReturnValue(true)
        expect(checkFileExists('file.csv')).toBe(true)
        expect(fs.existsSync).toHaveBeenCalledTimes(1)
    })
})


describe('checkForDuplicates function', () => {
    test('checkForDuplicates throws an error when there are duplicate strings passed in array', () => {
        const fileArr = ['file1.csv', 'file2.csv', 'file1.csv']
        const t = () => checkForDuplicates(fileArr)
        expect(t).toThrow(`File array cannot have duplicate files`)
        expect(t).not.toBe(true)
    })
    test('checkForDuplicates throws and error when file array is not an array', () => {
        const t = () => (checkForDuplicates('file1.csv', 'file2.csv'))
        expect(t).toThrow(`File array should be an array`)
        expect(t).not.toBe(true)
    })
    test('checkForDuplicates returns true when there are no duplicate strings in fileArr', () => {
        const fileArr = ['file1.csv', 'file2.csv', 'file3.csv']
        expect(checkForDuplicates(fileArr)).toBe(true)
    })
})


describe('isValidFileArray function', () => {
    beforeEach(() => {
        fs.existsSync.mockClear()
    })
    test('isValidFileArray throws error when first argument is not an array', () => {
        fs.existsSync.mockReturnValue(true)
        const fileArr = 'file1.csv'
        const expectedCount = 2
        const t = () => isValidFileArray(fileArr, expectedCount)
        expect(t).toThrow('File array should be an array')
    })

    test('isValidFileArray throws error when file array does not have expected file count', () => {
        fs.existsSync.mockReturnValue(true)
        const fileArr = ['file1.csv', 'file2.csv']
        const expectedCount = 3
        const t = () => isValidFileArray(fileArr, expectedCount)
        expect(t).toThrow('File array has unexpected amount of files')
    })

    test('isValidFileArray throws error when fs.existsSync returns false', () => {
        fs.existsSync.mockReturnValue(false)
        const fileArr = ['file1.csv', 'file2.csv']
        const expectedCount = 2
        const t = () => isValidFileArray(fileArr, expectedCount)
        expect(t).toThrow('File does not exist')
    })

    test('isValidFileArray throws error when a file is not csv', () => {
        fs.existsSync.mockReturnValue(true)
        const fileArr = ['file1.html', 'file2.csv']
        const expectedCount = 2
        const t = () => isValidFileArray(fileArr, expectedCount)
        expect(t).toThrow('File is not a CSV')
    })
    test('isValidFileArray throws error when file array has file duplicates', () => {
        fs.existsSync.mockReturnValue(true)
        const fileArr = ['file1.csv', 'file1.csv']
        const expectedCount = 2
        const t = () => isValidFileArray(fileArr, expectedCount)
        expect(t).toThrow('File array cannot have duplicate files')
    })

    test('isValidFileArray returns true when file array has valid files and expected count is valid', () => {
        fs.existsSync.mockReturnValue(true)
        const fileArr = ['file1.csv', 'file2.csv']
        const expectedCount = 2
        expect(isValidFileArray(fileArr, expectedCount)).toBe(true)
    })
})