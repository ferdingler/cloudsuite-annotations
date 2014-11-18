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
	},

	create: function(req, res){

		Annotation.create(req.body).exec(function createCB(err,created){

			var comment = req.body.comment + '<br/>' + req.body.url;
			var assetIdParam = req.body.assetId;
			console.log(comment);
			var fun = NotificationService.parseUserDetails(comment);
			NotificationService.fetchShareDetails(assetIdParam, res, fun);

		});
		
	}
	
};

