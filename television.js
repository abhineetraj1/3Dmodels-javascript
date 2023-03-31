var adc=document.createElement("canvas");
adc.id="renderCanvas";
adc.style.width="100%";
adc.style.height="100vh";
document.body.appendChild(adc);
adc.style.height =  "100%";
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
const camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
const tvScreen = BABYLON.MeshBuilder.CreatePlane("tvScreen", { width: 8, height: 4.5 }, scene);
tvScreen.position.y = 2;
tvScreen.position.z = 2;
const tvFrame = BABYLON.MeshBuilder.CreateBox("tvFrame", { width: 8.2, height: 5, depth: 0.5 }, scene);
tvFrame.position.y = 2;
tvFrame.position.z = 2;
const dynamicTexture = new BABYLON.DynamicTexture("dynamicTexture", { width:512, height:256 }, scene);
const textureContext = dynamicTexture.getContext();
textureContext.font = "bold 48px monospace";
textureContext.fillStyle = "white";
textureContext.fillText("Samsung", 0, 50);
dynamicTexture.update();
const tvText = BABYLON.MeshBuilder.CreatePlane("tvText", { width: 7, height: 4 }, scene);
tvText.position.y = 2;
tvText.position.z = 1.5;
const textMaterial = new BABYLON.StandardMaterial("textMaterial", scene);
textMaterial.diffuseTexture = dynamicTexture;
tvText.material = textMaterial;
engine.runRenderLoop(() => {
    scene.render();
});
const camera1 = scene.getCameraByName("camera");
camera.position = new BABYLON.Vector3(-0.5608420250596241,-1.1056868545766778,-9.922848018716369);
window.addEventListener("resize", () => {
    engine.resize();
});