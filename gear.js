(function(){

var express = require('express');
var gearApp = express();
var fs = require('fs');
var restGear;
var config = require('./conf/config');
var bodyParser = require('body-parser');

var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

function restGearRestart(){
  restGearStop();
  init(config);

}

function restGearStart(gearPort) {
  console.log("Starting restGear...");

    restGear = gearApp.listen(gearPort, function () {
      var port = restGear.address().port;
      console.log("Rest Gear Service Listening on port: " + port);
  });
}

function restGearStop() {
  console.log("Stopping restGear...");
  restGear.close();
}

function restGearAddGet(app, restConf) {
  var URI = '/' + app + restConf.URI; 
  gearApp.get(URI, function (req, res) {
     fs.readFile( __dirname + "/apps/" + app + "/" + restConf.response_json, 'utf8', function (err, data) {
         // console.log( data );
         res.end( data );
     });
  })  
}

function init(conf) {
  var apps = conf.apps,
      appConf, appRestConf;

  for ( var app in apps) {
    appConf = apps[app];
    for(var i = 0, len = appConf.length; i < len; i++) {
      appRestConf = appConf[i];      
      switch(appRestConf.type) { //TODO: Convert to functional programming
        case "GET":
          restGearAddGet(app, appRestConf);
          break;

        case "POST":
          // restGearAddPost(app, appRestConf);
          break;

        case "DELETE":
          // restGearAddDelete(app, appRestConf);
          break;  
      }

    }
  }



gearApp.use(bodyParser.json()); // support json encoded bodies
gearApp.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


  gearApp.get('/restGear-restart', function (req, res) {
    restGearRestart();
  });

    gearApp.get('/restGear-stop', function (req, res) {
    restGearStop();
  });

  gearApp.post('/config/addAppConf', function(req, res) {
    var app = req.body.app;
    var appExists =  (config.apps[app]) ? true : false;
    var appConfig = {
      "URI": req.body.URI,
      "type": req.body.type,
      "response_json": req.body.response_json
    };

    (appExists) && (config.apps[app].push(appConfig));
    !(appExists) && (config.apps[app] = [appConfig]);

    fs.writeFile('./conf/config.json', JSON.stringify(config), function(err) {
      if (err) {
        res.end("ERROR");
        return;
      }

      res.end("Config Saved");
    });

    res.end(JSON.stringify(config));


  });

  gearApp.get('/getConf', function(req, res) {
    res.end(JSON.stringify(config));
  });
  // gearApp.get('/addUser', function (req, res) {
  //    // First read existing users.
  //    fs.readFile( __dirname + "/sample/data/" + "sample_data.json", 'utf8', function (err, data) {
  //        data = JSON.parse( data );
  //        data["user4"] = user["user4"];
  //        console.log("READ THIS: " +  data );
  //        res.end( JSON.stringify(data));
  //    });
  // })


  // Start services
  restGearStart(conf.port);
}


init(config);


})();