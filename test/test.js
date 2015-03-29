var assert = require("assert");
var Cache = require('../Cache');


describe('Cache', function() {
	describe('get', function() {
		it('should return an error if a key is null', function(done) {
			var cache = new Cache('./cache1');

			cache.get(null, function(err, value) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a key is undefined', function(done) {
			var cache = new Cache('./cache1');

			cache.get(undefined, function(err, value) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a key is empty', function(done) {
			var cache = new Cache('./cache1');

			cache.get('', function(err, value) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should get an element present in the cache', function(done) {
			var cache = new Cache('./cache1');

			cache.get('key', function(err, value) {
				assert.equal(err, null);
				assert.strictEqual(value, 'value');
				done();
			});
		});

		it('should return an error if a key is not in the cache', function(done) {
			var cache = new Cache('./cache1');

			cache.get('notAKey', function(err, value) {
				assert.notEqual(err, null);
				done();
			});
		});
	});


	describe('add', function() {
		it('should return an error if a key is null', function(done) {
			var cache = new Cache('./cache1');

			cache.add(null, 'value', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a key is undefined', function(done) {
			var cache = new Cache('./cache1');

			cache.add(undefined, 'value', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a key is empty', function(done) {
			var cache = new Cache('./cache1');

			cache.add('', 'value', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a value is null', function(done) {
			var cache = new Cache('./cache1');

			cache.add('key', null, function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a value is undefined', function(done) {
			var cache = new Cache('./cache1');

			cache.add('key', undefined, function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should return an error if a value is empty', function(done) {
			var cache = new Cache('./cache1');

			cache.add('key', '', function(err) {
				assert.notEqual(err, null);
				done();
			});
		});

		it('should add a file to the cache', function(done) {
			var cache = new Cache('./cache1');

			cache.add('key', 'value', function(err) {
				assert.equal(err, null);
				done();
			});
		});
	});
});