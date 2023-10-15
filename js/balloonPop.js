/**
 * @isBehind 控制一个气球及其爆炸特效的层级关系（svg、behind_svg）
 */
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

let delta = 500 // 气球产生间隔
let size = {width: 0, height: 0};
const svg = document.getElementById('svg');
const behind_svg = document.getElementById('behind');
const balloonPopMusic = document.getElementById('balloonPop');
balloonPopMusic.pause()
const onResize = (e) =>
{
    size.width = window.innerWidth;
    size.height = window.innerHeight;
}

onResize();
window.addEventListener('resize', () => onResize())

const getColor = () => { 
  return "hsl(" + 360 * Math.random() + ',' +
             (100 + 70 * Math.random()) + '%,' + 
             (70 + 0 * Math.random()) + '%)'
}

const createBalloon = () =>
{
  let useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  useEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#balloon');
  useEl.setAttribute('style', `--color:${getColor()}`);
  useEl.setAttribute('class', `balloon`);
  return useEl;
}
// 气球爆炸特效 1 + 1 生成
const popBalloon = (colorSettings, x, y, isBehind) =>
{
  // pop 气球中心爆炸特效 1
  let pop = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  pop.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#pop');
  pop.setAttribute('style', colorSettings);
  pop.setAttribute('class', `pop`);
  
  if(isBehind) behind_svg.appendChild(pop);
  else svg.appendChild(pop);
  
  gsap.set(pop, {scale: 0.5, x: x, y: y, rotation: Math.random() * 360, transformOrigin: "center"});
  gsap.to(pop, {
    duration: (Math.floor(Math.random()* 10)) >=  3 ? 0.2 : 1.5,
    scale: 3,
    opacity: 0,
    ease: 'power3.out',
    onComplete: () => isBehind ? behind_svg.removeChild(pop) : svg.removeChild(pop)
  })
  
  for(let i = 0; i <= 10; i++)
  {
    // confetti 彩带 1
    let confetti = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    confetti.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#confetti_${Math.ceil(Math.random() * 2)}`);
    confetti.setAttribute('style', `--color: ${getColor()}`);
    confetti.setAttribute('class', `confetti`);

    if(isBehind) behind_svg.appendChild(confetti);
    else svg.appendChild(confetti);

    let randomPos = {
      x: Math.random() * 500 - 250,
      y: Math.random() * 500 - 250
    }
    gsap.set(confetti, {x: x, y: y, rotation: Math.random() * 360, transformOrigin: "center"});
    gsap.to(confetti, {
      duration: 3,
      scale: Math.random(),
      motionPath: {curviness: 2, path: [
        {
          x: x + randomPos.x,
          y: y + randomPos.y,
        },
        {
          x: x + randomPos.x + (Math.random() * 20 - 10),
          y: y + randomPos.y + (Math.random() * 200),
        }
      ]},
      opacity: 0,
      rotation: Math.random() * 360 - 180,
      ease: 'power4.out',
      onComplete: () => isBehind ? behind_svg.removeChild(confetti) : svg.removeChild(confetti)
    })

  }
}

const animateBalloon = (balloon, isBehind) =>
{
  gsap.set(balloon, {
    x: size.width * Math.random(), 
    y: size.height - 100 ,
    transformOrigin: "center",
    scale: isBehind ? 1 : 1.5,
    alpha: 0.95,
    rotation: (Math.random() * 180) - 90
  })
  
  let centerPos = {
    x: (size.width / 4) + (Math.random() * (size.width / 2)),
    y: size.height / 2 
  }
  
  let endPos = {
    x: centerPos.x + (Math.random() * 200 - 100),
    y: Math.random() * 50
  }
  gsap.to(balloon, {
    duration: 5 + Math.random(),
    motionPath: {curviness: 1.5, path:[

      { 
        x: centerPos.x,
        y: centerPos.y
      },
      { 
        x: endPos.x,
        y: endPos.y
      }
    ]},
    scale: isBehind ? 0.5 : 1,
    rotation: 0,
    ease: "power1.in",
    onComplete: () => {onClick(endPos.x, endPos.y, balloon, isBehind)}
  })
  
  balloon.addEventListener('click', (e) => {
    balloonPopMusic.currentTime = 0
    balloonPopMusic.play()
    onClick(e.clientX, e.clientY, balloon, isBehind);
  })
}

const onClick = (x, y, balloon, isBehind) => 
{
    gsap.killTweensOf(balloon); // 终止指定元素的所有 Tween 动画
    const colorSettings = balloon.getAttribute('style');
    isBehind ? behind_svg.removeChild(balloon) : svg.removeChild(balloon)
    popBalloon(colorSettings, x, y, isBehind);
}

let balloonGenerator = setInterval(() => 
{
  if(!document.hidden)
  {
    const newBalloon = createBalloon();
    const isBehind = Math.random() > 0.5 ? true : false;
    if(isBehind) behind_svg.appendChild(newBalloon);
    else svg.appendChild(newBalloon);
    animateBalloon(newBalloon, isBehind);  
  }
}, delta)


