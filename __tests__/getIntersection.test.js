const { createUserObject, reduceUserSets, getIntersectionOfArr } = require('../getIntersection')

const testHeaders = ["First Name", "Last Name", "Age", "State"]
const ageIndex = 2

describe('createUserObject function', () => {

    const testSet = new Set(['Emma, Nguyen,57, Kentucky', 'Noah, Williams,82, South Carolina'])

    test('createUserObject returns expected array of objects with age as a number type when age index is passed', () => {
        const result = createUserObject(testSet, testHeaders, ageIndex)
        expect(result).toHaveLength(2)
        expect(result[0]).toEqual({ 'First Name': 'Emma', 'Last Name': ' Nguyen', Age: 57, State: ' Kentucky' })
        expect(result[1]).toEqual({ 'First Name': 'Noah', 'Last Name': ' Williams', Age: 82, State: ' South Carolina' })
    })
    test('createUserObject returns expected array of objects with no values being number type when no age index is passed', () => {
        const result = createUserObject(testSet, testHeaders)
        expect(result).toHaveLength(2)
        expect(result[0]).toEqual({ 'First Name': 'Emma', 'Last Name': ' Nguyen', Age: '57', State: ' Kentucky' })
        expect(result[1]).toEqual({ 'First Name': 'Noah', 'Last Name': ' Williams', Age: '82', State: ' South Carolina' })
    })
    test('createUserObject returns empty array when set is empty', () => {
        const emptySet = new Set()
        expect(createUserObject(emptySet, testHeaders, ageIndex)).toEqual([])
    })
    test('createUserObject returns false if userSet is not a Set', () => {
        const userArr = ['Emma, Nguyen,57, Kentucky', 'Noah, Williams,82, South Carolina']
        const t = () => createUserObject(userArr, testHeaders, ageIndex)
        expect(t).toThrow(`User set should be a set`)
    })
    test('createUserObject returns false if header array is not an array ', () => {
        const stringHeader = 'First Name,Last Name,Age,State'
        const t = () => createUserObject(testSet, stringHeader, ageIndex)
        expect(t).toThrow(`Header array should be an array`)
    })

});

describe('reduceUserSets function', () => {

    const testSet1 = new Set(['Emma, Nguyen,57, Kentucky', 'Noah, Williams,82, South Carolina'])
    const testSet2 = new Set(['Noah, Williams,82, South Carolina'])

    test('reduceUserSets returns expected array of objects with age as a number type when age index is passed', () => {
        const testSetArr = [testSet1, testSet2]
        const result = reduceUserSets(testSetArr)
        expect(result.size).toBe(1)
        expect(result.has('Noah, Williams,82, South Carolina')).toBe(true)
        expect(result.has('Emma, Nguyen,57, Kentucky')).toBe(false)
    })
    test('reduceUserSets returns set with same values if only one set is passed', () => {
        const testSetArr = [testSet2]
        const result = reduceUserSets(testSetArr)
        expect(result.size).toBe(1)
        expect(result.has('Noah, Williams,82, South Carolina')).toBe(true)
    })
    test('reduceUserSets throws an error when input is not an array ', () => {
        const t = () => (reduceUserSets(testSet1, testSet2))
        expect(t).toThrow('arrayOfUserSets should be an array')
    })
});


describe('getIntersectionOfArr function', () => {

    const store1 = './testCSV/TestStore1.csv'
    const store2 = './testCSV/TestStore2.csv'

    test('getIntersectionOfArr correctly retuns intersection', async () => {
        const result = await getIntersectionOfArr([store1, store2], testHeaders, ageIndex)
        expect(result).toHaveLength(2)
        expect(result[0]).toEqual({ "First Name": "noah", "Last Name": "williams", "Age": 82, "State": "south carolina" })
        expect(result[1]).toEqual({ "First Name": "olivia", "Last Name": "johnson", "Age": 45, "State": "utah" })
    })

});
