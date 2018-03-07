import {PointLightHelper, AmbientLight, DirectionalLight, DirectionalLightHelper} from 'three';

export default class Lights{
	constructor(scene){
		var aLight = new THREE.AmbientLight( 0xFFFFFF, 1);
        aLight.position.set( 0, 50, 0 );
        scene.add(aLight);

        var aHelper = new THREE.PointLightHelper( aLight, 1 );
        scene.add( aHelper );

        var dirLight = new THREE.DirectionalLight( 0xffffff, 0.3 );
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( -1, 2, 1 );
        dirLight.position.multiplyScalar( 10 );
        scene.add( dirLight );
        dirLight.castShadow = true;

        dirLight.shadow.mapSize.width = 148;
        dirLight.shadow.mapSize.height = 148;
        var d = 50;
        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;
        dirLight.shadow.camera.far = 1000;
        dirLight.shadow.bias = -0.0001;
        var dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 ) 
	}
}