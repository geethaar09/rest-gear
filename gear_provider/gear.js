(function(){

var express = require('express');
var gearApp = express();
var fs = require('fs');
var restGear;
var config = require('./conf/config');
var bodyParser = require('body-parser');

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
  console.log(URI);  
  gearApp.get(URI, function (req, res) {
     fs.readFile( __dirname + "/apps/" + app + "/" + restConf.response_json, 'utf8', function (err, data) {         
         res.send( data );
     });
  });
}

function restGearAddPost(app, restConf) {
  var URI = '/' + app + restConf.URI;
  console.log(URI);
  gearApp.post(URI, function (req, res) {
    // console.log(req);
    res.send(req.body.Age);

     // fs.readFile( __dirname + "/apps/" + app + "/" + restConf.response_json, 'utf8', function (err, data) {         
     //     res.send( data );
     // });
  });
}

function createUISymLink() {
  fs.linkSync(dstpath, srcpath);
}

init = function (conf) { // TODO: REPLACE THIS WITH exports.init
// exports.init = function (conf) {
  var apps = config.apps,
      appSpec, appName, appRestConf, gearPort = conf && conf.port || config.port;

  gearApp.use(bodyParser.json()); // support json encoded bodies
  gearApp.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies 
  gearApp.use('/ui', express.static(__dirname + '/ui')); // support static path
  gearApp.use('/restgear-ui', express.static(__dirname + '/restgear-ui')); // support static path

  for (var i = 0, len = apps.length; i < len; i++) {
    appSpec = apps[i];
    appName = appSpec.appName;
    appRestConf = appSpec.appConf;
    // for (var j = 0, confLen = appSpec.appConf.length; j < confLen; j++) {
      
      console.log(appRestConf.type);
      switch(appRestConf.type) { //TODO: Convert to functional programming
        case "GET":
          restGearAddGet(appName, appRestConf);
          break;

        case "POST":
          restGearAddPost(appName, appRestConf);
          break;

        case "PUT":
          // restGearAddPut(appName, appRestConf);
          // break;          

        case "DELETE":
          // restGearAddDelete(appName, appRestConf);
          break;  
      }    
    // }
  }

  // for ( var app in apps) {
  //   appConf = apps[app];
  //   for(var i = 0, len = appConf.length; i < len; i++) {
  //     appRestConf = appConf[i];      
  //     switch(appRestConf.type) { //TODO: Convert to functional programming
  //       case "GET":
  //         restGearAddGet(app, appRestConf);
  //         break;

  //       case "POST":
  //         // restGearAddPost(app, appRestConf);
  //         break;

  //       case "DELETE":
  //         // restGearAddDelete(app, appRestConf);
  //         break;  
  //     }

  //   }
  // }

  gearApp.get('/restGear-restart', function (req, res) {
    restGearRestart();
  });

  gearApp.get('/restGear-stop', function (req, res) {
    restGearStop();
  });

  gearApp.get('/restGear/management', function(req,res){
    res.type('.html');
    res.sendFile(__dirname + "/restgear-ui/index.html", function(err) {
      if (err) {
        res.end("Oops!! What happened to the Management Page?");
      }
    });   
  });

  gearApp.post('/config/addAppConf', function(req, res) {
    var body = req.body;
    console.log(JSON.stringify(req.body));
    var newConf = {
      "appName": req.body.app,
      "appConf": {
        "URI": req.body.URI,
        "type": req.body.type,
        "response_json": req.body.response_json
      }
    };
    // var app = req.body.app;
    // var appExists =  (config.apps[app]) ? true : false;
    // var appConfig = {
    //   "URI": req.body.URI,
    //   "type": req.body.type,
    //   "response_json": req.body.response_json
    // };

    config.apps.push(newConf);
    // (appExists) && (config.apps[app].push(appConfig));
    // !(appExists) && (config.apps[app] = [appConfig]);

    fs.writeFile('./conf/config.json', JSON.stringify(config), function(err) {
      if (err) {
        res.end("ERROR");
        return;
      }
      res.send("Config Saved");
      

      // res.send();
    });
  });

  gearApp.get('/getAppConf', function(req, res) {
    res.send(JSON.stringify(config.apps));
  });

  // Start services
  restGearStart(gearPort);
}

init(config); //TODO: REMOVE THIS LINE

})();