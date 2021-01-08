const request = require("request");
const cheerio = require("cheerio");
let link = "https://www.leetcode.com/tag/array"

function gettopic(link) {
    //console.log(link);
    request(link, cb);
}
gettopic(link);

function cb(error, response, data) {
    //console.log(data+ "");
    if (error == null) {
        parseData(data);
    } else if (response.statusCode == 404) {
        console.log("Page not found");
    } else {
        console.log(error);
    }
}

function parseData(data) {
 let ch = cheerio.load(data);
 //console.log(ch);
 //let str = ch.html();
 //console.log(str);
 //let table = ch(".col-md-offset-1.col-md-10");
 //let allquestions = ch(table).find(".table-responsive tbody tr");
 //console.log(allquestions.length);
 //console.log(table+"");
 //let trial = ch("thead");
 //console.log(trial.length);

 let list = ch("h3").text().trim();
 console.log(list);
}

//export default gettopic;