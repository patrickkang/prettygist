module.exports = function(grunt){
  'use strict';

  // load grunt-jslint
  grunt.loadNpmTasks('grunt-jslint');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json');

    jslint:{
      prebuild:{
        options: {
          jshintrc: '.jshintrc'
        },
        files:{
          src:{
            'Gruntfile.js',
            'js/*.js'
          }
        }
      }
    }
  });

  grunt.registerTask('lint', 'Run linting', ['jslint']);
}