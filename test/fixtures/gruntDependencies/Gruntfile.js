'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            main: {
                files: {
                    "assets/js/app.js": [
                        "assets/js/main.js",
                        "assets/js/analytics.js"
                    ]
                }
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'assets/css',
                    ext: '.min.css'
                }]
            }
        }
    });

    [
        'grunt-contrib-uglify',
        'grunt-contrib-cssmin'
    ].forEach( function( task ) {
        grunt.loadNpmTasks( task );
    });

    grunt.registerTask('default', ['uglify', 'cssmin']);
};
