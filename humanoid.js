var canvas = document.getElementById("renderCanvas");
var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
if (sceneToRender && sceneToRender.activeCamera) {
    sceneToRender.render();
}
    });
}
var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var delayCreateScene = function () {
    engine.enableOfflineSupport = false;
    BABYLON.Animation.AllowMatricesInterpolation = true;
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 3, new BABYLON.Vector3(0, 1, 0), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;
    camera.wheelDeltaPercentage = 0.01;
	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	light.intensity = 0.6;
	light.specular = BABYLON.Color3.Black();
    var light2 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);
    light2.position = new BABYLON.Vector3(0, 5, 5);
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light2);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;
    engine.displayLoadingUI();
	BABYLON.SceneLoader.ImportMesh("", "./scenes/", "dummy3.babylon", scene, function (newMeshes, particleSystems, skeletons) {
var skeleton = skeletons[0];
let mesh = newMeshes[0]
shadowGenerator.addShadowCaster(scene.meshes[0], true);
for (var index = 0; index < newMeshes.length; index++) {
    newMeshes[index].receiveShadows = false;
}
var helper = scene.createDefaultEnvironment({
    enableGroundShadow: true
});
helper.setMainColor(BABYLON.Color3.Black());
helper.ground.position.y += 0.01;
skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
skeleton.animationPropertiesOverride.enableBlending = true;
skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
skeleton.animationPropertiesOverride.loopMode = 1;    
var runRange = skeleton.getAnimationRange("YBot_Run");
if (runRange) scene.beginAnimation(skeleton, runRange.from, runRange.to, true);
let options = {
    pauseAnimations : false, 
    returnToRest : false, 
    computeBonesUsingShaders : true, 
    useAllBones : false,
    displayMode :  BABYLON.Debug.SkeletonViewer.DISPLAY_SPHERE_AND_SPURS,
    displayOptions : {
sphereBaseSize : 1,
sphereScaleUnit : 10, 
sphereFactor : 0.9, 
midStep : 0.25,
midStepFactor : 0.05
    }
};
let skeletonView = new BABYLON.Debug.SkeletonViewer(
    skeleton, 
    mesh,
    scene,
    false, //autoUpdateBoneMatrices
    (mesh.renderingGroupId > 0 )?mesh.renderingGroupId+1:1,  // renderingGroup
    options
);
engine.hideLoadingUI();
    });	

    return scene;
};
window.initFunction = async function() {
var asyncEngineCreation = async function() {
try {
return createDefaultEngine();
} catch(e) {
console.log("the available createEngine function failed. Creating the default engine instead");
return createDefaultEngine();
}
    }
window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = delayCreateScene();};
initFunction().then(() => {sceneToRender = scene    
});
window.addEventListener("resize", function () {
    engine.resize();
});
