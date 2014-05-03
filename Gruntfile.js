// Generated on 2014-02-20 using generator-angular-fullstack 1.2.7
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/unit/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/unit/**/*.js'

var ports = require('./ports'),
    localIP = require('./test/config/localIP'),
    gridIP = 'http://10.65.93.108:4444/wd/hub';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },
        express: {
            options: {
                port: process.env.PORT || ports.DEV
            },
            dev: {
                options: {
                    script: 'server.js',
                    debug: true
                }
            },
            functional: {
                options: {
                    port: process.env.PORT || ports.FUNCTIONAL,
                    script: 'server.js'
                }
            },
            e2e: {
                options: {
                    port: process.env.PORT || ports.E2E,
                    script: 'server.js'
                }
            },
            prod: {
                options: {
                    script: 'dist/server.js',
                    node_env: 'production'
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        watch: {
            js: {
                files: ['<%= yeoman.app %>/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            jsTest: {
                files: ['test/client/unit/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'test-unit']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/{,*//*}*.{html,jade}',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*//*}*.css',
                    '{.tmp,<%= yeoman.app %>}/{,*//*}*.js',
                    '<%= yeoman.app %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
                ],

                options: {
                    livereload: true
                }
            },
            express: {
                files: [
                    'server.js',
                    'server/**/*.{js,json}'
                ],
                tasks: ['newer:jshint:server', 'express:dev', 'wait'],
                options: {
                    livereload: true,
                    nospawn: true //Without this option specified express won't be reloaded
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                ignores: ['app/bower_components/*']
            },
            server: {
                options: {
                    jshintrc: 'server/.jshintrc'
                },
                src: [ 'server/{,*/}*.js']
            },
            all: [
                '<%= yeoman.app %>/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/client/unit/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/public/*',
                            '!<%= yeoman.dist %>/public/.git*'
                        ]
                    }
                ]
            },
            heroku: {
                files: [
                    {
                        dot: true,
                        src: [
                            'heroku/*',
                            '!heroku/.git*',
                            '!heroku/Procfile'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        'string-replace': {
            autonotelet: {
                files: {
                    'app/index.html': 'app/index.html'
                },
                options: {}
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },

        // Automatically inject Bower components into the app
        'bower-install': {
            app: {
                html: '<%= yeoman.app %>/index.html',
                ignorePath: '<%= yeoman.app %>/',
                exclude: ['bootstrap-sass']
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>',
                fontsDir: '<%= yeoman.app %>/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/public/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/public/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/public/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/public/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/public/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: ['<%= yeoman.app %>/index.html',
                '<%= yeoman.app %>/index.jade'],
            options: {
                dest: '<%= yeoman.dist %>/public'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/public/{,*/}*.html',
                '<%= yeoman.dist %>/public/components/**/*.html',
                '<%= yeoman.dist %>/public/{,*/}*.jade'],
            css: ['<%= yeoman.dist %>/public/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>/public']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: '<%= yeoman.dist %>/public/images'
                    }
                ]
            }
        },

        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/public/images'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    //collapseWhitespace: true,
                    //collapseBooleanAttributes: true,
                    //removeCommentsFromCDATA: true,
                    //removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: ['*.html', 'components/**/*.html', 'views/**/*.html', 'mainpage/**/*.html'],
                        dest: '<%= yeoman.dist %>/public'
                    }
                ]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '*.js',
                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>/public',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'bower_components/**/*',
                            'images/{,*/}*.{webp}',
                            'fonts/**/*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: '**/*.jade'
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/public/images',
                        src: ['generated/*']
                    },
                    { // This replaces the image minification task
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        dest: '<%= yeoman.dist %>/public/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}'
                    },
                    {
                        expand: true,
                        dest: '<%= yeoman.dist %>',
                        src: [
                            'package.json',
                            'server.js',
                            'server/**/*'
                        ]
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist',
                //  'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/config/karma.conf.js'
            }
        },

        jasmine_node: {
            options: {

            },
            server: ['test/server/unit/'],
            functional: ['test/server/functional/']
        },

        protractor: {
            options: {
                configFile: 'node_modules/grunt-protractor-runner/node_modules/protractor/referenceConf.js',
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false // If true, protractor will not use colors in its output.

                // Unfortunately putting *any* args here overrides the target specific args...
            },
            e2e: {
                configFile: 'test/config/protractor.e2e.conf.js',
                options: {
                    args: {
                        browser: grunt.option('protractor-browser') || 'firefox',
                        seleniumAddress: grunt.option('grid') ? (grunt.option('grid') === true ? gridIP : grunt.option('grid')) : '\0',
                        baseUrl: grunt.option('baseUrl') || 'http://' + localIP + ':' + ports.E2E
                    }
                }
            },
            functional: {
                configFile: 'test/config/protractor.functional.conf.js',
                options: {
                    args: {
                        browser: grunt.option('protractor-browser') || 'firefox',
                        seleniumAddress: grunt.option('grid') ? (grunt.option('grid') === true ? gridIP : grunt.option('grid')) : '\0',
                        baseUrl: grunt.option('baseUrl') || 'http://' + localIP + ':' + ports.FUNCTIONAL
                    }
                }
            }
        },

        uglify: {
            options: {
                // These options will help you debug problems caused by minification
//                mangle:false,
//                beautify: true,
//                preserveComments: true
            }
        }
    });

    // Used for delaying livereload until after server has restarted
    grunt.registerTask('wait', function () {
        grunt.log.ok('Waiting for server reload...');

        var done = this.async();

        setTimeout(function () {
            grunt.log.writeln('Done waiting!');
            done();
        }, 500);
    });

    grunt.registerTask('express-keepalive', 'Keep grunt running', function () {
        var resume = this.async();
        grunt.log.writeln('Press enter to exit');

        process.stdin.on('data', function () {
            resume();
        });
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'express:prod', 'open', 'express-keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'bower-install',
            'concurrent:server',
            'autoprefixer',
            'express:dev',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    // @todo: replace this with grunt.options in the e2e config files
    grunt.registerTask('cucumber-options', function (key, value) {
        var options = {
            browser: 'capabilities.browserName',
            tags: 'cucumberOpts.tags'
        };

        if (!options[key]) {
            grunt.fail.warn('Invalid cucumber option "' + key + '". Valid options are: [' + Object.keys(options).join(', ') + '].');
        }

        var config = grunt.config('protractor');
        for (var propertyName in config) {
            if (config.hasOwnProperty(propertyName) && propertyName !== 'options') {
                grunt.config('protractor.' + propertyName + '.options.args.' + options[key], value);
            }
        }
    });

    grunt.registerTask('test-unit', [
        'karma:unit',
        'jasmine_node:server'
    ]);

    grunt.registerTask('test-functional', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'express:functional',
        'protractor:functional',
        'jasmine_node:functional'
    ]);

    grunt.registerTask('test-e2e', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'express:e2e',
        'protractor:e2e'
    ]);

    grunt.registerTask('test', [
        'karma:unit',
        'jasmine_node:server',
        'test-functional',
        'express:e2e',
        'protractor:e2e'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'bower-install',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test-all',
        'build'
    ]);


    grunt.registerTask('run-functional-server', [
        'express:functional',
        'express-keepalive'
    ]);

    grunt.registerTask('run-e2e-server', [
        'express:e2e',
        'express-keepalive'
    ]);

//    register others task
 //   grunt.loadTasks('tasks');
};
