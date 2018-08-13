/**
* This file has all the core functions related set up of RequireJS
* 
* @package com.mopro
* @author Gaurang Jadia
* @filesource app.js
* @description Configuration File for RequireJS
*/

require.config({
    appDir: "../",
    baseUrl: window.location.protocol + "//" + window.host["static"] + "/_js/",
    dir: "../..",
    paths: {
        //UIKit Libraries
        domReady: window.location.protocol + "//" + window.host.uikit + "/_js/lib/domReady",
        text: window.location.protocol + "//" + window.host.uikit + "/_js/lib/text",
        async: window.location.protocol + "//" + window.host.uikit + "/_js/lib/async",
        order: window.location.protocol + "//" + window.host.uikit + "/_js/lib/order",
        font: window.location.protocol + "//" + window.host.uikit + "/_js/lib/font",
        goog: window.location.protocol + "//" + window.host.uikit + "/_js/lib/goog",
        image: window.location.protocol + "//" + window.host.uikit + "/_js/lib/image",
        json: window.location.protocol + "//" + window.host.uikit + "/_js/lib/json",
        noext: window.location.protocol + "//" + window.host.uikit + "/_js/lib/noext",
        mdown: window.location.protocol + "//" + window.host.uikit + "/_js/lib/mdown",
        propertyParser: window.location.protocol + "//" + window.host.uikit + "/_js/lib/propertyParser",
        jquery: window.location.protocol + "//" + window.host.uikit + "/_js/app/jquery1102",
        jquery191: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery-1.9.1.min",
        jquery1102: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery-1.10.2.min",
        jquery1111: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery-1.11.1.min",
        jqueryui: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery-ui-1.10.3",
        jqueryuitouchpunch: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/idx/jquery.ui.touch-punch.min",
        backbonelocalstorage: window.location.protocol + "//" + window.host.uikit + "/_js/lib/backbone.localStorage",
        backbone: window.location.protocol + "//" + window.host.uikit + "/_js/lib/backbone-min",
        underscore: window.location.protocol + "//" + window.host.uikit + "/_js/lib/underscore-min",
        underscorestring: window.location.protocol + "//" + window.host.uikit + "/_js/lib/underscore.string",
        modernizr: window.location.protocol + "//" + window.host.uikit + "/_js/lib/modernizr-latest",
        mousewheel: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.mousewheel",
        mobile: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.mobile-1.3.1",
        selectik: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.selectik",
        extjs: window.location.protocol + "//" + window.host.uikit + "/_js/lib/extjs/ext-all",
        utility: window.location.protocol + "//" + window.host.uikit + "/_js/lib/utility",
        spin: window.location.protocol + "//" + window.host.uikit + "/_js/lib/spin.min",
        sticky: window.location.protocol + "//" + window.host.uikit + "/_js/lib/sticky.min",
        pm: window.location.protocol + "//" + window.host.uikit + "/_js/lib/postmessage",
        fineuploader: window.location.protocol + "//" + window.host.uikit + "/_js/lib/fineuploader-3.4.1",
        googlemap3: (window.navigator.userAgent.indexOf("Google Page Speed Insights") === -1) ? window.location.protocol + "//" + window.host.uikit + "/_js/app/googlemap3" : window.location.protocol + "//" + window.host.uikit + "/_js/app/googlemap3proxy",
        gmap: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.gmap",
        masonry: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.masonry",
        easing: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.easing.1.3",
        lazy: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.lazy",
        mejs: window.location.protocol + "//" + window.host.uikit + "/_js/lib/mediaelement-and-player",
        aviary: (window.location.protocol === "http:") ? "http://feather.aviary.com/js/feather" : "https://dme0ih8comzn4.cloudfront.net/js/feather",
        fancybox: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.fancybox",
        scrollbarpaper: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.scrollbarpaper",
        nicescroll: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.nicescroll",
        jscrollpane: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.jscrollpane",
        mwheelintent: window.location.protocol + "//" + window.host.uikit + "/_js/lib/mwheelintent",
        stapel: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.stapel",
        nestable: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.nestable",
        tinymce: window.location.protocol + "//" + window.location.host + "/tiny_mce/jquery.tinymce",   //Exception to load from same domain to solve Cross Domain Scripting Limitation
        minicolors: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.minicolors",
        camera: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.camera",
        camera134: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.camera-1.3.4",
        twitterwidget: window.location.protocol + "//platform.twitter.com/widgets",
        bigvideo: window.location.protocol + "//" + window.host.uikit + "/_js/lib/bigvideo",
        transition: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.transit.min",
        imagesloaded: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.imagesloaded.min",
        videojs: window.location.protocol + "//vjs.zencdn.net/4.9/video",
        bootstrap: window.location.protocol + "//" + window.host.uikit + "/_js/lib/bootstrap",
        bootstrapselect: window.location.protocol + "//" + window.host.uikit + "/_js/lib/bootstrap-select",
        supersized: window.location.protocol + "//" + window.host.wo["static"] + "/_js/supersized", //window.location.protocol + "//" + window.host.uikit + "/_js/lib/supersized.3.2.7",
        shutter: window.location.protocol + "//" + window.host.uikit + "/_js/lib/supersized.shutter.min",
        gmapmarkerwithlabel: (window.navigator.userAgent.indexOf("Google Page Speed Insights") === -1) ? window.location.protocol + "//" + window.host.uikit + "/_js/lib/markerwithlabel_packed" : (window.location.protocol + "//" + window.host.builder + "/_service/proxy.ashx?url=" + encodeURIComponent(window.location.protocol + "//" + window.host.uikit + "/_js/lib/markerwithlabel_packed.js")),
        gmapmanager: (window.navigator.userAgent.indexOf("Google Page Speed Insights") === -1) ? window.location.protocol + "//" + window.host.uikit + "/_js/lib/markermanager_packed" : (window.location.protocol + "//" + window.host.builder + "/_service/proxy.ashx?url=" + encodeURIComponent(window.location.protocol + "//" + window.host.uikit + "/_js/lib/markermanager_packed.js")),
        gmapclusterer: (window.navigator.userAgent.indexOf("Google Page Speed Insights") === -1) ? window.location.protocol + "//" + window.host.uikit + "/_js/lib/markerclusterer_packed" : (window.location.protocol + "//" + window.host.builder + "/_service/proxy.ashx?url=" + encodeURIComponent(window.location.protocol + "//" + window.host.uikit + "/_js/lib/markerclusterer_packed.js")),
        gmapinfobox: (window.navigator.userAgent.indexOf("Google Page Speed Insights") === -1) ? window.location.protocol + "//" + window.host.uikit + "/_js/lib/infobox_packed" : (window.location.protocol + "//" + window.host.builder + "/_service/proxy.ashx?url=" + encodeURIComponent(window.location.protocol + "//" + window.host.uikit + "/_js/lib/infobox_packed.js")),
        geolocationmarker: (window.navigator.userAgent.indexOf("Google Page Speed Insights") === -1) ? window.location.protocol + "//" + window.host.uikit + "/_js/lib/geolocationmarker" : (window.location.protocol + "//" + window.host.builder + "/_service/proxy.ashx?url=" + encodeURIComponent(window.location.protocol + "//" + window.host.uikit + "/_js/lib/geolocation-marker.js")),
        recaptcha: (window.navigator.userAgent.indexOf("Google Page Speed Insights") === -1) ? "https://www.google.com/recaptcha/api/js/recaptcha_ajax" : (window.location.protocol + "//" + window.host.builder + "/_service/proxy.ashx?url=" + encodeURIComponent("https://www.google.com/recaptcha/api/js/recaptcha_ajax.js")),
        recaptchav2: (window.navigator.userAgent.indexOf("Google Page Speed Insights") === -1) ? "https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" : (window.location.protocol + "//" + window.host.builder + "/_service/proxy.ashx?url=" + encodeURIComponent("https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit")),
        cycle2: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.cycle2",
        datepicker: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.datepicker",
        multiselect: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.multiselect",
        mocustomscrollbar: window.location.protocol + "//" + window.host.uikit + "/_js/lib/mocustomscrollbar",
        flexslider: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.flexslider",
        carouFredSel: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.carouFredSel",
        highlight: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.highlight",
        minimalect: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.minimalect",
        selectboxit: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.selectboxit",
        turn: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.turn",
        tipsy: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.tipsy",
        picker: window.location.protocol + "//" + window.host.uikit + "/_js/lib/picker",
        pickerdate: window.location.protocol + "//" + window.host.uikit + "/_js/lib/picker.date",
        pickertime: window.location.protocol + "//" + window.host.uikit + "/_js/lib/picker.time",
        pickerlegacy: window.location.protocol + "//" + window.host.uikit + "/_js/lib/legacy",
        zeroclipboard: window.location.protocol + "//" + window.host.uikit + "/_js/lib/zeroclipboard",
        clipboard: window.location.protocol + "//" + window.host.uikit + "/_js/lib/clipboard",
        speedometer: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.speedometer",
        bxslider: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.bxslider",
        pinit: (window.location.protocol === "http:") ? "http://assets.pinterest.com/js/pinit" : "https://assets.pinterest.com/js/pinit",
        uuid: window.location.protocol + "//" + window.host.uikit + "/_js/lib/uuid",
        colorscheme: window.location.protocol + "//" + window.host.uikit + "/_js/lib/color-scheme",
        tinycolor: window.location.protocol + "//" + window.host.uikit + "/_js/lib/tinycolor",
        liquidcarousel: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.liquidcarousel",
        owlcarousel: window.location.protocol + "//" + window.host.uikit + "/_js/lib/owl.carousel",
        zoomie: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.zoomie",
        isotope: window.location.protocol + "//" + window.host.uikit + "/_js/lib/isotope.pkgd",
        bridget: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.bridget",
        packery: window.location.protocol + "//" + window.host.uikit + "/_js/lib/packery.pkgd",
        backgroundie8: window.location.protocol + "//" + window.host.uikit + "/_js/lib/ie8",
        moment: window.location.protocol + "//" + window.host.uikit + "/_js/lib/moment.min",
        fullcalendar: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.fullcalendar-2.3.1",
        gcal: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.fullcalendar-2.3.1-gcal",
        tagit: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.tag-it",
        unveil: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.unveil",
        fb: window.location.protocol + "//" + ((false) ? "connect.facebook.net/" + app.lang + "/sdk/debug" : "connect.facebook.net/" + app.lang + "/sdk"),
        webfontloader: window.location.protocol + "//" + window.host.uikit + "/_js/lib/webfontloader-1.6.20.min",
        //mediumeditor: window.location.protocol + "//" + window.host.uikit + "/_js/lib/medium-editor",
        mediumeditor: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/medium-editor.v1",
        spectrum: window.location.protocol + "//" + window.host.wo["static"] + "/_js/spectrum",
        timepicki: window.location.protocol + "//" + window.host.uikit + "/_js/lib/timepicki",
        please: window.location.protocol + "//" + window.host.uikit + "/_js/lib/please",
        dotdotdot: window.location.protocol + "//" + window.host.uikit + "/_js/lib/dotdotdot",
        fittext: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.fittext",
        //UIKit Modules
        main: window.location.protocol + "//" + window.host.uikit + "/_js/app/main",
        sb: window.location.protocol + "//" + window.host.uikit + "/_js/app/sb",
        css: window.location.protocol + "//" + window.host.uikit + "/_js/app/css",
        grid: window.location.protocol + "//" + window.host.uikit + "/_js/app/grid",
        tabs: window.location.protocol + "//" + window.host.uikit + "/_js/app/tabs",
        modal: window.location.protocol + "//" + window.host.uikit + "/_js/app/modal",
        modalv1: window.location.protocol + "//" + window.host.uikit + "/_js/app2/modalv1",
        controls: window.location.protocol + "//" + window.host.uikit + "/_js/app/controls",
        data: window.location.protocol + "//" + window.host.uikit + "/_js/app/data",
        tags: window.location.protocol + "//" + window.host.uikit + "/_js/app/tags",
        uploader: window.location.protocol + "//" + window.host.uikit + "/_js/app/uploader",
        filters: window.location.protocol + "//" + window.host.uikit + "/_js/app/filters",
        navigation: window.location.protocol + "//" + window.host.uikit + "/_js/app/navigation",
        richtexteditor: window.location.protocol + "//" + window.host.uikit + "/_js/app/richtexteditor",
        analytics: window.location.protocol + "//" + window.host.uikit + "/_js/app/analytics",
        isotope: window.location.protocol + "//" + window.host.uikit + "/_js/lib/isotope.pkgd",
        bridget: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.bridget",
        packery: window.location.protocol + "//" + window.host.uikit + "/_js/lib/packery.pkgd",
        backgroundie8: window.location.protocol + "//" + window.host.uikit + "/_js/lib/ie8",
        blurjs: window.location.protocol + "//" + window.host.uikit + "/_js/lib/blur",
        bluroldjs: window.location.protocol + "//" + window.host.uikit + "/_js/lib/blurold",
        cropper: window.location.protocol + "//" + window.host.uikit + "/_js/lib/cropper",
        truncate: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.truncate",
        jquerysvg: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.svg-1.5.0", // SVG for jQuery
        map: window.location.protocol + "//" + window.host.uikit + "/_js/app/map",
        visible: window.location.protocol + "//" + window.host.uikit + "/_js/lib/jquery.visible",
        inlinetexteditor: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/inlinetexteditor",
        /***** Mopro CMS Old_Builder *****/
        //Common
        wbcommonapp: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/common/app",
        gridjs: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/common/GridJS",
        menuapp: window.location.protocol + "//" + host.old_builder["web"] + "/BuilderModules/scripts/menucatalog/app",
        scrolltopcontrol: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/lib/scrolltopcontrol",
        gmap3: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/common/GMAP3",
        fullcalendar: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/common/calendar/fullcalendar",
        login: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/login/login.v1",
        //Service
        serviceappointment: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/ItemProfile/ServiceAppointment",
        servicecatalog: window.location.protocol + "//" + host.old_builder["web"] + "/BuilderModules/scripts/Service/servicecatalog",
        servicecatalogmodulev2: window.location.protocol + "//" + host.old_builder["web"] + "/BuilderModules/scripts/Service/v2/servicecatalog",
        servicebookingmodulev2: window.location.protocol + "//" + host.old_builder["web"] + "/BuilderModules/scripts/Service/v2/servicebooking",
        //Product
        productdetails: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/ItemProfile/ProductDetails",
        itemcatalog: window.location.protocol + "//" + host.old_builder["web"] + "/BuilderModules/scripts/ItemCatalog/itemCatalog",
        socialshare: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/ItemProfile/SocialShare",
        //Purchase History
        phloginsetting: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/PurchaseHistory/PHLoginSettings",
        phaccountsetting: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/PurchaseHistory/PHAccountSettings",
        phyourorder: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/PurchaseHistory/PHYourOrders",
        phordercontinue: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/PurchaseHistory/PHOrders_Continued",
        phreturn: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/PurchaseHistory/PHReturns",
        phcancel: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/PurchaseHistory/PHCancel",
        phcontactseller: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/PurchaseHistory/PHContactSeller",
        phmyprofile: window.location.protocol + "//" + host.old_builder["web"] + "/_scripts/PurchaseHistory/PHMyprofile",
        //Menu
        menucatalog: window.location.protocol + "//" + host.old_builder["web"] + "/BuilderModules/scripts/menucatalog/menucatalog",
        //Shop Cart
        shopcart: window.location.protocol + "//" + host.old_builder["web"] + "/BuilderModules/scripts/ShoppingCart/ModuleShoppingCart",
        //Event
        events: window.location.protocol + "//" + host.old_builder["web"] + "/BuilderModules/scripts/events/events",
        //Render Modules
        //ABS
        appoinmentv1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/appointment/appointment.v1",
        servicecatalogv1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/servicecatalog/servicecatalog.v1",
        servicecatalogv2: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/servicecatalog/servicecatalog.v2",
        servicebookingv2: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/servicebooking/servicebooking.v2",
        //Menu Catalog
        menucatalogv1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/menucatalog/menucatalog.v1",
        menuorderinfov1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/menucatalog/menuorderinfo.v1",
        storelocationhoursv1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/menucatalog/storelocationhours.v1",
        //Product 
        productcategoryv1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/productcatalog/productcategory.v1",
        productlistv1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/productcatalog/productlist.v1",
        productdescv1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/productprofile/productdesc.v1",
        productdetailv1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/productprofile/productdetail.v1",
        productimagev1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/productprofile/productimage.v1",
        socialsharev1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/productprofile/socialshare.v1",
        //Shopping Cart
        shoppingcartv1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/shoppingcart/shoppingcart.v1",
        cartitemsv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/cart/cartitems.v1",
        yourorderpricev1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/cart/yourorder.v1",
        reviewv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/checkout/review.v1",
        orderconfirmationv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/checkout/orderconfirmation.v1",
        orderdetailsv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/checkout/orderdetails.v1",
        //Events 
        eventv1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/event/event.v1",
        //Purchase History
        phloginv1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/purchasehistory/phlogin.v1",
        purchasehistoryv1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/purchasehistory/purchasehistory.v1",
        bookinghistroyv1: window.location.protocol + "//" + host.old_builder["static"] + "/_js/_modules/purchasehistory/userbookingdetails.v1",
        /***** CMS Builder *****/
        page: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_utility/page",
        pagecolors: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_utility/pagecolors",
        articlev1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/article/article.v1",
        articleatf: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/atf/article/article",
        fewlines: window.location.protocol + "//" + window.host.wo["static"] + "/_js/fewlines",
        backgroundv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/background/background.v1",
        imagebackgroundv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/imagebackground/imagebackground.v1",
        contactformv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/contactform/contactform.v1",
        contactformv2: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/contactform/contactform.v2",
        embedv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/embed/embed.v1",
        facebookv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/facebook/facebook.v1",
        footerv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/footer/footer.v1",
       // modal: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules2/footer/modal",
        galleryv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/gallery/gallery.v1",
        galleryv1mosaic: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/gallery/gallery.v1.mosaic",
        headerv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/header/header.v1",
        headerlayout1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/headerv2/headerlayout1",
        headerlayoutcenter: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/headerv2/headerlayoutcenter",
        herov1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/hero/hero.v1",
        imagev1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/image/image.v1",
        locationv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/location/location.v1",
        locationv2: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/location/location.v2",
        mediasliderv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/mediaslider/mediaslider.v1",
        rtev1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/rte/rte.v1",
        socialv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/social/social.v1",
        spacerv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/spacer/spacer.v1",
        teamv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/team/team.v1",
        teamv2: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/team/team.v2",
        testimonialv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/testimonial/testimonial.v1",
        testimonialv2: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/testimonial/testimonial.v2",
        questionnairev1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/questionnaire/questionnaire.v1",
        twitterv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/twitter/twitter.v1",
        videov1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/video/video.v1",
        liunalocallocatorv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/liunalocallocator/liunalocallocator.v1",
        liunainfrastructuremapv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/liunainfrastructuremap/liunainfrastructuremap.v1",
        presslistv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/press/list.v1",
        blogv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/blog/blog.v1",
        accountsv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/account/accounts.v1",
        overlayv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/overlay/overlay.v1",
        presstagv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/press/tag.v1",
        socialsharebuttonsv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/social/socialsharebuttons.v1",
        formbuilderv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/formbuilder/formbuilder.v1",
        searchlistv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/search/search.v1",
        productlistv1WO: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/itemcatalog/productlist.v1",
        locationlocatorv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/locationlocator/locationlocator.v1",
        locationlocatorv2: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/locationlocator/locationlocator.v2",
        videofluidv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/videofluid/videofluid.v1",
        imageparallaxv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/imageparallax/imageparallax.v1",
        opentablev1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/opentable/opentable.v1",
        clientelev1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/clientele/clientele.v1",
        userbookinghistory: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/userhistory/bookinghistory/v1/userbookinghistory.v1",
        buttonnavigationv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/buttonnavigation/buttonnavigation.v1",
        mopronotepadv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopronotepad/mopronotepad.v1",
        mopadadmin: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopronotepad/mopadadmin",
        mopaddiy: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/mopaddiy1",
        mopadimagelibrary: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/imagelibrary",
        pagelibrary: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/pagelibrary",
        dynamiccontainer: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/dynamiccontainer",
        mopadimagesettings: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/imagesettings",
        mopadslidersettings: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/slidersettings",
        mopadparallaxsetting: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/imageparallaxsetting",
        singleimageview: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/singleimageview",
        containerimageview: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/containerimageview",
        multiimageview: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/multiimageview",
        aidynamicgalleryview: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/aidynamicgalleryview",
        aiflexcontainer: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/aiflexcontainer",
        flexcontainerimageview: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/flexcontainerimageview",
        mopadimagecropper: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/imagecropper",
        headlineeditor: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/headlineeditor",
        teamtexteditor: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/teamtexteditor",
        spacereditor: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/spacereditor",
        brandstampsettingseditor: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/brandstampsettingseditor",
        imagesettingsmagicblockeditor: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/imagesettingsmagicblockeditor",
        testimonialeditor: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/testimonialeditor",
        articleeditor: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/articleeditor",
        dynamiceditor: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/dynamiceditor",
        dynamicgalleryeditor: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/dynamicgalleryeditor",
        dynamiclayout: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/dynamiclayout",
        dynamicgallerylayout: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/dynamicgallerylayout",
        dynamicheadlineeditor: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/dynamicheadlineeditor",
        rtetxteditor: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/rtetexteditor",
        managepages: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/managepages",
        containercss: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_container/containercss",
        flexcontainer: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_container/flexcontainer",
        copyflexcontainer: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_container/copyflexcontainer",
        builderadmin: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_admin/builderadmin",
        checkoutv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/checkout/checkout.v1",
        productcatalogv2WO: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/itemcatalog/v2/productcatalog.v2",
        productcategoryv2WO: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/itemcatalog/v2/productcategory.v2",
        productprofilev2WO: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/itemcatalog/v2/productprofile.v2",
        flexisel: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/itemcatalog/v2/flexisel",
        liquidcarousel: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/itemcatalog/v2/liquidcarousel",
        owlcarousel: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/itemcatalog/v2/owlCarousel",
        shareemailv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/itemcatalog/v2/shareemail.v1",
        zoomie: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/itemcatalog/v2/zoomie",
        buttonlinkv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/buttonlink/buttonlink.v1",
        dualmediav1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/dualmedia/dualmedia.v1",
        blindsv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/blinds/blinds.v1",
        socialwallv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/socialwall/socialwall.v1",
        socialwallv2: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/socialwall/socialwall.v2",
        socialwallatf: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/atf/socialwall/socialwall",
        socialprofilev1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/socialprofile/socialprofile.v1",
        dynamicv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/dynamic/dynamic.v1",
        dynamicgallery: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/dynamicgallery/dynamicgallery.v1",
        dynamicheadlinev1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/dynamicheadline/dynamicheadline.v1",
        //Project's self-checkout
        revealcheckoutpop: window.location.protocol + "//" + window.host.wo["static"] + "/_js/revealcheckout/revealcheckoutpop",
        revealcheckoutv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/revealcheckout/revealcheckout.v1",
        revealcheckoutinfo: window.location.protocol + "//" + window.host.wo["static"] + "/_js/revealcheckout/revealcheckoutinfo",
        //Similar Products
        similarproductsv1WO: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/similarproducts/v1/similarproducts.v1",
        fbloginv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/store/checkout/facebook.v1",
        kenburns: window.location.protocol + "//" + window.host.wo["static"] + "/_js/kenburns",
        mediabackgroundv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/mediabackground/mediabackground.v1",
        //Rewards
        rewardsv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/rewards/rewards.v1",
        //idx
        propertydetailedviewv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/idx/propertydetailedview.v1",
        propertysearchv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/idx/propertysearch.v1",
        propertyresultv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/idx/propertyresult.v1",
        similarpropertiesv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/idx/similarproperties.v1",
        idxloginv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/idx/idxlogin.v1",
        predictiveSearchDropdown: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/idx/predictiveSearchDropdown",
        featuredpropertiesv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/idx/featuredproperties.v1",
        idxemailv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/idx/idxemail.v1",
        stafflistv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/idx/stafflist.v1",
        staffprofilev1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/idx/staffprofile.v1",
        staffprofilegalleryv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/idx/staffprofilegallery.v1",
        staffprofilesummaryv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/idx/staffprofilesummary.v1",
        soldpropertiesv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/soldproperty/soldproperty.v1",
        ccform: window.location.protocol + "//" + window.host.checkout["static"] + "/_js/app/ccform",
        //atf -> NES Layout JS
        atfhours: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/atf/hours/hours",
        atfformbuilder: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/atf/formbuilder/formbuilder",
        atftestimonial: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/atf/testimonial/testimonial",
        atfcontactform: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/atf/contactform/contactform",
        atfgallery: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/atf/gallery/gallery",
        atfimagebackground: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/atf/imagebackground/imagebackgroundatf",
        atfmediabackground: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/atf/mediabackground/mediabackgroundatf",
        atfsupersized: window.location.protocol + "//" + window.host.wo["static"] + "/_js/atfsupersized",
        buttonlinkeditor: window.location.protocol + "//" + window.host.wo["static"] + "/_js/mopaddiy/buttonlinkeditor",
        brandstampv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules/brandstamp/brandstamp.v1",
        revisionintake: window.location.protocol + "//" + window.host.pulse.static + "/_js/app/revisionintake",
        revisioncategory: window.location.protocol + "//" + window.host.pulse.static + "/_js/app/revisioncategory",
        revisionsummary: window.location.protocol + "//" + window.host.pulse.static + "/_js/app/revisionsummary",

        //Builder V2
        mapv1: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules2/map/map.v1",
        videofluidv2: window.location.protocol + "//" + window.host.wo["static"] + "/_js/_modules2/videofluid/videofluid.v1"
    },
    shim: {
        "mousewheel": {
            deps: ["jquery"]
        },
        "selectik": {
            deps: ["jquery", "mousewheel"]
        },
        "jscrollpane": {
            deps: ["jquery", "mousewheel", "mwheelintent"]
        },
        "fancybox": {
            deps: ["mousewheel"]
        },
        "gridjs": {
            deps: ["utility"]
        },
        "itemcatalog": {
            deps: ["utility"]
        },
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        "underscore": {
            exports: "_"
        },
        "shopcart": {
            deps: ["wbcommonapp"]
        },
        "underscorestring": {
            deps: ["underscore"],
            exports: "_s"
        },
        "aviary": {
            exports: "Aviary"
        },
        "videojs": {
            exports: "VideoJS"
        },
        "fb": {
            exports: "FB"
        }
    },
    config: {
        utility: {
            isDevelopment: window.isDevelopment,
            AppName: "MOpro CMS Builder",
            isAdmin: false,
            BuilderWebPath: window.host.builder,
            StaticPath: window.host["static"],
            WebsiteOutputWebPath: host.wo.web,
            WebsiteOutputStaticPath: host.wo["static"],
            AdministrationWebPath: host.administration.web,
            AdministrationStaticPath: host.administration["static"],
            UIKitPath: window.host.uikit,
            bitlyUrl: window.url.bitly,
            bitlyApiKey: window.apiKey.Bitly,
            bitlyUser: window.cred.bitly,
            ipinfoApiKey: window.apiKey.IPInfo,
            apiUrl: {
                oauth: window.url.api.oauth,
                shop: window.url.api.ecommerce,
                rewards: window.url.api.rewards,
                rets: window.url.api.idx,
                socialpublisher: window.url.api.socialpublisher,
                pulse: window.url.api.revisionintake
            }
        },
        text: {
            useXhr: function (url, protocol, hostname, port) {
                return true;    //Allow cross-domain requests remote server allows CORS
            }
        },
        data: {
            isDevelopment: window.isDevelopment,
            isCORSSupported: function (_) {
                if (MO.isSecure) {
                    return true;
                }
                else {
                    return true;
                }
            },
            getServiceUrl: {
                dashboard: window.url.getService.dashboard,
                builder: window.url.getService.builder,
                administration: window.url.getService.administration,
                appsetting: window.url.getService.appsetting,
                websiteoutput: window.url.getService.websiteoutput,
                checkout: window.url.getService.checkout
            },
            setServiceUrl: window.url.setService
        },
        uploader: {
            isDevelopment: window.isDevelopment
        },
        analytics: {
            isDevelopment: window.isDevelopment,
            apiKey: window.apiKey.Segment
        },
        map: {
            isDevelopment: window.isDevelopment
        }
    },
    waitSeconds: 60,
    urlArgs: "bust=" + ((window.isDevelopment) ? new Date().getTime() : (("CacheKey" in window) ? window.CacheKey : "false")),
    catchError: window.isDevelopment
});

requirejs.onError = function (error) {
    //TODO: POST Error to the Server
    console.log(error, error.requireType, error.requireModules);
};