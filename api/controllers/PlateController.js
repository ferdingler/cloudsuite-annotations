/**
 * PlateController
 *
 * @description :: Server-side logic for managing plates
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	view: function(req, res){
		res.view('plate');
	},

	dummyPlate: function(req, res){

		var data = [];
		data.push(['ID', '', '', '', '']);
		var c = 1;
    	for(var i=1; i<12; i+=2){
			for(var j=1; j<12; j+=2){
	    		data.push([c + '', i, j, 'Not annotated', 1]);
	    		c++;
	    	}    		
    	}

    	return res.send(data);
	}
	
};

