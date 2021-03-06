#!/usr/bin/env node

//this hook installs all your plugins

// add your plugins to this list--either the identifier, the filesystem location or the URL
var pluginlist = [
  	"org.apache.cordova.device",
   //  "org.apache.cordova.device-motion",
   //  "org.apache.cordova.device-orientation",
  	"org.apache.cordova.dialogs",
  	"org.apache.cordova.network-information",
  	"org.apache.cordova.splashscreen",
  	"org.apache.cordova.vibration",
    "org.apache.cordova.inappbrowser",
    "de.appplant.cordova.plugin.hidden-statusbar-overlay",

    //terceiros
    "https://github.com/danwilson/google-analytics-plugin.git"
    // "nl.x-services.plugins.toast",
    // "https://github.com/Paldom/SpinnerDialog.git"
];

// no need to configure below

var fs = require('fs');
var path = require('path');
var sys = require('sys')
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    sys.puts(stdout)
}

pluginlist.forEach(function(plug) {
    exec("phonegap plugin add " + plug, puts);
});