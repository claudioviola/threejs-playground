import 'css/style.css'
import Player from 'js/Player'

const obj = {
	model: 'model.obj',
	texture: {
		envMap: 'enviroment.jpg',
	}
}

const _player = new Player(true);
_player.loadModel(obj);