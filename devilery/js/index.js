/**
 * /!\ This file is auto-generated.
 *
 * This is the entry point of your standalone application.
 *
 * There are multiple tags used by the editor to inject code automatically:
 *     - `wle:auto-imports:start` and `wle:auto-imports:end`: The list of import statements
 *     - `wle:auto-register:start` and `wle:auto-register:end`: The list of component to register
 *     - `wle:auto-constants:start` and `wle:auto-constants:end`: The project's constants,
 *        such as the project's name, whether it should use the physx runtime, etc...
 *     - `wle:auto-benchmark:start` and `wle:auto-benchmark:end`: Append the benchmarking code
 */

/* wle:auto-imports:start */
import {FixedFoveation} from '@wonderlandengine/components';
import {MouseLookComponent} from '@wonderlandengine/components';
import {TargetFramerate} from '@wonderlandengine/components';
import {AppleBulletComponent} from './devilery/bullets/apple_bullet_component.js';
import {VoiceBulletComponent} from './devilery/bullets/voice_bullet_component.js';
import {BulletComponent} from './devilery/cauldron/components/bullet_component.js';
import {BulletSpawnerComponent} from './devilery/cauldron/components/bullet_spawner_component.js';
import {BuyButtonComponent} from './devilery/cauldron/components/buy_button_component.js';
import {BuyHandComponent} from './devilery/cauldron/components/buy_hand_component.js';
import {DevileryBossComponent} from './devilery/cauldron/components/devilery_boss_component.js';
import {DevileryConsoleComponent} from './devilery/cauldron/components/devilery_console_component.js';
import {DevileryGatewayComponent} from './devilery/cauldron/components/devilery_gateway_component.js';
import {DevilerSkullComponent} from './devilery/cauldron/components/devilery_skull_component.js';
import {EnemyComponent} from './devilery/cauldron/components/enemy_component.js';
import {EvilPointComponent} from './devilery/cauldron/components/evil_point_component.js';
import {EvilPointSpawnerComponent} from './devilery/cauldron/components/evil_point_spawner_component.js';
import {FadeViewInOutComponent} from './devilery/cauldron/components/fade_view_in_out_component.js';
import {FlapComponent} from './devilery/cauldron/components/flap_component.js';
import {GoToTargetComponent} from './devilery/cauldron/components/go_to_target_component.js';
import {PrincessComponent} from './devilery/cauldron/components/princess_component.js';
import {RotateFanComponent} from './devilery/cauldron/components/rotate_fan_component.js';
import {SetPositionOnInitComponent} from './devilery/cauldron/components/set_position_on_init.js';
import {ShipComponent} from './devilery/cauldron/components/ship_component.js';
import {SqueezeHandsComponents} from './devilery/cauldron/components/squeeze_hand_component.js';
import {WeaponComponent} from './devilery/cauldron/components/weapon_component.js';
import {ParticlesSpawnerComponent} from './playground/particles_spawner_component.js';
import {ScaleOnSpawnComponent} from './playground/scale_on_spawn_component.js';
import {ConsoleVRToolComponent} from './pp/index.js';
import {EasyTransformComponent} from './pp/index.js';
import {EasyTuneToolComponent} from './pp/index.js';
import {GrabbableComponent} from './pp/index.js';
import {GrabberHandComponent} from './pp/index.js';
import {PPGatewayComponent} from './pp/index.js';
import {PlayerLocomotionComponent} from './pp/index.js';
import {SetActiveComponent} from './pp/index.js';
import {SetHandLocalTransformComponent} from './pp/index.js';
import {SetHeadLocalTransformComponent} from './pp/index.js';
import {SpatialAudioListenerComponent} from './pp/index.js';
import {SwitchHandObjectComponent} from './pp/index.js';
import {ToolCursorComponent} from './pp/index.js';
/* wle:auto-imports:end */

import { loadRuntime } from '@wonderlandengine/api';

/* wle:auto-constants:start */
const RuntimeOptions = {
    physx: true,
    loader: false,
    xrFramebufferScaleFactor: 1,
    canvas: 'canvas',
};
const Constants = {
    ProjectName: 'devilery',
    RuntimeBaseName: 'WonderlandRuntime',
    WebXRRequiredFeatures: ['local',],
    WebXROptionalFeatures: ['local','local-floor','hand-tracking','hit-test',],
};
/* wle:auto-constants:end */

const engine = await loadRuntime(Constants.RuntimeBaseName, RuntimeOptions);

engine.onSceneLoaded.once(() => {
    const el = document.getElementById('version');
    if (el) setTimeout(() => el.remove(), 2000);
});

/* WebXR setup. */

function requestSession(mode) {
    engine
        .requestXRSession(mode, Constants.WebXRRequiredFeatures, Constants.WebXROptionalFeatures)
        .catch((e) => console.error(e));
}

function setupButtonsXR() {
    /* Setup AR / VR buttons */
    const arButton = document.getElementById('ar-button');
    if (arButton) {
        arButton.dataset.supported = engine.arSupported;
        arButton.addEventListener('click', () => requestSession('immersive-ar'));
    }
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
        vrButton.dataset.supported = engine.vrSupported;
        vrButton.addEventListener('click', () => requestSession('immersive-vr'));
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('load', setupButtonsXR);
} else {
    setupButtonsXR();
}

/* wle:auto-register:start */
engine.registerComponent(FixedFoveation);
engine.registerComponent(MouseLookComponent);
engine.registerComponent(TargetFramerate);
engine.registerComponent(AppleBulletComponent);
engine.registerComponent(VoiceBulletComponent);
engine.registerComponent(BulletComponent);
engine.registerComponent(BulletSpawnerComponent);
engine.registerComponent(BuyButtonComponent);
engine.registerComponent(BuyHandComponent);
engine.registerComponent(DevileryBossComponent);
engine.registerComponent(DevileryConsoleComponent);
engine.registerComponent(DevileryGatewayComponent);
engine.registerComponent(DevilerSkullComponent);
engine.registerComponent(EnemyComponent);
engine.registerComponent(EvilPointComponent);
engine.registerComponent(EvilPointSpawnerComponent);
engine.registerComponent(FadeViewInOutComponent);
engine.registerComponent(FlapComponent);
engine.registerComponent(GoToTargetComponent);
engine.registerComponent(PrincessComponent);
engine.registerComponent(RotateFanComponent);
engine.registerComponent(SetPositionOnInitComponent);
engine.registerComponent(ShipComponent);
engine.registerComponent(SqueezeHandsComponents);
engine.registerComponent(WeaponComponent);
engine.registerComponent(ParticlesSpawnerComponent);
engine.registerComponent(ScaleOnSpawnComponent);
engine.registerComponent(ConsoleVRToolComponent);
engine.registerComponent(EasyTransformComponent);
engine.registerComponent(EasyTuneToolComponent);
engine.registerComponent(GrabbableComponent);
engine.registerComponent(GrabberHandComponent);
engine.registerComponent(PPGatewayComponent);
engine.registerComponent(PlayerLocomotionComponent);
engine.registerComponent(SetActiveComponent);
engine.registerComponent(SetHandLocalTransformComponent);
engine.registerComponent(SetHeadLocalTransformComponent);
engine.registerComponent(SpatialAudioListenerComponent);
engine.registerComponent(SwitchHandObjectComponent);
engine.registerComponent(ToolCursorComponent);
/* wle:auto-register:end */

engine.scene.load(`${Constants.ProjectName}.bin`);

/* wle:auto-benchmark:start */
/* wle:auto-benchmark:end */
