
// these are higher rder functions which can be used by calling the assigned variables.-> request and cheerio
const request = require("request");
const cheerio = require("cheerio");
const getAllMatches = require("./allMatches");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595", callBack);

function callBack(error, response, data) {
    if(error == null) {
        parseData(data);
    } else if (response.statusCode == 404) {
        console.log("Page not found");
    } else {
        console.log(error);
    }
}

function parseData(data) {
    let ch = cheerio.load(data);
    //let link = ch(".jsx-850418440.nav-item a");
    //let link1 = ch(link)[1];
    //let link3 = ch(link1).attr("href");
    let link = ch('a[data-hover = "Fixtures and Results"]').attr("href");
    let completeLink = `https://www.espncricinfo.com${link}`;
    //console.log(completeLink);
    getAllMatches(completeLink);

    // anything within a tag can be put is square paranthesis to access it 
    // eg link = ch('a[data-hover = "FIxtures and results"]');
}
