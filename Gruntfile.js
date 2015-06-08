module.exports = function(grunt) {

  "use strict";

  var srcFiles = ['src/*.js'];
  var libFiles = ['lib/*.js'];
  var destFile = 'bitlisten.min.js';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      all: {
        options: {
          port: 8000,
          keepalive: true
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> Copyright (c) <%= grunt.template.today("yyyy") %> Maximillian Laumeister, see README.md for license info. */\n',
        sourceMap: true,
        sourceMapIncludeSources: true
      },
      build: {
        src: libFiles.concat(srcFiles),
        dest: destFile
      }
    },
    jshint: {
      all: {
        src: srcFiles.concat(['Gruntfile.js'])
      }
    },
    todos: {
      all: {
        options: {
          verbose: false
        },
        src: srcFiles
      }
    },
    watch: {
      all: {
        files: srcFiles.concat(['Gruntfile.js']),
        tasks: ['newer:jshint:all', 'uglify', 'connect'],
        options: {
          interrupt: true,
          atBegin: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-todos');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['jshint', 'uglify']);
};

