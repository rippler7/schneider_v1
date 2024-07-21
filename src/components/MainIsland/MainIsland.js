import React, { Suspense } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import eventBus from '../../eventBus';
import * as TWEEN from '@tweenjs/tween.js';

let mouse, raycaster, camera, scene, renderer;
let stad1,stad2,stad3,stad4,office,academy,podium,house,grouped,island;
let modalStat = "closed";
let camInit;
let header;

class MainIsland extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selectedMenu:"",
      modalStat:"",
      clickedObj:"",
      targetObject:'',
      cam:''
    }
    this.clickObj = this.clickObj.bind(this);
  }

 
  componentDidMount() {
    eventBus.remove("menuSelected");
    eventBus.remove("clickedObj");
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000);
    renderer = new THREE.WebGLRenderer({alpha:true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    this.mount.appendChild( renderer.domElement );
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    let controls = new OrbitControls(camera, renderer.domElement);

    let loader = new FBXLoader();

    island = new THREE.Object3D();
    stad1 = new THREE.Object3D();
    stad2 = new THREE.Object3D();
    stad3 = new THREE.Object3D();
    stad4 = new THREE.Object3D();
    academy = new THREE.Object3D();
    office = new THREE.Object3D();
    podium = new THREE.Object3D();
    house = new THREE.Object3D();
    
    header = document.getElementById("modalHeader");

    eventBus.on('menuSelected',(data)=>{
      let camFocus = data.selectedMenu;
      let trgt;
      switch(camFocus){
        case 'lead':
        trgt = stad1.position;
          break;
        case 'vote':
          trgt = academy.position;
        break;
        case 'submit':
          trgt = office.position;
        break;
        case 'fame':
          trgt = podium.position;
        break;
        case 'report':
          trgt = house.position;
        break;
        default:
          trgt = grouped.position;
          break;
      }
      camera.lookAt(trgt);
      let evt = new Event('click');
      this.clickObj(evt);
    });

    loader.load(
      '/assets/object/stadium1.fbx', function (fbx){
        island.add(fbx);
      }, undefined, function(error){
        console.log(error);
      }
    );

    loader.load(
      '/assets/object/stadium2.fbx', function (fbx){
        stad2.add(fbx);
      }, undefined, function(error){
        console.log(error);
      }
    );
    loader.load(
      '/assets/object/stadium3.fbx', function (fbx){
        stad3.add(fbx);
      }, undefined, function(error){
        console.log(error);
      }
    );

    loader.load(
      '/assets/object/stadium4.fbx', function (fbx){
        stad4.add(fbx);
      }, undefined, function(error){
        console.log(error);
      }
    );
    loader.load(
      '/assets/object/podium.fbx', function (fbx){
        podium.add(fbx);
      }, undefined, function(error){
        console.log(error);
      }
    );
    loader.load(
      '/assets/object/academy.fbx', function (fbx){
        academy.add(fbx);
      }, undefined, function(error){
        console.log(error);
      }
    );

    loader.load(
      '/assets/object/officebldg.fbx', function (fbx){
        office.add(fbx);
      }, undefined, function(error){
        console.log(error);
      }
    );

    loader.load(
      '/assets/object/house.fbx', function (fbx){
        house.add(fbx);
      }, undefined, function(error){
        console.log(error);
      }
    );

    loader.load(
      '/assets/object/island1b.fbx', function (fbx){
        stad1.add(fbx);
      }, undefined, function(error){
        console.log(error);
      }
    );
  
    let light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    let dLight = new THREE.DirectionalLight( 0xffffff, 1.8, 1);
      dLight.castShadow = true;
      dLight.shadow.mapSize.width = 512;
      dLight.shadow.mapSize.height = 512;
      dLight.shadow.camera.near = 0.5;
      dLight.shadow.camera.far = 10000;

    grouped = new THREE.Group();

    let stad1Pos = {x:4, y:0, z: -2};
    stad1.position.set(stad1Pos.x,stad1Pos.y,stad1Pos.z);

    let stad2Pos = {x:5, y:0, z: -2};
    stad2.position.set(stad2Pos.x,stad2Pos.y,stad2Pos.z);

    let stad3Pos = {x:5, y:0, z: -8.5};
    stad3.position.set(stad3Pos.x,stad3Pos.y,stad3Pos.z);

    let stad4Pos = {x:-1, y:0, z: -7};
    stad4.position.set(stad4Pos.x,stad4Pos.y,stad4Pos.z);

    let acadPos = {x:9, y:0, z: -6};
    academy.position.set(acadPos.x,acadPos.y,acadPos.z);

    let podPos = {x:9, y:0, z: -1};
    podium.position.set(podPos.x,podPos.y,podPos.z);

    let officePos = {x:-3.3, y:4.8, z: -15};
    office.position.set(officePos.x,officePos.y,officePos.z);

    let housePos = {x:7, y:0, z: 3};
    house.position.set(housePos.x,housePos.y,housePos.z);

    island.scale.set(0.5,0.5,0.5);
    island.castShadow = true;
    island.receiveShadow = true;
    stad1.scale.set(0.8,0.8,0.8);
    stad1.castShadow = true;
    stad1.receiveShadow = true;
    stad2.scale.set(0.5,0.5,0.5);
    stad2.castShadow = true;
    stad2.receiveShadow = true;
    stad3.scale.set(0.5,0.5,0.5);
    stad3.castShadow = true;
    stad3.receiveShadow = true;
    stad4.scale.set(0.5,0.5,0.5);
    stad4.castShadow = true;
    stad4.receiveShadow = true;
    academy.scale.set(0.7,0.7,0.7);
    academy.castShadow = true;
    academy.rotation.y= -1.7;
    academy.receiveShadow = true;
    office.scale.set(0.5,0.5,0.5);
    office.castShadow = true;
    office.receiveShadow = true;
    podium.scale.set(0.3,0.3,0.3);
    podium.castShadow = true;
    podium.receiveShadow = true;
    house.scale.set(0.2,0.2,0.2);
    house.castShadow = true;
    house.receiveShadow = true;

    grouped.add(island);
    grouped.add(stad1);
    grouped.add(stad2);
    grouped.add(stad3);
    grouped.add(stad4);
    grouped.add(academy);
    grouped.add(office);
    grouped.add(podium);
    grouped.add(house);
    scene.add(grouped);    
    scene.add(dLight);
    scene.add( light );

    camInit = { x:0, y:7, z:25 };
    camera.position.set(camInit.x,camInit.y,camInit.z);
    controls.dampingFactor = 0.2;
    camera.lookAt({x:0,y:0,z:0});
    controls.update();

    window.addEventListener('resize', this.onWindowResize, false);
    document.addEventListener('click', this.clickObj);

let animate = function () {
  TWEEN.update();
  requestAnimationFrame( animate )
  grouped.rotation.y += 0.0001;
  renderer.render( scene, camera );
};
animate();
}

clickObj(event){
  event.preventDefault();
  event.stopPropagation();
  if(modalStat === "closed"){
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    let intersects = raycaster.intersectObjects( grouped.children );
    if(intersects && intersects.length > 0){
      if(intersects[0].object.name){
        if(intersects[0].object.name !== 'polySurface22'){
          console.log(intersects[0].object.name);
          console.log(this);
          let tId;
          let headerTitle ='';
          let currTarget;
          let year, quarter;
          let targetObj;    
          let icon;      
            switch (intersects[0].object.name){
              case 'podiumSimple':
                tId = 'fame'
                headerTitle = 'Hall of Fame';
                currTarget = document.getElementById('btn_Fame');
                targetObj = podium;
                icon = "podium.png";
              break;
              case 'FSt_Fra_002':
                tId = 'lead';
                year = 2022;
                quarter = 'Q1';
                headerTitle = 'Leaderboards: '+quarter+' '+year;
                currTarget = document.getElementById('btn_Lead');
                targetObj = stad1;
                icon = "stadSW.png";
              break;
              case 'Fst_Eng_002':
                tId = 'lead';
                year = 2022;
                quarter = 'Q2';
                headerTitle = 'Leaderboards: '+quarter+' '+year;
                currTarget = document.getElementById('btn_Lead');
                targetObj = stad2;
                icon = "stadSE.png";
              break;
              case 'FSt_Ita_003':
                tId = 'lead';
                year = 2022;
                quarter = 'Q3';
                headerTitle = 'Leaderboards: '+quarter+' '+year;
                currTarget = document.getElementById('btn_Lead');
                targetObj = stad3;
                icon = "stadNE.png";
              break;
              case 'FSt_Fra_003':
                tId = 'lead';
                year = 2022;
                quarter = 'Q4';
                headerTitle = 'Leaderboards: '+quarter+' '+year;
                currTarget = document.getElementById('btn_Lead');
                targetObj = stad4;
                icon = "stadNW.png";
              break;
              case 'SchoolMesh':
                tId = 'vote'
                headerTitle = 'Vote Now';
                currTarget = document.getElementById('btn_Vote');
                targetObj = academy;
                icon = "academy.png";
              break;
              case 'Office_buildingMesh':
                tId = 'submit'
                headerTitle = 'Submit Entry';
                currTarget = document.getElementById('btn_Entry');
                targetObj = office;
                icon = "office.png";
              break;
              case 'houseBldg':
                tId = 'report'
                headerTitle = 'Submission List';
                currTarget = document.getElementById('btn_Report');
                targetObj = house;
                icon = "house.png";
              break;
              default:
                headerTitle = "Home"
                tId = 'home'
                targetObj = grouped;
                icon = "academy.png";
                break;
            }
            if(intersects[0].object.name !== 'undefined'){
              let time = {t: 0};
              const positionToLookAt = targetObj.position;
              const startQuaternion = camera.quaternion.clone(); //set initial angle
              camera.lookAt(positionToLookAt);
              const endQuaternion = camera.quaternion.clone(); //set destination angle
              camera.quaternion.copy(startQuaternion);

              new TWEEN.Tween(time)
                .to({t: 1}, 1000) //duration in milliseconds
                .onUpdate(() => {
                    THREE.Quaternion.slerp(startQuaternion, endQuaternion, camera.quaternion, time.t);
                })
                .easing(TWEEN.Easing.Quadratic.InOut).onComplete(() => {    
                  // let posX, posY, posZ;
                  // if(targetObj.position.z<-2 && tId != 'home'){
                  //   posX = targetObj.position.x;
                  //   posY = targetObj.position.y+5;
                  //   posZ = targetObj.position.z+10;
                  // } else if (targetObj.position.z>-2 && tId != 'home') {
                  //   posX = targetObj.position.x;
                  //   posY = targetObj.position.y+5;
                  //   posZ = targetObj.position.z+15;
                  // } else {
                  //   posX = camInit.x;
                  //   posY = camInit.y;
                  //   posZ = camInit.z;
                  // }
                  // let tweenCam = new TWEEN.Tween(camera.position)                
                  // .to({x:posX, y:posY, z:posZ}, 500)
                  // .easing(TWEEN.Easing.Quadratic.Out)
                  // .onUpdate(()=>{
                    
                  // }).onComplete(()=>{

                    try {
                      if(currTarget !== "undefined"){
                        currTarget.click();
                      }                     
                        header.innerHTML = headerTitle;
                        document.getElementById("bldgIcon").setAttribute("src","/assets/img/"+icon);
                        this.setState({selectedMenu:tId}); 
                    }
                    catch(err) {
                      header.innerHTML = "There is an error!";
                      alert(err.message);
                    }

                    
                  // }).start();
                  
              }).start();
            }          
        }
      }
    }
  }
}
onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.alpha = true;
}

  render() {
    return <>
      <Suspense>
      <div ref={ref => (this.mount = ref)}></div>
      </Suspense>
    </>
  }
}

export default MainIsland;
