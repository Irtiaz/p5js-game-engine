class SceneManager {
  constructor() {
  }

  switchToScene(scene) {
    if (scene.baseScene.setup) scene.baseScene.setup();
    this.currentScene = scene;
  }
	
	renderScene() {
		this.currentScene.baseScene.draw();
	}

}
