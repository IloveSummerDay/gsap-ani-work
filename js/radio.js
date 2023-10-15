
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const volumeBtnDragger = document.querySelector('#volumeBtnFront')
const tuningBtnDragger = document.querySelector('#tuningBtnFront')
const pBtn = document.querySelector('#pBtn')
const buttonSound = document.querySelector('#powerButton')
const antenna = document.querySelector('#antenna');
const freqSlider = document.querySelector('#freqSlider');
gsap.set(volumeBtnDragger, { transformOrigin: "center center", rotation: 135 });
gsap.set(tuningBtnDragger, { transformOrigin: "center center" });
gsap.set(antenna, { transformOrigin: "right bottom", rotation: -65 })
gsap.set('#antennaUpper', { y: -110 })
gsap.set('#speakerGroup', { transformOrigin: "50% 50%" })
gsap.set('svg', { visibility: "visible" })

tuningBtnDragger.addEventListener('click', () => { console.log('111'); })
let radioPower = false;
let antennaNoiseOn = true;
let antennaExtended = true;
let tuningRadio = false;
let speakerGroupScale = 1

// AUDIO 
const radioAudio = document.querySelector('#radioAudio')
const antennaNoise = document.querySelector('#antennaNoise')
const tuningNoise = document.querySelector('#tuningNoise')
const audioSource = document.querySelector('#audioSource');

// radio audio volume
radioAudio.volume = 0.5
antennaNoise.volume = 0.5
tuningNoise.volume = 0.5
// radio button volume
buttonSound.volume = 1

const changeChannel = (source) => {
    audioSource.src = source
    radioAudio.load();
    // if power , start playing the source 
    radioPower ? radioAudio.play() : null
    // pause the noise
    tuningNoise.pause();
}

const playTuningNoise = () => {
    if (radioPower && gsap.getProperty(volumeBtnDragger, 'rotation') != 0) {
        tuningNoise.play();
    }
}
const playNoteTls = () => {
    playNote1.play()
    playNote2.play()
}

// Power button animation
const pBtnTl = gsap.timeline({
    paused: true,
    defaults: { duration: 0.12, ease: "back" }
});
gsap.set('#freqLight', { opacity: 0 })
pBtnTl.to('#pBtnFront', { x: 2 }, 'press')
    .to('#pBtnOutline', { x: 2 }, 'press')
    .to('#pBtnOutline path', { stroke: "#FFF" }, 'press')
    .to('#pBtnBG', { scaleX: 0.90, transformOrigin: "right center" }, 'press')
    .to('#pBtnFront', { x: 1 }, 'press2')
    .to('#pBtnOutline', { x: 1 }, 'press2')
    .to('#freqLight', { opacity: 1 }, 'press')

// Draggable Volume
Draggable.create(volumeBtnDragger, {
    type: 'rotational',
    bounds: { minRotation: 0, maxRotation: 270 },
    dragResistance: 0.15,
    onDrag: () => {
        changeVolume(volumeBtnDragger)
        if (gsap.getProperty(volumeBtnDragger, 'rotation') === 0) {
            // STOP THE MUSIC NOTES AND NOISE ICONS FROM ANIMATING
            checkAntennaNoiseTl();
            checkNoteTls();
            checkSpeakerTl();
        }
        else {
            // if timelines are not active start playing them again
            if (radioPower) {
                checkAntennaNoiseTl();
                checkNoteTls();
                checkSpeakerTl();
                // antenna can't be extended
                if (!antennaExtended) {
                    antennaNoiseTl.restart()
                }
                speakerTl.restart()
                playNoteTls();
            }
        }
    }
})

// Draggable tuning
Draggable.create(tuningBtnDragger, {
    type: 'rotational',
    cursor: "grab",
    bounds: { minRotation: 0, maxRotation: 360 },
    dragResistance: 0.40,
    onDrag: () => {
        tuningRadio = true;
        checkNoteTls();
        updateFreq(tuningBtnDragger);
        if (gsap.getProperty(tuningBtnDragger, 'rotation') >= 15 && gsap.getProperty(tuningBtnDragger, 'rotation') <= 60) {
            playTuningNoise();
        }
        if (gsap.getProperty(tuningBtnDragger, 'rotation') >= 75 && gsap.getProperty(tuningBtnDragger, 'rotation') <= 120) {
            playTuningNoise();
        }
        if (gsap.getProperty(tuningBtnDragger, 'rotation') >= 135 && gsap.getProperty(tuningBtnDragger, 'rotation') <= 180) {
            playTuningNoise();
        }
        if (gsap.getProperty(tuningBtnDragger, 'rotation') >= 195 && gsap.getProperty(tuningBtnDragger, 'rotation') <= 240) {
            playTuningNoise();
        }
        if (gsap.getProperty(tuningBtnDragger, 'rotation') >= 255 && gsap.getProperty(tuningBtnDragger, 'rotation') <= 300) {
            playTuningNoise();
        }
        if (gsap.getProperty(tuningBtnDragger, 'rotation') >= 315 && gsap.getProperty(tuningBtnDragger, 'rotation') <= 360) {
            playTuningNoise();
        }
        if (gsap.getProperty(tuningBtnDragger, 'rotation') >= 0 && gsap.getProperty(tuningBtnDragger, 'rotation') <= 5) {
            changeChannel("https://ice4.somafm.com/secretagent-128-mp3");
        }
        if (gsap.getProperty(tuningBtnDragger, 'rotation') >= 60 && gsap.getProperty(tuningBtnDragger, 'rotation') <= 65) {
            changeChannel("https://ice4.somafm.com/indiepop-128-mp3");
        }
        if (gsap.getProperty(tuningBtnDragger, 'rotation') >= 120 && gsap.getProperty(tuningBtnDragger, 'rotation') <= 125) {
            changeChannel("https://ice2.somafm.com/defcon-128-mp3");
        }
        if (gsap.getProperty(tuningBtnDragger, 'rotation') >= 180 && gsap.getProperty(tuningBtnDragger, 'rotation') <= 185) {
            changeChannel("https://ice2.somafm.com/fluid-128-mp3");
        }
        if (gsap.getProperty(tuningBtnDragger, 'rotation') >= 240 && gsap.getProperty(tuningBtnDragger, 'rotation') <= 245) {
            changeChannel("https://ice4.somafm.com/7soul-128-mp3");
        }
        if (gsap.getProperty(tuningBtnDragger, 'rotation') >= 300 && gsap.getProperty(tuningBtnDragger, 'rotation') <= 305) {
            changeChannel("https://ice5.somafm.com/u80s-128-mp3");
        }
        if (gsap.getProperty(tuningBtnDragger, 'rotation') >= 355 && gsap.getProperty(tuningBtnDragger, 'rotation') <= 360) {
            changeChannel("https://ice4.somafm.com/spacestation-128-mp3");
        }
    },
    onDragEnd: () => {
        tuningRadio = false;
        checkNoteTls();
        if (radioPower) {
            playNoteTls();
        }
    }
})

// Draggable antenna base
Draggable.create(antenna, {
    type: 'rotational',
    bounds: { minRotation: -65, maxRotation: 0 },
})

// Draggable upper antenna
Draggable.create('#antennaUpper', {
    type: "y",
    bounds: { minY: 0, maxY: -110 },
    onDrag: () => {
        if (gsap.getProperty(volumeBtnDragger, 'rotation') != 0) {
            noiseLevelUpdate('#antennaUpper')
        }
        if (gsap.getProperty(volumeBtnDragger, 'rotation') != 0 && !radioPower) {
            noiseLevelUpdate('#antennaUpper')
            // don't play the noise when radio is not powered on
            antennaNoise.pause();
        }
    },
    onDragEnd: () => {
        if (gsap.getProperty('#antennaUpper', 'y') <= -110) {
            antennaExtended = true;
            antennaNoiseOn = false;
            checkAntennaNoiseTl();
        }
        if (gsap.getProperty('#antennaUpper', 'y') >= -109) {
            antennaExtended = false;
            radioPower ? antennaNoise.play() : antennaNoise.pause();
            antennaNoiseOn = true;
            checkAntennaNoiseTl();
            if (gsap.getProperty(volumeBtnDragger, 'rotation') != 0) {
                radioPower ? antennaNoiseTl.restart() : null;
            }
        }
    }
})

// SPEAKER ANIMATION
const speakerTl = gsap.timeline({ repeat: -1, paused: true })

speakerTl.to('#speaker', { scale: 1.01, repeatRefresh: true, rotation: 0.25, duration: 0.24, transformOrigin: "center center" })
    .to('#speaker', { rotation: 0, scale: 1, duration: 0.24 })

// Frequency slider
const freqTl = gsap.timeline({
    paused: true
})

freqTl.to(freqSlider, { x: 176, duration: 1.24, ease: "linear" })

const updateFreq = (dragInstance) => {
    let percentDragged = gsap.getProperty(dragInstance, "rotation") / 360 * freqTl._first._tDur;
    let textDragged = gsap.getProperty(dragInstance, 'rotation') / 360 * textTl._dur;
    gsap.to(freqTl, {
        time: percentDragged,
        duration: 0.08,
        ease: "circ.inOut"
    })
    gsap.set(textTl, {
        time: textDragged
    })
}

const changeVolume = (volumeControl) => {
    let level = gsap.getProperty(volumeControl, "rotation") / 280
    radioAudio.volume = level
    if (antennaNoiseOn) {
        antennaNoise.volume = level
    }
    tuningNoise.volume = level
    // SPEAKER GROUP SCALING
    speakerGroupScale = 1 + level / 12
    radioPower ? gsap.to('#speakerGroup', { scale: speakerGroupScale, duration: 0.08 }) : null
}

const noiseLevelUpdate = (dragInstance) => {
    let level = gsap.getProperty(dragInstance, 'y') / 110;
    antennaNoise.volume = (1 + level)
}

// freq light opacity animation
gsap.set("#freqLightClone", { opacity: 0 })

const freqAnimateTl = gsap.timeline({ paused: true, repeat: -1, defaults: { duration: 1.32, ease: "sine.inOut" } });
freqAnimateTl.to("#freqLightClone", { keyframes: [{ opacity: 0.25 }, { opacity: 0 }] })

// MUSIC NOTES
const notes = document.querySelectorAll('.note')
gsap.set(notes, { opacity: 0, xPercent: -50, yPercent: -50, transformOrigin: "50% 50%" })

const animateNotes = (target, path, delay) => {
    const noteTl = gsap.timeline({ repeat: -1, paused: true });
    noteTl
        .to(target, { opacity: 1, scale: 1, duration: 0.32, delay: delay }, 'in')
        .to(target, {
            motionPath: {
                path: path,
                align: path
            }, duration: 1.24, ease: "sine", delay: delay
        }, 'in')
        .to(target, { opacity: 0, duration: 0.64, delay: delay }, 'in+=0.32')
    return noteTl;
}
const playNote1 = animateNotes(notes[0], '#path1', 0)
const playNote2 = animateNotes(notes[1], '#path2', 0.1)

// ANIMATE NOISE
const noiseIcons = document.querySelectorAll('.noise');
gsap.set(noiseIcons, { opacity: 0 })

// morph the path of the noise icon
const morphNoiseTl = gsap.timeline({ repeat: -1, defaults: { ease: "circ", duration: 0.04 } })
morphNoiseTl.to(noiseIcons[0], { keyframes: [{ morphSVG: ".noise2" }, { morphSVG: noiseIcons[0] }] }, 'morph')
morphNoiseTl.to(noiseIcons[1], { keyframes: [{ morphSVG: ".noise2" }, { morphSVG: noiseIcons[1] }] }, 'morph')

const antennaNoiseTl = gsap.timeline({
    repeat: -1, paused: true, defaults: { duration: 1.24 }
})
antennaNoiseTl.to(noiseIcons[0],
    {
        keyframes: [{ opacity: 1, duration: 0.32 },
        { motionPath: { path: '#path1', align: '#path1' }, delay: -0.32 },
        { opacity: 0, duration: 0.56, delay: -0.48 }
        ]
    })
    .to(noiseIcons[1], {
        keyframes: [{ opacity: 1, duration: 0.32 },
        { motionPath: { path: '#path2', align: '#path2' }, delay: -0.32 },
        { opacity: 0, duration: 0.56, delay: -0.48 }
        ]
    }, 0.5)

const checkAntennaNoiseTl = () => {
    if (!antennaNoiseOn || gsap.getProperty(volumeBtnDragger, 'rotation') == 0 || !radioPower) {
        antennaNoiseTl.eventCallback('onRepeat', () => {
            antennaNoiseTl.pause();
        })
    }
    else {
        antennaNoiseTl.eventCallback('onRepeat', null)
    }
}

// event callback freq indicator light tl
const checkFreqLight = () => {
    if (radioPower) {
        freqAnimateTl.eventCallback('onRepeat', null)
    }
    else {
        freqAnimateTl.eventCallback('onRepeat', () => {
            freqAnimateTl.pause();
        })
    }
}

const checkNoteTls = () => {
    if (gsap.getProperty(volumeBtnDragger, 'rotation') == 0 || !radioPower || tuningRadio) {
        playNote1.eventCallback('onRepeat', () => {
            playNote1.pause();
        })
        playNote2.eventCallback('onRepeat', () => {
            playNote2.pause();
        })
    }
    else {
        playNote1.eventCallback('onRepeat', null)
        playNote2.eventCallback('onRepeat', null)
    }
}

const checkSpeakerTl = () => {
    // disable speaker tl when antenna is extended and radio is powered off
    if (gsap.getProperty(volumeBtnDragger, 'rotation') != 0 && !radioPower && antennaExtended) {
        speakerTl.pause();
        // reset the speaker group
        gsap.to('#speakerGroup', { scale: 1, duration: 0.32 })
    }
    if (gsap.getProperty(volumeBtnDragger, 'rotation') == 0 || !radioPower) {
        speakerTl.eventCallback('onRepeat', () => {
            speakerTl.pause();
            // reset the speaker group
            gsap.to('#speakerGroup', { scale: 1, duration: 0.32 })
        })
    }
    else {
        speakerTl.eventCallback('onRepeat', null)
    }
}

// Power button event listener
pBtn.addEventListener('click', () => {
    buttonSound.play();
    radioPower ? radioPower = false : radioPower = true
    // Turn the radio on/off
    radioPower ? pBtnTl.play() : pBtnTl.reverse()
    // ANIMATE THE LIGHT OF THE FREQ BG
    radioPower ? freqAnimateTl.play() : null
    // IF THE VOLUME IS NOT 0 PLAY THE NOISE/MUSIC ICON
    // & SPEAKER ANIMATIONS
    if (gsap.getProperty(volumeBtnDragger, 'rotation') != 0) {
        // ANIMATE THE MUSIC NOTES
        radioPower ? playNoteTls() : null
        // ANIMATE THE SPEAKER
        radioPower ? speakerTl.play() : null
        // ANIMATE THE NOISE SYMBOLS/ICONS
        !antennaExtended ? radioPower ? antennaNoiseTl.play() : null : null
    }
    // CHECK FOR PLAYING TIMELINES AND FINISH THEIR RESPECTIVE ANIMATIONS
    const checkAllRepeatingTls = () => {
        checkFreqLight();
        checkAntennaNoiseTl();
        checkNoteTls();
        checkSpeakerTl();
    }
    checkAllRepeatingTls();
    // SOUND 
    radioPower ? radioAudio.play() : radioAudio.pause()
    !radioPower ? tuningNoise.pause() : null;
    !antennaExtended ? radioPower ? antennaNoise.play() : antennaNoise.pause() : null
    // show channel name on power if tuning knob is turned all the way to the left 
    gsap.getProperty(tuningBtnDragger, 'rotation') == 0 ? radioPower ? gsap.set('#t1', { opacity: 1 }) : null : null
    // hide the channel name group if the radio is not powered on 
    radioPower ? gsap.set('#textGroup', { opacity: 1 }) : gsap.set('#textGroup', { opacity: 0 })
})

const textTl = gsap.timeline({ defaults: { duration: 0.2 }, paused: true });
gsap.set('#textGroup', { opacity: 0 })
gsap.set('#textGroup g', { opacity: 0 })

textTl.set('#t1', { opacity: 1 })
    .set('#t1', { opacity: 0 }, 0.1)
    .set('#t2', { opacity: 1 }, 0.6)
    .set('#t2', { opacity: 0 }, 0.7)
    .set('#t3', { opacity: 1 }, 1.2)
    .set('#t3', { opacity: 0 }, 1.3)
    .set('#t4', { opacity: 1 }, 1.8)
    .set('#t4', { opacity: 0 }, 1.9)
    .set('#t5', { opacity: 1 }, 2.4)
    .set('#t5', { opacity: 0 }, 2.5)
    .set('#t6', { opacity: 1 }, 3)
    .set('#t6', { opacity: 0 }, 3.1)
    .set('#t7', { opacity: 1 }, 3.6)