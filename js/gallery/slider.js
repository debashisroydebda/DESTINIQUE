/**
 * Created by cdragu on 11.04.2017.
 * Problems
 *   - When render the iframe the transition is affected.
 *      - Load all when page is loading - This will increase the page load
 */

(function ($, window, document) {

    Drupal.behaviors.wvr_slider = {
        attach: function (context, settings) {
            $('.wvr_slider_main_wrapper:not(.processed)').addClass('processed').wvrSlider();
        }
    };
    /**
     * Main slider plugin
     * @param options
     * @returns {*}
     */
    jQuery.fn.wvrSlider = function (options) {
        //Default options
        var defaults = {
            loadedImageBeforeShow: 2,
            classes              : []
        };
        //Extend default options with
        var settings = $.extend({}, defaults, options);
        return this.each(function () {
            var self               = $(this);
            var mainSlider         = self.find('.main_slider_wrapper');
            var overlaySlider      = self.find('.overlay_slider_wrapper');
            var items              = self.find('.item-list ul li');
            var ul                 = self.find('.item-list ul');
            var globalSettings     = ul.data();
            var defaultTitle       = globalSettings.title;
            var defaultImage       = globalSettings.image;
            var itemsList          = {};
            var imageCount         = 0;
            //Possible keys
            var keys               = {
                tab        : 9,
                enter      : 13,
                esc        : 27,
                space      : 32,
                left       : 37,
                up         : 38,
                right      : 39,
                down       : 40,
                tabAndShift: 109
            };
            var actionFromKeyboard = false;
            /**
             * Create a ratio for an object -
             * @param object  - image iframe div etc.
             * @param maxWidth - max width dimension
             * @param maxHeight - max height dimension
             */
            var containerRatio     = function (object, maxWidth, maxHeight) {
                var height = $(object).outerHeight();
                var width  = $(object).outerWidth();
                maxHeight  = maxHeight || 0;
                maxWidth   = maxWidth || 0;
                //Calculate width
                if (width > maxWidth) {
                    ratio = maxWidth / width;
                    $(object).css({
                        width : maxWidth,
                        height: height * ratio
                    });
                    height = height * ratio;
                    width  = width * ratio;
                } else if (height > maxHeight) {
                    //Calculate Height
                    ratio = maxHeight / height;
                    $(object).css({
                        width : width * ratio,
                        height: maxHeight
                    });
                    width  = width * ratio;
                    height = height * ratio;
                } else {
                    $(object).css({
                        width : width,
                        height: height
                    });
                }
            };
            //Process the slide item after slide stop - Bootstrap event notation
            var globalSlid         = function (event, options) {
                var data   = $(event.relatedTarget).data('wvrSliderItem');
                var iframe = options.screen.find('.video_showed').find('iframe');
                if (data.element.iframe && $(event.relatedTarget).find('iframe').length == 0) {
                    data.element.iframe.clone().css({
                        width : options.width,
                        height: options.height
                    }).hide().appendTo($(event.relatedTarget));
                }

                if (iframe.length) {
                    iframe
                        .hide()
                        .attr('src', iframe.attr('src').replace('?autoplay=1', ''));
                    options.screen.find('.glyphicon').show();
                }
                options.screen.find('.video_showed').removeClass('video_showed');
            };
            //Process the slide item before slide start  - Bootstrap event notation
            var globalSlide        = function (event, options) {
                var data = $(event.relatedTarget).data('wvrSliderItem');
                if (data.element.iframe && !data.element.image && $(event.relatedTarget).find('iframe').length == 0) {
                    data.element.iframe.clone().css({
                        width : options.width,
                        height: options.height
                    }).appendTo($(event.relatedTarget));
                }
            };


            //Preload images before show the slider controls
            var preloadImages = {
                length: 0,
                loaded: 0,
                self  : this,
                check : function () {
                    var cssClasses = ['.left-arrow', '.right-arrow', '.gallery', '.main.screen'];
                    if (this.loaded >= settings.loadedImageBeforeShow) {
                        cssClasses.forEach(function (value, index) {
                            mainSlider.find(value).addClass('show_element');
                        });
                        mainSlider.find('.loader').hide();
                    }
                }
            };

            /**
             * Main slider class
             * @type {{leftArrow, screenLeft, rightArrow, screenRight, loader, btnGallery, screen, width: number, height: number, maxWidth: number, imageCover: boolean, processItems: processItems, addMiniSlide: addSlide, processControls: processControls, resize: resize, init: init}}
             */
            var mainSliderClass    = {
                leftArrow   : mainSlider.find('.left-arrow'),
                screenLeft  : mainSlider.find('.left-arrow .screen'),
                rightArrow  : mainSlider.find('.right-arrow'),
                screenRight : mainSlider.find('.right-arrow .screen'),
                loader      : mainSlider.find('.loader'),
                btnGallery  : mainSlider.find('.gallery'),
                screen      : mainSlider.find('.main.screen'),
                width       : 0,
                height      : 0,
                maxWidth    : 0,
                imageCover  : true,
                /**
                 * Process items and create each slide
                 */
                processItems: function processItems() {
                    var self        = this;
                    var globalIndex = 0;
                    $.each(itemsList, function (key, data) {
                        if (typeof data == 'object') {
                            $.each(data, function (index, element) {
                                var slideItem     = $('<div>')
                                    .addClass('item')
                                    .data('wvrSliderItem', {
                                    key    : key,
                                    element: element
                                }).appendTo(self.screen);
                                var miniImage     = null;
                                //Set current slide item to element in order to be accessible when image is loaded
                                element.slideItem = slideItem;
                                //set the first slide item active
                                //TODO - if the fist slide has iframe add it
                                if (globalIndex == 0) {
                                    slideItem.addClass('active');
                                }
                                //Process the image
                                if (element.image) {

                                    var slideImage = element.image.clone();
                                    var altImage = slideImage.attr('alt');
                                    var titleImage = slideImage.attr('title');
                                    var ariaLabel = '';
                                    if(altImage.length) {
                                        ariaLabel = altImage;
                                    }else  if (titleImage.length) {
                                        ariaLabel = titleImage;
                                    }
                                    if(ariaLabel.length) {
                                        slideItem.attr('aria-label',ariaLabel);
                                    }
                                    slideImage.attr('role','image');
                                    slideImage.appendTo(slideItem);
                                    miniImage = element.image.attr('src');
                                    if (element.iframe) {
                                        slideItem.css({'cursor': 'pointer'});
                                        $('<span>').addClass('glyphicon glyphicon-play-circle').appendTo(slideItem);
                                        slideItem.on('click', function () {
                                            slideItem.addClass('video_showed').find('.glyphicon').hide();
                                            slideItem.find('iframe').show().attr('src',
                                                slideItem.find('iframe').attr('src') + '?autoplay=1'
                                            );
                                        })
                                    }
                                    if (self.imageCover) {
                                        slideImage.hide();
                                        //Is not the miniImage but because is the same image we can used
                                        slideItem.css('background-image', 'url("' + miniImage + '")')
                                    }
                                } else {
                                    miniImage = defaultImage;
                                }

                                //Process mini image
                                self.addMiniSlide({
                                    src   : miniImage,
                                    parent: self.screenLeft,
                                    index : globalIndex,
                                    type  : 'end',
                                    length: items.length - 1
                                });
                                //Process mini image
                                self.addMiniSlide({
                                    src   : miniImage,
                                    parent: self.screenRight,
                                    index : globalIndex,
                                    type  : 'first'
                                });
                                ++globalIndex;
                            })
                        }

                    });
                },
                /**
                 * Add mini sliders in the left and right slide arrow
                 * @param options
                 */
                addMiniSlide: function addSlide(options) {
                    defaults        = {
                        src   : null,
                        parent: null,
                        index : 0,
                        type  : 'first',
                        length: -1
                    };
                    var slideItem   = $('<div>').addClass('item');
                    var imageObject = $('<img>');
                    var settings    = $.extend({}, defaults, options);
                    if (settings.src && settings.parent) {
                        slideItem.css('background-image', 'url("' + settings.src + '")');
                        imageObject.attr('src', settings.src).load(function () {
                            if (this.height > this.width) {
                                slideItem.addClass('s94auto')
                            } else {
                                slideItem.addClass('sauto94')
                            }
                        });


                        slideItem.appendTo(settings.parent).css({
                            width : settings.parent.width(),
                            height: settings.parent.height()
                        });

                        if (settings.type == 'first' && settings.index == 1) {
                            slideItem.addClass('active')
                        }
                        if (settings.type == 'end' && settings.index == settings.length) {
                            slideItem.addClass('active')
                        }
                    }
                },

                /**
                 * Process all controls need it for the main slider
                 */
                processControls: function processControls() {
                    var self = this;
                    self.leftArrow.bind('click', function () {
                        self.screen.data('bs.carousel').prev();
                        self.screenLeft.data('bs.carousel').prev();
                        self.screenRight.data('bs.carousel').prev();

                    });
                    self.rightArrow.bind('click', function () {
                        self.screen.data('bs.carousel').next();
                        self.screenLeft.data('bs.carousel').next();
                        self.screenRight.data('bs.carousel').next();
                    });

                    self.btnGallery.bind('click', function () {
                        overlaySliderClass.show();
                    });


                },
                /**
                 * Resize all the item when window is resizing
                 */
                resize         : function resize() {
                    this.width  = self.outerWidth();
                    this.height = self.outerHeight();
                    //Set screen dimensions
                    this.screen.css({
                        width : this.width,
                        height: this.height
                    }).find('.item').css({
                        width : this.width,
                        height: this.height
                    }).find('iframe').css({
                        width : this.width,
                        height: this.height
                    });
                },
                /**
                 * Init the slider
                 */
                init           : function init() {
                    var self = this;
                    if (!items.length) {
                        return 0;
                    }
                    self.processItems();
                    self.resize();
                    self.processControls();
                    self.screen.carousel({
                        interval: 0
                    }).on('slid.bs.carousel', function (event) {
                        globalSlid(event, {
                            screen: self.screen,
                            width : self.width,
                            height: self.height
                        })
                    }).on('slide.bs.carousel', function (event) {
                        globalSlide(event, {
                            screen: self.screen,
                            width : self.width,
                            height: self.height
                        })
                    });
                    self.screenLeft.carousel({
                        interval: 0
                    });
                    self.screenRight.carousel({
                        interval: 0
                    });

                    self.attachEvents();
                },
                /**
                 * Trigger the left right event.
                 * @param direction
                 */
                eventLeftRight : function eventLeftRight(direction) {
                    switch (direction) {
                        case 'left':
                            this.leftArrow.trigger('click');
                            break;
                        case 'right':
                            this.rightArrow.trigger('click');
                            break;
                    }
                },

                attachEvents: function attachEvents() {
                    var self = this;
                    mainSlider.on('keydown', function keyboardListener(event) {
                        var which  = event.which;
                        var target = event.target;
                        if (which === 9 && event.shiftKey) {
                            which = keys.tabAndShift;
                        }
                        actionFromKeyboard = true;
                        switch (which) {
                            case keys.left:
                                self.eventLeftRight('left');
                                event.preventDefault();
                                break;
                            case keys.right:
                                self.eventLeftRight('right');
                                event.preventDefault();
                                break;
                            case keys.enter:
                            case keys.space:
                                var focused = $(':focus');
                                focused.trigger('click');
                                self.leftArrow.attr('aria-selected','false');
                                self.rightArrow.attr('aria-selected','false');
                                if(focused.hasClass('left-arrow') || focused.hasClass('right-arrow') ) {
                                    focused.attr('aria-selected','true')
                                }
                                event.preventDefault();
                                break;
                        }
                        //Wait 20 miliseconds and set the action from keyboard false
                        setTimeout(function () {
                            actionFromKeyboard = false;
                        }, 20);

                    });
                }
            };
            /**
             * Overlay slider - Is similar with the main but has different parts
             * @type {{btnClose, tabs: (*), leftArrow, rightArrow, header, screen, miniScreen, movie, imageCover: boolean, processItems: processItems, init: init, show: show, processControls: processControls, createSlider: createSlider, resize: resize, resizeMiniMovie: resizeMiniMovie, miniItemIsVisible: miniItemIsVisible, addMiniSlide: addSlide}}
             */
            var overlaySliderClass = {
                btnClose         : overlaySlider.find('.close_icon'),
                tabs             : $('<ul>'),
                slideDetails     : $('<div>').addClass('slide-details'),
                slideDetailsCount: null,
                slideDetailsTitle: null,
                leftArrow        : overlaySlider.find('.left-arrow'),
                rightArrow       : overlaySlider.find('.right-arrow'),
                header           : overlaySlider.find('.header'),
                screen           : overlaySlider.find('.main.screen'),
                miniScreen       : overlaySlider.find('.mini.slider'),
                movie            : overlaySlider.find('.mini.slider .movie'),
                imageCover       : true,
                maxHeight        : 0,
                maxWidth         : 0,
                totalSlides      : 0,
                selectedTab      : 0,
                /**
                 * Process items form the header
                 */
                processTabItems  : function processItems() {
                    var data = ul.data();
                    var self = this;
                    self.tabs.appendTo(self.header);
                    self.slideDetails.appendTo(self.header);
                    $.each(data, function (key, value) {
                        if (key.match(/Label/)) {
                            var li   = $('<li>').appendTo(self.tabs);
                            var a    = $('<a>').html(value).addClass('tab-stop').attr('href', 'javascript:;').appendTo(li);
                            var span = $('<span>').appendTo(li);
                            li.bind('click', function () {
                                self.tabs.find('.active').removeClass('active');
                                $(this).addClass('active');
                                self.createSlider(key.replace(/Label/, ''));
                            })
                        }
                    });
                    self.slideDetailsCount = $('<div>').addClass('slide-count').appendTo(self.slideDetails);
                    self.slideDetailsTitle = $('<div>').addClass('slide-title').appendTo(self.slideDetails);
                },
                /**
                 * Init the class
                 */
                init             : function init() {
                    var self = this;

                    if (!items.length) {
                        return 0;
                    }
                    self.processTabItems();
                    self.processControls();
                    self.screen.carousel({
                        interval: 0
                    }).on('slide.bs.carousel', function (e) {
                        //process the item in the mini carousel
                        if (self.movie.find('.item').length) {
                            var nextItem = self.movie.find('.item').eq($(e.relatedTarget).index());
                            self.movie.find('.item.active').removeClass('active');
                            nextItem.addClass('active');
                            //Verify if the nextItem is visible
                            if (!self.miniItemIsVisible(nextItem)) {
                                var width       = nextItem.outerWidth(true);
                                var movieWindth = self.movie.width();
                                var movieLeft   = -1 * parseInt(self.movie.css('left'));
                                var maxLeft     = self.movie.width() - self.miniScreen.width();
                                //If we are on first item move slider to start
                                if (nextItem.index() == 0) {
                                    self.movie.css({left: 0})
                                } else
                                //If we are on last item move slider to end
                                if (nextItem.index() == self.movie.find('.item').length - 1) {
                                    self.movie.css({left: (-1) * maxLeft})
                                } else {
                                    //Calculate next position
                                    var nextLeft;
                                    if (e.direction == 'left') {
                                        nextLeft = movieLeft + width;
                                    } else {
                                        nextLeft = movieLeft - width;
                                    }
                                    if (nextLeft > maxLeft) {
                                        self.movie.css({left: (-1) * maxLeft})
                                    } else {
                                        self.movie.css({left: (-1) * nextLeft})
                                    }
                                }
                            }
                        }
                        globalSlid(e, {
                            screen: self.screen,
                            width : self.maxWidth,
                            height: self.maxHeight
                        });
                        self.setSlideDetails($(e.relatedTarget))
                    }).on('slide.bs.carousel', function (event) {
                        globalSlide(event, {
                            screen: self.screen,
                            width : self.maxWidth,
                            height: self.maxHeight
                        })
                    });

                    self.attachEvents();
                    overlaySlider.focus();


                }
                ,
                /**
                 * Show the overlay slider
                 */
                show             : function show() {
                    var self = this;
                    overlaySlider.show();
                    $('body').addClass('wvr_overlay_slider');
                    overlaySlider.find('.header').find('ul li:first-child').trigger('click');
                    overlaySlider[0].offsetWidth // force reflow
                    overlaySlider.addClass('show');
                }
                ,
                /**
                 *  Process controls
                 */
                processControls  : function processControls() {
                    var self = this;
                    self.btnClose.bind('click', function () {
                        overlaySlider.removeClass('show');
                        setTimeout(function () {
                            overlaySlider.hide();
                            $('body.wvr_overlay_slider').removeClass('wvr_overlay_slider')
                            //Reset the html of the screen
                            self.screen.html('');
                            //Reset movie elements
                            self.movie.html('').css({left: 0});
                        }, 500)
                    });
                    self.leftArrow.bind('click', function () {
                        self.screen.data('bs.carousel').prev();

                    });
                    self.rightArrow.bind('click', function () {
                        self.screen.data('bs.carousel').next();

                    });
                },
                /**
                 * For each tab we replace the item from slider with the item according to the tab type
                 * @param type
                 */
                createSlider     : function createSlider(type) {
                    var self = this;
                    //Reset the html of the screen
                    self.screen.html('');
                    //Reset movie elements
                    self.movie.html('').css({left: 0});
                    var customIndex = 0;
                    if (itemsList[type]) {
                        self.totalSlides = itemsList[type].length;
                        $.each(itemsList[type], function (index, element) {
                            var slideItem = $('<div>').addClass('item').data('wvrSliderItem', {
                                key    : index,
                                element: element
                            }).appendTo(self.screen);
                            var miniImage = defaultImage;
                            if (element.image) {
                                var slideImage = element.image.clone().appendTo(slideItem);
                                slideImage.attr('role','image');
                                miniImage      = slideImage.attr('src');
                                if (self.imageCover) {
                                    slideImage.hide();
                                    //Is not the miniImage but because is the same image we can used
                                    slideItem.css('background-image', 'url("' + miniImage + '")');
                                    slideItem.attr('role','image');
                                    //Depending of the requirement we can change that the image is full width
                                    //Or full height base on the weight and height of the container not the element.
                                    if (element.imageHeight > self.maxHeight) {
                                        slideItem.addClass('sauto100p');
                                    } else if (element.imageWidth > self.maxWidth) {
                                        slideItem.addClass('s100pauto');
                                    }
                                }
                                if (element.iframe) {
                                    slideItem.css({'cursor': 'pointer'});
                                    $('<span>').addClass('glyphicon glyphicon-play-circle').appendTo(slideItem);
                                    slideItem.on('click', function () {
                                        slideItem.addClass('video_showed').find('.glyphicon').hide();
                                        slideItem.find('iframe').show().attr('src',
                                            slideItem.find('iframe').attr('src') + '?autoplay=1'
                                        );
                                    })
                                }
                            } else if (element.iframe) {
                                element.iframe.clone().css({
                                    width : self.maxWidth,
                                    height: self.imageHeight
                                }).appendTo(slideItem);
                            }
                            self.addMiniSlide({
                                src   : miniImage,
                                parent: self.movie,
                                index : index
                            });

                            if (index == 0) {
                                slideItem.addClass('active');
                                self.setSlideDetails(slideItem);
                                globalSlid({
                                    relatedTarget: slideItem
                                }, {
                                    screen: self.screen,
                                    width : self.maxWidth,
                                    height: self.maxHeight
                                })
                            }
                        });
                        if (itemsList[type].length == 1) {
                            self.leftArrow.hide();
                            self.rightArrow.hide();
                        } else {
                            self.leftArrow.show();
                            self.rightArrow.show();
                        }
                    }
                    this.resize();
                    this.resizeMiniMovie();
                },
                /**
                 * Resize all the elements in  slider
                 */
                resize           : function resize() {
                    var self         = this;
                    var screenHeight = $(window).height();
                    var screenWidth  = $(window).width();
                    self.maxWidth    = screenWidth - self.leftArrow.outerWidth(true) - self.rightArrow.outerWidth(true);
                    if (self.maxWidth > 767) {
                        self.maxHeight = screenHeight - (self.header.outerHeight(true) + self.movie.outerHeight(true) + (self.screen.outerHeight(true) - self.screen.height()) + 40);
                        //Set screen dimensions
                        self.screen.css({
                            width : self.maxWidth,
                            height: self.maxHeight
                        }).find('.item').css({
                            width : self.maxWidth,
                            height: self.maxHeight
                        }).find('iframe').css({
                            width : self.maxWidth,
                            height: self.maxHeight
                        });
                    } else {
                        //Set screen dimensions
                        self.screen.css({
                            width : '100%',
                            height: '90%'
                        }).find('.item').css({
                            width : '100%',
                            height: '100%'
                        }).find('iframe').css({
                            width : '100%',
                            height: '100%'
                        });
                    }
                },
                /**
                 * Resize the thumb images slider
                 */
                resizeMiniMovie  : function resizeMiniMovie() {
                    if (this.movie.find('.item').length) {
                        this.movie.css('width',
                            this.movie.find('.item').length * this.movie.find('.item:first').outerWidth(true))
                    }
                },
                /**
                 * Check if item form movie slider is visible
                 * @param current
                 * @returns {boolean}
                 */
                miniItemIsVisible: function miniItemIsVisible(current) {
                    var left       = current.index() * current.outerWidth(true);
                    var movieLeft  = (-1) * parseInt(this.movie.css('left'));
                    var difference = left - movieLeft;
                    return difference >= 0 && difference <= this.miniScreen.width() - current.outerWidth(true);

                },
                /**
                 * Add item to the thumb images slider
                 * @param options
                 */
                addMiniSlide     : function addSlide(options) {
                    defaults      = {
                        src   : null,
                        parent: null,
                        index : 0
                    };
                    var self      = this;
                    var slideItem = $('<div>').addClass('item');
                    $('<div>').addClass('itemOverlay').appendTo(slideItem);
                    var imageObject = $('<img>');
                    var settings    = $.extend({}, defaults, options);
                    if (settings.src && settings.parent) {
                        slideItem.css('background-image', 'url("' + settings.src + '")');
                        imageObject.attr('src', settings.src).load(function () {
                            if (this.height > this.width) {
                                slideItem.addClass('s100pauto');
                            } else {
                                slideItem.addClass('sauto100p');
                            }
                        });
                        slideItem.appendTo(settings.parent);
                        if (settings.index == 0) {
                            slideItem.addClass('active');
                        }
                        slideItem.on('click', function () {
                            self.screen.data('bs.carousel').to(settings.index);
                        });
                    }
                },
                /**
                 * Set slide details in the header
                 * @param element
                 */
                setSlideDetails  : function setSlideDetails(element) {
                    var data = element.data('wvrSliderItem');
                    this.slideDetailsCount.html(Drupal.t('@current / @max @type', {
                        '@current': element.index() + 1,
                        '@max'    : this.totalSlides,
                        '@type'   : this.tabs.find('li.active a').text()
                    }));
                    this.slideDetailsTitle.html(data.element.title)
                },
                /**
                 * Trigger the left right event.
                 * @param direction
                 */
                eventLeftRight   : function eventLeftRight(direction) {
                    switch (direction) {
                        case 'left':
                            this.leftArrow.trigger('click');
                            break;
                        case 'right':
                            this.rightArrow.trigger('click');
                            break;
                    }
                },
                /**
                 *
                 */
                attachEvents     : function attachEvents() {
                    var self = this;
                    overlaySlider.on('keydown', function keyboardListener(event) {
                        var which  = event.which;
                         if (which === 9 && event.shiftKey) {
                            which = keys.tabAndShift;
                        }
                        actionFromKeyboard = true;
                        switch (which) {
                            case keys.tab:
                                self.processTab('forward');
                                event.preventDefault();
                                break;
                            case keys.tabAndShift:
                                self.processTab('backwards');
                                event.preventDefault();
                                break;
                            case keys.left:
                                self.eventLeftRight('left');
                                event.preventDefault();
                                break;
                            case keys.right:
                                self.eventLeftRight('right');
                                event.preventDefault();
                                break;
                            case keys.enter:
                            case keys.space:
                                var focused = $(':focus');
                                focused.trigger('click');
                                self.leftArrow.attr('aria-selected','false');
                                self.rightArrow.attr('aria-selected','false');
                                if(focused.hasClass('left-arrow') || focused.hasClass('right-arrow') ) {
                                    focused.attr('aria-selected','true')
                                }
                                event.preventDefault();
                                break;
                            case keys.esc:
                                self.btnClose.trigger('click');
                                break;
                        }
                        //Wait 20 miliseconds and set the action from keyboard false
                        setTimeout(function () {
                            actionFromKeyboard = false;
                        }, 20);

                    });
                },
                /**
                 * Process the tab
                 * @param direction
                 */
                processTab       : function processTab(direction) {
                    var tabStop = overlaySlider.find('.tab-stop');
                    if (tabStop.length) {
                        switch (direction) {
                            case 'forward':
                                --this.selectedTab;
                                break;
                            case 'backwards':
                                ++this.selectedTab;
                                break;
                        }
                        if (this.selectedTab >= tabStop.length) {
                            this.selectedTab = 0;
                        }
                        if (this.selectedTab < 0) {
                            this.selectedTab = tabStop.length - 1;
                        }
                        tabStop.eq(this.selectedTab).focus();
                    }
                }
            };
            //Create items unique list
            items.each(function (index, item) {
                //Take all the data informations
                var data = $(item).data();
                //Transform type value in camel case
                var type = $.camelCase(data.type);
                if (!itemsList[type]) {
                    itemsList[type] = [];
                }
                var tmpItem     = {};
                tmpItem.title   = defaultTitle;
                tmpItem.css     = {};
                tmpItem.type    = type;
                tmpItem.classes = {
                    main_slider   : [],
                    overlay_slider: [],
                    mini_slider   : []
                };
                if (data.image) {
                    ++imageCount;
                    tmpItem.image = $('<img>').attr({
                        'src'   : data.image,
                        'alt'   : data.imageAlt,
                        'title' : data.imageTitle
                    });

                    tmpItem.image.load(function () {

                        tmpItem.imageWidth  = this.width;
                        tmpItem.imageHeight = this.height;
                        //TODO - This should be calculated based on the width and height of the parent
                        if (this.width > this.height) {
                            tmpItem.classes.main_slider.push('s100pauto');
                            tmpItem.classes.mini_slider.push('s94auto');
                        } else {
                            tmpItem.classes.main_slider.push('sauto100p');
                            tmpItem.classes.mini_slider.push('sauto94');
                        }
                        //After the first three images are loaded show the slider.
                        if (index > -1 && index < 3) {
                            ++preloadImages.loaded;
                            preloadImages.check(self);
                        }
                        //This applied only to main slider because at the monet when i add the
                        //images to slider the image is not full loaded
                        if (tmpItem.slideItem) {
                            if (tmpItem.classes.main_slider) {

                                if (globalSettings.displayMode) {

                                    tmpItem.slideItem.css({
                                        backgroundSize: globalSettings.displayMode
                                    });
                                } else {
                                    tmpItem.slideItem.addClass(tmpItem.classes.main_slider.join(' '));
                                }
                            }
                        }
                    })
                }
                if (data.iframe) {
                    tmpItem.iframe = $('<iframe>').attr('src', data.iframe);
                }
                if (data.title) {
                    tmpItem.title = data.title;
                }
                itemsList[type].push(tmpItem);
            });

            //Add classes to main layer
            if (globalSettings.classes && globalSettings.classes.length) {
                self.addClass(globalSettings.classes);
            }

            //Decrease the loaded images
            if (settings.loadedImageBeforeShow > imageCount) {
                settings.loadedImageBeforeShow = imageCount - 1;
            }
            //Show the slider because we don't have any images
            if (imageCount == 0 && items.length > 0) {
                preloadImages.loaded = 1000;
                preloadImages.check();
            }

            mainSliderClass.init();
            overlaySliderClass.init();
            //Hide arrows if we have only one image.
            if (items.length == 1) {
                mainSlider.find('.left-arrow').hide();
                mainSlider.find('.right-arrow').hide();
            }

            $(window).bind('resize.wvr_slider', function () {
                mainSliderClass.resize();
                overlaySliderClass.resize();
            });


        })
    }


})(jQuery, window, this.document);
