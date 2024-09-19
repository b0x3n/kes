///////////////////////////////////////////////////////////
//  kes/public/js/Logo.js                                //
///////////////////////////////////////////////////////////
//
//  Module manages the logo animation sequence.
//

    const   LOGO_STATE_READY = 0;
    const   LOGO_STATE_ANIMATING = 1;
    const   LOGO_STATE_DONE = 2;


    export const Logo = (

        objConfigure = {
            'target_id': 'header_logo',
            'show_tile_duration': 500,
            'show_next_tile': 100,
            'show_char_duration': 100,
            'show_next_char': 50,
            'flash_logo_frequency': 10000,
            'flash_logo_duration': 1000,
            'flash_next_char': 100
        }

    ) => {

        let     __state = LOGO_STATE_READY;

        const   __logo_text = [
            'KIER',
            'ELECTRICAL',
            'SERVICES'
        ];


        let     __logo_html;


///////////////////////////////////////////////////////////
//  __build_logo()                                       //
///////////////////////////////////////////////////////////
//
        const   __build_logo = () => {

            __logo_html = '<div id="logo_section" class="logo_section_empty">&nbsp;</div>';

            __logo_text.forEach((__text, __index) => {

                __logo_html += `
                    <div id="logo_section_${__index}" class="logo_section">
                        <div id="logo_tile_${__index}" class="logo_tile">
                            ${__text.substring(0, 1)}
                        </div>
                        <div id="logo_text_${__index}" class="logo_text">
                        
                `;

                for (let char_no = 1; char_no < __text.length; char_no++)
                    __logo_html += `
                            <div id="logo_text_${__index}_${char_no}">
                                ${__text.substring(char_no, (char_no + 1))}
                            </div>
                    `;

                __logo_html += `
                        </div>
                    </div>
                `;

            });

            __logo_html += `
                <div id="header_info" class="info">
                    <a id="phone_icon_link" class="icon_link" href="tel:07971693871">
                        <div class="icon" title="Call or message KES on 07971693871">
                            <div id="phone_icon_background" class="icon_inner">&nbsp;</div>
                            <div id="phone_icon" class="icon" style="margin-left: 0; border: solid 2px #2980b7;">&nbsp;</div>
                        </div>
                    </a>
                    <a id="email_icon_link" class="icon_link" href="mailto:info@kes-scotland.co.uk">
                        <div class="icon" title="Email KES at info@kes-scotland.co.uk">
                            <div id="email_icon_background" class="icon_inner">&nbsp;</div>
                            <div id="email_icon" class="icon" style="margin-left: 0; border: solid 2px #2980b7;">&nbsp;</div>
                        </div>
                    </a>
                </div>
            `;

            $(`#${objConfigure['target_id']}`).html(__logo_html);

            $(`#phone_icon`).css({
                'background_image': `${window.__url}/public/images/icons/phone.png`
            });
            $(`#email_icon`).css({
                'background_image': `${window.__url}/public/images/icons/email.png`
            });

        };


///////////////////////////////////////////////////////////
//  __show_logo_tiles()                                  //
///////////////////////////////////////////////////////////
//
        const   __show_logo_tiles = (
            tile_no,
            callback
        ) => {

            if (tile_no >= __logo_text.length)
                return;

            $(`#logo_tile_${tile_no}`).stop().animate({
                'opacity': '0.99'
            }, objConfigure['show_tile_duration'], "linear");

            setTimeout(() => {
                __show_logo_text(tile_no, 1, () => {
                    __show_logo_tiles((tile_no + 1), callback);
                });
            }, objConfigure['show_next_tile']);

        };


///////////////////////////////////////////////////////////
//  __show_logo_text()                                   //
///////////////////////////////////////////////////////////
//
        const   __show_logo_text = (
            index,
            char_no,
            callback
        ) => {

            if (char_no >= __logo_text[index].length)
                return callback();

            $(`#logo_text_${index}_${char_no}`).stop().animate({
                'opacity': '0.99'
            }, objConfigure['show_char_duration'], "linear");

            setTimeout(() => {
                __show_logo_text(index, (char_no + 1), callback);
            }, objConfigure['show_next_char']);

            return;

        };

    
///////////////////////////////////////////////////////////
//  __show_logo()                                        //
///////////////////////////////////////////////////////////
//
        const   __show_logo = () => {

            __show_logo_tiles(0, __show_logo_text);

        };


///////////////////////////////////////////////////////////
//  __flash_text()                                       //
///////////////////////////////////////////////////////////
//
        const   __flash_text = (
            index,
            char_no
        ) => {

            if (char_no >= __logo_text[index].length) {
                char_no = 1;
                index++;
            }

            if (index >= __logo_text.length)
                return;

            $(`#logo_text_${index}_${char_no}`).animate({
                'color': '#FFF'
            }, objConfigure['flash_logo_duration'], "linear", function() {
                $(this).stop().animate({
                    'color': '#4060B0'
                }, objConfigure['flash_logo_duration'], "linear");
            });

            setTimeout(() => {
                __flash_text(index, (char_no + 1));
            }, objConfigure['flash_next_char']);

        };


///////////////////////////////////////////////////////////
//  __flash_logo()                                       //
///////////////////////////////////////////////////////////
//
        const   __flash_logo = () => {

            console.log('Flashing...')

            __flash_text(0, 1);

        };


///////////////////////////////////////////////////////////
//  __initialise()                                       //
///////////////////////////////////////////////////////////
//
        const   __initialise = () => {

            __build_logo();
            __show_logo();

            setInterval(() => {
                console.log('...here...')
                __flash_logo();
            }, objConfigure['flash_logo_frequency']);

        };


        __initialise();

    };
