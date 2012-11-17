//TODO support http://wiki.apache.org/solr/FieldCollapsing?highlight=%28field%29%7C%28collapsing%29
/**
 * Modules dependencies
 */

var mocha = require('mocha'),
	assert = require('chai').assert,
	libPath = process.env['SOLR_CLIENT_COV'] ? '../lib-cov' : '../lib',
	solr = require( libPath + '/solr'),
	sassert = require('./sassert');

// Test suite
var client = solr.createClient();


describe('Group',function(){

	describe('#groupBy(field), callback)',function(){
		it('should return grouped results',function(done){
			var query = client.createQuery()
				.q({
					title_t: 'title1'
				})
				.groupBy('title_t');
			client.search(query, function(err, data){
				sassert.ok(err, data);
				assert(data.responseHeader.params.group);
				assert.equal('title_t', data.responseHeader.params['group.field']);
				done();
			});
		});
	});
});
