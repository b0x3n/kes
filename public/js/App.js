///////////////////////////////////////////////////////////
//  kes/public/js/App.js                                 //
///////////////////////////////////////////////////////////
//
//  App main entry point - will import and initialise all
//  front-end modules.
//

    import { Logo } from "./Logo.js";
    import { Icons } from "./Icons.js";
    import { Panoramic } from "./Panoramic.js";
    import { Router } from "./Router.js";


    export const App = () => {

        const   __logo = Logo();

        
///////////////////////////////////////////////////////////
//  __initialise()                                       //
///////////////////////////////////////////////////////////
//
        const   __initialise = () => {

            console.log('App ready');

            $(window).on('load', () => {

                const   __icons = Icons();
                const   __panoramic = Panoramic();
                const   __router = Router();

            });

        };


        __initialise()

    };
