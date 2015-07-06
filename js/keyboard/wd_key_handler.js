var WdKeyHandler = HTMLKeyHandler.extend({
    initialize: function(info){
        this.supr();
        // Additional Exit Keys
        if (info.userAgent.match(/wdsimplebrowser/i)) {
          // Alpha Device
          this.tvKey[127] = "PLAY";
          this.tvKey[128] = "PAUSE";
          this.tvKey[129] = "STOP";
          this.tvKey[131] = "RW";
          this.tvKey[130] = "FF";
          this.tvKey[27] = "BACK";
          this.tvKey[123] = "EXIT";
        } else {
          // Sigma Device
          this.tvKey[415] = "PLAY";
          this.tvKey[19] = "PAUSE";
          this.tvKey[413] = "STOP";
          this.tvKey[412] = "RW";
          this.tvKey[417] = "FF";
          this.tvKey[27] = "BACK";
          this.tvKey[123] = "EXIT";
        }
    },
});
