define (
	[ 'backbone' ], 
	function(Backbone) {
		var Collection = Backbone.Collection.extend({
			idAttribute: 'id',
			sendUpdate: function(id, value){
				//handle binding the token
				$.ajax({
					type: 'PUT',
					url: this.url+'/'+id,
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
			}
		});
		
		return Collection;
	}
);
