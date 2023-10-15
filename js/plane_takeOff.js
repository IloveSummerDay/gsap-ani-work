import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { addCloud } from "./plane_takeOff_2";
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(Draggable);

let airliner = document.getElementsByClassName('plane_item_one_svg')[0]
let aircraft = document.getElementsByClassName('plane_item_two_svg')[0]
let rocket = document.getElementsByClassName('plane_item_three_svg')[0]
let PaperAirPlane = document.getElementsByClassName('plane_item_four_svg')[0]
let helixFlyMusic = document.getElementById('helixFly')
let planeFlyMusic = document.getElementById('planeFly')
let rocketFlyMusic = document.getElementById('rocketFly')
let PaperAirPlaneMusic = document.getElementById('PaperAirPlaneFly')
helixFlyMusic.pause()
planeFlyMusic.pause()
rocketFlyMusic.pause()
PaperAirPlaneMusic.pause()


// 1 airliner
airliner.addEventListener('click', function () {
    planeFlyMusic.play()
    handleAppear('#plane_line')
    setTimeout(() => {
        handleAirlinerMove('.plane_item_one_svg')
    }, 2000)
})
// 2 aircraft
aircraft.addEventListener('click', function () {
    helixFlyMusic.play()
    handlePropellerRotate()
    handleAircraftMove('.plane_item_two_svg')
})
// 3 rocket
rocket.addEventListener('click', function () {
    rocketFlyMusic.play()
    handleRocketAni()
})

// 1
function handleAppear(name) {
    gsap.to(name, {
        opacity: 1,
        duration: 0.5,
    })
}

function handleAirlinerMove(name) {
    gsap.to(name, {
        x: 400,
        y: -400,
        duration: 2,
    })
}
// 2
function handleAircraftMove(name) {
    gsap.to(name, {
        x: 800,
        duration: 5,
    })
}
function handlePropellerRotate() {
    gsap.to('#propeller', {
        rotate: 360 * 8,
        // transformOrigin: 'center',
        transformOrigin: 'center center',
        repeat: -1,
        duration: 2.5,
    })
}

// 3
function handleRocketAni() {
    let tl_rocket = gsap.timeline({})
        .to('.plane_item_three_svg', {
            rotationZ: -10, // 向正方向旋转 10 度
            transformOrigin: 'center center',
            duration: 0.1, // 动画持续时间（秒）
            ease: 'power0.none', // 缓动函数（可选，根据需要更改）
        })
        .to('.plane_item_three_svg', {
            rotationZ: 20, // 向正方向旋转 10 度
            repeat: 3, // 重复 3 次
            transformOrigin: 'center center',
            yoyo: true, // 在动画结束后反向播放动画
            duration: 0.05, // 动画持续时间（秒）
            ease: 'power0.none', // 缓动函数（可选，根据需要更改）
        }).to('.plane_item_three_svg', {
            rotationZ: 0, // 向正方向旋转 10 度
            transformOrigin: 'center center',
            duration: .05, // 动画持续时间（秒）
            ease: 'power0.none', // 缓动函数（可选，根据需要更改）
        }).to('#tail', {
            opacity: 1,
            duration: 0.1,
        }).to('.plane_item_three_svg', {
            y: -1000,
            duration: 1,
        }, '+=1')
}

// 4
// rotateZ: -50 || 130 正左正右
gsap.set('.plane_item_four_svg', {
    rotateZ: 90
})
Draggable.create('.plane_item_four_svg', {
    type: 'x,y',
    trigger: '.draggableTrigger',
    edgeResistance: 0.65,
    bounds: '#screen3_sky',
    onDrag: null,
    onDragEnd: animateAlongPath

});



function animateAlongPath() {
    const path = document.querySelector('.plane_move_road');
    gsap.to('.plane_item_four_svg', {
        duration: 2,
        alignOrigin: [0.5, 0.5],
        motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            // transformOrigin: "50% 50%",
            autoRotate: true,
            start: 1,
            end: 0,
            ease: "power1.inOut"
        },
        onComplete: scaleBig,
    });
}
function scaleBig() {
    gsap.to(PaperAirPlane, {
        scale: 2,
        transformOrigin: "50% 50%",
        duration: 0.5,
    })
    PaperAirPlane.style.cursor = "pointer"
    PaperAirPlane.addEventListener('click', () => {
        PaperAirPlaneMusic.play()
        addCloud();
    })
}


