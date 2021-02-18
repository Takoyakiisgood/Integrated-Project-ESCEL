$(document).ready(function () {

const APIKEY = "601134271346a1524ff12e92"
$("#signup-success-msg").hide();
$("#login-success-msg").hide();
$("#login-error-msg").hide();
$("#cat-animation").hide()
$("#bear-animation").hide()
$("#gamepage").hide()
$("#losing").hide()
$("#congratulations").hide()
$("#logout-Btncont").hide()
$("#inventory-page").hide()

//start of leaderboard functions
if ($(document.body).attr('id') == "leaderboard-docu") {
  disLeaderboard();
  var t = $('#table_id').DataTable({
  "info": false,
  "searching": false,
  "paging": false,
  "order": [[2, "desc"]]
});
}

$("#groweggBtn").on("click", function (e) {
  let growing = localStorage.getItem("growing");
  let eggcount = Number(localStorage.getItem("eggs"));
  if (eggcount > 0) {
  if (growing == "false") {
    growing = true;
    neweggcount = eggcount - 1;
    localStorage.setItem('growing',`${growing}`);
    localStorage.setItem('eggs',`${neweggcount}`);
    alert("Egg has been placed into the incubator!");
    updateInfo();
    dispInfo();
  } else {
    alert("There is already an egg in the incubator!");
  }
}
});

function disLeaderboard() {
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://esandcelgenerator-2966.restdb.io/rest/user-info",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    },
    "beforeSend": function(){
      $("#bear-animation").show();
      $("#leaderboard-page").hide();
    },
      "success": function() {
      $("#bear-animation").hide();
      $("#leaderboard-page").show();
 
  }
  }
  
  $.ajax(settings).done(function (response) {
    //console.log(response);
    
    for (i = 0; i < response.length; i++) {
    let content = []
     content.push(response[i].username);
     content.push(response[i].level);
     content.push(response[i].defeatedmonsters);
     content.push(response[i].fullyevolvedpets);
     t.row.add(content).draw( false );
    }
    
  });
}
//end of leaderboard functions


if ($("#startscreen").attr("id") == "startscreen") {
  var inGame = false; //if game ongoing keydown enter disabled
} else {
  var inGame = true;
}

//if logged in login nav would be disabled and home page info would be displayed
if (localStorage.getItem("username")) {
  $("#loginNav a").addClass('disabled');
  dispInfo();
  $("#logout-Btncont").show();
  $("#inventory-page").show();
}

//start of log out function
$("#logout-Btn").on("click", function (e) {
  e.preventDefault();
  updateInfo();
  localStorage.clear();
  document.location.href = "../index.html";
}); //end of log out function

//start of update user info
function updateInfo() {
  let username = localStorage.getItem("username");
  let dataid = localStorage.getItem("_id");
  let updateurl = `https://esandcelgenerator-2966.restdb.io/rest/user-info/${dataid}`;

  let level = localStorage.getItem("level");
  let monstdef = localStorage.getItem("monstdef");
  let petevolve = localStorage.getItem("petevolve");
  let pfp = localStorage.getItem("pfp");
  let regdate = localStorage.getItem("regdate");
  
  let eggs = localStorage.getItem("eggs");
  let eggexp = localStorage.getItem("eggexp");
  let eggexpmax = localStorage.getItem("eggexpmax");
  let eggevolvestate = `${eggexp},${eggexpmax}`

  let expgained = localStorage.getItem("expgained");
  let expmax = localStorage.getItem("expmax");
  let exp = `${expgained},${expmax}`

  let pets = localStorage.getItem("pets");
  let growing = localStorage.getItem("growing");
  let fastestwpm = localStorage.getItem("fastestwpm");

  let jsondata = {
    "username": username,
    "level": level,
    "regdate": regdate,
    "fullyevolvedpets": petevolve,
    "defeatedmonsters": monstdef,
    "profilepicture": pfp,
    "exp": exp,
    "pets": pets,
    "eggs": eggs,
    "eggevolvestate": eggevolvestate,
    "growing": growing,
    "wpm": fastestwpm
  };

  let settings = {
    "url": updateurl,
    "method": "PUT",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    },
    "data": JSON.stringify(jsondata)
  }
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}

//start of assign player info to new players
function newInfo() {

  //assign new player info
  let today = new Date();

  let regdate = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
  let level = 1;
  let monstdef = 0;
  let petevolve = 0;
  let username = localStorage.getItem("username");
  let pfp = "../images/cat-pfp.png";
  let exp = "0,15";
  let pets = "";
  let eggs = 0;
  let eggevolvestate = "0,25";
  let growing = "false";
  let fastestwpm = "";

  let jsondata = {
    "username": username,
    "level": level,
    "regdate": regdate,
    "fullyevolvedpets": petevolve,
    "defeatedmonsters": monstdef,
    "profilepicture": pfp,
    "exp": exp,
    "pets": pets,
    "eggs": eggs,
    "eggevolvestate": eggevolvestate,
    "growing": growing,
    "wpm": fastestwpm
  };

  let settings = {
    "url": "https://esandcelgenerator-2966.restdb.io/rest/user-info",
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    },
    "data": JSON.stringify(jsondata)
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
} //end of assign player info to new players

//start of display player info
function dispInfo() {
  let username = localStorage.getItem("username");
  let level = localStorage.getItem("level");
  let monstdef = localStorage.getItem("monstdef");
  let petevolve = localStorage.getItem("petevolve");
  let pfp = localStorage.getItem("pfp");
  let regdate = localStorage.getItem("regdate");
  let expgained = localStorage.getItem("expgained");
  let expmax = localStorage.getItem("expmax");
  let eggcount = localStorage.getItem("eggs");
  let pets = localStorage.getItem("pets");
  let eggexpgained = localStorage.getItem("eggexp");
  let eggexpmax = localStorage.getItem("eggexpmax");
  let growing = localStorage.getItem("growing");
  let fastestwpm = localStorage.getItem("fastestwpm");

  //for exp bar
  perc  = ((expgained / expmax).toFixed(2)) * 923

  //for egg exp bar
  eggperc  = ((eggexpgained / eggexpmax).toFixed(2)) * 111

  $("#username").html(`${username}`);
  $("#levelinfo").html(`${level}`);
  $("#monstdefinfo").html(`${monstdef}`);
  $("#petevolveinfo").html(`${petevolve}`);
  $("#pfp").attr("src", `${pfp}`);
  $("#regdate").html(`${regdate}`);
  $("#expgained").html(`${expgained}`);
  $("#expmax").html(`${expmax}`);
  $("#explevel").css("width", `${perc}px`);
  $("#eggexplevel").css("width", `${eggperc}px`);
  $("#eggexpgained").html(`${eggexpgained}`);
  $("#eggexpmax").html(`${eggexpmax}`);
  $("#eggcount").html(`${eggcount}`);

  let pet3d = ""
  if (pets != "") {
    petsarray = pets.split(',');
    for (i = 0; i < petsarray.length; i++) {
      if (petsarray[i] == "cat") {
        pet3d = `<div class="sketchfab-embed-wrapper col-3 text-center p-3 m-4">
        <iframe title="Robot Cat Pet" width="250" height="200" src="https://sketchfab.com/models/aac4efcdde574648be6730554146eadb/embed">
        </iframe>
       <p style="font-size: 13px; font-weight: normal; margin: 5px; color: ;">
            <a href="https://sketchfab.com/3d-models/robot-cat-pet-aac4efcdde574648be6730554146eadb" target="_blank" style="font-weight: bold; color: ;">Robot Cat Pet</a>
            by <a href="https://sketchfab.com/astheho" target="_blank" style="font-weight: bold; color: #1CAAD9;">astheho</a>
            on <a href="https://sketchfab.com?utm_medium=embed&utm_source=website&utm_campaign=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">Sketchfab</a>
        </p>
    </div>`
      $("#inventory").append(`${pet3d}`);
      } else if (petsarray[i] == "bear") {
        pet3d = `<div class="sketchfab-embed-wrapper col-3 text-center p-3 m-4">
        <iframe title="Bear Monster Sketchfab Export" width="250" height="200" src="https://sketchfab.com/models/a7b98d82fc26444ba0bf3aabf7f5d429/embed">
        </iframe>
       <p style="font-size: 13px; font-weight: normal; margin: 5px; color: ;">
            <a href="https://sketchfab.com/3d-models/bear-monster-sketchfab-export-a7b98d82fc26444ba0bf3aabf7f5d429" target="_blank" style="font-weight: bold; color: ;">Bear Monster Sketchfab Export</a>
            by <a href="https://sketchfab.com/Takoyakiisgoodd" target="_blank" style="font-weight: bold; color: #1CAAD9;">Takoyakiisgoodd</a>
            on <a href="https://sketchfab.com?utm_medium=embed&utm_source=website&utm_campaign=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">Sketchfab</a>
        </p>
    </div>`
    $("#inventory").append(`${pet3d}`);
      }
    }
  } 
}
//end of display player info

//start of getting player info
function getInfo() {
  let username = localStorage.getItem("username");
  let updateurl = `https://esandcelgenerator-2966.restdb.io/rest/user-info?q={\"username\": \"${username}\"}`;
  
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": updateurl,
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    localStorage.setItem('_id', `${response[0]._id}`)
    localStorage.setItem('level', `${response[0].level}`)
    localStorage.setItem('monstdef', `${response[0].defeatedmonsters}`)
    localStorage.setItem('petevolve', `${response[0].fullyevolvedpets}`)
    localStorage.setItem('pfp', `${response[0].profilepicture}`)
    localStorage.setItem('regdate', `${response[0].regdate}`)
    localStorage.setItem('eggs', `${response[0].eggs}`)
    localStorage.setItem('growing', `${response[0].growing}`)
    localStorage.setItem('fastestwpm', `${response[0].wpm}`)

    let eggevolve = response[0].eggevolvestate
    let eggarray = eggevolve.split(',')
    let eggexp = eggarray[0]
    let eggexpmax = eggarray[1]
    localStorage.setItem('eggexp', `${eggexp}`)
    localStorage.setItem('eggexpmax', `${eggexpmax}`)

    let exp = response[0].exp
    let exparray = exp.split(',')
    let expgained = exparray[0]
    let expmax = exparray[1]
    localStorage.setItem('expgained', `${expgained}`)
    localStorage.setItem('expmax', `${expmax}`)
    localStorage.setItem('pets', `${response[0].pets}`)

    dispInfo()
    });
} //end of getting player info

//start of register function
$("#register-btn").on("click", function (e) {
  e.preventDefault();

  let registerusername = $("#registerUsername").val();
  let registerpassword = $("#registerPassword").val();

  let jsondata = {
    "username": registerusername,
    "password": registerpassword,
  };

  localStorage.setItem("username", `${registerusername}`);

let settings = {
  "url": "https://esandcelgenerator-2966.restdb.io/rest/user-password",
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "x-apikey": APIKEY,
    "cache-control": "no-cache"
  },
  "data": JSON.stringify(jsondata),
  "beforeSend": function(){
    $("#register-btn").prop( "disabled", true);
    $("#cat-animation").show()
    $("#login-page").hide()
  },
    "success": function() {
    $("#register-form").trigger("reset");
    $("#cat-animation").hide();
    $("#login-page").show();
}
}

$.ajax(settings).done(function (response) {
  console.log(response);
  $("#register-btn").prop( "disabled", false);
  $("#signup-success-msg").show().fadeOut(3000);
  newInfo();
  getInfo();
});

}); //end of register function

//start of login function
$("#login-btn").on("click", function (e) {
  e.preventDefault();

  let loginusername = $("#loginUsername").val();
  let loginpassword = $("#loginPassword").val();
  //console.log(`user ${loginusername} pass ${loginpassword}`);

let settings = {
  "async": true,
  "crossDomain": true,
  "url": `https://esandcelgenerator-2966.restdb.io/rest/user-password?q={\"username\": \"${loginusername}\",\"password\":\"${loginpassword}\"}`,
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "x-apikey": APIKEY,
    "cache-control": "no-cache"
  },
  "beforeSend": function(){
    $("#login-btn").prop( "disabled", true);
    $("#bear-animation").show();
    $("#login-page").hide();
  },
    "success": function() {
    $("#login-form").trigger("reset");
    $("#bear-animation").hide();
    $("#login-page").show();
    localStorage.setItem('username', `${loginusername}`);
    getInfo()
}
}

$.ajax(settings).done(function (response) {
  //console.log(response);
  if (response.length > 0) {
    $("#login-success-msg").show().fadeOut(3000);
    window.setTimeout(function () {location.href = "../html/home.html"}, 3000);
  } else {
    $("#login-error-msg").show().fadeOut(3000);
  }
  });
}); //end of login function

//start of typing game

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (inGame == false) {
        e.preventDefault();
        genSentences();
        inGame = true;
    }
}
});

//end of typing game

//generate sentence
//senturl = "https://esandcelgenerator-2966.restdb.io/rest/test" //use this for debugging
function genSentences() {
  let level = localStorage.getItem('level');
  
  if (level < 15) {
    senturl = "https://esandcelgenerator-2966.restdb.io/rest/sentences-easy";
  } else if (level < 30) {
    senturl = "https://esandcelgenerator-2966.restdb.io/rest/sentences-medium";
  } else {
    senturl = "https://esandcelgenerator-2966.restdb.io/rest/sentences-hard";
  }

  
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": senturl,
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    },
    "beforeSend": function(){
      $("#startscreen").hide()
      $("#cat-animation").show()
    },
      "success": function() {
      $("#cat-animation").hide()
      $("#gamepage").show()
  }
  }
  
  $.ajax(settings).done(function (response) {
    //console.log(response);
    let randnumber = Math.floor(Math.random() * ((response.length)-1)) + 0;
    let sentence = response[randnumber].sentences
    let nowordarray = sentence.split(' ');
    noword = nowordarray.length;
    
    sentarray = sentence.split('');
    let sentdisplay = sentarray.join('');

    $("#sentgenerated").html(`${sentdisplay}`);
  });
}

var health = 100; //use this for actual
//var health = 3; //use this for debugging
var rounds = 1;
var currentIndex = 0;
if (inGame == false) { //if the player not on playing page won't have keyup activity
  window.addEventListener("keyup", (e) => {
    if (sentarray.length > 0) {
      //console.log("sent size ", sentarray.length);
      //console.log("current index ", currentIndex);
       startTime = (new Date().getTime())/1000;
       if (e.key.toLowerCase() === sentarray[currentIndex].toLowerCase()) {
        sentarray.shift();//reduces the array one by one when user types
        let sentdisplay = sentarray.join("");
        $("#sentgenerated").html(`${sentdisplay}`);
        //console.log(`Key ${e.key} Key Code ${e.code}`); //debugging 
        
          if (sentarray.length == 0) { //when sentence is finished
          //get wpm
          endTime = (new Date().getTime())/1000;
          timetaken = (endTime - startTime);
          wpm = (noword/timetaken) * 60;
          setTimeout(function() {
            alert(`Your WPM was ${wpm}`);
          }, 1000);

          rounds = rounds + 1;
          if (rounds == 4) {
            $("#gamepage").hide();
            $("#congratulations").show();

            //for dropping egg 20% chance
            let eggs = Number(localStorage.getItem("eggs"));
            let chanceno = Math.random();
            //console.log(chanceno) //debugging
            if (chanceno < 0.2) {
              neweggs = eggs + 1;
              localStorage.setItem('eggs', `${neweggs}`);
              setTimeout(function() {
                alert("Oh Look! The monster you just defeated dropped an egg!");
              }, 1000);
            }

            //for exp gain
            let expgained = Number(localStorage.getItem("expgained"));
            let expmax = Number(localStorage.getItem("expmax"));
            let level = Number(localStorage.getItem("level"));
            let monstdef = Number(localStorage.getItem("monstdef"));
            let newexpgained = expgained + 5;
            let newmonstdef = monstdef + 1;
            if (newexpgained == expmax) {
              newexpgained = 0;
              localStorage.setItem('expgained', `${newexpgained}`);
              newexpmax = expmax + 5;
              localStorage.setItem('expmax', `${newexpmax}`);
              newlevel = level + 1;
              localStorage.setItem('level', `${newlevel}`);
              localStorage.setItem('monstdef', `${newmonstdef}`);
              //console.log(newlevel,newexpgained,newexpmax); //debugging
              updateInfo();
            } else {
              localStorage.setItem('expgained', `${newexpgained}`);
              localStorage.setItem('monstdef', `${newmonstdef}`);
              updateInfo();
              //console.log(newexpgained) //debugging
            }

            //for egg exp gain
            let eggexpgained = Number(localStorage.getItem("eggexp"));
            let eggexpmax = Number(localStorage.getItem("eggexpmax"));
            let petevolve = Number(localStorage.getItem("petevolve"));
            let growing = localStorage.getItem("growing");
            let pets = localStorage.getItem("pets")

            //if they are alr growing an egg then the egg exp will increase
            if (growing == "true") {
              neweggexp = eggexpgained + 5;
              if (neweggexp == eggexpmax) { //if egg is fully evolved
              neweggexp = 0;
              localStorage.setItem('eggexp', `${neweggexp}`);
              newpetevolve = petevolve + 1;
              localStorage.setItem('petevolve', `${newpetevolve}`);
              growing = false; //set growing back to false
              localStorage.setItem('growing', `${growing}`);

              let petnames = ["cat","bear"]
              let randnumber = Math.floor(Math.random() * petnames.length)
              randpet = petnames[randnumber]
              //console.log(randpet) //debugging check the pet gotten
              if (pets != "") {
                newpets = pets + `,${randpet}`
                localStorage.setItem('pets', `${newpets}`);
              } else {
                newpets = `${randpet}`
                localStorage.setItem('pets', `${newpets}`);
              }
              setTimeout(function() {
                alert(`Crack Crack! Your Egg has been fully Evolved! You got a ${randpet}!`);
              }, 1000);
              updateInfo();
            } else { //if egg is not fully evolved
              localStorage.setItem('eggexp', `${neweggexp}`);
              updateInfo();
            }
          }

            window.addEventListener("click", (e) => {
            document.location.href = "../index.html";
            });
          } else {
          $("#round").html(`${rounds}`);
          $("#startscreen").show();
          $("#gamepage").hide();
          inGame = false;
          }
        }
      
      } else {
        health--;
        //console.log(`Health: ${health}`); //debugging
        //console.log(rounds); //debugging
        if (health < 1) {
          $("#gamepage").hide();
          $("#losing").show();
          window.addEventListener("click", (e) => {
            document.location.href = "../index.html";
            });
        }
      }
    };
        });
      }
  });


