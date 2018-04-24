/**
 *  
 * Server.js
 *
 *  License: Apache 2.0
 *  author:  Ciar�n McCann
 *  url: http://www.ciaranmccann.me/
 */
//<reference path="../../external/socket.io-0.9.d.ts"/>
///<reference path="ServerUtilies.ts"/>
///<reference path="GameLobby.ts"/>
///<reference path="Events.ts"/>
///<reference path="Lobby.ts"/>

declare var require: { (arg0: string): void; (arg0: string): void; (arg0: string): { listen: (arg0: any) => void; }; }
export declare var Util : any;

//var io;

// HACK
// Had to give up the benfits of types in this instance, as a problem with the way ES6 proposal module system
// works with Node.js modules. http://stackoverflow.com/questions/13444064/typescript-conditional-module-import-export
try
{
   // var Events = require('./Events');
   // var ServerUtilies = require('./ServerUtilies');
   // var GameLobby = require('./GameLobby');
   // var ServerSettings = require('./ServerSettings');
   // var Lobby = require('./Lobby');
    Util = require('util');
    //var BandwidthMonitor = require('./BandwidthMonitor');


} catch (error) { }

import { Events } from "./Events";
import { GameLobby } from "./GameLobby";
import { ServerSettings } from "./ServerSettings";
import { Lobby } from "./Lobby";
export class GameServer
{

    lobby: Lobby;
    bandwidthMonitor: any;

    constructor(port: any)
    {   
        //this.bandwidthMonitor = new BandwidthMonitor(true);
        io = (require('socket.io') as any).listen(port);
        this.lobby = new Lobby();

        io.sockets.on('connection', (socket: any) =>
        {
            this.lobby.onConnection(socket,io);
            this.lobby.server_init(socket,io);
            this.lobby.onDisconnection(socket,io);

            //This allows the clients to get the  current time of the server
            socket.on(Events.client.GET_GAME_TIME, (msg: any, func: any) =>
            {
                func(Date.now());
            });
        });

        this.init();
    }

    init()
    {
        // Setup a default lobby
         //this.lobby.server_createGameLobby("Default", 2);
    }

}


declare var exports: any;
var serverInstance = new GameServer(8080);

exports.instance = serverInstance;
