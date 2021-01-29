const puppeteer = require("puppeteer");
const fs = require("fs");
//const getQuestions = require("./question");

(async function() {
   let browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        args : ["--start-fulscreen"]
    });

    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://leetcode.com/problemset/all/");
    //await tab.waitForNavigation("networkidle2");
    await tab.waitForSelector("#current-topic-tags");
        //let link = await tab.evaluate(elem => elem.getAttribute("href"),) 
    await makeFolders(tab);
        //console.log(topic);
    let atags = await tab.$$("#current-topic-tags a");
    for (let i = 0; i < atags.length; i++) {
    let link = await tab.evaluate(elem => elem.getAttribute("href"), atags[i]);
    let completeLink = `https://leetcode.com${link}`;
    //console.log(completeLink);
    let onePage = await getQuestions(completeLink, tab);
    
    }
})();

async function getQuestions(completeLink, tab) {
    await tab.goto(completeLink);
    //await tab.waitForNavigation("networkidle2"); Never put waitForNavigation after goto function 
    let onePage = [];
    await tab.waitForSelector(".reactable-data");
    let allrows = await tab.$$(".reactable-data tr");
    let titleTab = await tab.$(".header__2ZIe h3");
    let title = await tab.evaluate(elem => elem.textContent, titleTab);
    for (let i = 0; i < allrows.length; i++) {
        let row = allrows[i];
        let index = await tab.evaluate(elem => elem.textContent, row[1]);
        let name = await tab.evaluate(elem => elem.textContent, row[2]);
        let link = await tab.evaluate(elem => elem.getAttribute("href"), row[2]);
        let acceptance = await tab.evaluate(elem => elem.textContent, row[3]);
        let difficulty = await tab.evaluate(elem => elem.textContent, row[4]);
        console.log(name);
        let oneQuestion = {
            Title : title,
            Index : index,
            Name : name,
            Link : link,
            Acceptance : acceptance,
            Difficulty : difficulty
        };
    onePage.push(oneQuestion);
    }
    return onePage;
}

async function makeFolders(tab) {
    let alltopics = await tab.$$("#current-topic-tags .text-sm.text-gray");
    for (let i = 0; i < alltopics.length; i++) {
        let text = await tab.evaluate(elem => elem.textContent, alltopics[i]);
        let topic = text.trim();
        if (!fs.existsSync(`./${topic}`)) {
            fs.mkdirSync(`./${topic}`);
        }
    }
}