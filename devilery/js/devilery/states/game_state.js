import { FSM, GamepadButtonID, Globals } from "../../pp";
import { GameGlobals } from "../cauldron/game_globals";

export class GameState {
    constructor() {
        this._myPlayerStart = GameGlobals.myScene.pp_getObjectByName("Player Start");

        this._myFSM = new FSM();
        //this._myFSM.setLogEnabled(true, "  Game");

        this._myFSM.addState("init");
        this._myFSM.addState("idle");
        this._myFSM.addState("game", this._gameUpdate.bind(this));
        this._myFSM.addState("lost", this._lostUpdate.bind(this));

        this._myFSM.addTransition("init", "idle", "start");
        this._myFSM.addTransition("idle", "game", "start", this._gameStart.bind(this));
        this._myFSM.addTransition("game", "lost", "end", this._lostStart.bind(this));
        this._myFSM.addTransition("lost", "idle", "end", this._gameEnding.bind(this));

        this._myFSM.init("init");
        this._myFSM.perform("start");

        this._myParentFSM = null;

    }

    start(fsm) {
        this._myParentFSM = fsm;

        GameGlobals.myBlackFade.fadeOut(true);

        GameGlobals.myPlayerLocomotion.setIdle(false);

        let playerStartPosition = this._myPlayerStart.pp_getPosition();
        let rotationQuat = this._myPlayerStart.pp_getRotationQuat();
        GameGlobals.myPlayerTransformManager.teleportAndReset(playerStartPosition, rotationQuat);

        GameGlobals.myBlackFade.fadeIn();

        this._myTotalTimeSurvived = 0;

        this._myFSM.perform("start");
    }

    end() {
        GameGlobals.myWhiteFade.fadeOut(true);

        GameGlobals.myShip.stopShip();
        GameGlobals.myDevileryBoss.stopDevileryBoss();

        GameGlobals.myPrincess.stopPrincess();
        GameGlobals.myEvilPointSpawner.stopEvilPointSpawner();

        GameGlobals.myDevileryConsole.stopDevileryConsole();

        for (let bulletSpawner of GameGlobals.myBulletSpawners) {
            bulletSpawner.stopBulletSpawner();
        }
    }

    update(dt, fsm) {
        this._myFSM.update(dt);

        this._myTotalTimeSurvived += dt;
    }

    _gameUpdate(dt, fsm) {
        if (GameGlobals.myDebugEnabled && Globals.getLeftGamepad().getButtonInfo(GamepadButtonID.TOP_BUTTON).isPressStart(2)) {
            fsm.perform("end");
        }

        if (GameGlobals.myPrincess.isInLove()) {
            fsm.perform("end");
        }
    }

    _lostUpdate(dt, fsm) {
        if (!GameGlobals.myWhiteFade.isFading()) {
            fsm.perform("end");
        }
    }

    _gameStart() {
        GameGlobals.myShip.startShip();
        GameGlobals.myDevileryBoss.startDevileryBoss();

        GameGlobals.myPrincess.startPrincess();
        GameGlobals.myEvilPointSpawner.startEvilPointSpawner();

        GameGlobals.myDevileryConsole.startDevileryConsole();

        for (let bulletSpawner of GameGlobals.myBulletSpawners) {
            bulletSpawner.startBulletSpawner();
        }
    }

    _lostStart() {
        let surviveSeconds = Math.round(this._myTotalTimeSurvived);
        if (GameGlobals.myGoogleAnalytics) {
            gtag("event", "survive_seconds", {
                "value": surviveSeconds
            });

            if (surviveSeconds >= 60 * 5) {
                gtag("event", "survive_5_minutes", {
                    "value": 1
                });
            } else if (surviveSeconds >= 60 * 3) {
                gtag("event", "survive_3_minutes", {
                    "value": 1
                });
            } else if (surviveSeconds >= 60 * 2) {
                gtag("event", "survive_2_minutes", {
                    "value": 1
                });
            } else if (surviveSeconds >= 60 * 1) {
                gtag("event", "survive_1_minute", {
                    "value": 1
                });
            } else if (surviveSeconds >= 30) {
                gtag("event", "survive_30_seconds", {
                    "value": 1
                });
            }
        }

        GameGlobals.myWhiteFade.fadeOut();
    }

    _gameEnding() {
        this._myParentFSM.perform("end");
    }
}