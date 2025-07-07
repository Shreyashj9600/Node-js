const fs = require('fs')

// how to create a file

//Sync
// fs.writeFileSync("./test.txt", "hey there")

// Async
// fs.writeFile("./test.txt", "hello world !", (err) => {})

// How to read file 
// Sync 
// const result = fs.readFileSync("./contact.txt", "utf8")
// console.log(result);

// Async 
// fs.readFile("./contact.txt", "utf8", (err, result) => {
//     if (err) {
//         console.log("Error");
//     } else {
//         console.log(result);
//     }
// })  


// how to appen data on file 
// fs.appendFileSync('./test.txt', "Hey There\n")

// copy file 
// fs.cpSync('./test.txt', 'copy.txt')

// delete file 
fs.unlinkSync("./copy.txt")