import dat from 'dat-gui';
import Player from './Player';

//https://threejs.org/docs/#api/materials/MeshPhongMaterial

export default class DatGUI{
	constructor(object3D){

		let options = {
			size: 10,
			spawnRate: 4,
			spawnRotationSpeed: 23,
			dotRotationSpeed: -0.2,
			colorRotate: 24,
			moveSpeed: 2,
			shrinkTime: 5,
			clear: true
		};

		//console.log(object3D);

		var datGUI = new dat.GUI();
		datGUI.add(options, 'size').min(1).max(20).step(1).name('Size');
		datGUI.add(options, 'colorRotate').min(1).max(359).step(1).name('Color Rotate');
		datGUI.add(options, 'spawnRate').min(1).max(5).step(1).name('Spawn Rate');
		datGUI.add(options, 'spawnRotationSpeed').min(0).max(50).step(1).name('Spawn Rotation');
		datGUI.add(options, 'dotRotationSpeed').min(-1).max(1).step(0.01).name('Dot Rotation');
		datGUI.add(options, 'moveSpeed').min(1).max(5).step(1).name('Move Speed');
		datGUI.add(options, 'shrinkTime').min(0.1).max(20).step(0.1).name('Shrink Time (seconds)');
		datGUI.add(options, 'clear', true, false).name('Clear');
		datGUI.close();
	}
}