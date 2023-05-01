import { Component, PhysXComponent, Property } from "@wonderlandengine/api";
import { GamepadButtonID, Globals, InputUtils, PhysicsCollisionCollector } from "../../../pp";
import { BuyHandComponent } from "./buy_hand_component";

export class BuyButtonComponent extends Component {
    static TypeName = "buy-button";
    static Properties = {
        _myCost: Property.int(0),
        _myWeapon: Property.enum(["Apple", "Bat", "Skull", "Voice"], "Apple"),
        _myTimeDisabled: Property.float(1),
        _myEnableObject: Property.object(),
        _myDisabledObject: Property.object()
    };

    start() {
        this._myStarted = false;
    }

    update(dt) {
        if (!GameGlobals.myStarted) return;

        if (!this._myStarted) {
            this._start();

            this._myStarted = true;
        } else {
            this._update(dt);
        }
    }

    _start() {
        this._myPhysX = this.object.pp_getComponent(PhysXComponent);
        this._myCollisionsCollector = new PhysicsCollisionCollector(this._myPhysX);

        this._myEnableObject.pp_setActive(true);
        this._myDisabledObject.pp_setActive(false);
    }

    _update(dt) {
        this._myCollisionsCollector.update(dt);

        let collisions = this._myCollisionsCollector.getCollisions();
        for (let collision of collisions) {
            let buyHand = collision.pp_getComponent(BuyHandComponent);
            if (buyHand != null) {
                if (Globals.getGamepad(InputUtils.getHandednessByIndex(buyHand._myHandedness)).getButtonInfo(GamepadButtonID.SQUEEZE).isPressStart()) {
                    this.buy();
                }
            }
        }
    }

    buy() {
        console.error("buy");
    }
}