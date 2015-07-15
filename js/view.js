/*jshint debug:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser: true, devel: true, jquery:true, strict:false */
/*global Backbone, _, jQuery, Sail, google */

(function() {
  "use strict";
  var Skeletor = this.Skeletor || {};
  this.Skeletor.Mobile = this.Skeletor.Mobile || new Skeletor.App();
  var app = this.Skeletor.Mobile;
  var Model = this.Skeletor.Model;
  Skeletor.Model = Model;
  app.View = {};

  /**
    ChatView
  **/
  app.View.ChatView = Backbone.View.extend({
    // events: {
    //   //'click #nav-read-btn'               : 'switchToReadView'
    // },
    template: _.template('<p class="triangle-border <%= ownMsg ? "left" : "right" %>"><%= text %></p>'),
    initialize: function() {
      this.model.on('change', this.render, this);
    },

    render: function () {
      return this.template ({text: this.model.get('text'), ownMsg: (this.model.get('author') === app.username) ? true : false});
    },

    remove: function() {
      this.model.destroy();
    }
  });

  /**
    ChatsView
  **/
  app.View.ChatsView = Backbone.View.extend({
    initialize: function() {
      this.collection.on('add', this.addOne, this);
      this.collection.on('reset', this.addAll, this);
      this.collection.on('destroy', this.render, this);
      this.render();
    },

    addOne: function(chatMessage) {
      var chatView = new app.View.ChatView({model: chatMessage});
      this.$el.append(chatView.render());
    },

    addAll: function() {
      this.$el.empty();
      this.collection.forEach(this.addOne, this);
    },

    // filterCompleted: function() {
    //   // instead of doing the data operation function here
    //   // we call the function on the model
    //   this.collection.filterCompleted();
    //   this.render();
    // },

    render: function() {
      this.addAll();
      return this;
    }
  });

  this.Skeletor = Skeletor;
}).call(this);
