const { mutualCustomers } = require('../mutualCustomers')

const { readCsvFile, validateHeader, rowHasValidFields } = require('../convertCSVdata')


const store1 = './testCSV/TestStore1.csv'
const store2 = './testCSV/TestStore2.csv'
const testHeaderArr = ['first name', 'last Name', 'Age', 'State']
const ageIndex = 2
const totalFiles = 2

describe('mutualCustomers function', () => {
    test('mutualCustomers ', async () => {
        try {
            const result = await mutualCustomers([store1, store2], testHeaderArr, totalFiles, ageIndex).then()

            // Add your assertions to validate the result
            expect(result).toHaveLength(2)
            expect(result[0]["Last Name"]).toEqual('williams')
            expect(result[0]["First Name"]).toEqual('noah')
            expect(result[0].state).toEqual(82)
            expect(result[0].state).toEqual('south carolina')
            // expect(result[1]).toEqual({ "First Name": "olivia", "Last Name": "johnson", "Age": 45, "State": "utah" })
        } catch (error) {
            // Handle any errors that occurred during the function execution
            expect(error).toBeUndefined();
        }

    })



});


