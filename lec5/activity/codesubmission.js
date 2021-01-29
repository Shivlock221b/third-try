let puppeteer = require("puppeteer");
const id = "gaxotab358@chomagor.com";
const pw = "Lifeof@3.141";

let tab;
let idx;
let gCode;

let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewPort: null,
    args: ["--start-fullscreen"]
});

browserOpenPromise.then(function (browser) {
    let pagesPromise = browser.pages();
    return pagesPromise;
})
.then(function(pages){
    let page = pages[0];
    tab = page;
    //tab.setViewport({width: 11920, height: 1080});
    tab.setViewport({width: 1150, height: 580});
    let gotoPromise = page.goto("https://www.hackerrank.com/auth/login");
    return gotoPromise;
})
//.then(function() {
    //console.log("login page");
    //let NameTypedPromise = tab.type("#input-1", "Shivam Tiwari");
    //return NameTypedPromise;
//})
.then(function() {
    let idTypedPromise = tab.type("#input-1", id);
    return idTypedPromise;
})
.then(function() {
    let pwtypedPromise = tab.type("#input-2", pw);
    return pwtypedPromise;
})
.then(function() {
    let presssignupbtn = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return presssignupbtn;
})
.then(function() {
    //console.log("signed in");
    //let waitPromise = tab.waitForSelector("#base-card-1-link");
    let waitAndclickPromise = waitAndClick("#base-card-1-link");
    return waitAndclickPromise;
})
//.then(function() {
    //let ipKitClickedPromise = tab.click("#base-card-1-link");
    //return ipKitClickedPromise;
//})
.then(function() {
    let waitAndclickPromise = waitAndClick("#base-card-1-link");
    return waitAndclickPromise;
})
//.then(function() {
    //let warmupclickPromise = tab.click("#base-card-1-link");
    //return warmupclickPromise;
//})
//.then()
.then(function() {
    let waitPromise = tab.waitForSelector(".js-track-click.challenge-list-item", {visible : true});
    return waitPromise;
})
.then(function() {
    let alltagsPromise = tab.$$(".js-track-click.challenge-list-item");
    //console.log(alltagsPromise);
    return alltagsPromise; // this returns data to the next then function. Remember that some promisified functions may return data to the next then functions and some may not.
    // it depends if there is the formation of some data in the function then there is data returned along with the promise.
    // for such functions we have to receive data the next then function's parameters.
})
.then(function(alltags) {
    //console.log(alltags);
    let alllinksPromise = [];
    for (let i = 0; i < alltags.length; i++) {
        let link = tab.evaluate( elem => elem.getAttribute("href"), alltags[i]);
        alllinksPromise.push(link);
    }

    let pendingAllPromise = Promise.all(alllinksPromise);
    return pendingAllPromise;
})
.then(function(allLinks) { //another example with data from the previous promise.
    let allcompleteLinks = allLinks.map(elem => `https://www.hackerrank.com${elem}`);
    //console.log(allcompleteLinks);
    let solvequestionPromise = solveQuestion(allcompleteLinks[0]);
    for (let i = 1; i < allcompleteLinks.length; i++) {
        solvequestionPromise = solvequestionPromise.then(function() {
            let nextQuestionPromise = solveQuestion(allcompleteLinks[i]);
            return nextQuestionPromise;
        })
    }
    return solvequestionPromise;
})
.then(function() {
    console.log("all questions solved");
})
.catch(function(error) {
    console.log(error);
})


function getCode(){
    return new Promise(function(resolve , reject){
      let waitPromise = tab.waitForSelector('.hackdown-content h3' , {visible:true});
      waitPromise.then(function(){
        let allCodeNamesPromise = tab.$$('.hackdown-content h3');
        return allCodeNamesPromise;
      })
      .then(function(allCodeNamesElements){
        //[ <h3>C++</h3> , <h3>Python</h3> , <h3>Java</h3>  ]
        let allNamesPromise = [];
        for(let i=0 ; i<allCodeNamesElements.length ; i++){
          let namePromise = tab.evaluate( function(element){ return element.textContent;    }   ,   allCodeNamesElements[i] )
          allNamesPromise.push(namePromise);
        }

        let getNamesPromise = Promise.all(allNamesPromise);
        return getNamesPromise;
      })
      .then(function(codeNames){
        // [ "C++" , "Python" , "java"];
        for(let i=0 ; i<codeNames.length ; i++){
          if(codeNames[i] == "C++"){
            idx = i;
            break;
          }
        }
        let allCodesPromise = tab.$$('.hackdown-content .highlight');
        return allCodesPromise;
      })
      .then(function(allCodeDivs){
        //[ <div class="highlight"> </div> , <div class="highlight"> </div> , <div class="highlight"> </div>  ]
        let codeDiv = allCodeDivs[idx];
        let codePromise = tab.evaluate( function(element){ return element.textContent;  }  , codeDiv);
        return codePromise;
      })
      .then(function(code){
        // console.log(code);
        gCode = code;
        //console.log(gCode);
        resolve();
      })
      .catch(function(error){
        reject(error);
      })
    })
  }


// function getCode() {
//     return new Promise(function(resolve, reject) {
//         let waitPromise = tab.waitForSelector(".hackdown-content h3", {visible : true});
//         waitPromise.then(function() {
//             let allCodePromise = tab.$$(".hackdown-content h3");
//             return allCodePromise;
//         })
//         .then(function(allCodeElements) {
//             let allnamesPromises = [];
//             for (let i = 0; i < allCodeElements.length; i++) {
// //                 let name = tab.evaluate(elem => elem.textContent, allCodeElements[i]);
//                 allnamesPromises.push(name);
//             }

//             let pendingAllPromises = Promise.all(allnamesPromises);
//             return pendingAllPromises;
//         })
//         .then(function(allCodeNames) {
//             for (let i = 0; i < allCodeNames; i++) {
//                 if (allCodeNames[i] == "C++") {
//                     idx = i;
//                     break;
//                 }
//             }
//             let allCodesPromise = tab.$$(".hackdown-content .highlight");
//             return allCodesPromise;
//         })
//         .then(function(allCodeDivs){
//             //[ <div class="highlight"> </div> , <div class="highlight"> </div> , <div class="highlight"> </div>  ]
//             let codeDiv = allCodeDivs[idx];
//             let codePromise = tab.evaluate( function(element){ return element.textContent;  }  , codeDiv);
//             return codePromise;
//           })
//         // .then(function(allCodes) {
//         //     let codeDiv = allCodes[idx];
//         //     console.log(codeDiv+"");
//         //     let codeContentPromise = tab.evaluate(function(elem) {return elem.textContent} , codeDiv);
//         //     return codeContentPromise;
//         //     // tab.evaluate returns some data remember so such data has to received in the next then.
//         // })
//         .then(function(code) {
//             gCode = code
//             resolve();
//         })
//         .catch(function(error) {
//             reject(error);
//         });
//     });
// }

function pasteCode() {
    return new Promise(function(resolve, reject) {
        let waitAndClickPromise = waitAndClick(".custom-input-checkbox");
        waitAndClickPromise.then(function() {
            let codeTypePromise = tab.type(".custominput", gCode);
            return codeTypePromise;
        })
// function pasteCode(){
//     return new Promise(function(resolve , reject){
//       let waitAndClickPromise = waitAndClick('.custom-input-checkbox');
//       waitAndClickPromise.then(function(){
//         let codeTypePromise = tab.type(".custominput" , gCode);
//         return codeTypePromise;
//       })
        .then(function() {
            let commandPromise = tab.keyboard.down("Control");
            return commandPromise;
        })
        .then(function() {
            let aKeyPromise = tab.keyboard.press("A");
            return aKeyPromise;
        })
        // .then(function() {
        //     let aKeyPromise = tab.click({clickCount : 4});
        //     return aKeyPromise;
        // })
        .then(function() {
            let xKeyPromise = tab.keyboard.press("X");
            return xKeyPromise;
        })
        .then(function() {
            let clickPromise = tab.$(".monaco-scrollable-element.editor-scrollable.vs");
            return clickPromise;
        })
        .then(function(data) {
            let selectandremovePromise = selectandremove(data);
            return selectandremovePromise; 
            //return clickthrice;
        })
        // .then(function() {
        //     let aKeyPromise = tab.keyboard.press("A");
        //     return aKeyPromise;
        // })
        .then(function() {
            let vKeyPromise = tab.keyboard.press("V");
            return vKeyPromise;
        })
        .then(function() {
            let commandUpPromise = tab.keyboard.up("Control");
            return commandUpPromise;
        })
        .then(function() {
            resolve();
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

function selectandremove(page) {
    return new Promise(function(resolve, reject) {
        let select = page.click({clickCount : 5});
        select.then(function() {
            console.log("called");
            let remove = tab.keyboard.press("Backspace");
            return remove;
        })
        .then(function() {
            resolve();
        })
        .catch(function(error) {
            console.log(error);
            reject(error);
        })
    });
}

function handlelockbtn() {
    return new Promise(function(resolve, reject) {
        let waitPromise = tab.waitForSelector(".editorial-content-locked", {visible : true, timeout : 2000});
        waitPromise.then(function() {
            let clickLockButtonPromise = tab.click(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
            return clickLockButtonPromise;
        })
        .then(function() {
            console.log("Found");
            resolve();
        })
        .catch(function() {
            console.log("Not Found");
            resolve();
        })
    })
}



function solveQuestion(completeLinks) {
    return new Promise(function(resolve, reject) {
        // the above received parameter is link, not an "a tag" or a button so cannot apply click() function
        // will have to use the goto function for going to the link;
        // any click or goto function just promises to click and change the page  it does not guarantee the receiving of the data therefore we have to delay the next function in order to make for the delay in data receiving;
        let gotoQuestionPromise = tab.goto(completeLinks);
        gotoQuestionPromise.then(function() {
            let waitAndClickPromise = waitAndClick("#tab-1-item-4");
            return waitAndClickPromise;
        })
        .then(function() {
            let handlelockbuttonPromise = handlelockbtn();
            return handlelockbuttonPromise;
        })
        .then(function() {
            let getCodePromise = getCode();
            return getCodePromise;
        })
        .then(function() {
            let questionClickedPromise = tab.click('div[data-attr2="Problem"]');
            return questionClickedPromise;
        })
        .then(function() {
            let pasteCodePromise = pasteCode();
            return pasteCodePromise;
        })
        .then(function() {
            let questionSubmitPromise = tab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
            return questionSubmitPromise;
        })
        .then(function() {
            resolve();
        })
        .catch(function(error) {
            reject(error);
        });
    });
}




function waitAndClick(selector) {
    return new Promise(function(resolve, reject) {
        let waitPromise = tab.waitForSelector(selector, {visible : true});
        waitPromise.then(function() {
            let clickPromise = tab.click(selector);
            return clickPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error) {
            reject(error);
        });
    });
}