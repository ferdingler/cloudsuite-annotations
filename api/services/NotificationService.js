module.exports = {
	
	fetchShareDetails:function(assetIdParam,res,func) {

		var url = '/dhap/dmsvc/api/externaljs/v1/assets/' + assetIdParam;
		var http = require('http');
		var serviceName = sails.config.mcp.serviceName;
		var serviceKey = sails.config.mcp.serviceKey;
		var servicePrincipalId = sails.config.mcp.principalId;
		var responseData = '';

		var options = {
	      hostname: sails.config.mcp.domainName,
	      port: 80,
	      path: url,
	      method: 'GET',
	      headers: {
	      	'Dhap-Service-Name': serviceName,
	      	'Dhap-Service-Key': serviceKey,
	      	'Dhap-Principal-Id': servicePrincipalId
	      }
	    };
		  
		http.request(options, function(response) {
	      
		    response.setEncoding('utf8');

		    response.on('data', function(chunk){
		      responseData += chunk;
		    });

		    response.on('error', function(err){
		    	console.log("errr "+err);
		    	responseData = {
		    		error: true, 
		    		data : err
		    	};
		    });
		    
		    response.on('end', function(){
		      
		      try {
		      	//console.log(JSON.stringify(responseData));
				var resData = func(responseData);
					NotificationService.notify(resData,res);	
				
		      } catch (e) {
		        sails.log.warn('Could not parse response from options.hostname: ' + e);
		      }
		    });
			
		 }).end();
		return 'success';
	},

	parseUserDetails:function(comment, responseData){
		var data = comment;
		var process=function(responseData){
		  	var datat = JSON.parse(responseData);
		  	var users=datat.sharedWith;
		  	var json = [];
		  	var parentAssetId = datat.parentAssetId;
		  	var assetId = datat.assetId;
		  	for(var i=0;i<users.length;i++){

		  		var url='';	
				if(parentAssetId.indexOf(':root') > -1)
			  		url = sails.config.mcp.dataManagerUrl;
				else
			  		url = sails.config.mcp.dataManagerUrl + '?folderId=' + parentAssetId;

			  	var body = comment;
			  	body += '<br/><br/>';
			  	body += url;

		  		json.push({
		  			sender: sails.config.mcp.NMServiceName,
		  			recipientUsername: users[i],
		  			templateId: 'myTemplate',
		  			messageParameters: {},
		  			defaultMessageBody: body,
		  			defaultSubject: comment,
		  			important: true
		  		});

		  	}
		  	return json;
		};
		return process;
	},

	/**
		notify method takes two parameters json array data to be iterated and sent notifications
		response object to send final response to the user.
	*/
	notify:function(jsonData,res){
		var url = '/nm/nmsvc/api/system/v1/notification/sendmessage';

		var jsonArr = jsonData;
		var http = require('http');
		
		var serviceName=sails.config.mcp.serviceName;
		var serviceKey=sails.config.mcp.serviceKey;
		
		for(var i=0;i<jsonArr.length;i++){

			var notificationString = JSON.stringify(jsonArr[i]);
			var options = {
		      hostname: sails.config.mcp.domainName,
		      port: 80,
		      path: url,
		      method: 'POST',
		      data:notificationString,
		      headers: {'Content-Type':'application/json'}
		    };
			var responseData = '';
			  
			var req = http.request(options, function(response) {
				
				response.setEncoding('utf8');
	   			response.on('data', function(chunk){
				    responseData += chunk;
			
			    });
			    response.on('error', function(err){
			    	console.log("errr "+err);
			    	responseData = '{"error": "true","data" : err}';
			     
			    });
			    
			    response.on('end', function(){
					res.send(200);	 
			    });
				
			 });
			req.on('error', function(e) {
			  console.log('problem with request: ' + e.message);
			});
			req.write(notificationString);
			req.end();
		}
	}
};