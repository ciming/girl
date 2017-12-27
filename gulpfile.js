const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const connect = require('gulp-connect');
const adaptive = require('postcss-adaptive');

gulp.task('css', function () {
	
	var plugins = [
		cssnext(),
		adaptive({ remUnit: 75 })
	];
	return gulp.src('./src/css/**/*.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(connect.reload());
});


gulp.task('html', function () {
	return gulp.src('./src/*.html')
		.pipe(gulp.dest('./dist'))
		.pipe(connect.reload());
})


gulp.task('build', ['css', 'html']);

gulp.task('watch', ['build'], function () {
	connect.server({
    root: 'dist',
		livereload: true,
		port: 8888
  });
	gulp.watch('src/css/**/*.css', ['css']);
	gulp.watch('src/*.html', ['html']);
})