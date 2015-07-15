(function() {
  "use strict";
  var Skeletor = this.Skeletor || {};
  this.Skeletor.Mobile = this.Skeletor.Mobile || new Skeletor.App();
  var Model = this.Skeletor.Model;
  Skeletor.Model = Model;
  var app = this.Skeletor.Mobile;

  // app.config = null;

  app.username = null;
  app.runState = null;
  app.chatMessages = null;
  app.chatView = null;

  app.init = function(username) {
    app.username = username;
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
    // load the actual static HTML from a template
    var el = _.template(jQuery('#chat-template').text(), {});
    jQuery('#app').html(el);
    // setup View that renders the messages
    wireUpViews();

    // here we make the collection of chatMessages available in a variable that is visible within this module
    app.chatMessages = Skeletor.Model.awake.chat_messages;

    // make UI react to user interaction
    app.setupEventHandler();
  };

  app.setupEventHandler = function () {
    jQuery( "#messageForm" ).submit(function( event ) {
      // create a new instance of a chat message model
      var chatMessage = new Skeletor.Model.ChatMessage();
      // make model 'awake' to ensure messages are pushed via pub/sub channel
      chatMessage.wake(app.config.wakeful.url);
      // set chat message from chat input field
      chatMessage.set('text', jQuery('#messageText').val());
      // attach current user name
      chatMessage.set('author', app.username);

      chatMessage.save().then(function() {
        console.log('Message saved!');
        // clear the input field
        jQuery('#messageText').val('');
        Skeletor.Model.awake.chat_messages.add(chatMessage);
      }, function(error) {
        alert('There was a problem: ' + error.message);
      });
      event.preventDefault();
    });
  };

  // app.subscribeToChannel = function (streamName) {
  //   var subscription = app.client.subscribe(streamName, function(jsonMessage) {
  //     var message = JSON.parse(jsonMessage);
  //     // handle message
  //     console.log(message);
  //     var msgList = jQuery('#chat-messages');
  //     var msgItem = jQuery('<li>'+message.text+'</li>');
  //     msgList.append(msgItem);
  //   });

  // };

  var wireUpViews = function() {
    /* ======================================================
     * Setting up the Backbone Views to render data
     * coming from Collections and Models.
     * This also takes care of making the nav items clickable,
     * so these can only be called when everything is set up
     * ======================================================
     */

     if (app.chatView === null) {
       app.chatsView = new app.View.ChatsView({
         el: '#chat-messages',
         collection: Skeletor.Model.awake.chat_messages
       });
     }
  };

  // this.Skeletor.Mobile = app;
  this.Skeletor = Skeletor;
}).call(this);