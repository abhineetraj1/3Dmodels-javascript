const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
// Add your code here matching the playground format
const scene = new BABYLON.Scene(engine);
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
camera.attachControl(canvas, true);
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});
var box = BABYLON.MeshBuilder.CreateBox("box", {width:2, height:2, depth:2}, scene);
var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 20, height: 20}, scene);
ground.position.y = -1;

const myMaterial = new BABYLON.StandardMaterial("myMaterial",scene);
myMaterial.diffuseColor = new BABYLON.Color3.Yellow();
box.material =  myMaterial;

document.body.onkeypress = function (e) {
    if (e.key == "d") {
        box.position.x = box.position.x + 1;
    } else if (e.key == "a") {
        box.position.x = box.position.x - 1;
    } else if (e.key == "w") {
        box.position.z = box.position.z + 1;
    } else if (e.key == "s") {
        box.position.z = box.position.z - 1;
    } else {

    }
}
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});
if (window.innerHeight > window.innerWidth) {
    camera.position = new BABYLON.Vector3(16.150, 18.890, -44.09271);
    alert("Info: You cannot use controls in your mobile device");
} else {
    alert("Press 'w' to move up, press 's' to move down, press 'a' to move right, press 'd' to move left.");
    camera.position = new BABYLON.Vector3(-8.798, 10.437, -23.985);
    const m2 = new BABYLON.StandardMaterial("m2", {width:30, height:30},scene);
    ground.material=m2;
}