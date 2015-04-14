var assert = require('assert');
var rimraf = require('rimraf');
var Cache = require('../Cache');

var cacheDir = __dirname + '/cache';
var cache;

describe('Cache', function() {
	var emptyCache = function(done) {
		rimraf(cacheDir, function() {
			done();
		});
	};

	beforeEach(function(done) {
		emptyCache(function() {
			cache = new Cache(cacheDir);
			done();
		});
	});

	after(emptyCache);

	describe('get', function() {

		it('should return an error if a key is null', function(done) {
			cache.get(null, function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a key is undefined', function(done) {
			cache.get(undefined, function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a key is empty', function(done) {
			cache.get('', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should get an element present in the cache', function(done) {

			cache.add('http://foo.com/bar', 'value', function() {
				cache.get('http://foo.com/bar', function(err, value) {
					assert.equal(err, null);
					assert.strictEqual(value, 'value');
					done();
				});
			});
		});

		it('should return an error if a key is not in the cache', function(done) {
			cache.get('notAKey', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});
	});


	describe('add', function() {
		it('should return an error if a key is null', function(done) {
			cache.add(null, 'value', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a key is undefined', function(done) {
			cache.add(undefined, 'value', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a key is empty', function(done) {
			cache.add('', 'value', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a value is null', function(done) {
			cache.add('key', null, function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a value is undefined', function(done) {
			cache.add('key', undefined, function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a value is empty', function(done) {
			cache.add('key', '', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error key is not a string', function(done) {
			cache.add(2, 'value', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if the key is not a valid url', function(done) {
			cache.add('key', 'value', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should add a file to the cache if the key is a valid url', function(done) {
			cache.add('http://foo.com/bar', 'value', function(err) {
				assert.equal(err, null);

				cache.get('http://foo.com/bar', function(err, value) {
					assert.equal(err, null);
					assert.equal(value, 'value');
					done();
				});
			});
		});
	});
});