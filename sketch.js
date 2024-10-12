const sceneManager = new SceneManager();

function preload() {
}

function setup() {
	createCanvas(400, 400);

	const scene1 = new Scene1(sceneManager);
	
	sceneManager.switchToScene(scene1);
}

function draw() {
	sceneManager.renderScene();
}

function mousePressed(event) {
  if (event.button == 0) sceneManager.currentScene.baseScene.mousePressed();
}

function keyPressed() {
  sceneManager.currentScene.baseScene.keyPressed(key);
}
