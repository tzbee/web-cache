var fs = require('fs');
var mkdirp = require('mkdirp');
var sha1 = require('sha-1');
var path = require('path');
var validUrl = require('valid-url');

module.exports = Cache;

function Cache(dir) {
	this.dir = dir;
}

function removeTrailingSlash(url) {
	return url ? url.replace(/\/+$/, '') : '';
}

function formatInput(input) {
	return removeTrailingSlash(input);
}

function formatAndHashURL(url) {
	// Remove trailing and hash the url
	return sha1(formatInput(url));
}

function isValidURL(str) {
	return validUrl.is_web_uri(str);
}

Cache.prototype.add = function(url, content, cb) {
	if (!url || !content) {
		cb(new Error('No key or value to add'));
		return;
	}

	if (typeof url != 'string')  {
		cb(new Error('Url ' + url + ' is not a string'));
		return;
	}

	if(!isValidURL(url)) {
		cb(new Error('Url ' + url + ' is not a valid url'));
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