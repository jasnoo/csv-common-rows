const fs = require('fs')

var path = require('path')

const b1 = "/Users/jasnoo/Desktop/TestAutomationProj/Store1b.csv"

console.log(path.extname('testing.html') === '.csv')


// async function exists(path) {
//     console.log(path)
//     try {
//         await fs.access(path);
//         // The check succeeded
//     } catch (error) {
//         // The check failed
//     }
// }



// const b2 = "Store2b.csv"
//     // Example:

//     // true

//     (async () => {
//         let answer = exists(b1)
//         console.log("this is my answer:", answer)

//         // console.log('intersectionOfUsers:', intersectionOfUsers)
//     })();
