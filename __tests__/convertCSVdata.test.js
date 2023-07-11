const { readCsvFile, headers, headerLength, indexOfAge, validateHeader, rowHasValidFields } = require('../convertCSVdata')


// describe('splitRowString function', () => {

//     test('splitRowString splits string into array on each comma', () => {
//         const rowString = 'First Name,Last Name,Age,State'
//         const result = splitRowString(rowString)
//         expect(result[0]).toEqual('First Name')
//         expect(result[1]).toEqual('Last Name')
//         expect(result[2]).toEqual('Age')
//         expect(result[3]).toEqual('State')
//     })
//     test('splitRowString returns false if rowString is not a string', () => {
//         expect(splitRowString()).toBe(false)
//         expect(splitRowString(1)).toBe(false)
//     })


// });


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


// readCsvFile




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