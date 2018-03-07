import * as THREE from 'three'
import { Events }  from './config/Events';
import AbstractApplication from 'views/AbstractApplication'
import Loader from './Loader';
import Lights from './Lights';
import DatGUI from './DatGUI';

class WebglPlayer extends AbstractApplication {
    constructor(isDebug = false){
        super(isDebug);
        this._loader = new Loader();
        this._lights = new Lights(this._scene);
        this._object3D = null;
        this._data = null;

        function handleOnLoad({detail}){
            console.log('handleOnLoad');
            this._object3D = detail;
            this._repositioning();
            this.fitCamera(this._object3D);
            this._scene.add(this._object3D);

            const material = this._createMaterial(this._data.texture);
            this._object3D.traverse( ( child ) => {
                if( child.isMesh && child.material ) {
                    child.material = material;
                    child.material.needsUpdate = true
                    child.geometry.buffersNeedUpdate = true;
                    child.geometry.uvsNeedUpdate = true;
                }
            });
            
/*             if(isDebug)
                new DatGUI(this._object3D); */
        }
        document.addEventListener( Events.ON_LOAD, handleOnLoad.bind(this));
        this.animate();
    }



    _createMaterial(texture){
        texture.envMap
        const envMap = new THREE.TextureLoader().load('assets/textures/'+texture.envMap);
        const options = {
            envMap,
            metalness: 1,
            roughness: 0,
        };

        return new THREE.MeshStandardMaterial(options);
    }

    _repositioning(){
        var mesh = this.getMesh(this._object3D);
        var posFromOrigin = this.getCentroid(mesh);
        this._object3D.position.x = -posFromOrigin.x;
        this._object3D.position.y = -posFromOrigin.y;
        this._object3D.position.z = -posFromOrigin.z;
    }


    loadModel(data){
        this._data = data;
        this._loader.loadOBJ(data.model);
    }
}

export default WebglPlayer;

