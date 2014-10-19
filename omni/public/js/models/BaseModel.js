define (
	[ 'backbone' ], 
	function(Backbone) {
		var Model = Backbone.Model.extend({
			idAttribute: 'id',
			sendUpdate: function(value, callback) {
				//handle binding the token
				$.ajaxSetup({
					headers: {
						'authentication_token' : sessionStorage.getItem('auth_token_webui')
						}
				});
 				//send the ajax update
				$.ajax({
					type: 'PUT',
					url: this.url,
					dataType: "json",
					data: JSON.stringify({
						'value': value
					}),
					contentType: 'application/json',
				}).always(function(response, textStatus){
					if ( callback != undefined ) {
						callback(response, textStatus);
					}
				});
			},
		});
		
		return Model;
	}
);
