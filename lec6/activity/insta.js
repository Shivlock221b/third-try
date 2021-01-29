const puppeteer = require("puppeteer");
const challenges = require("./challenges");
const id = "shivamtiwari221b";
const pw = "Welcome321@";

(async function() {
    try {
        let browser = await puppeteer.launch({
            headless : false,
            defaultViewport : null,
            args : ["--start-fullscreen"]
        });
        let pages = await browser.pages();
        let tab = pages[0];
        await tab.goto("https://www.instagram.com/");
        await tab.waitForSelector('input[aria-label = "Phone number, username, or email"]', {visible : true});
        await tab.type('input[aria-label = "Phone number, username, or email"]', id);
        await tab.type('input[aria-label = "Password"]', pw);
        await tab.click(".sqdOP.L3NKy.y3zKF");
        await tab.waitForNavigation("networkidle2");
        await tab.waitForSelector(".XTCLo.x3qfX");
        await tab.type(".XTCLo.x3qfX", "pepcoding");
        await tab.waitForNavigation("networkidle2");
        await tab.waitForSelector(".fuqBx", {visible : true});
        //await tab.waitForNavigation("networkidle2");
        let allsearch = await tab.$$(".fuqBx a");
        //console.log(allsearch);
        let link = await tab.evaluate(elem => elem.getAttribute("href"), allsearch[0]);
        let completeLink = `https://www.instagram.com${link}`;
        //console.log(completeLink);
        await tab.goto(completeLink);
        await tab.waitForSelector("._2z6nI");
        await tab.click('.KL4Bh img[alt = "Photo by PepCoding on January 08, 2021. Image may contain: text."]');
        // await tab.waitForSelector(".fr66n");
        // let add = await tab.$(".fr66n svg");
        // let label = await tab.evaluate(elem => elem.getAttribute("aria-label"), add); 
        //add = await tab.$("")
        //await tab.waitForSelector("._2dDPU.CkGkG");
        //await tab.click(" ._65Bje.coreSpriteRightPaginationArrow");
        let selector = "._65Bje.coreSpriteRightPaginationArrow";
        //await likeAll(selector, tab);
        console.log("ALl liked");
        // if (label == "Like") {
        //     await tab.click(".fr66n .wpO6b");
        // }
        // await tab.waitForSelector("._2dDPU.CkGkG");
        // await tab.click(" ._65Bje.coreSpriteRightPaginationArrow");
    }
    catch(error) {
        console.log(error);
    }
})();

async function likeAll(selector, tab) {
    try {
    await tab.waitForSelector(".fr66n");
    let add = await tab.$(".fr66n svg");
    let label = await tab.evaluate(elem => elem.getAttribute("aria-label"), add);
    if (label == "Like") {
        await tab.click(".fr66n .wpO6b");
    }
    await tab.waitForSelector(selector);
    await tab.click(selector);
    likeAll(selector, tab)
    }
    catch (error) {
        console.log(error);
        return;
    }
}