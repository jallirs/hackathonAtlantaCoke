define (
	[ 	'jquery', 
		'backbone', 
		'router', 
		'backbone.poller',
		'views/main/mainView'
	], 
	
	function ( 
		$, 
		Backbone,
		Router,
		Poller,
		MainView
	) {
		var App = {
			
			init: function() {
				

				//handle the proper scoping
				_.bindAll ( 
					this, 
					'longPollFetchModels'
				);
				
				
				//Create the router
				var router = new Router();
				
				//Create the models and collections	
				this.models = {
					//'device':             new DeviceModel()
				};
				
				//start listening for future updates
				//this.wsFetchModels();
				
				//create the main view
				this.mainView = new MainView({ 
					router:                       router
					//deviceModel:                  this.models['device']
				}).render();
				//console.log(">>>> Login Models");
				//console.log(this.models);	
				//define paths on the router
				var self = this;
				router.route('*path', function() { self.mainView.navigate('home') } );
				router.route('home', function() { self.mainView.navigate('home') } );
				//start the router history
				Backbone.history.start();
			},
		
			
			
			/**
			 * fetch the models via long-polling
			 **/
			longPollFetchModels: function(id) {
				if ( !id || id == undefined ) id = 0;
			
				var self = this;
				$.ajax(
				{
					dataType: "json",
					url: 'api/all', 
					data: {'messageId': id},
					success: function(response) {
						var data_length = response.messages.length;
						for (var i=0; i<data_length; i++){
							self.models[response.messages[i].modelName].set(response.messages[i].data)
						}
					}
				})
				.always(function(response, textStatus) {
					if (response.nextMessage) {
						id = response.nextMessage
					}
					
					if (textStatus != 'error') {
						self.longPollFetchModels(id);
					}
					else {
						setTimeout( function() { self.longPollFetchModels(0) }, 1000);
					}
				});
			}

		};
		
		return App; 
	}
);
