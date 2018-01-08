var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');


// Compile Sass into scss and auto inject it into browsers
gulp.task('sass', function(){
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'scss/*.scss'])
		.pipe(sass())
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream());
});

// Move the JavaScript files into /src/js folder
gulp.task('js', function(){
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.min.js' ])
		.pipe(gulp.dest('src/js'))
		.pipe(browserSync.stream());
});


// Static html Server + watching scss/html files
gulp.task('serve', ['sass'], function(){
	browserSync.init({
		server: "./src"
	});

	gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'scss/*.scss'], ['sass']);
	gulp.watch("src/*.html").on('change', browserSync.reload);
});

// type gulp in command line to start server and move JS files
gulp.task('default', ['js', 'serve']);