var CookieIO = IO.extend({
    
  initialize: function(o) {
		o = o || {};
		
		this.domain		= o.domain 	|| '';
		this.expires 	= o.expires || new Date(2030, 2, 19),
		this.name 		= o.name   	|| 'JSON';
		this.path 		= o.path 		|| '/';
  },
  // LOAD
  load: function(suc, err) {
    var cookie = unescape(document.cookie);
    //
    if( cookie ) {
      cookie = cookie.split(';');
      //
      for( var i=0, line=null, l=cookie.length; i<l; i++ ) {
        line = cookie[i];
        if( line.indexOf(this.name + '=') > -1 ) {
          line = line.split('=');
          try {
            this.data = JSON.parse(line[1]);
            suc && suc();
          } catch(e) {
          	err && err(e);
          }
          return;
        }
      }
      // there is a cookie but not with the specified name
      this.data = {};
	  suc && suc();
    } else {
    	this.data = {};
    	suc && suc();
    }
  },
  // SAVE
  save: function(suc, err) {
    document.cookie = ( 
    	this.name + '=' + escape(JSON.stringify(this.data)) + 
    	'; expires=' + this.expires.toUTCString() + 
    	(this.domain ? '; domain=' + this.domain : '') + 
    	'; path=' + this.path 
    );
    suc && suc();
  },
  // ERASE
  erase: function(suc, err) {
    document.cookie = (
    	'name=; expires=Thu, 01-Jan-1970 00:00:01 GMT' + 
    	(this.domain ? '; domain=' + this.domain : '') + 
    	'; path=' + this.path 
    );
    suc && suc();
  }
});
