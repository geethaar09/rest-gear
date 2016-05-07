(function(){

var express = require('express');
var gearApp = express();
var fs = require('fs');
var restGear;
var config = require('./conf/config');
var bodyParser = require('body-parser');
var appPort;

function restGearRestart(){
  restGearStop();
  init(config);

}

function restGearStart(gearPort) {
  console.log("Starting restGear...");
    appPort = gearPort;
    restGear = gearApp.listen(gearPort, function () {
      var port = restGear.address().port;
      console.log("Management URL: http://localhost:" + port + "/restGear/management");
      console.log("Rest Gear Service Listening on port: " + port);

  });
}

function restGearStop() {
  console.log("Stopping restGear...");
  restGear.close();
}

function restGearAddGet(app, restConf) {
  var URI = '/' + app + '/' + restConf.confName;  
  // console.log(URI);  
  gearApp.get(URI, function (req, res) {
     fs.readFile( __dirname + "/apps/" + app + "/" + restConf.response_json, 'utf8', function (err, data) {         
         res.send( data );
     });
  });
}

function restGearAddPost(app, restConf) {
  var URI = '/' + app + '/' + restConf.confName;
  // console.log(">" + URI);
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

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

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
      
      // console.log(appRestConf.type);
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

  gearApp.post('/config/addChangeAppConf', function(req, res) {
    var body = req.body;
    var mode = (req.body.GUID) ? "edit" : "add";
    var confGUID = (mode === "add") ? generateUUID() : req.body.GUID;
    console.log(JSON.stringify(req.body));
    var newConf = {
      "appName": req.body.appName,
      "appConf": {
        "confName": req.body.confName,
        "method": req.body.method,
        "response_json": req.body.response_json || "sample.json",
        "URI": "http://localhost:" + appPort + "/" + req.body.appName + "/" + req.body.confName
      },
      "GUID": confGUID
    };

    if (mode === "edit") {
      for (var i in config.apps) {
        if ( config.apps[i].GUID == confGUID ) {
          config.apps[i] = newConf;
          break;
        }
      }
    }
    else if (mode === "add") {
      config.apps.push(newConf);
    }

    fs.writeFile('./conf/config.json', JSON.stringify(config), function(err) {
      if (err) {
        res.end("ERROR");
        console.log("Error occured");
        return;
      }
      res.send({
        message: "Configuration Created / Edited",
        confGUID: confGUID,
        newConf: newConf
      });
      

      // res.send(confGUID);
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