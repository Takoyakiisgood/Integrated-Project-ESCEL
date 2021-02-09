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

//start of assign player info to new players
function newInfo() {

  //assign new player info
  let today = new Date();

  let regdate = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
  let level = 1;
  let monsterdef = 0;
  let petevolved = 0;
  let username = localStorage.getItem("username");
  let pfp = ""

  let jsondata = {
    "username": username,
    "fully-evolved-pets": petevolved,
    "defeated-monsters": monsterdef,
    "level": level,
    "profile-picture": pfp,
    "regdate": regdate
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

//start of update player info
function updateInfo() {
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
    });
} //end of update player info

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
    $("#cat-animation").hide()
    $("#login-page").show()
}
}

$.ajax(settings).done(function (response) {
  console.log(response);
  $("#register-btn").prop( "disabled", false);
  $("#signup-success-msg").show().fadeOut(3000);

  newInfo();
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
    $("#bear-animation").show()
    $("#login-page").hide()
  },
    "success": function() {
    $("#login-form").trigger("reset");
    $("#bear-animation").hide()
    $("#login-page").show()
}
}

$.ajax(settings).done(function (response) {
  //console.log(response);
  if (response.length > 0) {
    $("#login-success-msg").show().fadeOut(3000);
    localStorage.setItem('username', `${loginusername}`)
    updateInfo()
  } else {
    $("#login-error-msg").show().fadeOut(3000);
  }
  });
}); //end of login function

var inGame = false;
//start of typing game
if (inGame == false) {
window.addEventListener('keydown', (e) => {
if (e.key === 'Enter') {
  e.preventDefault();
  genSentences();
  let inGame = true;
}
});
}
//end of typing game

//generate sentence
function genSentences() {
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://esandcelgenerator-2966.restdb.io/rest/sentences-easy",
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
    
    sentarray = sentence.split('');
    console.log(sentarray);
    let sentdisplay = sentarray.join('');

    $("#sentgenerated").html(`${sentdisplay}`);
  });
}

var health = 100;
var rounds = 1
var currentIndex = 0;
  window.addEventListener("keyup", (e) => {
    if (sentarray.length > 0) {
      console.log("sent size ", sentarray.length);
      console.log("current index ", currentIndex);
       if (e.key.toLowerCase() === sentarray[currentIndex].toLowerCase()) {
        sentarray.shift();//reduces the array one by one when user types
        let sentdisplay = sentarray.join("");
        $("#sentgenerated").html(`${sentdisplay}`);
        console.log(`Key ${e.key} Key Code ${e.code}`); //debugging 
        if (rounds < 4) {
          if (sentarray.length == 0) {
          rounds = rounds + 1;
          $("#round").html(`${rounds}`);
          $("#startscreen").show();
          let inGame = false;
        }
      } else {
        $("#startscreen").hide();
        $("#gamepage").hide()
        $("#congratulations").show()
        window.addEventListener("click", (e) => {
          document.location.href = "../index.html";
        });
      }
      } else {
        health--;
        console.log(`Health: ${health}`);
        console.log(rounds);
      }
    };
        });
  });


