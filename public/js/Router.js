///////////////////////////////////////////////////////////
//  kes/public/js/Router.js                              //
///////////////////////////////////////////////////////////
//
//  Module managed front-end routing.
//

    export const Router = () => {

        let     __routes = [
            'About',
            'Services',
            'Contact'
        ];

        let     __pages = [
            'about',
            'services',
            'contact'
        ];


        let     __page;
        let     __hash = window.location.hash;

        let     __is_animating = false;


///////////////////////////////////////////////////////////
//  __initialise()                                       //
///////////////////////////////////////////////////////////
//
        const   __initialise = () => {

            if (typeof __hash === 'undefined' || __hash === '') {
                __hash = 'About';
                __page = 'about';
            }
            else {
                if (__hash.substring(0, 1) === '#')
                    __hash = __hash.substring(1);

                if (! __routes.includes(__hash)) {
                    __page = 'about';
                    __hash = 'About';
                }
                else
                    __page = __pages[__routes.indexOf(__hash)];
            }

            window.location.hash = __hash;

            __show_page();
            __initialise_event_handlers();

        };


        const   __initialise_event_handlers = () => {

            $(window).on('resize', () => {
                __show_page();
            });

            $('.tab_title_text').on('click', function() {
                const   __id = $(this).attr('id').replace('tab_title_text_', '');
                if (__id === __page)
                    return;
                $(`#tab_title_text_${__id}`).css('color', '#FFDD20');
                __is_animating = true;
                __load_page(__id);
            });

            $('.tab_title_text').on('mouseover', function() {
                const   __id = $(this).attr('id').replace('tab_title_text_', '');
                if (__id === __page || __is_animating)
                    return;
                $(this).stop().animate({
                    'color': '#FFDD20'
                }, 200, "linear");
            });

            $('.tab_title_text').on('mouseout', function() {
                const   __id = $(this).attr('id').replace('tab_title_text_', '');
                if (__id === __page || __is_animating)
                    return;
                $(this).stop().animate({
                    'color': '#FFF'
                }, 200, "linear");
            });

        };


        const   __load_page = page => {

            const   __content_width = parseInt($('#content_inner').css('width').replace('px', ''));

            if (! __pages.includes(page))
                page = 'about';

            $(`#tab_title_text_${__page}`).css('color', '#FFF');

    //  Heh.
            $(`#tab_page_inner_${__page}`).stop().animate({
                'opacity': '0.01'
            }, 200, "linear", () => {

                $(`#tab_${page}`).stop().animate({
                    'width': `${__content_width - 65}px`
                }, 200, "linear");
                $(`#tab_page_${__page}`).stop().animate({
                    'width': '0px'
                }, 200, "linear");
                $(`#tab_${__page}`).stop().animate({
                    'width': '32px'
                }, 200, "linear");

                __page = page;
                __hash = __routes[__pages.indexOf(__page)];
                __adjust_radius();
                
                $(`#tab_page_${__page}`).stop().animate({
                    'width': `${__content_width - 97}px`
                }, 200, "linear", function() {
                    $(`#tab_page_inner_${__page}`).stop().animate({
                        'opacity': '0.99'
                    }, 200, "linear", () => {
                        $(`#tab_title_text_${__page}`).css('color', '#FFDD20');
                        window.location.hash = __hash;
                        __is_animating = false;
                    });
                });
            });

        };


        const   __adjust_radius = () => {

            if (__page === 'about') {
                $('#tab_title_services, #tab_title_contact').css(
                    'border-radius', '0px 16px 16px 0px'
                );
            }

            if (__page === 'services') {
                $('#tab_title_services').css(
                    'border-radius', '16px 0px 0px 16px'
                );
                $('#tab_title_contact').css(
                    'border-radius', '0px 16px 16px 0px'
                );
            }

            if (__page === 'contact') {
                $('#tab_title_services, #tab_title_contact').css(
                    'border-radius', '16px 0px 0px 16px'
                );
            }

        };


        const   __show_page = () => {

            const   __content_width = parseInt($('#content_inner').css('width').replace('px', ''));

            $('.content_tab').css('width', '32px');
            $('.content_tab_page').css('width', '0px');
            
            $(`#tab_title_text_${__page}`).css('color', '#FFDD20');
            $(`#tab_${__page}`).css('width', `${__content_width - 67}px`);
            $(`#tab_page_${__page}`).css('width', `${__content_width - 101}px`);

            $(`#tab_page_inner_${__page}`).stop().animate({
                'opacity': '0.99'
            }, 200, "linear");

            __adjust_radius();

        };


        __initialise();

    };
