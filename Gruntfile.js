module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// CLEAN
		clean:  ['<%= pkg.name %>.js', '<%= pkg.name %>.min.js'],
		
		// JSHiNT
		jshint: {
		  files: ['Gruntfile.js', 'concat.json', 'js/**/*.js'],
		  options: {
		    globals: {
		      jQuery: true,
		      console: true,
		      module: true
		    }
		  }
		},
		
		// JST
		jst: {
		  compile: {
		  	options: {
		  		separator: '\n',
		  		prettify: true,
		  		processName: function(path) {
				    return path.replace(/(templates\/)(.+)(.ejs)/, '$2');
				  },
				  processContent: function(src) {
				    return src.replace(/(^\s+|\s+$)/gm, '');
				  }
		  	},
		    files: {
		    	'<%= pkg.name %>.js': ['templates/**/*.ejs']
		    }
		  }
		},

		// CONCAT
		concat: {
			options: {
				banner: grunt.file.read('LICENSE'),
				files: grunt.file.readJSON('concat.json'),
				footer: '',
				separator: '\n'
			},
			dist: {
				src: [
					'<%= pkg.name %>.js',
					'<%= concat.options.files.utils %>',
					'<%= concat.options.files.player %>',
					'<%= concat.options.files.keyboard %>',
					'<%= concat.options.files.io %>',
					'<%= concat.options.files.devices %>',
					'<%= concat.options.files.advertisment %>',
					'<%= concat.options.files.tracking%>'
				],
				dest: '<%= pkg.name %>.js'
			}
		},
		
		// UGLiFY
		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false,
				ASCIIOnly: true,
				beautify: false
			},
      dist: {
        files: {
          '<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    }
		
	});
	
	// TASKS
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jst');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('default', ['clean', 'jst', 'concat', 'uglify']);
};