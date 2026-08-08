(function ($) {
    "use strict";

    ///////////////////////////////////////////// Page Layout /////////////////////////////////////////////


    var line = "";
    var overlay = "";
    var i = 1;
    var c = 1;

    while (i < 4) {
        line += '<span class="line line-' + i + '"></span>';
        i++;
    }

    $('.lines').prepend(line);

    while (c < 5) {
        overlay += '<span class="overlay overlay-' + c + '"></span>';
        c++;
    }

    $('.overlays').prepend(overlay);

    if ($('.fullscreen-footer').length < 1) {

        $('.site-footer').prepend('<span class="footer-ov"></span><span class="footer-ov"></span><span class="footer-ov"></span><span class="footer-ov"></span>')

    }

    if ($('.projects-nav').length > 0) {

        $('.projects-nav').prepend('<span class="np-ov"></span><span class="np-ov"></span><span class="np-ov"></span><span class="np-ov"></span>')
    }


    var body = $('body');
    var pageSettings = $('.page-settings');

    var dataLayout = pageSettings.data('layout');

    if (dataLayout != null) {
        var siteLayout = 'layout-' + dataLayout;

        body.addClass(siteLayout)
    }

    var dataHeaderStyle = pageSettings.data('header-style');

    if (dataHeaderStyle != null) {
        var headerStyle = 'header-style-' + dataLayout;

        $('.site-header').addClass(dataHeaderStyle)
    }

    var dataMenuStyle = pageSettings.data('menu-style');

    if (dataMenuStyle != null) {
        var menuStyle = 'menu-style-' + dataMenuStyle;

        $('.site-navigation').addClass(dataMenuStyle)

    }

    var dataMenuLayout = pageSettings.data('menu-layout');

    if (dataMenuLayout != null) {
        var menuLayout = dataMenuLayout;

        $('.site-navigation').addClass(dataMenuLayout)

    }

    var dataBackground = pageSettings.data('background');

    if (dataBackground != null) {
        var bodyBg = dataBackground

        body.css('background', dataBackground);
        $('.np-ov').css('background', dataBackground);

    }


    if ($('.single-project').length > 0) {

        $('.site-footer').addClass('project-footer');

    }

    ///////////////////////////////////////////// Page Layout  /////////////////////////////////////////////

    ///////////////////////////////////////////// Site Navigation  /////////////////////////////////////////////

    $('.menu > li > a').each(function () {
        var dataHover = $(this).text();

        var attrHref = $(this).attr('href');

        if (attrHref === '#') {

            $(this).addClass('no-trans')
        }

        if ($('.site-navigation').hasClass('classic')) {

            $(this).wrapInner('<span data-hover="' + dataHover + '"></span>')

        } else {
            $(this).attr('data-hover', dataHover);
        }

    });

    $('.menu > li').on('mouseenter', function () {

        $('.menu > li').removeClass('menu-item-hover')
        $(this).addClass('menu-item-hover');

    });

    $('.menu > li').on('mouseleave', function () {

        $('.menu > li').removeClass('menu-item-hover')
        $('.menu > li.menu-item-active').addClass('menu-item-hover');

    });

    var scA = $('.scrolling-button a').marquee({
        duplicated: true,
        delayBeforeStart: 0,
    });

    scA.marquee('pause');

    //// Menu Animations End

    /* Sub-Menus */

    if (!$('.site-navigation').hasClass('classic')) {

        $('.sub-menu > .menu-item.has-children').on('mouseenter', function () {

            $('.sub-menu .sub-menu').removeClass('sub-sub-in')

            var subsubmenu = $(this).children('.sub-menu')

            subsubmenu.addClass('sub-sub-in')

        });

        $('.menu > .menu-item.has-children > .sub-menu').on('mouseleave', function () {
            $('.sub-menu .sub-menu').removeClass('sub-sub-in');
        });


    }
    /* Sub-Menus */


    $('.site-navigation').prepend('<span class="menu-ov menu-ov-1"></span><span class="menu-ov menu-ov-2"></span><span class="menu-ov menu-ov-3"></span><span class="menu-ov menu-ov-4"></span>')

    /* Menu Toggle Hamburger */

    $('.menu-toggle').prepend('<span class="toggle-line toggle-line-1"></span><span class="toggle-line toggle-line-2"></span>')

    // Show the hamburger immediately so it is not gated on window.load + loader animation.
    // The fade-in delight was a nice-to-have; visibility is the must-have.
    $('.toggle-line').addClass('toggle-line-in');

    $('.menu-toggle').on('click', function () {

        var clicks = $(this).data('clicks');
        if (clicks) {



            setTimeout(function () {
                $('.site-header').removeClass('dark-nav-active light-nav-active');
                $('.site-navigation').removeClass('nav-open')

            }, 380);

            $('.sub-toggle').removeClass('st-in')

            $('.sub-menu').removeClass('sub-menu-in');
            $('.sub-toggle').removeClass('st-active');
            $('.sub-menu .sub-menu').removeClass('sub-sub-in')

            $('.menu-wrapper').css('visibility', 'hidden');

            scA.marquee('pause');

            $(this).removeClass('is-active');

            $('.menu-ov').removeClass('menu-ov-in');

            $('.menu > li > a').each(function (i, element) {
                $(element).delay(i * 20).queue(function (next) {
                    $(this).removeClass('menu-item-comes');
                    next();
                });
            });

            $('.mww-1, .mww-2').removeClass('mww-in');

            $('.widget-socials li').removeClass('so-li-in');


        } else {

            $('.site-navigation').addClass('nav-open')

            $('.menu-wrapper').css('visibility', 'visible');

            $(this).addClass('is-active');

            $('.menu-ov').addClass('menu-ov-in');

            scA.marquee('resume');


            if ($('.site-navigation').hasClass('light')) {
                setTimeout(function () {
                    $('.site-header').addClass('light-nav-active')
                }, 150);

            } else {

                setTimeout(function () {

                    $('.site-header').addClass('dark-nav-active')
                }, 150);


            }


            setTimeout(function () {

                $('.menu > li > a').each(function (i, element) {
                    $(element).delay(i * 30).queue(function (next) {
                        $(this).addClass('menu-item-comes');
                        next();
                    });
                });

            }, 200);

            setTimeout(function () {

                $('.mww-1, .mww-2').addClass('mww-in');

                $('.widget-socials li').each(function (i, element) {
                    $(element).delay(i * 40).queue(function (next) {
                        $(this).addClass('so-li-in');
                        next();
                    });
                });

            }, 300);

            setTimeout(function () {
                $('.sub-toggle').addClass('st-in')
            }, 500);


        }
        $(this).data("clicks", !clicks);

    });
    /* Menu Toggle Hamburger */


    $('.menu-item a').not('.no-trans').on('click', function () {

        $('.menu li').removeClass('menu-item-active');

        $(this).parents('li').addClass('menu-item-active')

        setTimeout(function () {
            $('.sub-menu').removeClass('sub-menu-in');
            //  $('.sub-menu .sub-menu').removeClass('sub-sub-in')
            $('.sub-toggle').removeClass('st-active');
            $('.sub-toggle').removeClass('st-in')
        }, 5);


        $('.menu-wrapper').css('visibility', 'hidden');

        scA.marquee('pause');

        $('.menu > li > a').each(function (i, element) {
            $(element).delay(i * 20).queue(function (next) {
                $(this).removeClass('menu-item-comes');
                next();
            });
        });

        setTimeout(function () {
            $('.site-navigation').removeClass('nav-open')
        }, 300)

        $('.mww-1, .mww-2').removeClass('mww-in');

        $('.widget-socials li').removeClass('so-li-in');


        $('.menu-toggle').data('clicks', false);

    })

    if ($(window).outerWidth() < 850) {
        $('.site-navigation').removeClass('classic')
    }


    $('.site-navigation .menu > li.menu-item.has-children').each(function () {

        $(this).prepend('<i class="sub-toggle  icon-plus"><i>');

    })

    $('.sub-toggle').on('click', function () {

        $(this).toggleClass('st-active')

        var parentLi = $(this).parent('li');
        var openSub = parentLi.children('.sub-menu');

        openSub.toggleClass('sub-menu-in')


    });





    ///////////////////////////////////////////// Site Navigation  /////////////////////////////////////////////

    ///////////////////////////////////////////// Scroll Animations /////////////////////////////////////////////
    if ($('.has-animation').length > 0) {
        $('.has-animation').each(function () {
            $(this).attr('data-scroll', 'true');

            var haDelay = $(this).data('delay') + 's'
            var haDuration = $(this).data('duration') + 's'

            $(this).css({
                transitionDelay: haDelay,
                transitionDuration: haDuration

            })
        });


        $('.lines-up, .lines-down, .lines-fade-up, .lines-fade-down').each(function () {

            $(this).splitLines({
                tag: '<div><span class="split-line"></div>',
                keepHtml: true,
            });

            var splitLines = $(this).find('.split-line');

            splitLines.each(function (i) {

                var delay = i / 7.5;

                var splitParent = $(this).parents('.has-animation');
                var baseDelay = splitParent.data('delay');

                if (baseDelay == null) {

                    var finalDelay = delay + 's'

                } else {

                    var finalDelay = baseDelay + delay + 's'
                };


                $(this).css({
                    transitionDelay: finalDelay

                })


            })

        });

    };
    ///////////////////////////////////////////// Scroll Animations /////////////////////////////////////////////


    ///////////////////////////////////////////// Site Scripts /////////////////////////////////////////////
    $(window).on('load', function () {


        ////////// Page Loader /////////

        var loadingAn = anime({
            targets: '.line',
            height: '100%',
            duration: 3000,
            delay: 0,
            easing: 'easeInOutCubic',
            begin: function (anim) {
                $('.cygni-loader').addClass('in');
            },
            complete: function (anim) {

                $('.cygni-loader').addClass('out');

                setTimeout(function () {

                    $('#main').addClass('loaded');

                }, 100);

                setTimeout(function () {

                    var peScroll = new LocomotiveScroll({
                        el: document.querySelector('#main'),
                        smooth: false,

                    });

                    window.peScroll = peScroll;

                }, 250);

                if ($('.portfolio-showcase').length < 1) {
                    setTimeout(function () {

                        if ($('.site-navigation').hasClass('classic')) {
                            $('.site-navigation.classic .menu > li > a > span').each(function (i, element) {
                                $(element).delay(i * 75).queue(function (next) {
                                    $(this).addClass('span-in');
                                    next();
                                });
                            });

                        } else {
                            $('.toggle-line').addClass('toggle-line-in');
                        }


                    }, 1500)

                    setTimeout(function () {

                        $('.site-branding img ').addClass('logo-in');
                    }, 1900)

                }


                setTimeout(function () {

                    $('.menu-item-active').addClass('menu-item-hover');

                }, 1000);



            }
        })

        window.loadingAn = loadingAn

        anime({
            targets: '.cygni-loader',
            bottom: '100%',
            duration: 3000,
            delay: 0,
            easing: 'easeInOutCubic',
        })

        anime({
            targets: '.cygni-loader .counter',
            innerHTML: [0, 100],
            round: 1,
            duration: 3000,
            delay: 0,
            easing: 'easeInOutCubic',
            update: function (anim) {

                var number = $('.cygni-loader .counter').html();

                if (number < 10) {

                    $('.cygni-loader .counter').prepend('00')
                } else if ((number >= 10) && (number < 100)) {
                    $('.cygni-loader .counter').prepend('0')
                }

            }
        })

        ////////// Page Loader /////////


        ///////////// Showcase Layouts /////////////

        /* List V2 */

        if ($('.list-v2').length > 0) {

            var project = $('.listv2-project');

            Scrollbar.init(document.querySelector('.listv2-wrapper'));

            project.each(function (i) {
                i++

                let $this = $(this),
                    listv2Img = $this.find('.project-image');

                listv2Img.addClass('image_' + i)



                $('.lv2-images').append(listv2Img);


                if (i < 10) {

                    $this.attr('data-index', '0' + i);

                } else if (i > 9) {
                    $this.attr('data-index', i);
                }

                $this.attr('data-image', '.image_' + i)



            })


            $('.listv2-project a').on('mouseenter', function (i) {



                let $this = $(this),
                    image = $this.parent('.listv2-project').attr('data-image'),
                    allImages = $('.project-image'),
                    allProjects = $('.listv2-project');

                allImages.removeClass('active');
                $(image).addClass('active');

                $('.listv2-wrapper').addClass('hovered')

                allProjects.removeClass('hover')
                $this.parent(allProjects).addClass('hover');




            })

            $('.listv2-project a').on('mouseleave', function () {

                let $this = $(this),
                    image = $this.children('.project-image'),
                    allImages = $('.project-image'),
                    allProjects = $('.listv2-project')

                $('.listv2-wrapper').removeClass('hovered');
                allProjects.removeClass('hover');
                allImages.removeClass('active');

            })
            


            loadingAn.finished.then(function () {


                setTimeout(function () {

                    var lvaCome = anime({
                        autoplay: true,
                        loop: false,
                        translateY: [120, 0],
                        opacity: [0, 1],
                        easing: "easeOutCubic",
                        duration: 800,
                        targets: '.listv2-project a',
                        delay: anime.stagger(100),
                        complete: function (anim) {
                            $('.listv2-wrapper').addClass('loaded');
                        }
                    });


                }, 500);

                setTimeout(function () {
                    $('.site-branding img ').addClass('logo-in');
                }, 1200);

                setTimeout(function () {
                    $('.toggle-line').addClass('toggle-line-in');


                }, 1700);

                setTimeout(function () {

                    $('.fullscreen-footer a').each(function (i, element) {
                        $(element).delay(i * 75).queue(function (next) {
                            $(this).addClass('span-in');
                            next();
                        });
                    });


                }, 1250);



                /* List V2 Opening */



            });



        }

        /* List V2 */



        /* Grid */
        if ($('.portfolio-grid').length) {

            $('.grid-project').each(function (i) {
                i++

                while (i >= 6) {
                    i = i - 5
                }

                $(this).addClass('width-' + i)


            })

            $('.grid-project-cat, .grid-project-title, .grid-project-index').each(function () {

                $(this).wrapInner('<span></span>')

            })


            var $pgrid = $('.portfolio-grid').masonry({
                itemSelector: '.grid-project',
                columnWidth: '.pg-sizer',
                gutter: 0,
                percentPosition: true
            });

            // layout Masonry after each image loads
            $pgrid.imagesLoaded().progress(function () {
                $pgrid.masonry('layout');


                $('.width-1').each(function () {

                    var w1 = $(this);
                    var next3 = w1.nextAll('.width-3').first();
                    var mb = next3.outerHeight();

                    w1.css({
                        marginBottom: mb / 2
                    })

                })

                $('.width-3').each(function () {

                    var w3 = $(this);
                    var next5 = w3.nextAll('.width-5').first();
                    var w3h = w3.outerHeight();
                    var mb = next5.outerHeight();

                    w3.css({
                        marginBottom: mb
                    })
                })

                $(".width-3").last().addClass("no-mar");

                $('.width-5').each(function () {
                    var w5 = $(this);
                    var prev3 = w5.prevAll('.width-3').first();

                    var mt = prev3.outerHeight();

                    w5.css({
                        marginTop: mt / 2
                    })

                })

                $('.width-2').each(function () {

                    var w2 = $(this);
                    var prev1 = w2.prevAll('.width-1').first();
                    var mt = prev1.outerHeight();

                    w2.css({
                        marginTop: mt / 2
                    })
                })



            });

        }
        /* Grid */

        /* Detailed */
        if ($('.detailed').length) {

            $('.plus-button a').prepend('<span class="line-s"></span><span class="line-s"></span>')

            var projectURL = $('.detailed-project:nth-child(1)').find('a').attr('href');

            $('.detailed-button').wrapInner('<a href="' + projectURL + '"><p></p></a>');
            $('.detailed-button').prepend('<span></span><span></span><span></span><span></span>')


            $('.plus-button a').on('mouseenter', function () {

                $(this).parent('.plus-button').addClass('pb-active');

            });

            $('.plus-button').on('mouseleave', function () {
                $(this).removeClass('pb-active')
            });

            $('.detailed-images').prepend('<div class="swiper-wrapper"></div>')

            $('.detailed-project').each(function (i) {

                i++
                $(this).addClass('project-' + i);

                var projectImage = $(this).find('.project-image').html();

                $('.detailed-images .swiper-wrapper').append('<div class="swiper-slide" data-slide="' + i + '"><div class="detailed-image"><div class="slide-bgimg">' + projectImage + '</div></div></div>')

            });

            $('.big-slide-button').wrapInner('<a href="#" class="project-url"><p class="bsb-link"><p></a>')
            $('.big-slide-button .project-url').prepend('<span></span><span></span><span></span><span></span>')



            var interleaveOffset = 0.7;

            var detailedImages = new Swiper('.detailed-images', {
                mousewheel: {
                    invert: false,
                    eventsTarged: '.detailed-portfolios'
                },
                navigation: {
                    nextEl: '.detailed-next',
                    prevEl: '.detailed-prev',
                },
                pagination: {
                    el: '.detailed-dots',
                    type: 'bullets',
                    clickable: true,
                    bulletClass: 'detailed-dot',
                    bulletActiveClass: 'dot-index-active',
                    renderBullet: function (index, className) {
                        return ' <span class="' + className + '"><span class="dot-index">0' + (index + 1) + '</span></span>'
                    },
                },
                slidesPerView: 1,
                direction: 'vertical',
                speed: 1200,
                parallax: true,
                watchSlidesProgress: true,
                on: {
                    init: function () {

                        var dtPSelect = $('.swiper-slide-active').data('slide');
                        var dtPvis = '.project-' + dtPSelect;

                        $(dtPvis).addClass('dp-active');

                        $('.project-year, .project-category, .project-excerpt').wrapInner('<span></span>')

                        $('.project-title').each(function () {

                            $(this).splitLines({
                                tag: '<div><span class="dpt-line"></div>',
                                keepHtml: true,
                            });

                        });

                    },

                    progress: function () {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            let slideProgress = swiper.slides[i].progress,
                                innerOffset = swiper.width * interleaveOffset,
                                innerTranslate = slideProgress * innerOffset;

                            swiper.slides[i].querySelector(".slide-bgimg").style.transform =
                                "translateY(" + innerTranslate + "px)";


                        }
                    },
                    setTransition: function (speed) {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = speed + "ms";
                            swiper.slides[i].querySelector(".slide-bgimg").style.transition =
                                speed + "ms";
                        }
                    },


                    slideNextTransitionStart: function () {

                        var dtNextOut = anime({
                            autoplay: false,
                            loop: false,
                            translateX: [0, 25],
                            opacity: [1, 0],
                            easing: "easeInCubic",
                            duration: 600,
                            targets: '.dp-active .project-title > div, .dp-active .project-year span, .dp-active .project-excerpt span, .dp-active .project-meta, .dp-active .project-category span',
                            delay: anime.stagger(50, {
                                from: 'last'
                            })

                        });



                        dtNextOut.restart();



                    },

                    slideNextTransitionEnd: function () {
                        var dtNextIn = anime({
                            autoplay: false,
                            loop: false,
                            translateX: [-25, 0],
                            opacity: [0, 1],
                            easing: "easeOutCubic",
                            duration: 600,
                            targets: '.dp-active .project-title > div, .dp-active .project-year span, .dp-active .project-excerpt span, .dp-active .project-meta, .dp-active .project-category span',
                            delay: anime.stagger(50)

                        });
                        dtNextIn.restart();

                    },

                    slidePrevTransitionStart: function () {

                        var dtPrevOut = anime({
                            autoplay: false,
                            loop: false,
                            translateX: [0, -25],
                            opacity: [1, 0],
                            easing: "easeInCubic",
                            duration: 600,
                            targets: '.dp-active .project-title > div, .dp-active .project-year span, .dp-active .project-excerpt span, .dp-active .project-meta, .dp-active .project-category span',
                            delay: anime.stagger(50, {
                                from: 'last'
                            })
                        });
                        dtPrevOut.restart()


                    },
                    slidePrevTransitionEnd: function () {

                        var dtPrevIn = anime({
                            autoplay: false,
                            loop: false,
                            translateX: [25, 0],
                            opacity: [0, 1],
                            easing: "easeOutCubic",
                            duration: 600,
                            targets: '.dp-active .project-title > div, .dp-active .project-year span, .dp-active .project-excerpt span, .dp-active .project-meta, .dp-active .project-category span',
                            delay: anime.stagger(50)

                        });

                        dtPrevIn.restart();
                    },

                    transitionEnd: function () {

                        $('.detailed-project').removeClass('dp-active');
                        var activeIndex = $('.swiper-slide-active').data('slide');
                        var dptAcive = '.project-' + activeIndex;

                        $(dptAcive).addClass('dp-active');

                        $('.detailed-fraction .current').html('0' + activeIndex);

                        var projectURL = $(dptAcive).find('a').attr('href')

                        $('.detailed-button a').attr('href', projectURL)


                    }

                }

            });

            var totIndex = $('.detailed-dot').length;

            $('.detailed-fraction .total').html('0' + totIndex);

            loadingAn.finished.then(function () {


                var dtLoaded = anime({
                    autoplay: false,
                    loop: false,
                    translateX: [-25, 0],
                    opacity: [0, 1],
                    easing: "easeOutCubic",
                    duration: 1000,
                    targets: '.project-year span, .project-excerpt span, .project-meta, .project-category span',
                    delay: anime.stagger(50)

                });

                var dtTitleLoaded = anime({
                    autoplay: false,
                    loop: false,
                    translateX: [-50, 0],
                    opacity: [0, 1],
                    easing: "easeOutCubic",
                    duration: 1000,
                    targets: '.project-title > div',
                    delay: anime.stagger(100)

                });

                dtTitleLoaded.play();

                setTimeout(function () {


                    $('.detailed').addClass('dt-loaded');
                }, 500);




                setTimeout(function () {
                    dtLoaded.play();

                    $('.detailed-dot').each(function (i, element) {
                        $(element).delay(i * 175).queue(function (next) {
                            $(this).addClass('dot-in');
                            next();
                        });
                    });

                }, 1500);

                setTimeout(function () {

                    $('.detailed-button').addClass('db-loaded');
                    $('.plus-button').addClass('pb-in');

                }, 2500)

                setTimeout(function () {

                    $('.site-branding img ').addClass('logo-in');
                    $('.toggle-line').addClass('toggle-line-in');

                }, 2000);


            });

        }
        /* Detailed */

        /* List */
        if ($('.list-titles').length > 0) {

            $('.line').addClass('line-arange');

            $('.list-image').each(function (i) {

                var index = i + 1
                var slide = $(this).attr('data-index', 'slide-' + index);
                var slideIna = $(this).attr('data-slide', index);

                var totIndex = $('.list-image').length;

                $('.lt-total').text('0' + totIndex)

                var slideClass = $(this).data('index');

                $(this).addClass(slideClass)

                window.slide = slide;

                var title = $(this).find('.list-p-title').text();

                window.title = title;

            });

            var interleaveOffset = 0.5;

            var listImages = new Swiper('.list-images', {
                slidesPerView: 'auto',
                speed: 750,
                spaceBetween: 250,
                watchSlidesProgress: true,
                parallax: true,
                navigation: {
                    nextEl: '.lc-next',
                    prevEl: '.lc-prev',
                },
                pagination: {
                    el: '.list-titles',
                    type: 'bullets',
                    bulletClass: 'list-title',
                    clickable: false,
                    renderBullet: function (index, className) {
                        var realIndex = index + 1;
                        var slideSelector = '.slide-' + realIndex;

                        return '<a href="" data-push="' + index + '"data-select="' + slideSelector + '" class="list-title"></a>';
                    }
                },
                containerClass: 'list-images',
                centeredSlides: true,
                on: {
                    transitionStart: function () {

                        var currIndex = $('.swiper-slide-active').data('slide')

                        $('.lt-current').text('0' + currIndex)

                        if ($('.swiper-slide-active').hasClass('dark')) {

                            $('.list-carousel').addClass('dark-slide-init')

                        } else {
                            $('.list-carousel').removeClass('dark-slide-init')
                        }

                    }
                },
                breakpoints: {
                    850: {
                        centeredSlides: false
                    }
                }

            });

            $('.list-title').each(function () {
                var slideSelect = $(this).data('select');
                var title = $(slideSelect).find('.list-p-title').text();

                var listURL = $(slideSelect).find('a').attr('href');

                $(this).attr('href', listURL)

                $(this).text(title);
                $(this).attr('data-hover', title);


            });

            $('.list-title').on('mouseenter', function () {

                var slidePush = $(this).data('push');

                listImages.slideTo(slidePush)

            });

            $('.list-titles').on('mouseenter', function () {
                $('.list-scroll').removeClass('hidden');
            });

            $('.list-titles').on('mouseleave', function () {
                $('.list-scroll').addClass('hidden');
            });

            $('.list-titles').prepend('<span class="scroll-rat"></span>')
            $('.list-titles').append('<span class="scroll-rat"></span>')

            Scrollbar.init(document.querySelector('.list-titles'));


            loadingAn.finished.then(function () {

                /* List Carousel Opening */


                setTimeout(function () {

                    $('.list-image').each(function (i, element) {
                        $(element).delay(i * 250).queue(function (next) {
                            $(this).addClass('ino');
                            next();
                        });
                    });


                    $('.line').removeClass('line-arange')

                }, 200);

                setTimeout(function () {

                    $('.list-title').each(function (i, element) {
                        $(element).delay(i * 100).queue(function (next) {
                            $(this).addClass('ino');
                            next();
                        });
                    });


                }, 1000);


                setTimeout(function () {

                    $('.lc-prev i, .lc-next i').addClass('ino')
                    $('.lt-current, .lt-total').addClass('ino')
                }, 1250);


                setTimeout(function () {
                    $('.site-branding img ').addClass('logo-in');
                }, 1500);

                setTimeout(function () {
                    $('.toggle-line').addClass('toggle-line-in');

                    $('.list-carousel').addClass('list-init')

                }, 2000);


                /* List Carousel Opening */



            });


        };
        /* List */

        /* Vertical */
        if ($('.vertical-projects').length > 0) {


            $('.vertical-image-wrapper').each(function () {

                if ($(this).find('video').length > 0) {

                    var vVid = $(this).find('video')

                    var vVidHeight = vVid.outerHeight();

                    $(this).wrapInner('<div class="vertical-anim-holder"></div>');

                    $(this).css('height', vVidHeight + 'px');

                    vVid.css({
                        width: 'auto',
                        position: 'absolute'
                    })

                } else {

                    var vImg = $(this).find('img')

                    var vImgHeight = vImg.outerHeight();

                    $(this).wrapInner('<div class="vertical-anim-holder"></div>');



                    $(this).css('height', vImgHeight + 'px');

                    vImg.css({
                        width: 'auto',
                        position: 'absolute'
                    })

                }

            })

            $('.vertical-item-title').each(function (i) {

                $(this).splitLines({
                    tag: '<div><span class="title-line"></div>',
                    keepHtml: true,
                });

                var viLines = $(this).find('div');

                /*    viLines.each(function (i) {

                        var viLine = $(this).find('span')

                        var viDelay = i / 5 + 0.55;

                        viLine.css({
                            transitionDelay: viDelay + 's'

                        })


                    }) */

            });

            loadingAn.finished.then(function () {


                /* Vertical Opening */

                setTimeout(function () {
                    var verticalScroll = new LocomotiveScroll({
                        el: document.querySelector('.vertical-projects'),
                        smooth: true,
                        offset: ['10%', 0],
                    });

                    window.verticalScroll = verticalScroll;

                }, 250);

                setTimeout(function () {
                    $('.site-branding img ').addClass('logo-in');
                }, 1000);

                setTimeout(function () {
                    $('.toggle-line').addClass('toggle-line-in');

                    $('.vertical-projects').addClass('vertical-init')
                }, 1500);



                /* Vertical Opening */


            });


            $('a').on('click', function () {
                verticalScroll.destroy();

            });

        };
        /* Vertical */

        /* Big Slider */
        if ($('.big-slider').length > 0) {

            $('body').css('overflow', 'hidden');

            $('.line').addClass('line-arange');

            $('.portfolio-showcase').addClass('loading')

            $('.big-slider-item .title, .big-slider-item .summary').each(function () {

                $(this).splitLines({
                    tag: '<div><span class="span-line"></div>',
                    keepHtml: true,
                });

            })

            $('.big-slider-item .year, .big-slider-item .category, .big-slider-item .meta div').each(function () {
                $(this).wrapInner('<span></span>')

            })

            $('.big-slider-overlays').prepend('<span class="bs-ov bs-ov-1"></span><span class="bs-ov bs-ov-2"></span><span class="bs-ov bs-ov-3"></span><span class="bs-ov bs-ov-4"></span>')

            $('.bs-splitted').append('<div class="big-images swiper-container"><div class="swiper-wrapper"></div></div>')

            $('.big-slider-item').each(function () {

                var bsi = $(this);

                if (bsi.find('video').length > 0) {

                    var bigVid = bsi.find('source');
                    var bigVidUrl = bigVid.attr('src');
                    $('.bs-splitted .swiper-wrapper').append('<div class="swiper-slide"><div class="big-image"><video playsinline autoplay muted loop class="big-video-split"><source type="video/mp4" src="' + bigVidUrl + '"></video></div></div>');


                    var bigVidSplit = $('.big-video-split');



                } else {
                    var bigImg = $(this).find('img');
                    var bigImgUrl = bigImg.attr('src');

                    $('.bs-splitted .swiper-wrapper').append('<div class="swiper-slide"><div class="big-image"><img src="' + bigImgUrl + '"></div></div>')

                }


            });


            $('.big-slide-button').wrapInner('<a href="#" class="project-url"><p class="bsb-link"><p></a>')
            $('.big-slide-button .project-url').prepend('<span></span><span></span><span></span><span></span>')

            $('.bsb-link').wrapInner('<wrap></wrap>');

            var bsURLFirst = $('.big-slider-item a:first-child').attr('href');

            $('.big-slide-button .project-url').attr('href', bsURLFirst);


            var bigSlider = new Swiper('.big-slider', {
                mousewheel: {
                    invert: false,
                },
                slidesPerView: 1,

                navigation: {
                    nextEl: '.big-slide-next',
                    prevEl: '.big-slide-prev',
                },
                pagination: {
                    el: '.bs-bullets',
                    type: 'bullets',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">0' + (index + 1) + '</span>';
                    }
                },
                loop: false,
                direction: 'vertical',
                virtualTranslate: true,
                watchSlidesProgress: true,
                containerModifierClass: 'big-slider-',
                slideClass: 'big-slider-item',
                containerClass: 'big-slider',
                wrapperClass: 'big-slider-wrapper',
                slideActiveClass: 'big-item-active',
                slideNextClass: 'big-item-next',
                slidePrevClass: 'big-item-prev',


            });



            var titleAnimNext = anime.timeline({
                    autoplay: false,
                    loop: false,
                    targets: '.title .span-line',

                }).add({
                    translateY: ['0', '-110%'],
                    easing: "easeInExpo",
                    ////       delay: function (el, i) {
                    ////           return 150 + i * 50;
                    ////       },

                    duration: 650,
                    complete: function (anim) {
                        titleAnimNext.pause();
                    }
                })
                .add({
                    translateY: ['110%', '0'],
                    easing: "easeOutExpo",
                    //    delay: function (el, i) {
                    //        return i * 50;
                    //    },

                    duration: 650,
                })


            var titleAnimPrev = anime.timeline({
                    //   delay: function (el, i, l) {
                    //       return (l - i) * 50;
                    //  },
                    duration: 700,
                    autoplay: false,
                    loop: false,
                    targets: '.title .span-line',
                }).add({
                    translateY: ['0', '110%'],
                    easing: "easeInExpo",
                    complete: function (anim) {
                        titleAnimPrev.pause();
                    }
                })
                .add({
                    translateY: ['-110%', '0'],
                    easing: "easeOutExpo",
                })


            window.titleAnimNext = titleAnimNext
            window.titleAnimPrev = titleAnimPrev



            $('.big-slider-item').addClass('bs-inactive');
            $('.big-slider-item.big-item-active').addClass('bs-active');

            $('.big-image').addClass('big-image-anim');



            var interleaveOffset = 0.45;
            var bigImages = new Swiper('.big-images', {
                navigation: {
                    nextEl: '.big-slide-next',
                    prevEl: '.big-slide-prev',
                },
                slidesPerView: 1,
                mousewheel: {
                    invert: false,
                },
                pagination: {
                    el: '.bs-bullets',
                    type: 'bullets',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">0' + (index + 1) + '</span>';
                    }
                },
                loop: false,
                autoplay: {
                    delay: 10000,
                    waitForTransition: false,
                    disableOnInteraction: false
                },
                speed: 1300,
                direction: 'vertical',
                parallax: true,
                watchSlidesProgress: true,
                on: {
                    progress: function () {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            let slideProgress = swiper.slides[i].progress,
                                innerOffset = swiper.width * interleaveOffset,
                                innerTranslate = slideProgress * innerOffset;
                        }
                    },
                    setTransition: function (speed) {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = speed + "ms";
                            swiper.slides[i].querySelector(".big-image").style.transition =
                                speed + "ms";
                        }
                    },

                    transitionStart: function () {
                        $('.big-slider .title .span-line').css({
                            transition: 'auto'
                        });

                        $('.bs-ov').addClass('trans-start');

                    },
                    transitionEnd: function () {
                        $('.big-slider-item').removeClass('bs-active');
                        $('.big-slider-item.big-item-active').addClass('bs-active');


                        $('.swiper-pagination-bullet-active').removeClass('progress-init')

                        setTimeout(function () {
                            $('.swiper-pagination-bullet-active').addClass('progress-init')


                        }, 1);


                        var bsURL = $('.big-slider-item.big-item-active a').attr('href');

                        $('.big-slide-button .project-url').attr('href', bsURL);

                    },
                    slideNextTransitionStart: function () {


                        var overlayAnimNext = anime.timeline({
                            easing: 'easeInOutCubic',
                            duration: 600,
                            autoplay: false,
                            loop: false,
                            targets: '.bs-ov',
                            delay: function (el, i) {
                                return i * 50;
                            },

                        }).add({
                            translateY: ['100%', '0'],
                            complete: function (anim) {
                                overlayAnimNext.pause();
                            }

                        }).add({
                            translateY: ['0', '-100%'],
                        });
                        window.overlayAnimNext = overlayAnimNext

                        overlayAnimNext.restart();
                        titleAnimNext.restart();
                    },

                    slideNextTransitionEnd: function () {
                        setTimeout(function () {
                            titleAnimNext.play();
                            overlayAnimNext.play();
                        }, 1);
                    },

                    slidePrevTransitionStart: function () {


                        var overlayAnimPrev = anime.timeline({
                            easing: 'easeInOutCubic',
                            duration: 600,
                            autoplay: false,
                            loop: false,
                            targets: '.bs-ov',
                            delay: function (el, i) {
                                return i * 30;
                            },

                        }).add({
                            translateY: ['-100%', '0'],
                            complete: function (anim) {
                                overlayAnimPrev.pause();
                            }

                        }).add({
                            translateY: ['0', '100%'],
                        });


                        window.overlayAnimPrev = overlayAnimPrev


                        titleAnimPrev.restart();
                        overlayAnimPrev.restart();
                    },

                    slidePrevTransitionEnd: function () {
                        setTimeout(function () {
                            titleAnimPrev.play();
                            overlayAnimPrev.play();
                        }, 1);


                    },

                }


            });

            $('.swiper-pagination-bullet-active').addClass('progress-init')
            bigImages.controller.control = bigSlider


            loadingAn.finished.then(function () {

                /* Big Slider Opening */


                $('.portfolio-showcase').removeClass('loading')

                setTimeout(function () {



                }, 800)


                setTimeout(function () {
                    $('.big-slide-pag i').addClass('anim-in')

                }, 1500);

                setTimeout(function () {

                    $('.bs-bullets .swiper-pagination-bullet').each(function (i, element) {
                        $(element).delay(i * 200).queue(function (next) {
                            $(this).addClass('anim-in');
                            next();
                        });
                    });


                }, 1250);

                setTimeout(function () {
                    $('.site-branding img ').addClass('logo-in');
                }, 1500);

                setTimeout(function () {
                    $('.toggle-line').addClass('toggle-line-in');
                }, 2000);

                /* Big Slider Opening */

            });


        }
        /* Big Slider */

        /* All Projects */
        if ($('.all-projects').length > 0) {

            $('.all-projects .project').each(function (i) {

                $(this).addClass('anim-ready')

                var imageIndex = 'image-' + i;
                var imageAttr = '.image-' + i;
                $(this).attr('data-image', imageAttr);

                var ftImage = $(this).find('.featured-image');
                var imageUrl = ftImage.attr('src');

                var apSummary = $(this).find('.summary').text();
                var apCategory = $(this).find('.category').text();

                var apMeta = $(this).find('.meta').html();




                $('.all-projects-metas').append('<div class="all-project-meta ' + imageIndex + '"><div class="category"><span>' + apCategory + '</span></div><div class="meta-summ"><div class="meta">' + apMeta + '</div><div class="summary">' + apSummary + '</div></div></div>');



                $('.projects-images').append('<div class="pe-project-image ' + imageIndex + '"><img src="' + imageUrl + '"></div>');

                var dataCat = $(this).attr('data-category');
                $(this).addClass('category-' + dataCat);

                $(this).addClass('category-all');

            });


            $('.all-projects-cats li').each(function () {

                $(this).wrapInner('<span class="anim-ready"><span>')

                var dataHov = $(this).text();
                $(this).attr('data-hover', dataHov);

            });

            $('.all-projects-cats li').on('click', function () {


                if (!$(this).hasClass('cat-active')) {
                    var filteredC = $(this).attr('class');
                    var filteredCat = '.' + filteredC;

                    $('.all-projects-cats li').removeClass('cat-active');
                    $(this).addClass('cat-active');

                    var allProjects = $('.all-projects').find('.project');

                    var allPvisible = $('.all-projects').find('.project:visible');

                    var apDelay = (allPvisible.length * 50 + 300);


                    allProjects.each(function (i, element) {

                        var $this = $(this);

                        $(element).delay(i * 50).queue(function (next) {
                            $this.addClass('up');
                            next();
                        });

                        setTimeout(function () {

                            if ($this.hasClass(filteredC)) {

                                $this.css('display', 'block')
                                $this.addClass('ready')

                            } else {

                                $this.css('display', 'none')

                            }

                        }, apDelay)


                    });


                    setTimeout(function () {

                        $('.ready').each(function (i, element) {
                            $(element).delay(i * 50).queue(function (next) {
                                $(this).removeClass('up ready')
                                next();
                            });


                        })

                    }, apDelay + 20)

                }

            });


            $('.project').on('mouseenter', function () {

                if ($(this).hasClass('light')) {
                    $('.portfolio-showcase').addClass('light-init')
                }

                var showImage = $(this).data('image');
                $(showImage).addClass('image-show');

                $('.project').addClass('project-hidden');
                $(this).removeClass('project-hidden');



            });

            $('.project').on('mouseleave', function () {

                $('.project').removeClass('project-hidden');


                $('.pe-project-image').removeClass('image-show');
                $('.all-project-meta').removeClass('image-show');

                $('.portfolio-showcase').removeClass('light-init')


            });


        }
        /*All Projects */

        /* Horizontal */
        if ($('.cygni-horizontal').length > 0) {

            $('.cygni-horizontal').prepend('<span class="hor-ov"></span><span class="hor-ov"></span><span class="hor-ov"></span>')

            $('.line').addClass('line-arange');


            var horTitle = $('.cygni-horizontal .title');
            horTitle.each(function () {
                $(this).wrapInner('<span></span>')

            })


            $('.cygni-horizontal-images').addClass('swiper-container');
            $('.cygni-horizontal-images').append('<div class="swiper-wrapper"></div>');

            $('.horizontal-item').each(function (i) {

                var horIndex = i + 1;

                $(this).attr('data-index', horIndex)

                var horTitle = $(this).find('.title').text();
                $(this).find('.title').attr('data-hover', horTitle)


                if ($(this).find('video').length > 0) {

                    var vidSt = $(this).find('.horizontal-image').html();

                    var horWrapper = $('.cygni-horizontal-images .swiper-wrapper');

                    horWrapper.append('<div class="swiper-slide"><div class="horizontal-image-wrapper"><div class="slide-bgimg">' + vidSt + '</div></div></div>')

                } else {

                    var imgUrl = $(this).find('.horizontal-image img').attr('src');

                    var horWrapper = $('.cygni-horizontal-images .swiper-wrapper');

                    horWrapper.append('<div class="swiper-slide"><div class="horizontal-image-wrapper"><div class="slide-bgimg"><img src="' + imgUrl + '"></div></div></div>')

                }


            })

            var interleaveOffset = 0.5;

            var horImages = new Swiper('.cygni-horizontal-images', {
                mousewheel: {
                    invert: false,
                },
                slidesPerView: 1,

                speed: 800,
                parallax: true,
                watchSlidesProgress: true,
                on: {


                    progress: function () {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            let slideProgress = swiper.slides[i].progress,
                                innerOffset = swiper.width * interleaveOffset,
                                innerTranslate = slideProgress * innerOffset;

                            swiper.slides[i].querySelector(".slide-bgimg").style.transform =
                                "translateX(" + innerTranslate + "px)";


                        }
                    },
                    setTransition: function (speed) {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = speed + "ms";
                            swiper.slides[i].querySelector(".slide-bgimg").style.transition =
                                speed + "ms";
                        }
                    },




                }


            });

            $('.cygni-horizontal-titles .swiper-slide').each(function () {

                var chTitle = $(this).find('.title').outerWidth();

                $(this).css('width', chTitle)

            });


            var horTitles = new Swiper('.cygni-horizontal-titles', {
                mousewheel: {
                    invert: false,
                },
                slidesPerView: 'auto',
                spaceBetween: 200,
                speed: 800,
                navigation: {
                    nextEl: '.horizontal-next',
                    prevEl: '.horizontal-prev',
                },
                touchRatio: 4,
                centeredSlides: true,
                slideClass: 'horizontal-item',
                wrapperClass: 'horizontal-wrapper',
                containerClass: 'cygni-horizontal-titles',
                pagination: {
                    el: '.horizontal-progress',
                    type: 'progressbar',

                    renderProgressbar: function (progressbarFillClass) {
                        return '<span class="hor-current">1</span>' +
                            '<span class="' + progressbarFillClass + '"></span>' +
                            '<span class="hor-total"></span>';
                    }
                }

            });



            var totIndex = $('.horizontal-item').length;

            $('.hor-total').text(totIndex);
            $('.hor-total').prepend('0');


            var projectURL = $('.horizontal-item.swiper-slide-active').find('.project-url').attr('href');

            $('.horizontal-project-link a').attr('href', projectURL);

            horTitles.on('slideChangeTransitionEnd', function () {
                var projectURL = $('.horizontal-item.swiper-slide-active').find('.project-url').attr('href');

                $('.horizontal-project-link a').attr('href', projectURL);

            })

            $('.hor-current').prepend('0')

            horTitles.on('slideChangeTransitionEnd', function () {

                var currentIndex = $('.swiper-slide-active').data('index');


                $('.hor-current').text(currentIndex)
                $('.hor-current').prepend('0')


            });


            horTitles.controller.control = horImages
            horImages.controller.control = horTitles




            loadingAn.finished.then(function () {

                /* Horizontal Opening */

                setTimeout(function () {

                    $('.cygni-horizontal-titles .title span').each(function (i, element) {
                        $(element).delay(i * 175).queue(function (next) {
                            $(this).addClass('anim-in');
                            next();
                        });
                    });

                    $('.cygni-horizontal-images').addClass('init')


                }, 250)

                setTimeout(function () {

                    $('.site-branding img ').addClass('logo-in');

                    $('.toggle-line').addClass('toggle-line-in');

                    $('.hor-ov').addClass('anim-in')


                }, 1250);


                setTimeout(function () {

                    $('.cygni-horizontal-titles').addClass('hor-init');
                    $('.horizontal-progress, .horizontal-project-link, .horizontal-pagination').addClass('anim-in')

                }, 1650);

                /* Horizontal Opening */

            });

        }
        /* Horizontal */

        /* Wall Start */
        if ($('.wall-wrapper').length > 0) {


            $('.title, .category').each(function () {
                var ptText = $(this).wrapInner('<span></span>')

            })

            $('.wall-project a').on('mouseenter', function () {
                $('.wall-project').addClass('pw-op');
                $(this).parent('.wall-project').removeClass('pw-op')


            });

            $('.wall-project a').on('mouseleave', function () {
                $('.wall-project').removeClass('pw-op');


            });


            loadingAn.finished.then(function () {


                /* Wall Opening */

                $('.overlay').addClass('overlay-ch-out');

                setTimeout(function () {

                    $('.wall-project').each(function (i, element) {
                        $(element).delay(i * 100).queue(function (next) {
                            $(this).addClass('project-in');
                            next();
                        });
                    });

                }, 200);

                setTimeout(function () {
                    $('.site-branding img ').addClass('logo-in');
                }, 1500);

                setTimeout(function () {
                    $('.toggle-line').addClass('toggle-line-in');


                }, 2000);

                setTimeout(function () {

                    $('.fullscreen-footer a').each(function (i, element) {
                        $(element).delay(i * 75).queue(function (next) {
                            $(this).addClass('span-in');
                            next();
                        });
                    });


                }, 1650);


                /* Wall Opening */


            });

        };
        /* Wall End */


        ///////////// Showcase Layouts /////////////


        ///////////// Single Project Page /////////////
        if ($('.single-project').length > 0) {

            var psp = $('.single-project');

            var pspImage = psp.find('.project-image');

            pspImage.prepend('<span class="pi-ov pi-ov-1"></span><span class="pi-ov pi-ov-2"></span><span class="pi-ov pi-ov-3"></span> <span class="pi-ov pi-ov-4"></span>');


            if (dataBackground != null) {

                $('.pi-ov').css('background', dataBackground);

            };


            loadingAn.finished.then(function () {

                /* Project Page Opening */


                var psp = $('.single-project');

                var pspImage = psp.find('.project-image');


                $('.pi-ov').addClass('pi-ov-in')

                /* Project Page Opening */


            });



        }
        ///////////// Single Project Page /////////////


        ///////////// Blog Posts Page /////////////
        if ($('.pe-blog-posts').length > 0) {

            $('.pe-blog-posts').masonry({
                itemSelector: '.pe-post',
                columnWidth: '.pe-blog-sizer',
                gutter: '.pe-blog-gutter',
                stamp: '.pe-blog-stamp',
                percentPosition: true
            });

            $(window).on('scroll', function () {

                var cako = $(window).scrollTop() / 10;

                $('.j-back').css({
                    transform: 'translatex(-' + cako + 'px)',
                })

            });


            loadingAn.finished.then(function () {


                /* Journal Opening */

                $('.j-back').addClass('anim-in')

                setTimeout(function () {

                    $('.pe-post').each(function (i, element) {
                        $(element).delay(i * 200).queue(function (next) {
                            $(this).addClass('anim-in');
                            next();
                        });
                    });
                }, 500)



                setTimeout(function () {
                    $('.site-branding img ').addClass('logo-in');

                }, 800)

                setTimeout(function () {
                    $('.toggle-line').addClass('toggle-line-in');

                }, 1300)


                /* Journal Opening */

            });



        };

        if ($('.pe-single-post').length) {
            $('.site-footer').addClass('blog-footer');

        } else {
            $('.site-footer').removeClass('blog-footer');
        };
        ///////////// Blog Posts Page /////////////

        ///////////// Page Build Elements /////////////
        /* Embed Video*/
        if ($('.pe-embed-video').length > 0) {

            $('.pe-embed-video').append('<span class="pe-video-play"><i class="icon-play"></i></span><span class="pe-video-overlay"></span>')

            const cVideo = new Plyr('.pe-video', {
                controls: ["play-large",
                            "play",
                            "progress",
                            "duration",
                            "mute",
                            "volume",
                            "fullscreen"
                        ],
                autoplay: true,
                muted: true,
                volume: 0,
                quality: {
                    default: 1080
                },
                loop: {
                    active: true
                },

            });

            $('.pe-video-play').on('click', function () {
                $(this).fadeOut(500);
                $('.pe-video-overlay').fadeOut(500);
                cVideo.restart();
                cVideo.increaseVolume(1);

            });

            window.cVideo = cVideo;
        };
        if ($('.pe-video-style-2').length > 0) {

            const cVideo2 = new Plyr('.pe-video-2', {
                controls: ["play-large",
                            "play",
                            "progress",
                            "duration",
                            "mute",
                            "volume",
                            "fullscreen"
                        ],

            });

            $('.icon-play').on('click', function () {

                var videoPlay = $(this).parent('.video-control');
                videoPlay.addClass('controls-gone');
                cVideo2.play();
                cVideo2.increaseVolume(1);
            });

            window.cVideo2 = cVideo2;

        };
        /* Embed Video*/

        /* Image Wrapper */
        if ($('.image-wrapper').length > 0) {


            $('.image-wrapper').each(function () {


                var imImg = $(this).find('img');

                /*    if ($(this).hasClass('parallax-image')) {
                        var piOffset = $(this).offset();


                        var screenHeight = $(window).outerHeight();
                        var parallaxHeight = $(this).outerHeight();
                        var paStart = piOffset.top - screenHeight;
                        var paEnd = piOffset.top + parallaxHeight;

                        var maxTrans = 'calc(100% + ' + ((paEnd - paStart) / 5) + 'px)'

                        imImg.css('height', maxTrans)


                        $(window).on('scroll', function () {

                            var scrollPos = $(window).scrollTop();

                            var pralalxVal = (scrollPos - paStart) / 5;

                            if ((scrollPos > paStart) && (scrollPos < paEnd)) {

                                imImg.css('-moz-transform', 'translatey(-' + pralalxVal + 'px)')
                                imImg.css('-webkit-transform', 'translatey(-' + pralalxVal + 'px)')

                            }
                        })

                    } */


                var imwDelay = $(this).data('delay');


                if ($(this).hasClass('has-animation')) {


                    var imwHeight = $(this).outerHeight();



                    $(this).css({
                        transitionDelay: '0s',
                        height: imwHeight + 'px'
                    })


                    imImg.css('position', 'absolute');

                    if (($(this).hasClass('slide-left')) || ($(this).hasClass('slide-right'))) {

                        imImg.css('width', 'unset')

                    }

                    $(this).wrapInner('<div class="slide-anim-holder"></div>');


                    if (imwDelay !== null) {

                        $('.slide-anim-holder').css({
                            transitionDelay: imwDelay + 's'
                        })

                    }


                    var saHolder = $(this).find('.slide-anim-holder');
                    saHolder.addClass('sa-ready')

                }

                if ($(this).hasClass('image-lightbox')) {

                    ////////// Image Lightbox Start //////////

                    var dataMfpSrc = imImg.attr('src');

                    imImg.attr('data-mfp-src', dataMfpSrc);

                    $('.image-lightbox').magnificPopup({
                        delegate: 'img', // child items selector, by clicking on it popup will open
                        type: 'image',
                        closeOnContentClick: true,
                        closeBtnInside: false,
                        mainClass: 'image-lightbox', // class to remove default margin from left and right side
                        image: {
                            verticalFit: true
                        },
                        zoom: {
                            enabled: true,
                            duration: 300 // don't foget to change the duration also in CSS
                        },

                        // other options
                    });

                    ////////// Image Lightbox End //////////


                }



            });





        }
        /* Image Wrapper */

        /* Image Carousel */
        if ($('.pe-carousel').length > 0) {
            var peCarousel = new Swiper('.pe-carousel', {
                centeredSlides: true,
                slidesPerView: 2,
                spaceBetween: 50,
                speed: 1500,
                grabCursor: true

            });
        }
        /* Image Carousel */

        /* Accordion */
        if ($('.c-accordion').length > 0) {

            $('.accordion-title').each(function (i) {


                var acTitle = $(this);

                acTitle.attr('data-scroll', true)

                $('.accordion-content').hide();


                if (i < 10) {
                    var dataIn = '0' + (i + 1);
                };

                if (i > 9) {
                    var dataIn = i + 1;
                };

                acTitle.attr('data-index', dataIn);

                acTitle.on('click', function () {


                    var acContent = acTitle.find('.accordion-content');

                    if (acContent.hasClass('ac-active')) {
                        acContent.slideUp(500);
                        acContent.removeClass('ac-active');
                    } else {
                        $('.accordion-content').slideUp(500);
                        $('.accordion-content').removeClass('ac-active');

                        acContent.slideDown(500);
                        acContent.addClass('ac-active');


                    }



                });


            })

        };
        /* Accordion */

        /* Page Nav */
        if ($('.page-nav').length > 0) {

            $('.page-nav').each(function () {
                var lp = $(this).find('.lp-title');
                var lpT = lp.text();
                lp.attr('data-hover', lpT)

            });


        };
        /* Page Nav */

        /* Team Member */
        if ($('.team-member').length > 0) {
            $('.team-member').each(function () {
                var tmName = $(this).find('.team-member-name');
                var tmPos = $(this).find('.team-member-pos')

                tmName.wrapInner('<span></span>');
                tmPos.wrapInner('<span></span>');

            })

        }
        /* Team Member */

        /* Form */
        if ($('.c-form').length > 0) {

            $('.c-form').each(function () {

                var input = $(this).find('input, textarea');
                var field = $(this).find('.field-wrap, .message-wrap');

                input.on('focus', function () {

                    var inputActive = $(this);

                    var activeField = inputActive.parent('div');


                    activeField.addClass('field-active')

                });

                input.on('focusout', function () {
                    field.removeClass('field-active')
                })


            });

        }
        /* Form */

        /* Sectıon */
        $('.section').each(function () {

            var section = $(this);

            var secBg = section.data('background');

            if (secBg != null) {

                section.addClass('has-bg');

                section.prepend('<div class="section-bg-ovs"><span class="sec-bg-ov"></span><span class="sec-bg-ov"></span><span class="sec-bg-ov"></span><span class="sec-bg-ov"></span></div>');

                var secBgOvs = section.find('.section-bg-ovs');

                var secBgOv = section.find('.sec-bg-ov');

                secBgOv.css('backgroundColor', secBg);

            }

        });
        /* Sectıon */

        ///////////// Page Build Elements /////////////


    });
    ///////////////////////////////////////////// Site Scripts /////////////////////////////////////////////


    ///////////////////////////////////////////// Scroll-triggered text highlights /////////////////////////////////////////////
    // Uses IntersectionObserver to add .is-inview to elements with .text-highlight
    // when they enter the viewport. The CSS in hover.css then animates background-size
    // from 0% to 100%, drawing the marker from left to right.
    //
    // KEY BEHAVIOUR: the observer is intentionally NOT activated on page load. Above-the-
    // fold highlights remain invisible until the reader actually scrolls — this matches
    // the reference effect ("highlights appear only on page scroll"). Once the user
    // scrolls for the first time (or arrives with scrollY already > 0, e.g. via back-nav
    // or anchor link), the observer activates and any in-view or about-to-enter elements
    // animate from left to right.
    //
    // Independent of Locomotive Scroll on purpose: splitLines may re-wrap .text-highlight
    // spans across multiple lines and we want the trigger to attach to whatever ends up
    // in the DOM after that. Exposed as window.initTextHighlights so page-transitions.js
    // can re-run it after smoothState swaps content.
    window.initTextHighlights = function () {
        if (typeof IntersectionObserver === 'undefined') return;

        if (!window._textHighlightObserver) {
            // rootMargin '0px 0px -40% 0px' shrinks the bottom of the intersection
            // root by 40% of the viewport — so a highlight only fires once it has
            // scrolled into the TOP 60% of the viewport. That gives the reader a
            // visible amount of further scrolling after the text enters view before
            // the marker draws. To dial it in: move closer to -65% for "scroll more
            // before firing", closer to -30% for "fire sooner".
            window._textHighlightObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-inview');
                        window._textHighlightObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0, rootMargin: '0px 0px -40% 0px' });
        }

        var observeAll = function () {
            document.querySelectorAll('.text-highlight:not(.is-inview)').forEach(function (el) {
                window._textHighlightObserver.observe(el);
            });
        };

        // Already scrolled (browser restored a scroll position, hash navigation, etc.) —
        // activate immediately so highlights aren't permanently stuck off.
        if (window.scrollY > 0 || window.pageYOffset > 0) {
            observeAll();
            return;
        }

        // Otherwise wait for the user's first scroll. Once it fires, swap to the
        // observer and tear down the one-shot listener.
        var armed = false;
        var arm = function () {
            if (armed) return;
            armed = true;
            window.removeEventListener('scroll', arm);
            window.removeEventListener('wheel', arm);
            window.removeEventListener('touchmove', arm);
            window.removeEventListener('keydown', armOnKey);
            observeAll();
        };
        var armOnKey = function (e) {
            // Arrow keys, Page Up/Down, Space, Home/End also scroll
            if ([32, 33, 34, 35, 36, 38, 40].indexOf(e.keyCode) > -1) arm();
        };
        window.addEventListener('scroll', arm, { passive: true });
        window.addEventListener('wheel', arm, { passive: true });
        window.addEventListener('touchmove', arm, { passive: true });
        window.addEventListener('keydown', armOnKey);
    };

    // Register on initial page load, after window.load + a short delay so splitLines and
    // any other DOM transforms have finished. Registration just sets up the listeners —
    // no highlights animate until the user actually scrolls.
    $(window).on('load', function () {
        setTimeout(window.initTextHighlights, 800);
    });
    ///////////////////////////////////////////// /Scroll-triggered text highlights /////////////////////////////////////////////


    ///////////////////////////////////////////// Sticky Spotify player — Grids & Dots /////////////////////////////////////////////
    // Injects a small Spotify embed at the bottom of every page. Hidden initially,
    // slides up after the user's first scroll. Lives in <body> (outside #main) so it
    // persists across smoothState navigations and the music keeps playing.
    //
    // The iframe is created lazily — only after the user scrolls — so we don't pull
    // any Spotify network on initial page load.
    // Returns true iff the current URL is the homepage. Used to scope the
    // Spotify player to index.html only — case studies and other pages don't
    // get the player. Updates correctly after smoothState pushState transitions.
    window.isIndexPage = function () {
        var p = window.location.pathname || '';
        return p === '/' || p === '' || /\/index\.html$/i.test(p);
    };

    // Toggle body.is-home based on the current URL. Called on initial load
    // and after every smoothState transition (from page-transitions.js onAfter).
    // The <body id="home"> attribute on index.html is preserved across
    // smoothState navigations (only #main is swapped), which was causing the
    // body#home CSS rule to keep hiding the HOME link on case studies when the
    // session started at index. A dynamically-managed class avoids that trap.
    window.updateHomeBodyClass = function () {
        if (window.isIndexPage()) {
            document.body.classList.add('is-home');
        } else {
            document.body.classList.remove('is-home');
        }
    };
    // Run once at initial load so the class is correct before any nav.
    window.updateHomeBodyClass();

    // Tear the player down (used when navigating away from index via smoothState).
    window.dismountSpotifyPlayer = function () {
        var existing = document.querySelector('.spotify-sticky');
        if (!existing) return;
        existing.classList.remove('spotify-sticky-in');
        setTimeout(function () {
            if (existing.parentNode) existing.parentNode.removeChild(existing);
        }, 600);
    };

    window.initSpotifyPlayer = function () {
        if (document.querySelector('.spotify-sticky')) return;

        // Index-only — bail on any other page.
        if (!window.isIndexPage()) return;

        // Skip mobile entirely — the player would eat valuable bottom-of-screen
        // real estate and the iframe is heavy. 850px matches the rest of the
        // site's mobile breakpoint.
        if (window.matchMedia && window.matchMedia('(max-width: 850px)').matches) return;

        var wrap = document.createElement('div');
        wrap.className = 'spotify-sticky';
        wrap.setAttribute('aria-label', 'Music player — Grids & Dots on Spotify');

        var close = document.createElement('button');
        close.className = 'spotify-sticky-close';
        close.setAttribute('aria-label', 'Hide music player');
        close.setAttribute('type', 'button');
        close.innerHTML = '×';
        wrap.appendChild(close);

        document.body.appendChild(wrap);

        var iframeAdded = false;
        var addIframe = function () {
            if (iframeAdded) return;
            iframeAdded = true;
            var iframe = document.createElement('iframe');
            iframe.src = 'https://open.spotify.com/embed/artist/7ba827SJSUU4l3AORy4Doy?utm_source=generator&theme=0';
            iframe.setAttribute('title', 'Grids & Dots on Spotify');
            iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
            iframe.setAttribute('loading', 'lazy');
            wrap.appendChild(iframe);
        };

        // Close button — slide out and remove from DOM for this session.
        close.addEventListener('click', function () {
            wrap.classList.remove('spotify-sticky-in');
            setTimeout(function () {
                if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
            }, 600);
        });

        // Show once the user has scrolled past SCROLL_THRESHOLD pixels —
        // gives them a moment to take in the hero before the player slides up.
        // Tune by changing this single value (px). 500 ≈ roughly half a typical
        // viewport on desktop, two thirds on mobile.
        var SCROLL_THRESHOLD = 500;
        var shown = false;
        var show = function () {
            if (shown) return;
            var y = window.scrollY || window.pageYOffset || 0;
            if (y < SCROLL_THRESHOLD) return;
            shown = true;
            addIframe();
            wrap.classList.add('spotify-sticky-in');
            window.removeEventListener('scroll', show);
        };
        window.addEventListener('scroll', show, { passive: true });
    };

    // Mount on initial page load, after a short delay so the page loader
    // animation finishes first. After smoothState navigations the wrapper
    // is still in DOM (it's outside #main), so no re-mounting needed.
    $(window).on('load', function () {
        setTimeout(window.initSpotifyPlayer, 1500);
    });
    ///////////////////////////////////////////// /Sticky Spotify player /////////////////////////////////////////////


    ///////////////////////////////////////////// Smooth scroll for in-page anchor links /////////////////////////////////////////////
    // Case study pages use <a href="#section"> jump-buttons (HCF: Homepage redesign,
    // Design System, etc.; Ricoh_1_: Focus on Forward, etc.). The CSS rule
    // `html { scroll-behavior: smooth }` in the inline styles doesn't take effect
    // because Locomotive Scroll changes what counts as the scrolling element.
    //
    // Delegated via $(document) so it survives smoothState's content swaps.
    $(document).on('click', 'a[href^="#"]', function (e) {
        var href = $(this).attr('href');
        if (!href || href === '#') return;
        var target = document.getElementById(href.slice(1)) || document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        var targetTop = target.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
        var offset = 40;  // small visual breathing room above the target

        if (typeof anime !== 'undefined') {
            anime({
                targets: [document.documentElement, document.body],
                scrollTop: targetTop - offset,
                duration: 800,
                easing: 'easeInOutCubic'
            });
        } else {
            // Fallback for browsers without anime (shouldn't happen — loaded site-wide)
            window.scrollTo({ top: targetTop - offset, behavior: 'smooth' });
        }

        // Reflect the hash in the URL without triggering a hashchange jump
        if (history.pushState) {
            history.pushState(null, '', href);
        }
    });
    ///////////////////////////////////////////// /Smooth scroll /////////////////////////////////////////////


})(jQuery);
