const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
//const gettopic = require("./questions");

request("https://leetcode.com/problemset/all/", cb);

function cb(error, response, data) {
    if (error == null) {
        parseData(data);
    } else if(response.statusCode == 404) {
        console.log("Page not found");
    } else {
        console.log("error");
    }
}

function parseData(data) {
    
    let ch = cheerio.load(data);
    
    let alltopics = ch("#current-topic-tags a");
    for (let i = 0; i < alltopics.length; i++) {
        
        let text = ch(alltopics[i]).text().trim();
        if (!fs.existsSync(`./${text}`)) {
        fs.mkdirSync(`./${text}`);
    }
        let link = ch(alltopics[i]).attr("href");
        let completeLink = `https://www.leetcode.com${link}`;
        console.log(completeLink);
        //console.log(completeLink);
        //gettopic(completeLink);
    }

}


      
        
      