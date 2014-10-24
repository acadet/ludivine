module.exports = function(grunt) {
	var pkg = require('./package.json');

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		clean : {
			commands : ['tscommand**.txt']
		},
		shell : {
			testing : {
				command : [
					'cd out/',
					'python buildLauncher.py testing.js ../testing/src 1 5000 false'
				].join('&&')
			}
		},
		ts : {
			build : {
				src : ['src/*.ts', 'src/**/*.ts'],
				html : false,
				reference : 'src/ref.ts',
				out : 'out/ludivine.js',
				outDir : false,
				watch : false,
				options : {
					target : 'es3',
					module : 'commonjs',
					sourceMap : false,
					declaration : false,
					removeComments : true
				}
			},
			testing : {
				src : ['testing/*.ts', 'testing/**/*.ts'],
				html : false,
				reference : 'testing/ref.ts',
				out : 'out/testing.js',
				outDir : false,
				watch : false,
				options : {
					target : 'es3',
					module : 'commonjs',
					sourceMap : false,
					declaration : false,
					removeComments : true
				}
			}
		},
		watch : {
			builder : {
				files : ['src/*.ts', 'src/**/*.ts'],
				tasks : ['ts:build', 'clean:commands'],
				options : {
					interrupt : true,
					atBegin : true
				}
			},
			tester : {
				files : ['src/*.ts', 'src/**/*.ts', 'testing/*.ts', 'testing/**/*.ts'],
				tasks : ['ts:testing', 'clean:commands', 'shell:testing'],
				options : {
					interrupt : true,
					atBegin : true
				}
			}
		}
	});

	grunt.registerTask('build', ['watch:builder']);
	grunt.registerTask('test', ['watch:tester']);
};