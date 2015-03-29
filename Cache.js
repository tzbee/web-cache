var fs = require('fs');
var mkdirp = require('mkdirp');
var sha1 = require('sha-1');
var path = require('path');


function Cache(dir) {
	this.dir = dir;
}

function removeTrailingSlash(url) {
	return url ? url.replace(/\/+$/, '') : '';
}

function formatAndHashURL(url) {
	// Remove trailing and hash the url
	return sha1(removeTrailingSlash(url));
}

Cache.prototype.add = function(url, content, cb) {
	if (!url || !content) {
		cb(new Error('No key or value to add'));
		return;
	}

	mkdirp(this.dir, function() {
		fs.writeFile(path.join(this.dir, formatAndHashURL(url)), content, cb);
	}.bind(this));
};

Cache.prototype.get = function(url, cb) {
	if (!url) {
		cb(new Error('No key to get'));
		return;
	}

	fs.readFile(path.join(this.dir, formatAndHashURL(url)), 'utf-8', function(err, result) {
		cb(err, result);
	});
};


module.exports = Cache;