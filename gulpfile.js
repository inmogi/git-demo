/*
* @Author: kenny
* @Date:   2017-02-14 11:12:12
* @Last Modified by:   kenny
* @Last Modified time: 2017-02-14 13:20:12
*/

'use strict';

/**
 * 1.LESS编译 压缩 --合并没有必要，一般预处理css可以导包
 * 2.JS合并 压缩 混淆
 * 3.img复制
 * 4.html压缩
 */

// 在gulpfile中先载入gulp包，因为这个包提供了一些api
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

// 1.less编译 压缩
gulp.task('style',function () {
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({stream:true}));
});

// 2.JS合并 压缩混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({stream:true}));
});

// 3.图片复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({stream:true}));
});

// 4.HTML
var htmlmin = require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace:true,
		removeComments:true
	}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream:true}));
});

// 启动一个服务，监视文件变化
var browserSync = require('browser-sync');
gulp.task('serve',function(){
	browserSync({server: {baseDir:['dist']},}, function(err, bs) {
    	console.log(bs.options.getIn(["urls", "local"]));
	});
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);
});