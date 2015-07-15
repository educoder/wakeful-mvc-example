/*jshint debug:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser: true, devel: true, jquery:true, strict:true */
/*global  Backbone, Skeletor, _, jQuery, Rollcall */

(function () {
  "use strict";

  this.Skeletor = this.Skeletor || {};
  this.Skeletor.Mobile = this.Skeletor.Mobile || new Skeletor.App();
  var Model = this.Skeletor.Model;
  Skeletor.Model = Model;
  var app = this.Skeletor.Mobile;

  app.requiredConfig = {
    wakeful: {
      url: 'string'
    }
  };

  app.Router = new (Backbone.Router.extend({
    routes: {
      '' : 'index',
      'login/:username': 'handleLogin',
      'chat/:username': 'initChat'
    },
    initialize: function() {
      app.loadConfig('../config.json');
      app.verifyConfig(app.config, app.requiredConfig);

      // Adding BasicAuth to the XHR header in order to authenticate with drowsy database
      // this is not really big security but a start
      app.basicAuthHash = btoa(app.config.drowsy.username + ':' + app.config.drowsy.password);
      Backbone.$.ajaxSetup({
        beforeSend: function(xhr) {
          return xhr.setRequestHeader('Authorization',
              // 'Basic ' + btoa(username + ':' + password));
              'Basic ' + app.basicAuthHash);
        }
      });
    },
    index: function() {
      console.log("routing on");
      // load the actual static HTML from a template
      var el = _.template(jQuery('#login-template').text(), {});
      jQuery('#app').html(el);

      jQuery( "#loginForm" ).submit(function( event ) {
        event.preventDefault();
        // retrieve username and call login route
        app.Router.navigate("login/" + jQuery('#userName').val(), {trigger: true});
      });
    },
    handleLogin: function (username) {
      // Store login in cookie
      jQuery.cookie('wakeful_mvc_example_username', username, { expires: 1, path: '/' });
      app.Router.navigate("chat/" + username, {trigger: true});
    },
    initChat: function (username) {
      // Call the function that will do all the setup work
      Skeletor.Mobile.init(username);
    },
    start: function() {
      // to allow single page app with various routes
      Backbone.history.start();
      // Skeletor.Webbots.init();
    }
  }))();

  this.Skeletor.Mobile = app;
  return this.Skeletor.Mobile;

}).call(this);