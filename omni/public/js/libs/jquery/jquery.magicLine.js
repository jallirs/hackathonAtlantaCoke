(function( $ ) {
	$.fn.magicLine = function( opts ) {
		//configure away
		var lineColor = '#61cd17';	
		var borderColor = '#d9d9d9';
		var lineWidth = '4px';
		var fontColor = '#999';
		var hoverColor = '#777';
		var direction = 'horizontal';
		var selectColor = '#777';
		var crowd = false;
		var upper = false;
		false	
		if (opts){
			if ( opts['borderColor'] != undefined ) {
				borderColor = opts['borderColor'];
			}
			
			if ( opts['lineColor'] != undefined ) {
				lineColor = opts['lineColor'];
			}
			
			if ( opts['lineWidth'] != undefined ) {
				lineWidth = opts['lineWidth'];
			}

			if ( opts['fontColor'] != undefined ) {
				fontColor = opts['fontColor'];
			}

			if ( opts['hoverColor'] != undefined ) {
				hoverColor = opts['hoverColor'];
			}

			if ( opts['direction'] != undefined ) {
				direction = opts['direction'];
			}
			
			if ( opts['selectColor'] != undefined ) {
				selectColor = opts['selectColor'];
			}

			if (opts['crowd'] != undefined ){ 
				crowd = opts['crowd'];
			}
			
			if (opts['upper'] != undefined ){ 
				upper = opts['upper'];
			}
		}

		//remove old added classes & stylings.
		this.attr('style', '');
		this.find('li').attr('style', '');
		this.find('li a').attr('style', '');
		this.find('.magicLine').remove();
		if(this.parent().hasClass('magicLineWrapper')){
			this.unwrap();
		}
				
		//add the wrapper and the magic line
		var wrapper = this.wrap('<div class="magicLineWrapper"></div>');
		var magicLine = $("<li class='magicLine'></li>");

		//style
		if ( direction == 'horizontal') {

			var borderBottom = lineWidth+' solid '+borderColor;
			var borderTop = 'none';
			if (upper) {
				borderBottom = 'none';
				borderTop = lineWidth+' solid '+borderColor;
			}
			
			wrapper.css({
				'margin': '0px 0px 0px 0px',
				'padding': '0px',
				'border-bottom': borderBottom,
				'border-top': borderTop
			});
			
			this.css({
				'position': 'relative',
				'display': 'block',
				'margin': '0em 0em .4em 0em',
				'padding': '0px',
				'list-style': 'none',
				'width': '100%', 
			});
			
			var maxWidth = 'none';	
			var width = 100/(this.find('li').size()) +'%'; 
			var marginLeft = '0px';
			var marginRight = '0px';
			if (crowd) {
				maxWidth = (( 100/(this.find('li').size()) ) - 4 ) +'%';
				width = 'auto';
				marginLeft = '2%';
				marginRight = '2%';
			}
			this.find('li').css({
				'display':'inline',
				'float': 'left',
				'width': width,
				'maxWidth': maxWidth,
				'margin': '20%',
				'textAlign': 'center',
				'padding': '0px',
				'margin': '0px',
				'marginLeft': marginLeft,
				'marginRight': marginRight,
			});

			this.find('li a').css({
				'width': '100%',
				'color': fontColor,
				'display': 'block',
				'float': 'left',
				'margin': '0px',
				'padding': '0px',
				'text-decoration': 'none',
			});
			
			var positionBottom = '-'+lineWidth;
			var positionTop	= 'auto';
			if (upper) {
				var positionTop = '-'+lineWidth;
				var positionBottom	= 'auto';
			}
			magicLine.appendTo(this).css({
				'position': 'absolute',
				'bottom':   positionBottom,
				'top':      positionTop, 
				'left':     '0',
				'width':    '0px',
				'height':   lineWidth,
				'background': lineColor,
			});
		}


		else if ( direction == 'vertical' ) {
			wrapper.css({
				'margin': '0px 0px 0px 0px',
				'padding': '0px',
				'border-left': lineWidth+' solid '+borderColor,
				'width': '100%'
			});
			
			this.css({
				'position': 'relative',
				'display': 'block',
				'margin': '0em 0em .4em 0em',
				'padding': '0px',
				'list-style': 'none',
				'width': '100%'
			});
			
			this.find('li').css({
				'display':'block',
				'width': '100%',
				'textAlign': 'left',
				'padding': '0px',
				'margin': '0px'
			});
			
			this.find('li a').css({
				'width': '100%',
				'color': fontColor,
				'display': 'block',
				'float': 'left',
				'margin': '0px',
				'padding': '0px',
				'text-decoration': 'none',
				'padding-left': '.3em'
			});
			
			magicLine.appendTo(this).css({
				'position': 'absolute',
				'top':     '0',
				'left':   '-'+lineWidth,
				'width':    lineWidth,
				'height':   '0px',
				'background': lineColor,
			});
		}


		//add the magic of moving the nav
		this.find('li a').hover(
			function() {
				$(this).css({ color: hoverColor });
			},
			function() {
				var $el = $(this);
				if ( $el.hasClass('selected') ) {
					$el.css({ 'color': selectColor });
				}
				else {
					$el.css({ 'color': fontColor });
				}
			}
		)

		var currentClicked = this.find('.selected');
		
		var ul = $(this);	
		function moveLine($el) {
			//move horizontal
			if ( direction == 'horizontal') {
				var left = $el.position().left;
				var width = $el.outerWidth(); 

				if (crowd) {
					left = left - ((ul.width() * .04 )/2);
					if (left < 0 ) left = 0;
					width = width + (ul.width()*.04);
				}


				magicLine.stop().animate({
					'left':  left,
					'width': width
				});
			}
		
			//move vertical
			else if ( direction == 'vertical' ) {
				magicLine.stop().animate({
					'top':    $el.position().top,
					'height': $el.outerHeight() 
				});
			}
		}
		
		this.find('li a').on(
			'click', 
			function(event) {
				event.preventDefault();
				var $el = $(this);
				
				moveLine($el);
					
				//add styling
				currentClicked.removeClass('selected');
				currentClicked.css('color', fontColor);
				
				//add the styling to the current class
				$el.addClass('selected');
				$el.css('color', selectColor);
				currentClicked = $el;

			}
		);
		
		//select currently selected
		//handle window resizing	
		$(window).resize(function(){
			if (!currentClicked) return;
			moveLine(currentClicked);	
		});
		
		return this;
	};
}( jQuery ));
