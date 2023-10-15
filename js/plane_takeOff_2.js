import { gsap } from "gsap";

let topCloudShadow = document.getElementsByClassName('topcloud_shadow')[0]
let midCloudShadow = document.getElementsByClassName('midcloud_shadow')[0]
let bottomCloudShadow = document.getElementsByClassName('bottomcloud_shadow')[0]

let topCloud = document.getElementsByClassName('topcloud')[0]
let midCloud = document.getElementsByClassName('midcloud')[0]
let bottomCloud = document.getElementsByClassName('bottomcloud')[0]

let stars = document.getElementsByClassName('star')
let sunLight = document.getElementsByClassName('sun')[0]
let looking = document.getElementsByClassName('looking')[0]
let rocket = document.getElementsByClassName('rocket_svg')[0]
let screen3_2 = document.getElementsByClassName('takeOff_box')[0]


export function toNextPage() {
    console.log('ToNextPage called')
    looking.style.opacity = 1
    looking.classList.add('animate__animated', 'animate__heartBeat')
    setTimeout(() => {
        looking.classList.remove('animate__animated', 'animate__heartBeat')
        gsap.to('.next_text', {
            opacity: 1,
            yoyo: true,
            repeat: -1,
            duration: 1
        })
    }, 2000)
}

export function addCloud() {
    gsap.timeline({
        onComplete: () => { console.log('timeline onComplete'); }
    })
        .to(screen3_2, {
            left: 0,
            duration: 1
        })
        .to(bottomCloud, {
            x: 0,
            opacity: 1,
            duration: 1
        })
        .to(bottomCloudShadow, {
            opacity: 1,
            duration: 2
        })
        .to(midCloud, {
            x: 0,
            opacity: 1,
            duration: 1
        })
        .to(midCloudShadow, {
            opacity: 1,
            duration: 2
        })
        .to(topCloud, {
            x: 0,
            opacity: 1,
            duration: 1
        })
        .to(topCloudShadow, {
            opacity: 1,
            duration: 2
        })
        .to(stars, {
            opacity: 1,
            yoyo: true,
            repeat: -1,
            duration: 1
        })
        .to(sunLight, {
            opacity: 1,
            duration: 1
        })
        .to(rocket, {
            opacity: 1,
            duration: 1
        })
        .to(rocket, {
            y: -800,
            duration: 3,
            ease: "slow(0.3, 0.7, false)" // "circ.inOut" "circ.in"
        })
        .to('.takeOff_svg', {
            opacity: 0,
            duration: 1,
            onComplete: toNextPage
        }, '+=2')
}





