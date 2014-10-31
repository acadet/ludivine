module.exports = function(grunt) {
	var pkg = require('./package.json');
	var jsOut = 'ludivine.' + pkg.version + '.min.js';
	var tsOut = 'ludivine.' + pkg.version + '.min.ts';

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-rename');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-zip');

	grunt.initConfig({
		clean : {
			commands : ['tscommand**.txt'],
			release : [jsOut, tsOut]
		},
		rename : {
			release : {
				src : 'out/ludivine.min.js',
				dest : jsOut
			}
		},
		shell : {
			testing : {
				command : 'python buildLauncher.py out/testing.js testing/src 1 5000 false'
			},
			release : {
				command : 'python tsMinifier.py src ref.ts ' + tsOut
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
		uglify : {
			release : {
				options : {
					compress : true,
					mangle : false,
					preserveComments : false
				},
				files : {
					'out/ludivine.min.js' : 'out/ludivine.js'
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
				tasks : ['ts:build', 'ts:testing', 'clean:commands', 'shell:testing'],
				options : {
					interrupt : true,
					atBegin : true
				}
			}
		},
		zip : {
			release : {
				src : [
					jsOut,
					tsOut
				],
				dest : 'ludivine.' + pkg.version + '.zip',
				compression : 'DEFLATE'
			}
		}
	});

	grunt.registerTask('build', ['watch:builder']);
	grunt.registerTask('test', ['watch:tester']);
	grunt.registerTask(
		'release',
		[
			'ts:build',
			'uglify:release',
			'rename:release',
			'shell:release',
			'zip:release',
			'clean:release'
		]
	);
};