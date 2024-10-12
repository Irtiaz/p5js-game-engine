class Scene2 {
	constructor(sceneManager) {
		this.baseScene = new BaseScene(sceneManager);
		
		this.baseScene.setup = () => {
			console.log("Scene 2 setup");
		}

		this.baseScene.draw = () => {
			background(255, 137, 0);
		}

		this.baseScene.mousePressed = () => {
			console.log("Mouse pressed in scene 2");
			sceneManager.switchToScene(new Scene1(sceneManager));
		}

		this.baseScene.keyPressed = (key) => {
			console.log({key});
		}

	}

}
