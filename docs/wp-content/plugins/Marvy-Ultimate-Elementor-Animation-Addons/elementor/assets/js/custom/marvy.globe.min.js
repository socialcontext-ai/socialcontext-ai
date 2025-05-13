(function( $ ) {
    'use strict';
    var VisualGlobeAnimation = {
        initGlobe: function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/section', VisualGlobeAnimation.initGlobeWidget);
        },
        initGlobeWidget: function ($scope) {
            var sectionId = $scope.data('id');
            var target = '.elementor-element-' + sectionId;
            var settings = {};
            if (window.isEditMode || window.elementorFrontend.isEditMode()) {
                var editorElements = null;
                var globeAnimationArgs = {};

                if (!window.elementor.hasOwnProperty('elements')) {
                    return false;
                }

                editorElements = window.elementor.elements;

                if (!editorElements.models) {
                    return false;
                }

                $.each(editorElements.models, function (i, el) {
                    if (sectionId === el.id) {
                        globeAnimationArgs = el.attributes.settings.attributes;
                    } else if (el.id === $scope.closest('.elementor-top-section').data('id')) {
                        $.each(el.attributes.elements.models, function (i, col) {
                            $.each(col.attributes.elements.models, function (i, subSec) {
                                globeAnimationArgs = subSec.attributes.settings.attributes;
                            });
                        });
                    }
                    settings.switch = globeAnimationArgs.marvy_enable_globe_animation;
                    settings.bgColor = globeAnimationArgs.marvy_globe_animation_background_color;
                    settings.colorOne = globeAnimationArgs.marvy_globe_animation_color;
                    settings.colorTwo = globeAnimationArgs.marvy_globe_animation_color_two;
                    settings.size = globeAnimationArgs.marvy_globe_animation_size;
                });

            } else {
                settings.switch = $scope.data("marvy_enable_globe_animation");
                settings.bgColor = $scope.data("marvy_globe_animation_background_color");
                settings.colorOne = $scope.data("marvy_globe_animation_color");
                settings.colorTwo = $scope.data("marvy_globe_animation_color_two");
                settings.size = $scope.data("marvy_globe_animation_size");
            }

            if (settings.switch) {
                globeAnimation(target, settings, sectionId);
            }
        }
    };

    function globeAnimation(target,settings,sectionId) {
        var checkElement = document.getElementsByClassName("marvy-globe-section-" + sectionId);
        if (checkElement.length >= 0) {

            var globe_div = document.createElement('div');
            globe_div.classList.add("marvy-globe-section-" + sectionId);

            document.querySelector(target).appendChild(globe_div);
            document.querySelector(target).classList.add("marvy-custom-globe-animation-section-" + sectionId);

            // Set Z-index for section container
            var globeZindex = document.querySelector('.marvy-custom-globe-animation-section-'+sectionId+' .elementor-container');
            globeZindex.style.zIndex = '99';

            // Set min height
            var globeMinHeight = document.querySelector(".elementor-element-"+sectionId);
            globeMinHeight.closest('.elementor-top-section').style.minHeight = "200px";

            var globeAnimation = VANTA.GLOBE({
                el: ".marvy-globe-section-" + sectionId,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                backgroundColor: settings.bgColor,
                color: settings.colorOne,
                color2: settings.colorTwo,
                size: settings.size
            });
            render(globeAnimation,sectionId);
        }
        return true;
    }

    function render(animation,sectionId) {
        document.querySelector(".elementor-element-"+sectionId).addEventListener('DOMAttrModified', function(e){
            animation.resize();
        }, false);
    }

    $( window ).on('elementor/frontend/init', VisualGlobeAnimation.initGlobe);
})( jQuery );