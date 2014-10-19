define (
	//dependencies
	[	'jquery', 
		'backbone', 
		'handlebars',
		'i18n!nls/mainDict', 
		'text!templates/main/mainViewTemplate.template'
	],
	
	//definition
	function (
		$,
		Backbone, 
		Handlebars, 
		i18nDict, 
		MainViewTemplate
	) {
		var View = Backbone.View.extend({
			el: $('body'),
			
			initialize: function(options) {
				//fix scoping through binding
				_.bindAll( 
					this, 
					'render',
					'close'
				);

				this.options = options;
				
				//set the current nav
				this.currentNav = this.homeLink;
				
				//handle the main view
				this.mainViewTemplate = Handlebars.compile(MainViewTemplate);
				return this;
			},
			
			render: function() {
				//compile the template
				var mainViewTemplate_compiled = this.mainViewTemplate( i18nDict );
				
				//post the template
				this.$el.html( mainViewTemplate_compiled );
				return this;
			},
			
			close: function() {
			
				//close yourself
				this.$el.empty();
				
				return this;
			}
		});
		
		return View;
	}
);
