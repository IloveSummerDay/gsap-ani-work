import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
// Scroll Trigger

export let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
export let viewportHeight = window.innerHeight || document.documentElement.clientHeight;
console.log(viewportWidth, viewportHeight); // 1531 715



// 固定 第二屏
const screen2 = ScrollTrigger.create({
    trigger: "#screen2_radio",
    // pin: true,
    start: "top top",
    end: "+=300",
    scrub: 1,
    // markers: true,
    pin: true,
})

const screen3 = ScrollTrigger.create({
    trigger: "#screen3_sky",
    // pin: true,
    start: "top top",
    end: "bottom top",
    scrub: 1,
    // markers: true,
    pin: true,
    // animation: 
    //     gsap.to("img", {
    //         y: 400
    //     })
})

const screen4 = ScrollTrigger.create({
    trigger: "#screen4_balloon",
    // pin: true,
    start: "top top",
    end: "+=300",
    scrub: 1,
    // markers: true,
    pin: true,
})

const screen5 = ScrollTrigger.create({
    trigger: "#screen5_burger",
    // pin: true,
    start: "top top",
    end: "+=100",
    scrub: 1,
    // markers: true,
    pin: true,
})


