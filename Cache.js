var crypto = require('crypto');
var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = Cache;

function Cache(dir) {
	this.dir = dir;
}

var sha1sum = function(input) {
	return crypto.createHash('sha1').update(input.toString()).digest('hex');
};

function removeTrailingSlash(url) {
	return url ? url.replace(/\/+$/, '') : '';
}

function formatAndHashURL(url) {
	// Remove trailing and hash the url
	return sha1sum(removeTrailingSlash(url));
}

Cache.prototype.add = function(url, content, done) {
	mkdirp(this.dir, function() {
		fs.writeFile(this.dir + '/' + formatAndHashURL(url), content, done);
	});
};

Cache.prototype.get = function(url, cb) {
	fs.readFile(this.dir + '/' + formatAndHashURL(url), 'utf-8', function(err, result) {
		cb(err, result);
	});
};