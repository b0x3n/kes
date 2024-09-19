///////////////////////////////////////////////////////////
//  kes/public/js/Icons.js                               //
///////////////////////////////////////////////////////////
//
//  Some r outines for managing the icon animations.
//

    export const Icons = () => {

        $('.icon').addClass('unhighlight_icon');

        $('.icon').on('mouseover', function() {

            const   __id = $(this).attr('id');

            $(`#${__id}_background`).stop().animate({
                'opacity': '0.99'
            }, 500, "linear");

        });

        $('.icon').on('mouseout', function() {

            const   __id = $(this).attr('id');

            $(`#${__id}_background`).stop().animate({
                'opacity': '0.01'
            }, 500, "linear");

        });

    };
