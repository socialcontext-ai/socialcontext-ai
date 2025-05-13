/*
woobox-Al/ML-Digital Marketing Responsive HTML5 Template
Author: iqonicthemes.in
Version: 1.0
Design and Developed by: iqonicthemes.in
*/

/*----------------------------------------------
Index Of Script
------------------------------------------------




------------------------------------------------
Index Of Script
----------------------------------------------*/
(function (jQuery) {

    "use strict";
    jQuery(document).ready(function () {


        jQuery(window).on('load', function () {
            

            /*------------------------
            Add To cart
            --------------------------*/
            jQuery('.add_to_cart_button').click(function (e) {

                var product_id = jQuery(this).attr('data-product_id');
                jQuery(this).addClass('loading');

            });

             jQuery('#iq-timeline-vertical-1.timeline ').timeline({
                forceVerticalMode: 800,
                 mode: 'vertical',
                visibleItems: 2,
            });

            /*------------------------
            Count Down
            --------------------------*/

            jQuery('.iq-data-countdown-timer').each(function () {

                var future_date = jQuery(this).attr('data-date');
                var label = jQuery(this).attr('data-labels');
                var displayFormat = jQuery(this).attr('data-format');
                var l = true;
                if (label == "true") {
                    l = true;
                } else {
                    l = false;
                }
                jQuery(this).countdowntimer({
                    dateAndTime: future_date,
                    labelsFormat: l,
                    displayFormat: displayFormat,

                });

            });
            /*------------------------------
            filter items on button click
            -------------------------------*/
            jQuery('.iq-masonry').isotope({
                itemSelector: '.iq-masonry-item',
            });

            jQuery('.isotope-filters').on('click', 'button', function () {
                var filterValue = jQuery(this).attr('data-filter');
                jQuery('.iq-masonry').isotope({
                    resizable: true,
                    filter: filterValue
                });
                jQuery('.isotope-filters button').removeClass('show active');
                jQuery(this).addClass('show active');
            });

             jQuery('.iq-accordion .iq-accordion-block .accordion-details').hide();
            jQuery('.iq-accordion .iq-accordion-block:first').addClass('accordion-active').children().slideDown('slow');
            jQuery('.iq-accordion .iq-accordion-block').on("click", function() {
                if (jQuery(this).children('div.accordion-details ').is(':hidden')) {
                    jQuery('.iq-accordion .iq-accordion-block').removeClass('accordion-active').children('div.accordion-details ').slideUp('slow');
                    jQuery(this).toggleClass('accordion-active').children('div.accordion-details ').slideDown('slow');
                }
            });
            /*------------------------
            Add to cart with plus minus
            --------------------------*/

            jQuery(document).on('click', 'button.plus, button.minus', function () {

                jQuery('button[name="update_cart"]').removeAttr('disabled');

                var qty = jQuery(this).closest('.quantity').find('.qty');


                if (qty.val() == '') {
                    qty.val(0);
                }
                var val = parseFloat(qty.val());

                var max = parseFloat(qty.attr('max'));
                var min = parseFloat(qty.attr('min'));
                var step = parseFloat(qty.attr('step'));

                // Change the value if plus or minus
                if (jQuery(this).is('.plus')) {

                    if (max && (max <= val)) {
                        qty.val(max);
                    } else {
                        qty.val(val + step);
                    }
                } else {
                    if (min && (min >= val)) {

                        qty.val(min);
                    } else if (val >= 1) {

                        qty.val(val - step);
                    }
                }


            });

            /*------------------------
            Owl Carousel
            --------------------------*/
            jQuery('.owl-carousel').each(function () {

                var jQuerycarousel = jQuery(this);
                jQuerycarousel.owlCarousel({
                    items: jQuerycarousel.data("items"),
                    loop: jQuerycarousel.data("loop"),
                    margin: jQuerycarousel.data("margin"),
                    nav: jQuerycarousel.data("nav"),
                    dots: jQuerycarousel.data("dots"),
                    autoplay: jQuerycarousel.data("autoplay"),
                    autoplayTimeout: jQuerycarousel.data("autoplay-timeout"),
                    navText: ["<i class='ion-ios-arrow-left'></i>", "<i class='ion-ios-arrow-right'></i>"],
                    responsiveClass: true,
                    responsive: {
                        // breakpoint from 0 up
                        0: {
                            items: jQuerycarousel.data("items-mobile-sm"),
                            nav: false,
                            dots: true
                        },
                        // breakpoint from 480 up
                        480: {
                            items: jQuerycarousel.data("items-mobile"),
                            nav: false,
                            dots: true
                        },
                        // breakpoint from 786 up
                        786: {
                            items: jQuerycarousel.data("items-tab")
                        },
                        // breakpoint from 1023 up
                        1023: {
                            items: jQuerycarousel.data("items-laptop")
                        },
                        1199: {
                            items: jQuerycarousel.data("items")
                        }
                    }
                });
            });
             
        });
    });

})(jQuery);