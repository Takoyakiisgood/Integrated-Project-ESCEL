 
var settings = {
    "url": "https://esandcelgenerator-2966.restdb.io/rest/user-info",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "X-API-KEY": "2210eafd28a2885e3e4a0efb83604d0cc69ba"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });