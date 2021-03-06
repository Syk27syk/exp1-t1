// from threejs-fireship
import './style.css'

// import threejs
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



// scene, camera, and renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render ( scene, camera );



// add our shape(s) //geometry //materials //mesh

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
const torus = new THREE.Mesh( geometry, material );

    //renderer.render( scene, camera);



// render
scene.add(torus)



// lighting 
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
//pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)



// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);



// stars
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff })
    const star = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100) );
    
    star.position.set(x,y,z);
    scene.add(star)
}

Array(200).fill().forEach(addStar)



// background //change: image link 
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;



// texture wrapping //change texture and explore geometry
const cubeTexture = new THREE.TextureLoader().load('favicon.png');

const myCube = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial( { map: cubeTexture })
)

scene.add(myCube);



// moon with multiple texture maps/normal map  //I'll make the moon exactly like he did
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial( {
        map: moonTexture,
        normalMap: normalTexture
    } )
);



// position 
moon.position.z = 30;
moon.position.setX(-10);

function moveCamera() {

    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    myCube.rotation.y += 0.01;
    myCube.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t* -0.0002;
}

document.body.onscroll = moveCamera


// animate
function animate() {
    requestAnimationFrame( animate );

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render( scene, camera );

}

animate()

