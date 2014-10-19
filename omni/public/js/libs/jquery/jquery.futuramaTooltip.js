(function( $ ) {
	$.fn.futuramaTooltip = function( opts ) {
		opts = opts || []
		//handle options
		var content = opts['content'] || ''
		var borderSize = parseInt(opts['borderSize'] || 1)
		var borderColor = opts['borderColor'] || '#ccc'
		var backgroundColor = opts['backgroundColor'] || '#fff'
		var arrowWidth = parseInt(opts['arrowWidth'] || 8)
		var arrowOffset = parseInt( opts['arrowOffset'] || 10 ) 
		var arrowPosition = opts['arrowPosition'] || 'topLeft'
			
		var button = this;
		var mainDiv = ($('body').find('.hover_'+button.attr('id')+'[data-selector="'+button.attr('id')+'"]')) 
		if(mainDiv.length == 0) {
			mainDiv = $('<div class="hover_'+button.attr('id')+'" data-selector="'+button.attr('id')+'"></div>')
		}
		
		var innerArrowDiv = $('<div></div>');
		var outerArrowDiv = $('<div></div>');
		var contentDiv = $('<div></div>')

		if (content == undefined ){
			content = button.attr('title') || '';
		}
		if (!content.jquery) {
			contentDiv.html(content)
		}
		
		//add the divs
		mainDiv
			.empty()
			.css({
				visibility: 'hidden'
			})
			.appendTo('body')
	
	
		/*
		 * handle styling
		 */	
		var innerLeft = 'auto'
		var outerLeft = 'auto'

		var innerRight = 'auto'
		var outerRight = 'auto'

		var innerTop = 'auto'
		var outerTop = 'auto'

		var innerBorderTop = 'solid transparent'
		var innerBorderLeft = 'solid transparent'
		var innerBorderRight = 'solid transparent'
		var innerBorderBottom = 'solid transparent'

		var outerBorderTop = 'solid transparent'
		var outerBorderLeft = 'solid transparent'
		var outerBorderRight = 'solid transparent'
		var outerBorderBottom = 'solid transparent'

		var marginTop = '0px'
		var marginLeft = '0px'
		var marginRight = '0px'

		switch (arrowPosition) {
			case 'topLeft':
				innerLeft = arrowOffset + 'px'
				outerLeft = arrowOffset - borderSize + 'px'
				innerTop = -1 * (arrowWidth) + 'px'
				outerTop = -1 * (arrowWidth + borderSize + 1 ) + 'px'
				innerBorderTop = 'none' 
				outerBorderTop = 'none' 
				innerBorderBottom = 'solid ' + backgroundColor
				outerBorderBottom = 'solid ' + borderColor
				marginTop = arrowWidth + borderSize + 1
				break
			case 'topRight':
				innerRight = arrowOffset + 'px'
				outerRight = arrowOffset - borderSize + 'px'
				innerTop = -1 * (arrowWidth) + 'px'
				outerTop = -1 * (arrowWidth + borderSize + 1) + 'px'
				innerBorderTop = 'none' 
				outerBorderTop = 'none' 
				innerBorderBottom = 'solid ' + backgroundColor
				outerBorderBottom = 'solid ' + borderColor
				marginTop = arrowWidth + borderSize + 1 + 'px'
				break
			case 'left':
				innerLeft = -1 * (arrowWidth) + 'px'
				outerLeft = -1 * (arrowWidth + borderSize + 1 ) + 'px'
				innerTop = arrowOffset + 'px'
				outerTop = arrowOffset - borderSize + 'px'
				innerBorderRight = 'solid ' + backgroundColor
				outerBorderRight = 'solid ' + borderColor
				innerBorderLeft = 'none' 
				outerBorderLeft = 'none' 
				marginLeft = arrowWidth + borderSize + 1 + 'px'
				break
			case 'right':
				innerRight = -1 * (arrowWidth) + 'px'
				outerRight = -1 * (arrowWidth + borderSize + 1 ) + 'px'
				innerTop = arrowOffset + 'px'
				outerTop = arrowOffset - borderSize + 'px'
				innerBorderLeft = 'solid ' + backgroundColor
				outerBorderLeft = 'solid ' + borderColor
				innerBorderRight = 'none' 
				outerBorderRight = 'none' 
				marginRight = arrowWidth + borderSize + 1 + 'px'
				break
		}
		
		//create the inner arrow
		innerArrowDiv.css({
			content:           '',
			display:           'block',
			position:          'absolute',
			top:               innerTop, /*should be set to -1 * (border-width) */
			right:             innerRight,
			left:              innerLeft,
			width:             '0',
			height:            '0',
			border:            'solid transparent',
			borderTop:         innerBorderTop,
			borderLeft:        innerBorderLeft,
			borderRight:       innerBorderRight,
			borderBottom:      innerBorderBottom,
			borderWidth:       arrowWidth+'px'
		})
		
		//create the outer arrow
		outerArrowDiv.css({
			content:           '',
			display:           'block',
			position:          'absolute',
			top:               outerTop, /*should be set to ( -1 * (border-width) + 1 ) */
			right:             outerRight, 
			left:              outerLeft,
			width:             '0',
			height:            '0',
			border:            'solid transparent',
			borderTop:         outerBorderTop,
			borderLeft:        outerBorderLeft,
			borderRight:       outerBorderRight,
			borderBottom:      outerBorderBottom,
			borderWidth:       arrowWidth + borderSize + 'px' /* afterBorderWidth + borderSizeOfMain */
		})
		
		//create the content div
		contentDiv
			.css({
				position:     'absolute',
				display:      'block',
				border:       borderSize + 'px solid '+borderColor,
				background:   backgroundColor,
				borderRadius: '4px',
				boxShadow:    '0px 0px 7px rgba(0,0,0,0.2)',
				color:        '#777',
				minWidth:     '80px',
				minHeight:    '30px',
				marginTop:    marginTop,
				marginLeft:   marginLeft,
				marginRight:  marginRight
			})
			.empty()
			.append(content)
			.append(outerArrowDiv)
			.append(innerArrowDiv)
			.appendTo(mainDiv)
			.addClass('hover_'+button.attr('id'))
	
		
		//add the class to the button	
		button.addClass('hover_'+button.attr('id'))
		
		
		function placeTooltip() {
			var leftOffset = 'auto'
			var topOffset = 'auto'
			switch(arrowPosition){
				case 'topLeft':
					leftOffset = button.offset().left + (button.outerWidth()/2) - (arrowOffset + (outerArrowDiv.outerWidth()/2)) + "px"
					topOffset = button.offset().top + button.outerHeight() + "px"
					break
				
				case 'topRight':
					leftOffset = button.offset().left + (button.outerWidth()/2) - (contentDiv.outerWidth()) + arrowOffset + (outerArrowDiv.outerWidth()/2) + "px"
					topOffset = button.offset().top + button.outerHeight() + "px"
					break
				
				case 'left':
					leftOffset = button.offset().left + button.outerWidth() + "px"
					topOffset = button.offset().top + button.outerHeight()/2 - arrowOffset - outerArrowDiv.outerHeight()/2 + "px" // - arrowOffset - outerArrowDiv.outerWidth() + "px"
					break
				
				case 'right':
					leftOffset = button.offset().left - contentDiv.outerWidth() - outerArrowDiv.outerWidth() + "px"
					topOffset = button.offset().top + button.outerHeight()/2 - arrowOffset - outerArrowDiv.outerHeight()/2 + "px" // - arrowOffset - outerArrowDiv.outerWidth() + "px"
					break
			}
			
			mainDiv.css({
				width:      contentDiv.outerWidth(true) + "px",
				height:     contentDiv.outerHeight(true) + "px",
				position:   'absolute',
				top:        topOffset,
				left:       leftOffset,
				zIndex:     '3'
			})
		}
			
		function showTooltip() {
			placeTooltip();
			mainDiv.css({
				visibility: "visible",
			})
			
			//close window when mousing out, disable mouse enter showing languages...
			$(document).on('mouseout click touchstart', hideTooltip);
			
			button
				.off( 'mouseout click touchstart', showTooltip )
				.addClass('active')
		}
		
		function hideTooltip(e) {
			//Don't close it if the the thing you're mousing over is the button or the tooltip....
			if (e != undefined) {
				if ($(e.target).hasClass('hover_'+button.attr('id')) ||
					$(e.target).parents('.hover_'+button.attr('id')).length >= 1 
				) {
					return;
				}
			}
			
			//display the lanugage selection box
			mainDiv.css({
				visibility: "hidden"
			})
			
			//turn off the hide listener, turn on the show listener
			$(document).off('mouseout click touchstart', hideTooltip)
			
			//register the action on the button
			button
				.on('mouseenter click touchstart', showTooltip )
				.removeClass('active')
		}
		
		//register the action on the button
		button
			.off( 'mouseenter click touchstart', showTooltip )
			.on( 'mouseenter click touchstart', showTooltip )

		//chain away.	
		return this;
	}
}( jQuery ));
