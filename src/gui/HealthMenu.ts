import { Team } from "../Team";
import { Settings } from "../Settings";

/**
 * HealthMenu.js
 *
 *  License: Apache 2.0
 *  author:  Ciar�n McCann
 *  url: http://www.ciaranmccann.me/
 */
///<reference path="../Main.ts"/>
///<reference path="../Game.ts"/>
///<reference path="../Settings.ts"/>
///<reference path="../system/AssetManager.ts"/>
///<reference path="../system/Controls.ts"/>

var $;
export class HealthMenu
{

    constructor (players)
    {
        var html = "";

        for (var p in players)
        {
            var team : Team = players[p].getTeam();

            html +=  "<li><span> " + team.name + " </span><img src="+ 
                    Settings.REMOTE_ASSERT_SERVER  +"data/images/Ireland.png> " +
                    "<span id='" +team.teamId+ "' class=health style=width:" + team.getPercentageHealth() + 
                    "%;background:" + team.color + "  ></span></li>";

        }
        $('.healthMenu').html(html);
        this.hide();

    }

    show()
    {
        $('.healthMenu').show();
    }

    hide()
    {
        $('.healthMenu').hide();
    }

    update(teamRef : Team)
    {       
        $('#' + teamRef.teamId).animate({
            width: teamRef.getPercentageHealth() + "%",
        }, 300);
    }

}