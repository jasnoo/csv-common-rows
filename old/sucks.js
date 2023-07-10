

const fs = require("fs");
const fsp = require('fs/promises');

const { promisify } = require('util')
const readline = require("readline");



const b1 = "Store1b.csv"
const b2 = "Store2b.csv"

let fileSize = 0

async function dothisafter(file) {
    let stat = promisify(fs.stat)
    let result = await stat(file)
        .then(res => {
            fileSize = res.size
            // console.log(fileSize)
            return res.size
        }).catch(err => console.log(err))
    return result
}

let final = dothisafter('jas.csv').then(console.log(fileSize))






