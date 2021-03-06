/**
* Annotation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	userId: {
  		type: 'string',
  		required: true
  	},
  	assetId: {
  		type: 'string',
  		required: true
  	},
  	comment: {
  		type: 'string',
  		required: true
  	},
    url: {
      type: 'string'
    },
  	metadata: {
  		type: 'json'
  	}
  }
};

