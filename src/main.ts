import { Game } from "./Game";

/**
 *  
 * Worms Armageddon HTML5 Clone 
 *
 * Main entry piont
 *
 *  License: Apache 2.0
 *  author:  Ciarán McCann
 *  url: http://www.ciaranmccann.me/
 */
///<reference path="gui/StartMenu.ts" />

import { Settings } from "./Settings";
import { AssetManager } from "./system/AssetManager";
import { Graphics } from "./system/Graphics";
import { StartMenu } from "./gui/StartMenu";
let GameInstance: Game;

var $;
$(document).ready(() => {
    console.log("aaaaaa")

    Settings.getSettingsFromUrl();

    if (!Settings.RUN_UNIT_TEST_ONLY)
    {
        var startMenu = new StartMenu();

        GameInstance = new Game();
        AssetManager.loadAssets();
        
        startMenu.onGameReady( () =>
        {
            startMenu.hide();
            if (GameInstance.state.isStarted == false)
            {
                GameInstance.start();
            }

            function gameloop()
            {
               if(Settings.DEVELOPMENT_MODE)
                Graphics.stats.update();

                GameInstance.step();
                GameInstance.update();
                GameInstance.draw();
                window.requestAnimationFrame(gameloop);
            }
            gameloop();

        });
    }

});