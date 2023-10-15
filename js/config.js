import '../css/config.css'
import '../css/home.css'
import '../css/radio.css'
import '../css/sky.css'
import '../css/balloonPop.css'
import '../css/burger.css'
import { gsap } from 'gsap'

window.scrollTo({
    top: 0,
    behavior: 'smooth'
})

let bgMusic = document.getElementById('bgMusic')
bgMusic.pause()

let musicButton = document.getElementById('musicButton')

let musicButtonRotate = gsap.to(musicButton, {
    rotate: 360,
    repeat: -1,
    duration: 4,
    ease: 'power1.inOut'
})
musicButtonRotate.pause()

musicButton.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play()
        musicButtonRotate.play()
    }
    else {
        bgMusic.pause()
        musicButtonRotate.pause()
    }
})


