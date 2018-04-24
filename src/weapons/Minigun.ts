/**
 *  Minigun.js
 *
 *  License: Apache 2.0
 *  author:  Ciaran McCann
 *  url: http://www.ciaranmccann.me/
 */
///<reference path="../system/Graphics.ts"/>
///<reference path="../system/AssetManager.ts"/>
///<reference path="../system/Physics.ts"/>
///<reference path="../environment/Terrain.ts"/>
///<reference path="BaseWeapon.ts"/>
///<reference path="../Game.ts"/>
///<reference path="../Main.ts"/>
///<reference path="../animation/Sprite.ts"/>
///<reference path="../animation/Effects.ts"/>

import { Game } from "../Game";
import { Timer } from "../system/Timer";
import { Sprites } from "../animation/SpriteDefinitions";
import { RayWeapon } from "./RayWeapon";
import { AssetManager } from "../system/AssetManager";
import { Worm } from "../Worm";
import { Physics } from "../system/Physics";
import { Effects } from "../animation/Effects";
let GameInstance: Game;
export class Minigun extends RayWeapon
{
    fireRate: Timer;

    constructor(ammo)
    {
        super(
            "Minigun",
            ammo,
            Sprites.weaponIcons.minigun,
            Sprites.worms.minigunTakeOut,
            Sprites.worms.minigunAim
       )


        //Amount of the terrain to cut out
        this.damageToTerrainRadius = 30; //px

        //Health removed from worm when shot hits
        this.damgeToWorm = 30;

        this.forceScaler = 30;

        this.fireRate = new Timer(300);
    }


    activate(worm: Worm)
    {
        super.activate(worm);
        this.worm.swapSpriteSheet(Sprites.worms.minigunFire);

        //Setup a timer, to stop the weapon firing after so many secounds
        setTimeout(() => {

                //Once finished firing, deactive weapon and singal next turn
                this.setIsActive(false);
                GameInstance.state.tiggerNextTurn();

                this.worm.swapSpriteSheet(this.takeAimAnimations);
        }, 1000);
        AssetManager.getSound("MiniGunFire").play();
    }

    update()
    {

        if (super.update())
        {
            this.fireRate.update();       

            if (this.fireRate.hasTimePeriodPassed())
            {
                
                var hitPiont = Physics.shotRay(this.worm.body.GetPosition(), this.worm.target.getTargetDirection().Copy());
                if (hitPiont)
                {
                    Effects.explosion(hitPiont,
                        this.damageToTerrainRadius,
                        1,
                         this.forceScaler,
                        this.damgeToWorm,
                        this.worm,
                       null);
                }
            }
          

        }

    }

}




