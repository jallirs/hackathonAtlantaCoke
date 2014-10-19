var locale = localStorage.getItem('locale') || 'en-us';

//require.js configuration
require.config({
	//set the locale
	locale: locale,

	//paths
	paths: {
		'jquery':                 'libs/jquery/jquery-2.0.3.min',
		'underscore':             'libs/underscore/underscore-min',
		'handlebars':             'libs/handlebars/handlebars',
		'backbone':               'libs/backbone/backbone-min',
		'baseModel':              'models/BaseModel',
		'baseCollection':         'collections/BaseCollection',
		'backbone.poller':        'libs/backbone/backbone.poller.min',
		'moment':                 'libs/moments/moment.min',
		'raphael':                'libs/raphael/raphael-min',
		'snap':                   'libs/snap/snap.svg-min',
		'chartJS':                'libs/chartJS/Chart.min',
		'fitText':                'libs/jquery/jquery.fittext',
		'magicLineNav':           'libs/jquery/jquery.magicLine',
		'futuramaTooltip':        'libs/jquery/jquery.futuramaTooltip',
		'waypoints':              'libs/jquery/waypoints.min',
		'waypoints.sticky':       'libs/jquery/waypoints-sticky.min',
		'foundation':             'libs/foundation/foundation',
		'foundation.tooltips':    'libs/foundation/foundation.tooltip',
		'foundation.reveal':      'libs/foundation/foundation.reveal',
		'foundation.modernizr':   'libs/foundation/foundation.modernizr',
		'text':                   'libs/require/text',
		'i18n':                   'libs/require/i18n'
	},
	
	//shims
	shim: {
		'underscore': {
			exports: '_'
		},
		
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},

		'handlebars': {
			exports: 'Handlebars'
		},

		'fitText': {
			deps: ['jquery']
		},

		'magicLineNav': {
			deps: ['jquery']
		},
		
		'futuramaTooltip': {
			deps: ['jquery']
		},

		'chartJS': {
			deps: ['jquery'],
			exports: 'Chart'
		},
		
		'waypoints': {
			deps: ['jquery']
		},
		
		'waypoints.sticky': {
			deps: ['jquery', 'waypoints']
		},

		'foundation': {
			deps: ['jquery', 'foundation.modernizr']
		},

		'foundation.tooltips': {
			deps: ['jquery', 'foundation', 'foundation.modernizr']
		},

		'foundation.reveal': {
			deps: ['jquery', 'foundation', 'foundation.modernizr']
		},
	}
}); 

//runner
require(['app'], function(App) {
	App.init();
});
