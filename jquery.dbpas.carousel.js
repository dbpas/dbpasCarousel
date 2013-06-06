/*
 *dbpasCarousel - another jquery carousel plugin!
 *version 0.1
 *copyright(c) 2013, dbpas llc, http://www.dbpas.com/
 *dual licensed under mit and gpl
 *
 *inspired by http://web.enavu.com/tutorials/making-an-infinite-jquery-carousel/
 *
*/

//polyfill, object.create
if (!Object.create) {
  Object.create = (function(){
		function F(){}
		return function(o){
			if (arguments.length != 1) {
				throw new Error('Object.create implementation only accepts one parameter.');
			}
			F.prototype = o;
			return new F()
		}
	})();
}

;(function($, win, doc, undefined) {
	'use strict';
	
	function destroy(elem) {
		var $data = $.data($(elem)[0], 'dbpasCarousel');                                //get jquery data to remove timer

		if ($data) {
			clearInterval($data.timerHandle);                                       //remove timer
			
			$(elem).parent().parent().find('*').off('.dbpasCarousel');              //remove all events on descendants
			
			$(elem).unwrap().unwrap().siblings('[data-carousel-control]').remove(); //remove control structure around ul
			$(elem).find('.caption').remove();                                      //remove any image captions
			$(elem).removeAttr('style').children().removeAttr('style');             //remove inline styles
			
			$(elem).removeData('dbpasCarousel');                                    //remove jquery data
		}else{
			console.log('dbpasCarousel: unable to destroy selected element!');
		}
	}
	
	var Carousel = {
		init: function(options, elem) {
			var self = this;
			
			self.elem = elem;
			self.$elem = $(elem);
			
			self.options = $.extend({}, $.fn.dbpasCarousel.options, options);
			
			self.timerHandle = null;
			self.$queue = $({});
			
			self.build(); //build control structure around ul
			
			self.$wrapper = self.$elem.parent();
			self.$controlLeft = self.$wrapper.siblings('[data-carousel-control="left"]');
			self.$controlRight =  self.$wrapper.siblings('[data-carousel-control="right"]');
			self.$li = self.$elem.find('li'),
			
			self.maxOuterWidth = 0;
			self.maxWidth = 0;
			
			self.$li.each(function() {
				if ($(this).outerWidth() >= self.maxOuterWidth) {                                             //get max width to apply to all items for smooth movement
					self.maxOuterWidth = $(this).outerWidth();
					self.maxWidth = $(this).width();
				}
				if (self.options.imgCaption && $(this).find('img:first').attr('alt')) {                       //image caption enabled, assume first image alt is caption
					$(this).append($('<p/>').addClass('caption').html($(this).find('img:first').attr('alt')));
				}
			});
			
			self.$li.css({'width': (self.maxWidth) + 'px'});                                                //give all items uniform width for smooth movement
			self.$wrapper.css({'max-width': (self.maxOuterWidth * self.options.itemsVisible) + 'px'});      //adjust wrapper width to show X items
			self.$elem.css({'left': '-' + self.maxOuterWidth + 'px'});                                      //move list to the left of view by 1 item width
			self.$elem.find('li:first').before($(self.$elem.find('li:last')));                              //makes sure first item is showing
			
			self.events();
			
			self.complete();
		},
		
		build: function() {
			var self = this;
			
			//wrap ul by 2 divs for formating and add navigation controls
			self.$elem.wrap($('<div />').attr('data-carousel-name', self.$elem.attr('id') || '')).wrap($('<div />').attr('data-carousel-control', 'wrapper'));
			self.$elem.parent().parent().prepend($('<div />').attr('data-carousel-control', 'left').html('&laquo;')).append($('<div />').attr('data-carousel-control', 'right').html('&raquo;'));
		},
		
		navigation: function(direction) {
			var self = this;
			
			self.leftIndent = 0;
			
			if (direction == 'right') {
				self.leftIndent = parseInt(self.$elem.css('left')) + self.maxOuterWidth;  //move list to the right of view by 1 item width
				self.$queue.queue('dbpasCarouselMove', function(next) {                   //queue the moving of item to front of list to be dequeued in animation
					self.$elem.find('li:first').before($(self.$elem.find('li:last')));
					next();
				});
			}else{
				self.leftIndent = parseInt(self.$elem.css('left')) - self.maxOuterWidth;  //move list to the left of view by 1 item width
				self.$queue.queue('dbpasCarouselMove', function(next) {                   //queue the moving of item to back of list to be dequeued in animation
					self.$elem.find('li:last').after($(self.$elem.find('li:first')));
					next();
				});
			}
			
			self.$elem.not(':animated').animate(
				{'left': self.leftIndent},
				self.options.slideDelay,
				function() {
					self.$queue.dequeue('dbpasCarouselMove');                   //move item to front/back of list
					self.$elem.css({'left': '-' + self.maxOuterWidth + 'px'});  //move list to the left/right of view by 1 item width
				}
			);		
		},
		
		timer: function(action) {
			var self = this;
			
			if (action == 'start') {
				self.timerHandle = setInterval(function() {
					self.navigation('left');                        //auto slide always goes left
				}, self.options.autoDelay);
			}else{
				clearInterval(self.timerHandle);
			}
		},
		
		events: function() {
			var self = this, eventNS = '.dbpasCarousel',
				pauseActionStart, pauseActionStop, controlAction;
			
			if ('ontouchstart' in doc.documentElement) {              //check for touch events
				controlAction = 'touchstart' + eventNS;
				pauseActionStart = 'touchstart' + eventNS;
				pauseActionStop = 'touchend' + eventNS;
			}else{
				controlAction = 'click' + eventNS;
				pauseActionStart = 'mouseenter' + eventNS;
				pauseActionStop = 'mouseleave' + eventNS;
				$('body').addClass('no-touch');                   //add class to disable :hover
			}
			
			if (self.options.autoSlide) {
				self.timer('start');
			
				if (self.options.hoverPause) {
					self.$wrapper.parent().on(pauseActionStart, function() {
						self.timer('stop');
					});
						
					self.$wrapper.parent().on(pauseActionStop, function() {
						self.timer('start');
					});
				}
			}
			
			self.$controlLeft.on(controlAction, function() {
				self.navigation('left');
			});
			
			self.$controlRight.on(controlAction, function() {
				self.navigation('right');
			});
		},
		
		complete: function() {
			var self = this;
			
			if (typeof self.options.onComplete === 'function') {
				self.options.onComplete.apply(self.$elem);
			}
		}
	};
	
	$.fn.dbpasCarousel = function(options) {
		return this.each(function() {
			if (this.tagName.toLowerCase() == 'ul') {  //must be ul to work
				if (typeof options === 'string') {
					switch(options.toLowerCase()) {
						case 'destroy':
							destroy(this);
							break;
						default:
							console.log('dbpasCarousel: "' + options + '" is an invalid method!');
					}
				}else{
					var carousel = Object.create(Carousel);
					
					carousel.init(options, this);
					
					$.data(this, 'dbpasCarousel', carousel); //make data available for later use
				}
			}else{
				console.log('dbpasCarousel: selected element is not a "UL"!');
			}
		});
	};
	
	$.fn.dbpasCarousel.options = {
		itemsVisible: 2,  //for smooth movement, leave at a minimum 2 items out of view
		slideDelay: 500,  //milliseconds
		autoSlide: 0,     //0-off 1-on
		autoDelay: 5000,  //milliseconds
		hoverPause: 1,    //0-off 1-on
		imgCaption: 1,    //0-off 1-on
		onComplete: null  //callback function
	};

})(jQuery, window, document);
