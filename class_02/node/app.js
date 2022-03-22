const { readFileSync, writeFileSync } = require('fs')

const first = readFileSync('./content/home-work.txt', 'utf8')
const second = readFileSync('./content/second.txt', 'utf8')

console.log(first, second)

writeFileSync(
    './content/result-sync.txt',
 `here is the result ${first}, ${second}`
 )
 console.log("FINISHED!");