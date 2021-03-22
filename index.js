async function MELONsquad(){
    navBar();
    console.log(window.location.href);
    //setting pos to a number so high it won't be reached
    pos = 500
    pos = window.location.href.indexOf("#")
    pos2 = window.location.href.lastIndexOf("#");
    /*for(c in window.location.href){
        if(window.location.href[c] == '#' && c < pos){
            console.log(c);
            pos = c;
            break;
        }

    }*/

    console.log(pos);
    if(pos == pos2) {
        ending = window.location.href.substring(pos);
        ChoosePage(ending);
    }
    else{
        ending = window.location.href.substring(pos,pos2);
        await ChoosePage(ending);

        anchor = window.location.href.substring(pos2 + 1).toLowerCase();
        console.log("second: " + anchor);
        scrollSmoothTo(anchor);

    }
    console.log("ending: " + ending);
    
    

}

function scrollSmoothTo(elementId) {
    var element = document.getElementById(elementId);
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }

async function ChoosePage(ending){
    switch(ending.toLowerCase()){
        case "#about":
            About()
            break;
        case "#team":
            await TeamMembers();
            break;
        case "#squad":
            await TeamMembers();
            break;
        case "#gang":
            await TeamMembers();
            break;
        case "#history":
            await History();
            break;
        case "#art":
            await Art();
            break;
        case "#recipes":
            await Recipes();
            break;
        case "#join":
            JoinSquad();
            break;
        case "#join-us":
            JoinSquad();
            break;
        default:    
            MELON();
            break;
    }
}

async function navBar(){
    navList = document.getElementById('list');
    //console.log("list");
    const response = await fetch("JSON/navbar.json")
    .then(response => response.json());
    json = response;
    //console.log(json);


    for(link in json){
        //console.log(link)
        navList.innerHTML += `<a href="#${json[link].link}"><li onclick="${json[link].onclick}">${json[link].text}</li></a>`
    }
}

function MELON(){
    section.innerHTML = `
    <h1 id="sectionHeading">MELONsquad</h1>
    <h1>🍉🦈</h1>
    <img src="Assets/BLAHAJ.gif" id="blahaj">
    `
}

function About(){
    section.innerHTML = "<h1 id=\"sectionHeading\">About - Coming soon...</h1>"
}

async function TeamMembers(){
    section.innerHTML = "<h1 id=\"sectionHeading\">The Squad</h1>"
    team = await AddImageBoxes("Team", "team");
    section.innerHTML += team;
}

async function History(){
    section.innerHTML = `
        <h1 id="sectionHeading">History</h1>
        <h2>It's time to make history by winning Local Hack Day: Share together!</h2>
        
        <h2>Find below some of the historical hackathon prizes our MELONsquad members have won... this is why we will be the best squad at LHD: Share!</h2>
        `
    hHistory = await HackathonHistory();
    section.innerHTML += hHistory;
}

async function Art(){
    section.innerHTML = "<h1 id=\"sectionHeading\">Art</h1>"
    art = await AddImageBoxes("Art", "art", true);
    section.innerHTML += art;
}

async function Recipes(){
    section.innerHTML = "<h1 id=\"sectionHeading\">Recipes</h1>"
    const response = await fetch("JSON/recipes.json")
    .then(response => response.json());
    json = response
    console.log(json.mlb.name);
    recipeString = "<ol>"
    for(s in json.mlb.steps){
        console.log(json.mlb.steps[s]);
        recipeString += "<li>"
        recipeString += json.mlb.steps[s];
        recipeString += "</li>"
    }
    recipeString += "</ol>"
    section.innerHTML += recipeString;
}

function JoinSquad(){
    section.innerHTML = `
    <h1 id="sectionHeading">Join us!</h1>
    <div>
        <h2>Instructions</h2>
        <ol>
            <li>Visit <a href="https://discord.mlh.io" target="_blank">discord.mlh.io</a>
            <li>Click Sign in with Discord</li>
            <li>Log in</li>
            <li>Click Edit Profile</li>
            <li>Scroll to Guild Membership</li>
            <li>Select guild BLAHAJGang</li>
            <li>Visit the BLAHAJgang Discord Channel</li>
            <li>Add the melon and shark emoji to your nickname (🍉🦈)</li>
            <li>Optional - ask to be added to the <a href="#squad" target="_blank">website</a></li>
        </ol>
    </div>
    `;
}

async function AddImageBoxes(imageDirectory, jsonFile, link = false){
    const response = await fetch("JSON/" + jsonFile + '.json')
    .then(response => response.json());
    json = response
    team = "";
    for(user in json){
        if(!Array.isArray(json[user].image)){
            imageurl = json[user].image;
        } else {
            //console.log(json[user].image.length);
            imgNum = Math.floor(Math.random() * (json[user].image.length));
            console.log(imgNum);
            imageurl = json[user].image[imgNum];
        }
        team += AddImageBox(imageDirectory + "/" + imageurl, json[user].name, json[user].caption, user, link);
    }

    return team;
}

function AddImageBox(imageSrc, title, caption, link){
    box = "";
    if(link){
        box += `<a id="noformat" href="Assets/${imageSrc}" target="_blank">`
    }
    box += `
        <div class="wideBox" id="${user}">
            <div id="boxImg">
                <img src="Assets/${imageSrc}">
            </div>
            <p id="title">${title}</p>
            <p id="caption">${caption}</p>
        </div>
    `
    if(link){
        box += `</a>`
    }

    return box;
}

async function HackathonHistory(){
    const response = await fetch("JSON/wins.json")
    .then(response => response.json());
    json = response;
    
    historystring = "";

    for(hacker in json){
        //console.log(json[hacker]);
        //console.log(json[hacker].hackathons[0].name);
        historystring += `
            <div id="historyOuter">
                <h2>${json[hacker].name}</h2>
            `
            for(hackathon in json[hacker].hackathons){
                historystring += `<a href="${json[hacker].hackathons[hackathon].link}" target="_blank" id="noformat">`;
                historystring += AddImageBox("Hackathons/" + json[hacker].hackathons[hackathon].name + ".png", json[hacker].hackathons[hackathon].name, json[hacker].hackathons[hackathon].prize);
                historystring += `</a>`;
            }
            
        historystring += `</div>`;
        //console.log(historystring);
    }
    //console.log(historystring);
    return historystring;
}