import { Utilies } from "./Utilies";
import { Settings } from "../Settings";

/**
 * Physics
 * This namespace holes the box2d physics world and scale. It provides helper convert methods
 * to increase codebase readablity. It also mangaes the global box2d contactlistner.
 *
 *  License: Apache 2.0
 *  author:  Ciarán McCann
 *  url: http://www.ciaranmccann.me/
 */

///<reference path="../Game.ts"/>
///<reference path="Utilies.ts" />

// Throws to many errors to use
//<reference path="../../external/box2dweb-2.1.d.ts" />

//Global defining of shortened names for box2d types
export const b2Vec2 = (window as any).Box2D.Common.Math.b2Vec2;
export const b2BodyDef = (window as any).Box2D.Dynamics.b2BodyDef;
export const b2Body = (window as any).Box2D.Dynamics.b2Body;
export const b2FixtureDef = (window as any).Box2D.Dynamics.b2FixtureDef;
export const b2Fixture = (window as any).Box2D.Dynamics.b2Fixture;
export const b2World = (window as any).Box2D.Dynamics.b2World;
export const b2MassData = (window as any).Box2D.Collision.Shapes.b2MassData;
export const b2PolygonShape = (window as any).Box2D.Collision.Shapes.b2PolygonShape;
export const b2CircleShape = (window as any).Box2D.Collision.Shapes.b2CircleShape;
export const b2DebugDraw = (window as any).Box2D.Dynamics.b2DebugDraw;
export const b2AABB = (window as any).Box2D.Collision.b2AABB;
export const b2ContactListener = (window as any).Box2D.Dynamics.b2ContactListener;
export const b2RayCastInput = (window as any).Box2D.Collision.b2RayCastInput;
export const b2DistanceJointDef = (window as any).Box2D.Dynamics.Joints.b2DistanceJointDef;
export const b2RayCastOutput = (window as any).Box2D.Collision.b2RayCastOutput;
export const b2RevoluteJointDef = (window as any).Box2D.Dynamics.Joints.b2RevoluteJointDef;
export const b2RevoluteJoint = (window as any).Box2D.Dynamics.Joints.b2RevoluteJoint;
export const b2SimplexVertex = (window as any).Box2D.Collision.b2SimplexVertex;
export const b2WorldManifold = (window as any).Box2D.Collision.b2WorldManifold;
export const b2Shape = (window as any).Box2D.Collision.Shapes.b2Shape;



export module Physics
{

    export var worldScale;
    export var world;
    export var debugDraw;

    // For fast acess to all bodies that aren't the terrain
    export var fastAcessList = [];
    export function addToFastAcessList(body)
    {
        fastAcessList.push(body);
    }

    export function removeToFastAcessList(body)
    {
        for (var b in fastAcessList)
        {
            if (fastAcessList[b] === body)
            {
                Utilies.deleteFromCollection(fastAcessList, b);
            }
        }
    }


    export function init(ctx)
    {

        Physics.worldScale = 30;

        // Creating our physics world.
        Physics.world = new b2World(
            new b2Vec2(0, 10),//gravity
            true //allow sleep
        );

        //Setting up debug drawing of the physics world
        debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(ctx);
        debugDraw.SetDrawScale(Physics.worldScale);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);


        // This sets up the world contact listenre
        // when their is a contact we get the user data from the
        // two bodies that are in contact. In the construction of these bodies
        // I have set the this pionter as the user data, which allows me to then call methods
        // on that class as we can see below.
        var listener = new b2ContactListener();
        listener.BeginContact = (contact) =>
        {
            if (contact.GetFixtureA().GetBody().GetUserData() != null &&
                contact.GetFixtureA().GetBody().GetUserData().beginContact != null)
            {
                contact.GetFixtureA().GetBody().GetUserData().beginContact(contact);
            }

            if (contact.GetFixtureB().GetBody().GetUserData() != null &&
                contact.GetFixtureB().GetBody().GetUserData().beginContact != null)
            {
                contact.GetFixtureB().GetBody().GetUserData().beginContact(contact);
            }
        }


        listener.EndContact = (contact) =>
        {
            if (contact.GetFixtureA().GetBody().GetUserData() != null &&
                contact.GetFixtureA().GetBody().GetUserData().endContact != null)
            {
                contact.GetFixtureA().GetBody().GetUserData().endContact(contact);
            }

            if (contact.GetFixtureB().GetBody().GetUserData() != null &&
                contact.GetFixtureB().GetBody().GetUserData().endContact != null)
            {
                contact.GetFixtureB().GetBody().GetUserData().endContact(contact);
            }
        }

        listener.PostSolve = (contact,impulse) =>
        {
            if (contact.GetFixtureA().GetBody().GetUserData() != null &&
                contact.GetFixtureA().GetBody().GetUserData().postSolve != null)
            {
                contact.GetFixtureA().GetBody().GetUserData().postSolve(contact,impulse);
            }

            if (contact.GetFixtureB().GetBody().GetUserData() != null &&
                contact.GetFixtureB().GetBody().GetUserData().postSolve != null)
            {
                contact.GetFixtureB().GetBody().GetUserData().postSolve(contact,impulse);
            }

        }

        listener.PreSolve = (contact) =>
        {
            if (contact.GetFixtureA().GetBody().GetUserData() != null &&
                contact.GetFixtureA().GetBody().GetUserData().preSolve != null)
            {
                contact.GetFixtureA().GetBody().GetUserData().preSolve(contact);
            }

            if (contact.GetFixtureB().GetBody().GetUserData() != null &&
                contact.GetFixtureB().GetBody().GetUserData().preSolve != null)
            {
                contact.GetFixtureB().GetBody().GetUserData().preSolve(contact);
            }

        }

        world.SetContactListener(listener);
    }

    //Checks if the collison is between an obj of type1 and an obj of type2
    export function isCollisionBetweenTypes(objType1, objType2, contact)
    {
        var obj1 = contact.GetFixtureA().GetBody().GetUserData();
        var obj2 = contact.GetFixtureB().GetBody().GetUserData();

        if (
            (obj1 instanceof objType1 || obj1 instanceof objType2)
            &&
            (obj2 instanceof objType1 || obj2 instanceof objType2)
          )
        {
            return true;
        } else
        {
            return false;
        }
    }

    export function shotRay(startPiontInMeters, endPiontInMeters)
    {
        var input = new b2RayCastInput();
        var output = new b2RayCastOutput();
        var intersectionPoint = new b2Vec2();
        var normalEnd = new b2Vec2();
        var intersectionNormal = new b2Vec2();

        endPiontInMeters.Multiply(30);
        endPiontInMeters.Add(startPiontInMeters);

        input.p1 = startPiontInMeters;
        input.p2 = endPiontInMeters;
        input.maxFraction = 1;
        var closestFraction = 1;
        var bodyFound = false;

        var b = new b2BodyDef();
        var f = new b2FixtureDef();
        for (b = Physics.world.GetBodyList(); b; b = b.GetNext())
        {
            for (f = b.GetFixtureList(); f; f = f.GetNext())
            {
                if (!f.RayCast(output, input))
                    continue;
                else if (output.fraction < closestFraction && output.fraction > 0)
                    {
                        //Fixes bug where I was getting extremely small e numbers
                        // in the lower sections of the physics world. It was causing the
                        // ray to shot only a small disntance from the orign of it.
                        if (output.fraction > 0.001)
                        {
                            closestFraction = output.fraction;
                            intersectionNormal = output.normal;
                            bodyFound = true;
                        }
                }
            }

        }
        intersectionPoint.x = startPiontInMeters.x + closestFraction * (endPiontInMeters.x - startPiontInMeters.x);
        intersectionPoint.y = startPiontInMeters.y + closestFraction * (endPiontInMeters.y - startPiontInMeters.y);

        if (bodyFound)
        {
            return intersectionPoint;
        }

        return null;
    }

    export function applyToNearByObjects(epicenter, effectedRadius, funcToApplyToEach)
    {
        var aabb = new b2AABB();
        aabb.lowerBound.Set(epicenter.x - effectedRadius, epicenter.y - effectedRadius);
        aabb.upperBound.Set(epicenter.x + effectedRadius, epicenter.y + effectedRadius);

        Physics.world.QueryAABB((fixture) =>
        {
            funcToApplyToEach(fixture, epicenter);
            return true;

        }, aabb);
    }

    //Converts pixels to physic world measurement
    export function pixelToMeters(pixels: number)
    {
        return pixels / worldScale;
    }

    //Converts physic world measurement to pixels;
    export function metersToPixels(meters: number)
    {
        return meters * worldScale;
    }

    //Converts a vector in pixels to physic world measurement
    export function vectorPixelToMeters(vPixels)
    {
        return new b2Vec2(vPixels.x / worldScale, vPixels.y / worldScale);
    }

    //Converts a vector in physic world measurement to pixels;
    export function vectorMetersToPixels(vMeters)
    {
        return new b2Vec2(vMeters.x * worldScale, vMeters.y * worldScale);
    }

    export function bodyToDrawingPixelCoordinates(body)
    {
        var pos = body.GetPosition();
        var radius = body.GetFixtureList().GetShape().GetRadius();

        pos.x -= radius;
        pos.y -= radius;

        return Physics.vectorMetersToPixels(pos);

    }
}


export class BodyDataPacket
{

    pX;
    pY;

    constructor(body)
    {
        if (typeof body == "string")
        {
            this.fromJSON(body);
        } else
        {
            this.pX = body.GetPosition().x;
            this.pY = body.GetPosition().y;
        }
    }

    override(body)
    {
        
        if (body)
        {
            body.SetPosition(new b2Vec2(this.pX, this.pY));
        }
    }

    toJSON()
    {
        if (Settings.NETWORKED_GAME_QUALITY_LEVELS.HIGH == Settings.NETWORKED_GAME_QUALITY)
        {
              return (Math.floor(this.pX * 10000) / 10000) + "," + (Math.floor(this.pY * 10000) / 10000);

        } else if (Settings.NETWORKED_GAME_QUALITY_LEVELS.MEDIUM == Settings.NETWORKED_GAME_QUALITY)
        {
            return (Math.floor(this.pX * 1000) / 1000) + "," + (Math.floor(this.pY * 1000) / 1000);
        }
        else if (Settings.NETWORKED_GAME_QUALITY_LEVELS.LOW == Settings.NETWORKED_GAME_QUALITY)
        {
            return (Math.floor(this.pX * 100) / 100) + "," + (Math.floor(this.pY * 100) / 100);
        }

    }

    fromJSON(data: string)
    {
        var v = data.split(",");
        this.pX = parseFloat(v[0]);
        this.pY = parseFloat(v[1]);
    }
}


export class PhysiscsDataPacket
{
    bodyDataPackets: BodyDataPacket[];


    constructor(bodies)
    {
        this.bodyDataPackets = [];

        if (typeof bodies == "string")
        {
            this.fromJSON(bodies);
        } else
        {
            for (var b in bodies)
            {
                this.bodyDataPackets.push(new BodyDataPacket(bodies[b]));
            }
        }
    }

    override(bodies)
    {
        for (var b in this.bodyDataPackets)
        {
            this.bodyDataPackets[b].override(bodies[b]);
        }
    }

    toJSON()
    {
        var data = "";
        for (var b in this.bodyDataPackets)
        {
            data += this.bodyDataPackets[b].toJSON() + ":"
        }

        return data;
    }

    fromJSON(data: string)
    {
        var vectors = data.split(":");
        for (var i in vectors)
        {
            if (vectors[i] != "")
            {
                this.bodyDataPackets.push(new BodyDataPacket(vectors[i]));
            }
        }

    }
}