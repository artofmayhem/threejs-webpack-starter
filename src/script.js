import './style.css'
import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import * as dat from 'dat.gui'

//loading
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/normalmap.png')

// Debug this allows you to position things
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry( .7, 7,  3 );


// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;
material.color = new THREE.Color(0x444444)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xff0000, 2)
pointLight.position.set(9.19, -10.47, 5.79)
pointLight.intensity = 1.5
scene.add(pointLight)
// const light1 = gui.addFolder('Red')
//
// light1.add(pointLight.position, 'y').min(-11).max(11).step(0.01)
// light1.add(pointLight.position, 'x').min(-11).max(11).step(0.01)
// light1.add(pointLight.position, 'z').min(-11).max(11).step(0.01)
// light1.add(pointLight, 'intensity').min(0).max(10).step(0.01)
//
// const light1Color = {
//     color: 0xff0000
// }
//
// light1.addColor(light1Color, 'color')
//     .onChange(() => {
//         pointLight.color.set(light1Color.color)
//     })

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
// scene.add(pointLightHelper)

//light 2
const pointLight2 = new THREE.PointLight(0x2522CA, 2)
pointLight2.position.set(2,3,8.7)
pointLight2.intensity = 1.5
scene.add(pointLight2)
// const light2 = gui.addFolder('Blue')

// light2.add(pointLight2.position, 'y').min(-11).max(11).step(0.01)
// light2.add(pointLight2.position, 'x').min(-11).max(11).step(0.01)
// light2.add(pointLight2.position, 'z').min(-11).max(11).step(0.01)
// light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)
//
// const light2Color = {
//     color: 0xff0000
// }
//
// light2.addColor(light2Color, 'color')
//     .onChange(() => {
//         pointLight2.color.set(light2Color.color)
//     })

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper2)

//light 3
const pointLight3 = new THREE.PointLight(0xffffff, 2)
pointLight3.position.set(-2, 3, 11)
pointLight3.intensity = .5
scene.add(pointLight3)
// const light3 = gui.addFolder('White')
//
// light3.add(pointLight3.position, 'y').min(-11).max(11).step(0.01)
// light3.add(pointLight3.position, 'x').min(-11).max(11).step(0.01)
// light3.add(pointLight3.position, 'z').min(-11).max(11).step(0.01)
// light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01)
//
// const light3Color = {
//     color: 0xff0000
// }
//
// light3.addColor(light3Color, 'color')
//     .onChange(() => {
//         pointLight3.color.set(light3Color.color)
//     })



// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper3)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//boiler plate snippet
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer boiler plate
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)
let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(e)  {
    mouseX = (e.clientX - windowHalfX)
    mouseY = (e.clientY - windowHalfY)
}
const updateSphere =() => {
sphere.position.y = window.scrollY * 0.001
}
window.addEventListener('scroll', updateSphere)


//const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * 0.001
    targetY = mouseY * 0.001
    //const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.x =  0.05 * (targetY - sphere.rotation.x)
    sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y)
    sphere.position.z +=  -0.5 * (targetY * 0.05 - sphere.rotation.z)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()