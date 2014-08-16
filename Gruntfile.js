module.exports = function (grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'js/*.js', '!js/vendor/*']
    },
    sass:{ // task
      dist:{ // target
        options:{// target options
          style: 'compact' // nested, compact, compressed, expanded
        },
        files:{ // dictionary of files in 'destination' : 'source' format
          'assets/css/main.css' : 'scss/main.scss'
        }
      }
    },

    uglify:{
      all:{
        files:{
          'assets/js/prettygist.min.js': ['js/*.js', '!js/vendor/*.js']
        }
      }
    },

    watch:{
      jshint: {
        files: ['Gruntfile.js','scss/*.scss', 'js/*.js', '!js/prettygist.min.js'],
        tasks: ['sass','jshint', 'uglify']
      }
    }

  });

  // Load the grunt plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Register the default tasks
  grunt.registerTask('default', ['watch']);
};
