jQuery(document).ready(function ($) {
    /* HEADER FIXED AND BACK TO TOP BUTTON JS PART
     ----------------------------------------------------------*/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
            $('#header').addClass('header-fixed');
        } else {
            $('.back-to-top').fadeOut('slow');
            $('#header').removeClass('header-fixed');
        }
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
            $('#searchSubMenu').addClass('searchSubMenuAdd');
        } else {
            $('.back-to-top').fadeOut('slow');
            $('#searchSubMenu').removeClass('searchSubMenuAdd');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    /* INITIATE THE WOWJS PART
     ----------------------------------------------------------*/
    new WOW().init();
    /* INITIATE SUPERFISH ON NAV MENU PART
     ----------------------------------------------------------*/
    $('.nav-menu').superfish({
        animation: {opacity: 'show'},
        speed: 400
    });
    /* MOBILE NAVIGATION JS PART
     ----------------------------------------------------------*/
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({id: 'mobile-nav'});
        $mobile_nav.find('> ul').attr({'class': '', 'id': ''});
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');
        $(document).on('click', '.menu-has-children i', function (e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });
        $(document).on('click', '#mobile-nav-toggle', function (e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').toggle();
        });
        $(document).click(function (e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }
    /* SMOTH SCROLL ON PAGE HASH LINKS JS PART
     ----------------------------------------------------------*/
    /*$('a[href*="#"]:not([href="#"])').on('click', function () {
     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
     var target = $(this.hash);
     if (target.length) {
     var top_space = 0;
     if ($('#header').length) {
     top_space = $('#header').outerHeight();
     if (!$('#header').hasClass('header-fixed')) {
     top_space = top_space - 20;
     }
     }
     $('html, body').animate({
     scrollTop: target.offset().top - top_space
     }, 1500, 'easeInOutExpo');
     if ($(this).parents('.nav-menu').length) {
     $('.nav-menu .menu-active').removeClass('menu-active');
     $(this).closest('li').addClass('menu-active');
     }
     if ($('body').hasClass('mobile-nav-active')) {
     $('body').removeClass('mobile-nav-active');
     $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
     $('#mobile-body-overly').fadeOut();
     }
     return false;
     }
     }
     });*/
    /* PORFOLIO FILTER JS PART
     ----------------------------------------------------------*/
    $("#portfolio-flters li").click(function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');
        var selectedFilter = $(this).data("filter");
        $("#portfolio-wrapper").fadeTo(100, 0);
        $(".portfolio-item").fadeOut().css('transform', 'scale(0)');
        setTimeout(function () {
            $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
            $("#portfolio-wrapper").fadeTo(300, 1);
        }, 300);
    });
    /*jQuery counterUp
     $('[data-toggle="counter-up"]').counterUp({
     delay: 10,
     time: 1000
     });*/
    /* GOOGLE MAP JS PART
     ----------------------------------------------------------*/
    var get_latitude = $('#google-map').data('latitude');
    var get_longitude = $('#google-map').data('longitude');
    function initialize_google_map() {
        var myLatlng = new google.maps.LatLng(get_latitude, get_longitude);
        var mapOptions = {
            zoom: 14,
            scrollwheel: false,
            center: myLatlng
        };
        var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });
    }
    /*google.maps.event.addDomListener(window, 'load', initialize_google_map);
     custom code*/
});
$(".dropdown-menu li a").click(function () {
    var selText = $(this).text();
    $(this).parents('.btn-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 250) {
        $('.dark-scrollup').fadeIn();
    } else {
        $('.dark-scrollup').fadeOut();
    }
});
$('.dark-scrollup').on("click", function () {
    $("html, body").animate({
        scrollTop: 0
    }, 800);
    return false;
});

/* SLIDER-RANGE JS PART
 ----------------------------------------------------------*/
$(function () {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 2500,
        values: [0, 2500],
        slide: function (event, ui) {
            $("#amount").val("$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ]);
        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
            " - $" + $("#slider-range").slider("values", 1));
});
/* BEDROOMS-SLIDER-RANGE JS PART
 ----------------------------------------------------------*/
$(function () {
    $("#bedRooms-slider-range").slider({
        range: true,
        min: 0,
        max: 32,
        values: [0, 32],
        slide: function (event, ui) {
            $("#bedRooms").val(ui.values[ 0 ] + " - " + ui.values[ 1 ]);
        }
    });
    $("#bedRooms").val($("#bedRooms-slider-range").slider("values", 0) + " - " + $("#bedRooms-slider-range").slider("values", 1));
});
/* DATEPICKER JS PART
 ----------------------------------------------------------*/
$(function () {
    $("#datepicker,#datepicker1").datepicker();
});
/* QUOTE-CAROUSEL JS PART
 ----------------------------------------------------------*/
$(document).ready(function () {
    $('#quote-carousel').carousel({
        pause: true,
        interval: 4000
    });
});
/* ARRIVAL DATE PICKER JS PART
 ----------------------------------------------------------*/
$(function () {
    $("#arrivalDatePicker").datepicker({
        changeMonth: true,
        changeYear: true
    });
});
$(function () {
    $("#departureDatePicker").datepicker({
        changeMonth: true,
        changeYear: true
    });
});
/* TABS JS PART
 ----------------------------------------------------------*/
$(function () {
    $("#tabs").tabs();
});

