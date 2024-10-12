class BaseScene {
	constructor(sceneManager) {
		this.sceneManager = sceneManager;

		this.setup = () => {
			console.log("A scene is being setup");
		};
		this.draw = () => {
			throw "A scene was found without a defined draw loop";
		};
		
		this.mousePressed = () => {
			console.log("Mouse was pressed");
		};
		this.keyPressed = (key) => {
			console.log("Key was pressed");
		};
	}
}
