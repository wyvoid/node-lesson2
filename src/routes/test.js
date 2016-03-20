
'use strict';

module.exports = function(done){

	$.router.get('/', function(req, res, next){

		res.end('time： ${new Date()}');
	});

	done();

};