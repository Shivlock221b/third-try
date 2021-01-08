const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Leader Board');

let leaderBoard = [];
let count = 1;
function getMatch(link) {
    console.log("Sending request", count);
    request(link, cb);
    count++
}

function cb(error , response, data) {
    count--;
    console.log("Received Data", count);
    if (error == null) {
        parseData(data);
    } else if(response.statusCode == 404) {
        console.log("Page not found");
    } else {
        console.log(error);
    }

    if (count == 1) {
        const heading = ["Team", "Batsman", "Runs", "Balls", "Fours", "Sixes", "Strike Rate"];
        let index = 1;
        heading.forEach(Column => {ws.cell(1, index++).string(Column)});
        
        let rowIndex = 2;
        leaderBoard.forEach( record => {
            let colunIndex = 1; 
            Object.keys(record).forEach(Column =>{ ws.cell(rowIndex, colunIndex++).string(`${record[Column]}`)});
            rowIndex++;
        });

            wb.write("./IPL/Leaderboard.xlsx");
            //console.table(leaderBoard);
            //for (let i = 0; i < leaderBoard.length; i++) {
                //console.log(leaderBoard[i]);
            //}
    }
}

function parseData(data) {
    let ch = cheerio.load(data);
    console.log(ch);
    let bothInnings = ch('.card.content-block.match-scorecard-table .Collapsible');
    //let innings = ch('.match-scorecard-page.__web-inspector-hide-shortcut__ .Collapsible');
    //let link = ch(innings).find("h5");
    //console.log(link);

    for (let i = 0; i < bothInnings.length; i++) {
        let teamName = ch(bothInnings[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        //console.log(teamName);
        let allRows = ch(bothInnings[i]).find(".table.batsman tbody tr");
        for (let j = 0; j < allRows.length - 1; j++) {
            let allCols = ch(allRows[j]).find("td");

            if (allCols.length > 1) {
                let batsmanName = ch(allCols[0]).find("a").text().trim();
                let runs = ch(allCols[2]).text().trim();
                let balls = ch(allCols[3]).text().trim();
                let fours = ch(allCols[5]).text().trim();
                let sixes = ch(allCols[6]).text().trim();
                let sr = ch(allCols[7]).text().trim();

                //processDetails(teamName, batsmanName, runs, balls, fours, sixes, sr);
                //processLeaderBoard(teamName, batsmanName, runs, balls, fours, sixes, sr);
                //processLeaderboard(teamName , batsmanName , runs , balls , fours , sixes);
            }
        }
    }
}

function processLeaderboard(teamName , batsmanName , runs , balls , fours , sixes){
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);
    //console.log(runs);

    // loop on leaderboard and check if entry exists
    for(let i=0 ; i<leaderBoard.length ; i++){
        let inning = leaderBoard[i];
        if(inning.Team == teamName && inning.Batsman == batsmanName){
            inning.Runs += runs;
            inning.Balls += balls;
            inning.Fours += fours;
            inning.Sixes += sixes;
            return;
        }
    }

    // add new object/inning
    let inning = {
        Team : teamName,
        Batsman : batsmanName ,
        Runs : runs ,
        Balls : balls ,
        Fours : fours ,
        Sixes : sixes
    }
    leaderBoard.push(inning);
}

function processLeaderBoard(teamName, batsmanName, runs, balls, fours, sixes, sr) {
    let Runs = Number(runs);
    let Balls = Number(balls);
    let Fours = Number(fours);
    let Sixes = Number(sixes);
    let SR = Number(sr);

    for (let i = 0; i < leaderBoard.length; i++) {
        let innings = leaderBoard[i];
        if (innings.Team == teamName && innings.Batsman == batsmanName) {
           innings.Runs += Runs;
            innings.Balls += Balls;
            innings.Fours += Fours;
            innings.Sixes += Sixes;
            innings.SR += SR;
            return ;
        }
    }

    let innings = {
        Team : teamName,
        Batsman : batsmanName,
        Runs : Runs,
        Balls : Balls,
        Fours : Fours,
        Sixes : Sixes,
        SR : SR
    }
    //console.log(innings.Team);
    leaderBoard.push(innings);
}

function checkTeamFolder(teamName) {
    let folderPath = `./IPL/${teamName}`;
    return fs.existsSync(folderPath);
}

function checkBatsmanFolder(teamName, batsmanName) {
    let filePath = `./IPL/${teamName}/${batsmanName}.xlsx`;
    return fs.existsSync(filePath);
}

function createTeamName(teamName) {
   let folderPath = `./IPL/${teamName}`;
   fs.mkdirSync(folderPath); 
}

function createBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, sr) {
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.xlsx`;
    let batsmanFile = [];
    let innings = {
        "Runs" : runs,
        "Balls" : balls,
        "Fours" : fours,
        "Sixes" : sixes,
        "SR" : sr
    }
    batsmanFile.push(innings);
    fs.writeFileSync(batsmanPath, JSON.stringify(batsmanFile));
}

function updateBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, sr) {
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.xlsx`;
    let batsmanFile = fs.readFileSync(batsmanPath);
    batsmanFile = JSON.parse(batsmanFile);
    let innings = {
        "Runs" : runs,
        "Balls" : balls,
        "Fours" : fours,
        "Sixes" : sixes,
        "SR" : sr
    }
    batsmanFile.push(innings);
    fs.writeFileSync(batsmanPath, JSON.stringify(batsmanFile));
}

function processDetails(teamName, batsManName, runs, balls, fours, sixes, sr) {
    let isteamFolder = checkTeamFolder(teamName);

    if (isteamFolder) {
        let isBatsmanFolder = checkBatsmanFolder(batsManName);
        if (isBatsmanFolder) {
            updateBatsmanfile(teamName, batsManName, runs, balls, fours, sixes, sr);
        } else {
            createBatsmanFile(teamName, batsManName, runs, balls, fours, sixes, sr);
        }
    } else {
        createTeamFolder(teamName);
        createBatsmanFile(teamName, batsManName, runs, balls, fours, sixes, sr);
    }
}

module.exports = getMatch;

//#main-container > div > div.container > div.row > div.col-16.col-md-16.col-lg-12.main-content-x > div.match-body > div.match-scorecard-page.__web-inspector-hide-shortcut__