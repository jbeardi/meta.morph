var SamsungIO = IO.extend({
  //
  initialize: function(o) {
  	o = o || {};
    this.fileName = curWidget.id + '/' + ( o.fileName || 'app' ) + '.session';
  },
  // LOAD
  load: function(suc, err) {
  	var file = null;
  	
    try {
      !this.fileSystem && ( this.fileSystem = new FileSystem() );
      file = this.fileSystem.openCommonFile(this.fileName, 'r');
      //
      if( file ) {
        var str = unescape(file.readLine());
        if( str ) this.data = JSON.parse(str);
        this.fileSystem.closeCommonFile(file);
			}
      suc && suc();
    } catch (e) {
    	file && this.fileSystem.closeCommonFile(file);
    	err && err(e);
    }
  },
  // SAVE
  save: function(suc, err) {
    try {
    	!this.fileSystem && ( this.fileSystem = new FileSystem() );
    	
      if( !this.fileSystem.isValidCommonPath( curWidget.id ) ) {
        this.fileSystem.createCommonDir( curWidget.id );
      }
      var file = this.fileSystem.openCommonFile(this.fileName, 'w');
      if( file ) {
        file.writeLine( escape(JSON.stringify(this.data)) );
        this.fileSystem.closeCommonFile(file);
        suc && suc();  
      }
    } catch (e) {
    	file && this.fileSystem.closeCommonFile(file);
    	err && err(e);
    }
  },
  // ERASE
  erase: function(o, suc, err) {
    !this.fileSystem && ( this.fileSystem = new FileSystem() );
    this.fileSystem.deleteCommonFile(this.fileName);
    suc && suc();
  }
});

var SamsungTizenIO = IO.extend({
  //
  initialize: function(o, suc, err) {
  	o = o || {};
    this.fileName = ( o.fileName || 'app') + '.session';
  },
  
  // LOAD
  load: function(suc, err) {
  	tizen.filesystem.resolve(
			'wgt-private',
			Util.bind(this, function(dir){
				// search for file already exist
				dir.listFiles(Util.bind(this, function(files){
					var fileFound = false;
					for (var i = 0; i < files.length; i++) {
						if (files[i].name == this.fileName) {
							fileFound = true;
							break;
						}
					}
					if (fileFound) {
						console.log('File already exists!');
						this.read(suc, err);
					} else {
						try {
				    	dir.createFile(this.fileName);
				    	console.log('File created!');
				    	this.data = {};
				    	this.save(suc, err);
				    } catch (e) {
				    	err && err(e);
				    }
			   }
				}));
			})
		);
  },
  
  // READ
  read: function(suc, err) {
    tizen.filesystem.resolve(
    	'wgt-private/' + this.fileName,
    	Util.bind(this, function(file){
		    try {
		    	file.openStream('r', Util.bind(this, function(stream){
		    		try {
				      	var str = stream.read(stream.bytesAvailable);
		      	  		this.data = JSON.parse(unescape(str));
		      			stream.close();
		      	  		suc && suc();
			        } catch(e) {
			        	stream.close();
			        	err && err(e);
			        }
		    	}));
		    } catch (e) {
		    	err && err(e);
		    }
	    })
		);
  },
  // SAVE
  save: function(suc, err) {
  	console.log('Tizen saving...');
  	
  	tizen.filesystem.resolve(
  		'wgt-private/' + this.fileName, 
  		Util.bind(this, function(file){
		    try {
		    	file.openStream('w', Util.bind(this, function(stream){
	    		  try {
			      	stream.write( escape(JSON.stringify(this.data)) );
			      	
			      	stream.close();
			      	suc && suc();
			      } catch (e) {
			      	stream.close();
			        err && err(e);
			      }
		    	}));
		    } catch (e) {
		    	err && err(e);
		    }
			})
		);
  },
  
  // ERASE
  erase: function(suc, err) {
    console.log('Tizen deleting...');
    
  	tizen.filesystem.resolve(
  		'wgt-private', 
  		Util.bind(this, function(dir) {
				dir.listFiles(Util.bind(this, function(files){
					for (var i = 0; i < files.length; i++) {
						if (files[i].name == this.fileName) {
							// trying to delete file
							dir.deleteFile(files[i].fullPath, suc, err);
							return;
						}
					}
					err && err();
				}));
    }));
  }
});
