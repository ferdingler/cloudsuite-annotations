/**
 * AnnotationController
 *
 * @description :: Server-side logic for managing annotations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	get: function(req, res){

		res.header('Access-Control-Allow-Origin', req.headers.origin);

		var assetIdParam = req.param('assetId');
		var annotations = [];

		Annotation.find({
			assetId: assetIdParam
		}).exec(function(err, data){
			annotations = data;
			res.send(annotations);
		});
	}
	
};

