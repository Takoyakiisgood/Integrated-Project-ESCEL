$(document).ready(function () {

const APIKEY = "2210eafd28a2885e3e4a0efb83604d0cc69ba"
$("#signup-success-msg").hide();
$("#login-success-msg").hide();
$("#login-error-msg").hide();
$("#cat-animation").hide()
$("#bear-animation").hide()

//start of register function
$("#register-btn").on("click", function (e) {
  e.preventDefault();

  let registerusername = $("#registerUsername").val();
  let registerpassword = $("#registerPassword").val();

  let jsondata = {
    "username": registerusername,
    "password": registerpassword,
  };

let settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://esandcelgenerator-2966.restdb.io/rest/user-password",
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "x-apikey": APIKEY,
    "cache-control": "no-cache"
  },
  "processData": false,
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
});

}); //end of register function

//start of login function
$("#login-btn").on("click", function (e) {
  e.preventDefault();

  let loginusername = $("#loginUsername").val();
  let loginpassword = $("#loginPassword").val();

let settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://esandcelgenerator-2966.restdb.io/rest/user-password",
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "x-apikey": APIKEY,
    "cache-control": "no-cache"
  }
}

$.ajax(settings).done(function (response) {
  //console.log(response);
  for (var i = 0; i < response.length; i++) {
    checkusername = $(response[i].username);
    checkpassword = $(response[i].password);
    if (loginusername == checkusername) {
      console.log("hello");
      if (loginpassword == checkpassword) {
        console.log("hello1");
      }else {
        $("#register-form").trigger("reset");
        $("#login-error-msg").show().fadeOut(3000);
      }
      }else {
        $("#register-form").trigger("reset");
        $("#login-error-msg").show().fadeOut(3000);
      }
    };
  });
}); //end of login function

}); 

