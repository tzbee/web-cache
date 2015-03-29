var assert = require("assert");
var rimraf = require('rimraf');
var Cache = require('../Cache');

var cacheDir = __dirname + '/cache';

describe('Cache', function() {
	var emptyCache = function(done) {
		rimraf(cacheDir, function() {
			done();
		});
	};

	beforeEach(emptyCache);
	after(emptyCache);

	describe('get', function() {
		it('should return an error if a key is null', function(done) {
			var cache = new Cache(cacheDir);

			cache.get(null, function(err, value) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a key is undefined', function(done) {
			var cache = new Cache(cacheDir);

			cache.get(undefined, function(err, value) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a key is empty', function(done) {
			var cache = new Cache(cacheDir);

			cache.get('', function(err, value) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should get an element present in the cache', function(done) {
			var cache = new Cache(cacheDir);

			cache.add('key', 'value', function() {
				cache.get('key', function(err, value) {
					assert.equal(err, null);
					assert.strictEqual(value, 'value');
					done();
				});
			});
		});

		it('should return an error if a key is not in the cache', function(done) {
			var cache = new Cache(cacheDir);

			cache.get('notAKey', function(err, value) {
				assert.notEqual(err, null);
				done();
			});
		});
	});


	describe('add', function() {
		it('should return an error if a key is null', function(done) {
			var cache = new Cache(cacheDir);

			cache.add(null, 'value', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a key is undefined', function(done) {
			var cache = new Cache(cacheDir);

			cache.add(undefined, 'value', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a key is empty', function(done) {
			var cache = new Cache(cacheDir);

			cache.add('', 'value', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a value is null', function(done) {
			var cache = new Cache(cacheDir);

			cache.add('key', null, function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a value is undefined', function(done) {
			var cache = new Cache(cacheDir);

			cache.add('key', undefined, function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a value is empty', function(done) {
			var cache = new Cache(cacheDir);

			cache.add('key', '', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should add a file to the cache', function(done) {
			var cache = new Cache(cacheDir);

			cache.add('key', 'value', function(err) {
				assert.equal(err, null);

				cache.get('key', function(err, value) {
					assert.equal(err, null);
					assert.equal(value, 'value');
					done();
				});
			});
		});
	});
});