import 'three'
import 'three/examples/js/controls/OrbitControls'
import 'three/examples/js/controls/VRControls'

class AbstractApplication {

    constructor(isDebug = false){
        
        this._camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this._camera.position.z = 400;

        this._scene = new THREE.Scene();

        this._renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._renderer.gammaInput = true;
        this._renderer.gammaOutput = true;
        document.body.appendChild( this._renderer.domElement );

        this._controls = new THREE.OrbitControls( this._camera, this._renderer.domElement );
        this._controls.dampingFactor = 0.4;
		this._controls.enableDamping = true;
		this._controls.dampingFactor = 0.4;
        
        this._scene.add(this._camera);
        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
        if(isDebug)
            this.initDebug();
    }

    get renderer(){

        return this._renderer;

    }

    get camera(){

        return this._camera;

    }

    get scene(){

        return this._scene;

    }

    /**
     * Find mesh in a Object3D
     */
    getMesh(object3D){
        let mesh = null;
        object3D.traverse( (child) => {
            if ( child instanceof THREE.Mesh ) {
                mesh = child;
            }
        });
        return mesh;
    }

    /**
     * Set Camera Position to fit the object in the scene
     * @param {*This is the base class for most objects in three.js} object3D 
     */
    fitCamera(object3D){
        var bBox = new THREE.Box3().setFromObject(object3D);
        var height = bBox.getSize().y;
        var width = bBox.max.x - bBox.min.x;
        var dist_H = height / (2 * Math.tan(this._camera.fov * Math.PI / 360));
        var dist_W = width / (2 * Math.tan(this._camera.fov * Math.PI / 360));
        var dist = Math.max(dist_W, dist_H);
        var pos = this._scene.position;
        this._camera.position.set(pos.x, pos.y, dist * 1.2);
        this._camera.lookAt(pos);
    }

    /**
     * Calculate the ditance from the origin of stage to origin of 3D mesh (object)
     */
    getCentroid(mesh){
        mesh.geometry.computeBoundingBox();
        let boundingBox = mesh.geometry.boundingBox;

        var x0 = boundingBox.min.x;
        var x1 = boundingBox.max.x;
        var y0 = boundingBox.min.y;
        var y1 = boundingBox.max.y;
        var z0 = boundingBox.min.z;
        var z1 = boundingBox.max.z;

        var bWidth = ( x0 > x1 ) ? x0 - x1 : x1 - x0;
        var bHeight = ( y0 > y1 ) ? y0 - y1 : y1 - y0;
        var bDepth = ( z0 > z1 ) ? z0 - z1 : z1 - z0;

        var centroidX = x0 + ( bWidth / 2 ) + mesh.position.x;
        var centroidY = y0 + ( bHeight / 2 )+ mesh.position.y;
        var centroidZ = z0 + ( bDepth / 2 ) + mesh.position.z;

        return mesh.geometry.centroid = { x : centroidX, y : centroidY, z : centroidZ };
    }

    initDebug(){
        var axes = this._buildAxes(2000);
        this._scene.add(axes);

        /*  stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        stats.domElement.style.zIndex = 100;
        _wrapper3D.appendChild( stats.domElement );  */   
    }


    onWindowResize() {

        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize( window.innerWidth, window.innerHeight );

    }

    animate(timestamp) {
        requestAnimationFrame( this.animate.bind(this) );
        this._controls.update();
        this._renderer.render( this._scene, this._camera );
    }


    _buildAxes( length ) {
        function buildAxis( src, dst, colorHex, dashed ) {
            var geom = new THREE.Geometry(),
                mat; 

            if(dashed) {
                    mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
            } else {
                    mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
            }

            geom.vertices.push( src.clone() );
            geom.vertices.push( dst.clone() );
            geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

            var axis = new THREE.Line( geom, mat, THREE.LinePieces );

            return axis;
        }
        var axes = new THREE.Object3D();
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
        axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z
        return axes;
    }

}
export default AbstractApplication;