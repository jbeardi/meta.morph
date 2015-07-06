var IO = klass({
  //
  load: 	function(suc, err) {},
  save:		function(suc, err) {},
  erase:	function(suc, err) {},
  // GET VALUE FOR KEY FROM IO
  get: function(key) {
    var result = null;
    var k = key.toLowerCase();
    if(typeof this.data[k] != 'undefined') {
    	result = this.data[k];
    }
    return result;
  },
  // SET VALUE FOR KEY iN IO
  set: function(key, value, suc, err) {
    this.data[key.toLowerCase()] = value;
    this.save( suc, err );
  },
  // SET JSON OBJ AS VALUE iN IO
  setObj: function(obj, suc, err) {
    for(var key in obj) {
      this.data[key.toLowerCase()] = obj[key];
    }
    this.save( suc, err );
  },
  // DELETE KEY-VALUE iN IO
  del: function(key, suc, err) {
    var result = false;
    if(!key) return result;
    var k = key.toLowerCase();
    if(typeof this.data[k] != 'undefined') {
    	delete this.data[k];
    }
    this.save( suc, err );
  },
  // CHECK FOR KEY-VALUE iN IO
  has: function(key) {
    var result = false;
    if(!key) return result;
    var k = key.toLowerCase();
    if(typeof this.data[k] != 'undefined') {
    	result = true;
    }
    return result;
  }
});
//
