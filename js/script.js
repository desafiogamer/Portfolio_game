import * as THREE from '../build/three.module.js';
import {GLTFLoader} from '../jsm/GLTFLoader.js';
import { CharacterControls } from './charaterControls.js';
import {OrbitControls} from '../jsm/OrbitControls.js';
import {CSS2DRenderer, CSS2DObject} from '../jsm/CSS2DRenderer.js'

let scene,
    camera,
    renderer,
    characterControls,
    orbitControls,
    keysPressed,
    labelRenderer,
    parede,
    mixer, 
    mixer3, 
    mixerLivro,
    mixerCat
    
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.z = 0.27;

    //Luzes da cena
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    //dirLight.position.set(- 60, 100, - 10);
    //dirLight.castShadow = true;
    //dirLight.shadow.camera.top = 50;
    //dirLight.shadow.camera.bottom = - 50;
    //dirLight.shadow.camera.left = - 50;
    //dirLight.shadow.camera.right = 50;
    //dirLight.shadow.camera.near = 0.1;
    //dirLight.shadow.camera.far = 200;
    //dirLight.shadow.mapSize.width = 4096;
    //dirLight.shadow.mapSize.height = 4096;
    //scene.add(dirLight);

    const ambientLightBlack = new THREE.AmbientLight(0x3d3d3d, 0.7)

    const flash = new THREE.PointLight(0xd2f3fc, 1, 3.5, 0);
    flash.position.set(18, 0.38, 1);

    const flash2 = new THREE.PointLight(0x62d89, 10, 4, 0);
    flash2.position.set(0, 0, -12);

    const flash3 = new THREE.DirectionalLight(0xddf1f7, 0.5);
    flash3.position.set(0, 0, 5);

    const flash4 = new THREE.PointLight(0x62d89, 10, 3, 0);
    flash4.position.set(-16.9, 2.8, -5);

    const flash5 = new THREE.PointLight(0xffffff, 20, 3, 0);
    flash5.position.set(0, 5.8, -11);

    //renderer
    renderer = new THREE.WebGLRenderer();
    scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    renderer.setClearColor(scene.fog.color);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true
    document.body.appendChild(renderer.domElement);

    labelRenderer = new CSS2DRenderer()
    labelRenderer.setSize(window.innerWidth, window.innerHeight)
    labelRenderer.domElement.style.position = 'absolute'
    labelRenderer.domElement.style.top = '0px'
    labelRenderer.domElement.style.pointerEvents = 'none'
    document.body.appendChild(labelRenderer.domElement)

    //chão
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(40, 20));
    mesh.rotation.x = - Math.PI / 2;
    mesh.position.set(0,9,-5)
    scene.add(mesh);

    //texturas da paredes
    generateFloor()
    generateTelhado()
    generateParede()
    generateParede2()
    generateParede3()
    generateParede4()

    //telhado
    function generateTelhado() {
        const textureLoader = new THREE.TextureLoader();
        const placeholder = textureLoader.load("./textures/placeholder/forro.jpg");
        const WIDTH = 40
        const LENGTH = 20
        const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 512, 512);
        const material = new THREE.MeshPhongMaterial({ map: placeholder})
        const floor = new THREE.Mesh(geometry, material)
        floor.rotation.x = + Math.PI / 2
        floor.position.set(0,8.9,-5)
        scene.add(floor)
    }

    //chao
    function generateFloor() {
        const textureLoader = new THREE.TextureLoader();
        const placeholder = textureLoader.load("./textures/placeholder/forroMadeira.jpg");
        const WIDTH = 40
        const LENGTH = 20
        const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 512, 512);
        const material = new THREE.MeshPhongMaterial({ map: placeholder})
        const floor = new THREE.Mesh(geometry, material)
        floor.receiveShadow = true
        floor.rotation.x = - Math.PI / 2
        floor.position.set(0,0,-5)
        scene.add(floor)
    }

    tapete()

    //tapete
    function tapete() {
        const textureLoader = new THREE.TextureLoader();
        const placeholder = textureLoader.load("./textures/placeholder/tapete_text.jpg");
        const geometry = new THREE.CircleGeometry(5, 32 );
        const material = new THREE.MeshPhongMaterial({ map: placeholder})
        const floor = new THREE.Mesh(geometry, material)
        floor.receiveShadow = true
        floor.rotation.x = - Math.PI / 2
        floor.position.set(0,0.001,-5)
        scene.add(floor)
    }

    //parede frontal
    function generateParede() {
        const textureLoader = new THREE.TextureLoader();
        const placeholder = textureLoader.load("./textures/placeholder/texturaParede.jpg");
        const WIDTH = 40
        const LENGTH = 9
        const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 40, 10);
        const material = new THREE.MeshPhongMaterial({ map: placeholder})
        const floor = new THREE.Mesh(geometry, material)
        floor.receiveShadow = true
        floor.position.set(0, 4.5, -14.9)
        scene.add(floor)
    }

    //parede direita
    function generateParede2() {
        const textureLoader = new THREE.TextureLoader();
        const placeholder = textureLoader.load("./textures/placeholder/texturaParede.jpg");
        const WIDTH = 20
        const LENGTH = 9
        const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 20, 10);
        const material = new THREE.MeshPhongMaterial({ map: placeholder})
        const floor = new THREE.Mesh(geometry, material)
        floor.receiveShadow = true
        floor.position.set(19.9, 4.5, -5)
        floor.rotation.y = - Math.PI / 2;
        scene.add(floor)
    }

    //parede esquerda
    function generateParede3() {
        const textureLoader = new THREE.TextureLoader();
        const placeholder = textureLoader.load("./textures/placeholder/texturaParede.jpg");
        const WIDTH = 20
        const LENGTH = 9
        const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 20, 10);
        const material = new THREE.MeshPhongMaterial({ map: placeholder})
        const floor = new THREE.Mesh(geometry, material)
        floor.receiveShadow = false
        floor.position.set(-19.9, 4.5, -5)
        floor.rotation.y = + Math.PI / 2;
        scene.add(floor)
    }

    //parede traseira
    function generateParede4() {
        const textureLoader = new THREE.TextureLoader();
        const placeholder = textureLoader.load("./textures/placeholder/texturaParede.jpg");
        const WIDTH = 40
        const LENGTH = 9
        const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 20, 10);
        const material = new THREE.MeshPhongMaterial({ map: placeholder})
        const floor = new THREE.Mesh(geometry, material)
        floor.position.set(0, 4.5, 4.9)
        floor.rotation.y = Math.PI
        scene.add(floor)
    }

    //controles
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true
    orbitControls.minDistance = 5.7
    orbitControls.maxDistance = 15
    orbitControls.enablePan = false
    orbitControls.maxPolarAngle = Math.PI / 2 - 0.05
    orbitControls.update();

    //SOM
    const listerner = new THREE.AudioListener()
    scene.add(listerner)

    //trila sonora
    const trilha = new THREE.Audio(listerner)
    const loaderSoundTrila = new THREE.AudioLoader()
    loaderSoundTrila.load('../sound/trilhaSonora.mp3', (buffer) =>{
        trilha.setBuffer(buffer)
        trilha.setLoop(true)
        trilha.setVolume(0.5)
        //trilha.play()
    })

    //pcLigando
    const abrirBau = new THREE.Audio(listerner)
    const loaderSoundBau = new THREE.AudioLoader()
    loaderSoundBau.load('../sound/pcligando.mp3', (buffer) =>{
        abrirBau.setBuffer(buffer)
        abrirBau.setLoop(false)
        abrirBau.setVolume(1)
    })

    //voz da habilidades
    const vozSkill = new THREE.Audio(listerner)
    const loaderSoundSkill = new THREE.AudioLoader()
    loaderSoundSkill.load('../sound/JG185.mp3', (buffer) =>{
        vozSkill.setBuffer(buffer)
        vozSkill.setLoop(false)
        vozSkill.setVolume(0.5)
    })


    //som sobre mim
    const joao = new THREE.Audio(listerner)
    const loaderSoundJoao = new THREE.AudioLoader()
    loaderSoundJoao.load('../sound/corteSound.mp3', (buffer) =>{
        joao.setBuffer(buffer)
        joao.setLoop(false)
        joao.setVolume(1)
    })

    //luz acendendo
    const acendendo = new THREE.Audio(listerner)
    const loaderSoundLuz = new THREE.AudioLoader()
    loaderSoundLuz.load('../sound/luzAcendendo.mp3', (buffer) =>{
        acendendo.setBuffer(buffer)
        acendendo.setLoop(false)
        acendendo.setVolume(1)
    })

    //click
    const click = new THREE.Audio(listerner)
    const loaderSoundclick = new THREE.AudioLoader()
    loaderSoundclick.load('../sound/click.mp3', (buffer) =>{
        click.setBuffer(buffer)
        click.setLoop(false)
        click.setVolume(1)
    })

    //livroAbrindo
    const abrirLivro = new THREE.Audio(listerner)
    const loaderSoundLivro = new THREE.AudioLoader()
    loaderSoundLivro.load('../sound/page_Q5XoIdHJ.mp3', (buffer) =>{
        abrirLivro.setBuffer(buffer)
        abrirLivro.setLoop(false)
        abrirLivro.setVolume(1)
    })

    //Botão para parar trilha
    const btnPararSom = document.getElementById('paraTrilha')
    const btnAtivarSom = document.getElementById('ativarTrilha')
    
    btnPararSom.addEventListener('click', ()=>{
        trilha.stop()
        btnPararSom.style.display = 'none'
        btnAtivarSom.style.display = 'block'
        click.play()
    })

    btnAtivarSom.addEventListener('click', ()=>{
        trilha.play()
        btnPararSom.style.display = 'block'
        btnAtivarSom.style.display = 'none'
        click.play()
    })

    //SESSÕES

    //section inicio
    const sectionInicio = document.getElementById('inicio')
    const btnFechar2 = document.createElement('button')
    sectionInicio.appendChild(btnFechar2)
    btnFechar2.className = 'fechar'
    btnFechar2.textContent = 'X'

    btnFechar2.addEventListener('click', ()=>{
        sectionInicio.classList.remove('ativo')
        btnFechar2.style.display = 'none'
        click.play()
    })

    //section sobre
    const sectionSobre = document.getElementById('about')
    const btnFechar3 = document.createElement('button')
    sectionSobre.appendChild(btnFechar3)
    btnFechar3.className = 'fechar'
    btnFechar3.textContent = 'X'

    btnFechar3.addEventListener('click', ()=>{
        sectionSobre.classList.remove('ativo')
        btnFechar3.style.display = 'none'
        click.play()
    })

    //section contato
    const section = document.getElementById('contact')
    const btnFechar = document.createElement('button')
    section.appendChild(btnFechar)
    btnFechar.className = 'fechar'
    btnFechar.textContent = 'X'

    btnFechar.addEventListener('click', ()=>{
        section.classList.remove('ativo')
        btnFechar.style.display = 'none'
        click.play()
    })

    //skills na parede
    const vozDasSkills = document.createElement('div')
    vozDasSkills.className = 'vozSkills'

    const cPointLabelVoz = new CSS2DObject(vozDasSkills)
    scene.add(cPointLabelVoz)
    cPointLabelVoz.position.set(0, 8, -16)

    vozDasSkills.addEventListener('click', ()=>{
        vozSkill.play()
    })
    
    const skill1 = '../img/icons/three-js.png'
    const skill2 = '../img/icons/html-5.png'
    const skill3 = '../img/icons/css.png'
    const skill4 = '../img/icons/javascript-50.png'
    const skill5 = '../img/icons/gsap.png'
    const skill6 = '../img/icons/django-icon.png'
    const skill7 = '../img/icons/jquery.png'

    //skills projeto1
    skill(skill1, 16, 8, -14.85)
    skill(skill2, 18, 8, -14.85)
    skill(skill3, 14, 8, -14.85)
    skill(skill4, 12, 8, -14.85)

    //skills projeto2
    skill(skill1, 9, 8, -14.85)
    skill(skill2, 7, 8, -14.85)
    skill(skill3, 5, 8, -14.85)
    skill(skill4, 3, 8, -14.85)
    skill(skill5, 1, 8, -14.85)

    //skills projeto3
    skill(skill1, -8, 8, -14.85)
    skill(skill2, -6, 8, -14.85)
    skill(skill3, -4, 8, -14.85)
    skill(skill4, -2, 8, -14.85)

    //skills projeto4
    skill(skill6, -19, 8, -14.85)
    skill(skill2, -17, 8, -14.85)
    skill(skill3, -15, 8, -14.85)
    skill(skill4, -13, 8, -14.85)
    skill(skill7, -11, 8, -14.85)

    function skill(skill1,x,y,z) {
        const textureLoader = new THREE.TextureLoader();
        const placeholder = textureLoader.load(skill1);
        const WIDTH = 0.8
        const LENGTH = 0.8
        const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 1, 1);
        const material = new THREE.MeshPhongMaterial({ map: placeholder})
        const floor = new THREE.Mesh(geometry, material)
        floor.position.set(x, y, z)
        scene.add(floor)
    }

    //PROJETOS NA PAREDE

    const projectOne = './textures/placeholder/projetoCasa.png'
    const projectwo = './textures/placeholder/apple.png'
    const projectThree = './textures/placeholder/projeto-sony.png'
    const projectfour = './textures/placeholder/Projeto-novo.png'

    quadro(projectOne, 15, 4, -14.85, 9, 5)
    quadro(projectwo, 5, 4, -14.85, 9, 5)
    quadro(projectThree, -5, 4, -14.85, 9, 5)
    quadro(projectfour, -15, 4, -14.85, 9, 5)

    function quadro(projectOne, x, y, z, w, l) {
        const textureLoader = new THREE.TextureLoader();
        const placeholder = textureLoader.load(projectOne);
        const WIDTH = w
        const LENGTH = l
        const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 20, 10);
        const material = new THREE.MeshPhongMaterial({ map: placeholder})
        const floor = new THREE.Mesh(geometry, material)
        floor.position.set(x, y, z)
        scene.add(floor)
    }

    //projeto1
    const pContainerProjeto = document.createElement('div')
    pContainerProjeto.setAttribute('id', 'projetoOne')

    const conteudoProjeto1 = document.createElement('div')
    conteudoProjeto1.setAttribute('class', 'conteudo')
    pContainerProjeto.appendChild(conteudoProjeto1)
    conteudoProjeto1.style.display = 'none'
    
    const cPointLabelProject = new CSS2DObject(pContainerProjeto)
    scene.add(cPointLabelProject)
    cPointLabelProject.position.set(16, 4, -16)

    const sobreProjeto1 = document.createElement('p')
    sobreProjeto1.textContent = 'Landing page moderna com animações avançada no scroll interagindo com modelo 3D.'
    conteudoProjeto1.appendChild(sobreProjeto1)

    const links1 = document.createElement('a')
    links1.setAttribute('href', 'https://projeto-scroll.vercel.app/')
    links1.setAttribute('target', '_blank')
    const icon1 = document.createElement('i')
    icon1.setAttribute('class', 'bi bi-link')
    links1.appendChild(icon1)
    conteudoProjeto1.appendChild(links1)

    pContainerProjeto.addEventListener('mousemove',()=>{
        conteudoProjeto1.style.display = 'flex'
    })

    pContainerProjeto.addEventListener('mouseout',()=>{
        conteudoProjeto1.style.display = 'none'
    })

    //projeto2
    const pContainerProjeto2 = document.createElement('div')
    pContainerProjeto2.setAttribute('id', 'projetoOne')

    const conteudoProjeto2 = document.createElement('div')
    conteudoProjeto2.setAttribute('class', 'conteudo')
    pContainerProjeto2.appendChild(conteudoProjeto2)
    conteudoProjeto2.style.display = 'none'
    
    const cPointLabelProject2 = new CSS2DObject(pContainerProjeto2)
    scene.add(cPointLabelProject2)
    cPointLabelProject2.position.set(5, 4, -16)

    const sobreProjeto2 = document.createElement('p')
    sobreProjeto2.textContent = 'Landing page (e-commerce), utilizei algumas blibiotecas de JS para aprimorar ainda mais meu front-end.'
    conteudoProjeto2.appendChild(sobreProjeto2)

    const links2 = document.createElement('a')
    links2.setAttribute('href', 'https://projeto-three-js.vercel.app/')
    links2.setAttribute('target', '_blank')
    const icon2 = document.createElement('i')
    icon2.setAttribute('class', 'bi bi-link')
    links2.appendChild(icon2)
    conteudoProjeto2.appendChild(links2)

    pContainerProjeto2.addEventListener('mousemove',()=>{
        conteudoProjeto2.style.display = 'flex'
    })

    pContainerProjeto2.addEventListener('mouseout',()=>{
        conteudoProjeto2.style.display = 'none'
    })

    //projeto3
    const pContainerProjeto3 = document.createElement('div')
    pContainerProjeto3.setAttribute('id', 'projetoOne')

    const conteudoProjeto3 = document.createElement('div')
    conteudoProjeto3.setAttribute('class', 'conteudo')
    pContainerProjeto3.appendChild(conteudoProjeto3)
    conteudoProjeto3.style.display = 'none'
    
    const cPointLabelProject3 = new CSS2DObject(pContainerProjeto3)
    scene.add(cPointLabelProject3)
    cPointLabelProject3.position.set(-5, 4, -16)

    const sobreProjeto3 = document.createElement('p')
    sobreProjeto3.textContent = 'Landing Page (e-commerce) como foco em animações.'
    conteudoProjeto3.appendChild(sobreProjeto3)

    const links3 = document.createElement('a')
    links3.setAttribute('href', 'https://projeto-sony.vercel.app/')
    links3.setAttribute('target', '_blank')
    const icon3 = document.createElement('i')
    icon3.setAttribute('class', 'bi bi-link')
    links3.appendChild(icon3)
    conteudoProjeto3.appendChild(links3)

    pContainerProjeto3.addEventListener('mousemove',()=>{
        conteudoProjeto3.style.display = 'flex'
    })

    pContainerProjeto3.addEventListener('mouseout',()=>{
        conteudoProjeto3.style.display = 'none'
    })

    //projeto4
    const pContainerProjeto4 = document.createElement('div')
    pContainerProjeto4.setAttribute('id', 'projetoOne')

    const conteudoProjeto4 = document.createElement('div')
    conteudoProjeto4.setAttribute('class', 'conteudo')
    pContainerProjeto4.appendChild(conteudoProjeto4)
    conteudoProjeto4.style.display = 'none'

    const sobreProjeto = document.createElement('p')
    sobreProjeto.textContent = 'Projeto BackEnd. fiz basicamente um sistema de crood complexo.'
    conteudoProjeto4.appendChild(sobreProjeto)

    const links4 = document.createElement('a')
    links4.setAttribute('href', 'http://www.desafiogamer.online/')
    links4.setAttribute('target', '_blank')
    const icon4 = document.createElement('i')
    icon4.setAttribute('class', 'bi bi-link')
    links4.appendChild(icon4)
    conteudoProjeto4.appendChild(links4)

    
    const cPointLabelProject4 = new CSS2DObject(pContainerProjeto4)
    scene.add(cPointLabelProject4)
    cPointLabelProject4.position.set(-16, 4, -16)

    pContainerProjeto4.addEventListener('mousemove',()=>{
        conteudoProjeto4.style.display = 'flex'
    })

    pContainerProjeto4.addEventListener('mouseout',()=>{
        conteudoProjeto4.style.display = 'none'
    })

    //BOTÕES DA CENA

    //botão contato
    const p = document.createElement('p')
    const btn = document.createElement('button')
    btn.textContent = 'Entrar'
    p.className = 'tooltip'
    p.textContent = 'Contato'
    const pContainer = document.createElement('div')
    pContainer.setAttribute('id', 'contato')
    pContainer.appendChild(btn)
    pContainer.appendChild(p)
    
    const cPointLabel = new CSS2DObject(pContainer)
    scene.add(cPointLabel)
    cPointLabel.position.set(19, 1, -10)

    btn.addEventListener('click', ()=>{
        section.classList.add('ativo')
        btnFechar.style.display = 'block'
        abrirLivro.play()
    })

    //Botão skills
    const p2 = document.createElement('p')
    const btn2 = document.createElement('button')
    btn2.textContent = 'Entrar'
    p2.className = 'tooltip'
    p2.textContent = 'Skills'
    const pContainer2 = document.createElement('div')
    pContainer2.setAttribute('id', 'home')
    pContainer2.appendChild(btn2)
    pContainer2.appendChild(p2)
    
    const cPointLabel2 = new CSS2DObject(pContainer2)
    scene.add(cPointLabel2)
    cPointLabel2.position.set(-18.7, 1.5, -5)

    btn2.addEventListener('click', ()=>{
        sectionInicio.classList.add('ativo')
        btnFechar2.style.display = 'block'
        abrirBau.play()
    })

     pContainer2.addEventListener('mousemove', ()=>{
        btn2.className = 'ativo'
    })

    pContainer2.addEventListener('mouseout', ()=>{
        btn2.className = 'remove'
            
    })

    //Botão sobre
    const p3 = document.createElement('p')
    const btn3 = document.createElement('button')
    btn3.textContent = 'Entrar'
    p3.className = 'tooltip'
    p3.textContent = 'Sobre'
    const pContainer3 = document.createElement('div')
    pContainer3.setAttribute('id', 'sobre')
    pContainer3.appendChild(btn3)
    pContainer3.appendChild(p3)
    
    const cPointLabel3 = new CSS2DObject(pContainer3)
    scene.add(cPointLabel3)
    cPointLabel3.position.set(18.8, 1.2, 1)

    btn3.addEventListener('click', ()=>{
        sectionSobre.classList.add('ativo')
        btnFechar3.style.display = 'block'
        joao.play()
    })

    //botao acender Luz
    const pContainer4 = document.createElement('div')
    const btnAcender = document.createElement('i')
    const btnLigar = document.createElement('i')
    btnAcender.setAttribute('class', 'bi bi-lightbulb')
    btnLigar.setAttribute('class', 'bi bi-lightbulb-off')
    pContainer4.appendChild(btnAcender)
    pContainer4.appendChild(btnLigar)
    pContainer4.setAttribute('id', 'projetos')
    
    const cPointLabel4 = new CSS2DObject(pContainer4)
    scene.add(cPointLabel4)
    cPointLabel4.position.set(-19.85, 1.8, -10)

    btnLigar.style.display = 'none'
    btnAcender.addEventListener('click', ()=>{
        scene.remove(dirLight);
        scene.remove(ambientLight)
        scene.add(ambientLightBlack)
        scene.add(flash);
        scene.add(flash3);
        scene.add(flash4);
        scene.add(flash5)
        btnAcender.style.display = 'none'
        btnLigar.style.display = 'flex'
        acendendo.play()
    })

    btnLigar.addEventListener('click', ()=>{
        scene.remove(flash);
        scene.remove(flash3);
        scene.remove(flash4);
        scene.remove(flash5)
        scene.remove(ambientLightBlack)
        scene.add(dirLight);
        scene.add(ambientLight)
        btnAcender.style.display = 'flex'
        btnLigar.style.display = 'none'
        acendendo.play()
    })

    //MODELOS 3D DA CENA

    //personagem controlado
    const loader = new GLTFLoader().setPath('./models/');
    loader.load('personagem2.glb', function (glft) {
        const model = glft.scene
        model.scale.set(1.2,1.2,1.2)
        model.traverse(function(object){
            if(object.isMesh) object.castShadow = true
        })
        scene.add(model)

        const gltfAnimations = glft.animations
        const mixer = new THREE.AnimationMixer(model)
        const animationsMap = new Map()
    
        gltfAnimations.filter(a => a.name != 'Tpose').forEach((a)=>{
            animationsMap.set(a.name, mixer.clipAction(a))
        })

        characterControls = new CharacterControls(model, mixer, animationsMap, orbitControls, camera, 'Idle')
    });

    //guts
    const guts = new THREE.Object3D()

    loader.load('berserk_guts_black_swordsman.glb', function (glft) {
        guts.add(glft.scene)
        guts.traverse(function(object){
            if(object.isMesh) object.castShadow = true
        })
        guts.scale.set(0.4, 0.4, 0.4)
        guts.rotation.y = -1.5
        guts.position.set(18.8, 0.3, 1)
        scene.add(guts)
        pContainer3.addEventListener('mousemove', ()=>{
            btn3.className = 'ativo'
        })
       
        pContainer3.addEventListener('mouseout', ()=>{
            btn3.className = 'remove'
        })
    })

    //prateleira
    const prateleira = new THREE.Object3D()

    loader.load('shelf.glb', function (glft) {
        prateleira.add(glft.scene)
        prateleira.traverse(function(object){
            if(object.isMesh) object.castShadow = true
        })
        prateleira.scale.set(0.2, 0.2, 0.2)
        prateleira.rotation.y = -1.6
        prateleira.position.set(19.5, 1, -5)
        scene.add(prateleira)
    })

    //tomada
    const tomada = new THREE.Object3D()

    loader.load('light_switch_v2_textured.glb', function (glft) {
        tomada.add(glft.scene)
        tomada.scale.set(2, 2, 2)
        tomada.position.set(-19.85, 1.8, -10)
        scene.add(tomada)
    })

    //ar condicionado
    const ar = new THREE.Object3D()

    loader.load('air_conditioning.glb', function (glft) {
        ar.add(glft.scene)
        ar.scale.set(5, 5, 5)
        ar.rotation.y = 1.57
        ar.position.set(-19.5, 6, -5)
        scene.add(ar)
    })

    //sofa
    const sofa = new THREE.Object3D()

    loader.load('sofa.glb', function (glft) {
        sofa.add(glft.scene)
        sofa.scale.set(2.8, 2.8, 2.8)
        sofa.rotation.y = -1.55
        sofa.position.set(18.7, 0.9, -5)
        scene.add(sofa)
    })

    //pc
    const pc = new THREE.Object3D()

    loader.load('gaming_setup_low-poly.glb', function (glft) {
        pc.add(glft.scene)
        pc.traverse(function(object){
            if(object.isMesh) object.castShadow = true
        })
        pc.scale.set(1.3, 1.3, 1.3)
        pc.position.set(-18.7, 0, -5)
        scene.add(pc)
    })

    //cat
    const cat = new THREE.Object3D()

    loader.load('cat_murdered_soul_suspect.glb', function (glft) {
        cat.add(glft.scene)
        cat.traverse(function(object){
            if(object.isMesh) object.castShadow = true
        })
        cat.scale.set(0.03, 0.03, 0.03)
        cat.rotation.y = -1.5
        cat.position.set(0, 0, -14)
        scene.add(cat)
        mixerCat = new THREE.AnimationMixer(cat);
        
        glft.animations.forEach((clip) => {
            mixerCat.clipAction(clip).play();
            mixerCat.clipAction(clip).clampWhenFinished = true;
        });
        
    })

    //mesa
    const Mesa = new THREE.Object3D()

    loader.load('table.glb', function (glft) {
        Mesa.add(glft.scene)
        Mesa.traverse(function(object){
            if(object.isMesh) object.castShadow = true
        })
        Mesa.scale.set(0.3, 0.3, 0.3)
        Mesa.rotation.y = 1
        Mesa.position.set(19, 0, -10)
        scene.add(Mesa)
    })

    //livro
    const livro = new THREE.Object3D()

    loader.load('book_animated_book__historical_book.glb', function (glft) {
        livro.add(glft.scene)
        livro.scale.set(0.2, 0.2, 0.2)
        livro.rotation.y = -1.5
        livro.position.set(19, 1, -10)
        scene.add(livro)
        mixerLivro = new THREE.AnimationMixer(livro);
        
        pContainer.addEventListener('mousemove', ()=>{
            btn.className = 'ativo'
            glft.animations.forEach((clip) => {
                mixerLivro.clipAction(clip).play();
                mixerLivro.clipAction(clip).clampWhenFinished = true;
            });
        })
       
        pContainer.addEventListener('mouseout', ()=>{
            btn.className = 'remove'
            glft.animations.forEach((clip) => {
                mixerLivro.clipAction(clip).stop();
            });
        })
    })

    //refletor
    const refletor = new THREE.Object3D()

    loader.load('stage_light_-_fresnel.glb', function (glft) {
        refletor.add(glft.scene)
        refletor.rotation.y = 1.5
        refletor.scale.set(0.3, 0.3, 0.3)
        refletor.position.set(0, 7.4, -10)
        scene.add(refletor)
    })

    //eventos de tecla
    keysPressed = { }
    document.addEventListener('keydown', (event) =>{
        if(event.shiftKey && characterControls){
            characterControls.switchRunToggle()
        }else{
            (keysPressed)[event.key.toLowerCase()] = true
        }
    }, false)

    document.addEventListener('keyup', (event) =>{
        (keysPressed)[event.key.toLowerCase()] = false
    }, false)

    //meu card
    var card = document.querySelector('.card');
    var rotateClass = 'rotate'; // demo
    var updateProperies = function (ratioX, ratioY) {
        card.style.setProperty('--ratio-x', ratioX);
        card.style.setProperty('--ratio-y', ratioY);
    };
    var updatePointerPosition = function (_a) {
        var x = _a.x, y = _a.y;
        card.classList.remove(rotateClass);
        var rect = card.getBoundingClientRect();
        var hw = rect.width / 2;
        var hh = rect.height / 2;
        var ratioX = (x - (rect.x + hw)) / hw;
        var ratioY = (y - (rect.y + hh)) / hh;
        updateProperies(ratioX, ratioY);
    };
    card.addEventListener('pointermove', updatePointerPosition);
    card.addEventListener('pointerleave', function () { return updateProperies(0, 0); });


    //reponsividade cena 3D
    window.addEventListener('resize', function(){ 
        camera.aspect = this.window.innerWidth / this.window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(this.window.innerWidth, this.window.innerHeight)
        labelRenderer.setSize(this.window.innerWidth, this.window.innerHeight)
    })
   
    animate();
}

const clock = new THREE.Clock()
function animate() {
    let mixerupdateDelta = clock.getDelta()
        if(characterControls){
            characterControls.update(mixerupdateDelta, keysPressed)
        }
        if (mixer) mixer.update(mixerupdateDelta);
        if (mixer3) mixer3.update(mixerupdateDelta);
        if (mixerLivro) mixerLivro.update(mixerupdateDelta);
        if (mixerCat) mixerCat.update(mixerupdateDelta);
        orbitControls.update();

    labelRenderer.render(scene, camera)

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
init();

