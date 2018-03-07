//import Zlib from 'zlibjs';
/* import { Zlib } from 'zlibjs/bin/inflate.min';
window.Zlib = Zlib; */

import 'three';
import 'three/examples/js/loaders/MTLLoader';
import 'three/examples/js/loaders/OBJLoader';
//import 'three/examples/js/loaders/FBXLoader';

import FBXLoader from './lib/FBXLoader';

import { Events }  from './config/Events';


export default class Loader{
	constructor(){

	}

	loadOBJ(url){
        var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {
            //console.log( item, loaded, total );
            var detail = {'loaded': loaded, 'total':total};

            document.dispatchEvent(new CustomEvent(Events.ON_PROGRESS, {'detail': null}));
		};
		var onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }
        };

        var onError = function ( xhr ) {
            document.dispatchEvent(new Event(Events.ON_ERROR));
        };

        var objLoader = new THREE.OBJLoader(manager);
        objLoader.setPath( 'assets/models/' );
        objLoader.load( url, ( object3D ) => {
            document.dispatchEvent(new CustomEvent(Events.ON_LOAD, {'detail': object3D}));
        }, onProgress, onError );
    }
    
    loadFBX(url){

        //THREE.Loader.Handlers.add( /\.jpg$/i, new THREE.TextureLoader() );
        var manager = new THREE.LoadingManager();

        manager.onProgress = ( item, loaded, total ) => {
            //console.log( item, loaded, total );
            var detail = {'loaded': loaded, 'total':total};
            document.dispatchEvent(new CustomEvent(Events.ON_PROGRESS, {'detail': null}));
		};
		var onProgress = ( xhr ) => {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }
        };

        var onError = ( xhr ) => {
            console.error('FBX Load error:', xhr);
            document.dispatchEvent(new Event(Events.ON_ERROR));
        };

        var loader = new FBXLoader(manager);
        loader.load('assets/models/' + url, ( object3D ) => {
            console.log('FBX loaded');
            document.dispatchEvent(new CustomEvent(Events.ON_LOAD, {'detail': object3D}));
        }, onProgress, onError );
    }
}