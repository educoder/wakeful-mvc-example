(function() {
  "use strict";
  var Skeletor = this.Skeletor || {};
  this.Skeletor.Mobile = this.Skeletor.Mobile || new Skeletor.App();
  var Model = this.Skeletor.Model;
  Skeletor.Model = Model;
  var app = this.Skeletor.Mobile;

  // app.config = null;


  app.runState = null;
  app.chatMessages = null;

  app.init = function() {
    var DATABASE = app.config.drowsy.db;

    // Initialize the Backbone Model with the URL of the DrowsyDromedary instance and database name
    Skeletor.Model.init(app.config.drowsy.url, DATABASE)
    .then(function () {
      // Here we make things "awake", meaning that we attach the Faye channel via the Backbone model
      console.log('Model initialized - now waking up');
      return Skeletor.Model.wake(app.config.wakeful.url);
    })
    .done(function () {
      console.log('Models are awake - now calling ready...');
      app.ready();
    });
  };

  app.ready = function () {
    console.log("Ready function");
    // now the models are initialized and we can get ready with the rest of the app

    // here we make the collection of chatMessages available in a variable that is visible withing this module
    app.chatMessages = Skeletor.Model.awake.chat_messages;

    // make UI react to user interaction
    app.setupEventHandler();
  };

  app.setupEventHandler = function () {
    jQuery( "#messageForm" ).submit(function( event ) {
      var chatMessage = new Skeletor.Model.ChatMessage();
      chatMessage.wake(app.config.wakeful.url);
      chatMessage.set('text', jQuery('#messageText').val());

      chatMessage.save().then(function() {
        console.log('Message saved!');
        // clear the input field
        jQuery('#messageText').val('');
      }, function(error) {
        alert('There was a problem: ' + error.message);
      });
      event.preventDefault();
    });
  };

  app.subscribeToChannel = function (streamName) {
    var subscription = app.client.subscribe(streamName, function(jsonMessage) {
      var message = JSON.parse(jsonMessage);
      // handle message
      console.log(message);
      var msgList = jQuery('#messages');
      var msgItem = jQuery('<li>'+message.text+'</li>');
      msgList.append(msgItem);
    });

  };

  // this.Skeletor.Mobile = app;
  this.Skeletor = Skeletor;
}).call(this);