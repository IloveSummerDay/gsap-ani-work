import { gsap } from "gsap";

const t1 = gsap.timeline({})

gsap.to('.down_arrow', {
    opacity: 1,
    duration: 1,
    yoyo: true,
    repeat: -1,
    ease: "power2.out",

})

gsap.from('.white_circle', {
    scale: 0.1,
    duration: 3,
    ease: "power2.out",

})
gsap.from('.line3, .line2, .line1', {
    opacity: 0,
    duration: 3,
    ease: "power2.out",
})

gsap.from('.pueple_block, .light_small_block', {
    x:  200,
    y: Math.sqrt(3) * 200,
    ease: "power2.out",
    duration: 3,
})
gsap.from('.light_long_block, .blue_block', {
    x:  -200,
    y: -Math.sqrt(3) * 200,
    ease: "power2.out",
    duration: 3,
})

gsap.from('.circle_line .s', {
    opacity: 0,
    x:  -10,
    y: -Math.sqrt(3) * 10,
    ease: "power2.out",
    duration: 4,
})
gsap.from('.circle_line .x', {
    opacity: 0,
    x:  10,
    y: Math.sqrt(3) * 10,
    ease: "power2.out",
    duration: 4,
})
gsap.from('.intro, .name', {
    opacity: 0,
    duration: 3,
    ease: "power2.out",
})
