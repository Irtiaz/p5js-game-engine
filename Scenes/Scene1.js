class Scene1 {
	constructor(sceneManager) {
		this.baseScene = new BaseScene(sceneManager);
		
		this.baseScene.setup = () => {
			console.log("Scene 1 setup");
		}

		this.baseScene.draw = () => {
			background(0, 137, 255);
		}

		this.baseScene.mousePressed = () => {
			sceneManager.switchToScene(new Scene2(sceneManager));
		}

	}

}
