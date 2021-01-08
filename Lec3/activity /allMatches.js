const request = require("request");
const cheerio = require("cheerio");
const getMatch = require("./match");

function getALlMatches(link) {
    request(link, cb);
}

function cb(error, response, data) {
    if (error == null) {
        parseData(data);
    } else if (reasponse.statusCode == 404) {
        console.log("Page not found");
    } else {
        console.log(error);
    }
}

function parseData(data) {
    let ch = cheerio.load(data);
    let alltags = ch('a[data-hover = "Scorecard"]');
    //for (let i = 0; i < alltags.length; i++) {
        let link = ch(alltags[0]).attr("href");
        let completeLink = `https://www.espncricinfo.com${link}`;
        getMatch(completeLink);
    //}
}

module.exports = getALlMatches;