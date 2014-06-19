module.exports = function (grunt){
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'js/*.js', '!js/vendor/*.js', '!js/prettygist.min.js']
    },

    uglify:{
      all:{
        files:{
          'js/prettygist.min.js': ['js/*.js', '!js/vendor/*.js']
        }
      }
    },

    watch:{
      jshint: {
        files: ['Gruntfile.js', 'js/*.js', '!js/prettygist.min.js'],
        tasks: ['jshint', 'uglify']
      }
    }

  });

  // Load the grunt plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Register the default tasks
  grunt.registerTask('default', ['watch']);
};
