#!/usr/bin/env node

'use strict';

var nopt = require('nopt');
var url  = require('url');
var mows = require('mows');

var opts = nopt({});

opts.url = url.parse(opts.argv.remain[0]);

if (opts.url.protocol === "ws:") {
    var client = mows.createClient(opts.url.href);
  } else {
    // we need a WebSocket URL
    throw new Error("Unknown protocol");
  }

client.subscribe('wstest');
client.publish('wstest', 'Hello MQTT over WebSocket');

client.on('message', function (topic, message) {
  console.log(message);

  client.end();
});
