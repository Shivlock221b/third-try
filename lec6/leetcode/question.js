// const puppeteer = require("puppeteer");


// async function getQuestions(completeLink, tab) {
//     await tab.click(completeLink);
//     await tab.waitForNavigation("networkidle2");
//     let onePage = [];
//     await tab.waitForSelector("reactable-data");
//     let allrows = await tab.$$("reactable-data tr");
//     let titleTab = await tab.$(".header__2ZIe h3");
//     let title = await tab.evaluate(elem => elem.textContent, titleTab);
//     for (let i = 0; i < allrows.length; i++) {
//         let row = allrows[i];
//         let index = await tab.evaluate(elem => elem.textContent, row[1]);
//         let name = await tab.evaluate(elem => elem.textContent, row[2]);
//         let link = await tab.evaluate(elem => elem.getAttribute("href"), row[2]);
//         let acceptance = await tab.evaluate(elem => elem.textContent, row[3]);
//         let difficulty = await tab.evaluate(elem => elem.textContent, row[4]);
//         console.log(name);
//         let oneQuestion = {
//             Title : title,
//             Index : index,
//             Name : name,
//             Link : link,
//             Acceptance : acceptance,
//             Difficulty : difficulty
//         };
//     onePage.push(oneQuestion);
//     }
//     return onePage;
// }

// module.exports = getQuestions;