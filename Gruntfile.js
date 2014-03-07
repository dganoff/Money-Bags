module.exports = function(grunt) {
	"use strict";

	var SRC = "./src/",
        DIST = "./dist/",
        SERVER_PORT = "7777";

    grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),

    	uglify: {
    		options: {
		    	banner: '/*! <%= pkg.name %> ver. <%= pkg.version %> <%= grunt.template.today("mm-dd-yyyy, h:MM:ss TT") %> */\n'
		    },
			dist: {
				files: {
					'dist/js/app.min.js': [
                        SRC + 'js/app.js',
                        SRC + 'js/services/*.js',
                        SRC + 'js/controllers/*.js'
                    ]
				}
		    }
    	},

    	connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: SERVER_PORT,
                    base: DIST,
                    livereload: true
                }
        	}
        },

        sass: {
        	dist: {
        		options: {
        			style: 'compressed'
        		},
        		files: [{
        			src: ['*.scss'],
        			cwd: SRC + 'scss',
        			dest: DIST + 'css',
        			ext: '.css',
        			expand: true
        		}]
        	}
        },

        copy: {
        	html: {
        		files: [
                    {
                        expand: true,
                        src: [SRC + 'html/*.html'],
                        flatten: true,
                        dest: DIST
                    }
                ]
        	},
        	views: {
        		files: [
                    {
                        expand: true,
                        src: [SRC + 'views/*.html'],
                        flatten: false,
                        dest: DIST + 'views'
                    }
                ]
        	},
            javascript: {
                files: [
                    {
                        expand: true,
                        src: [SRC + 'js/lib/angular/angular.min.js'],
                        flatten: true,
                        dest: DIST + 'js'
                    }
                ]
            },
            images: {
                files: [
                	{
                        expand: true,
                        src: [SRC + 'img/*'],
                        flatten: true,
                        dest: DIST + 'img'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        src: [SRC + 'font/*'],
                        flatten: true,
                        dest: DIST + 'font'
                    }
                ]
            }
        },

        watch: {
    		cssDist: {
    			files: DIST + 'css/*.css',
    			options: {
    				livereload: true
    			}
    		},
    		htmlDist: {
    			files: DIST + '*.html',
    			options: {
    				livereload: true
    			}
    		},
    		viewsDist: {
    			files: DIST + 'views/*.html',
    			options: {
    				livereload: true
    			}
    		},
    		jsDist: {
    			files: DIST + 'js/*.js',
    			options: {
    				livereload: true
    			}
    		},
    		imgDist: {
    			files: DIST + 'img/*',
    			options: {
    				livereload: true
    			}
    		},
    		htmlSrc: {
    			files: SRC + 'html/*.html',
    			tasks: 'copy:html'
    		},
    		viewsSrc: {
    			files: SRC + 'views/*.html',
    			tasks: 'copy:views'
    		},
    		scssSrc: {
    			files: SRC + 'scss/{,*/}*.scss',
    			tasks: 'sass'
    		},
    		jsSrc: {
    			files: SRC + 'js/{,*/}*.js',
    			tasks: 'uglify'
    		},
    		imgSrc: {
    			files: SRC + 'img/*',
    			tasks: 'copy:img'
    		}
        },
        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: ['**']
        },
    });

    // Load Tasks:
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('build', ['copy', 'uglify', 'sass']);
    grunt.registerTask('pages', ['build', 'gh-pages']);
}