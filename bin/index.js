#!/usr/bin/env node
const app = require('../app/app')
const yargs = require("yargs");

const options = yargs
 .usage("Usage: -posts <posts>")
 .option("posts", { alias: "posts", describe: "Enter amout of posts you wish to get", type: "number", demandOption: true })
 .argv;


const quantity = options.posts

if(!Number.isInteger(quantity)){
    return console.log('Error, not a number! Try Again!')
}
else if(quantity > 100){
    return console.log('The value is bigger than 100')
}
else if(quantity <= 0){
    return console.log('The value not greater than 0')
}
else{
    app.app(quantity) // this will run App function in app file
}


// {
//     // TrueLayer / Hackernews
//     "title": "title",
//     "uri": "url",
//     "author": "by",
//     "comments": 'descendants',
//     "points": 'score',
//     "rank": 'index', (index of top stories)
// }


// {
//     // TrueLayer / Validations
//     "title": String,
//     "uri": URL,
//     "author": String,
//     "comments": integer >=0,
//     "points": integer >=0,
//     "rank": integer >=0, (Index of top stories)
// }