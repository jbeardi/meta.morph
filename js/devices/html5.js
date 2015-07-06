var Html5Device = Device.extend({

  initialize: function(_info) {
    _info.technology = TECHNOLOGY.HTML5;
    this.supr(_info);
  },

  createPlayer: function(){
      this.player = new HTML5Player(this.info);
      return this.player;
  },

  initLogger: function() {
    Logger.setup(true, false, false);
    Logger.show();
  },

  createKeyHandler: function(){
      this.keyHandler = new HTMLKeyHandler();
      return this.keyHandler;
  },
  
  exit: function(){
      window.history.go(-2);
  }
});
