import { gsap } from 'gsap'

let burgerAppearMusic = document.getElementById('burgerAppear')
burgerAppearMusic.pause()

let gt_warnBoard = gsap.timeline({})
    .from(".warn_board", { opacity: 0, duration: 2, })
    .to(".warn_board", { x: -2000, duration: 0.5, opacity: 0.3 })

let g_textAni = gsap.from(".text", {
    duration: 2,
    opacity: 0,
    y: 50,
    ease: "power4.out",
    delay: 0.5
});

let g_brownCircleAni = gsap.to('#last_brown', {
    duration: 0.5,
    x: "+=5",
    repeat: 2,
    yoyo: true,
    ease: "power1.inOut"

})
document.addEventListener("DOMContentLoaded", function (event) {

    //gsap 
    gt_warnBoard.pause()
    g_brownCircleAni.pause()

    let colorBlock = document.getElementsByClassName('color_block')
    let warnBoard = document.getElementsByClassName('warn_board')[0]
    let lastBrownBoard = document.getElementById('last_brown')
    let screen5_container1 = document.getElementById('screen5_container1')
    let canvas = document.getElementById('canvas');

    let textIndex = 0
    let shouldColor
    let text_str_color = []
    let textIndex5_Index = 0
    let text = document.getElementsByClassName('text')[0]
    let textList = ['试一试，先画一个红色线条吧！_#AA392B', '请画出，一半浅红，一半深红的线条_red',
        '那么一条浅灰，一条深灰的<span>线条</span>也难不倒你吧_gray', '我们来画两条波浪线吧！_green',
        '我需要两个半圆_brown', '最后一个！圆角矩形！_#BA8060']
    text.innerHTML = textList[textIndex].split('_')[0]
    shouldColor = text.style.color = textList[textIndex].split('_')[1]
    let button = document.getElementsByClassName('changeImg')[0]
    // console.log(shouldColor);
    canvas.width = 1030;
    canvas.height = 500;
    let context = canvas.getContext("2d");
    let isDrawing = false;

    function fillCircle(context, x, y, radius) {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
    }

    function bindClickBtn() {
        if (button.classList.contains('end_draw')) return

        // console.log(rgbToHex(rgbStringToArray(currentColor)));
        if ((textIndex == 0 || textIndex == 5) && shouldColor !== rgbToHex(rgbStringToArray(currentColor))) {

            button.classList.add('animate__animated', 'animate__fadeOut');
            setTimeout(function () {
                button.classList.remove('animate__animated', 'animate__fadeOut')
            }, 1000)

            if (textIndex == 5 && !textIndex5_Index) {
                textIndex5_Index++
            }
            else if (textIndex == 5 && textIndex5_Index == 1) {
                warnBoard.innerHTML = "不要局限于色块，在屏幕里找找吧 ^_^"
                textIndex5_Index++
            }
            else if (textIndex == 5 && textIndex5_Index == 2) {
                warnBoard.innerHTML = "当你选择正确时，会有神奇的事情发生 ~"
            }
            gt_warnBoard.restart()
            context.clearRect(0, 0, canvas.width, canvas.height);
            return
        }

        text.classList.remove('text_gradient_' + text_str_color[1])
        textIndex += 1
        console.log(textIndex);
        // 文本文字
        if (textIndex == 6) {
            text.innerHTML = '快来查看一下这些线条能拼出什么图形吧！' // 结束图标（文字处）
            button.style.backgroundImage = `url(../public/完成时对勾.svg)`
            button.style.transform = `scale(1.5)`
            button.classList.add('end_draw')
        }
        else if (textIndex <= 5) {

            text_str_color = textList[textIndex].split('_')
            text.innerHTML = text_str_color[0]
        }

        // 文本颜色/渐变
        if (textIndex <= 5 && text_str_color[1] && text_str_color[1][0] !== '#') {
            text.classList.add('text_gradient_' + text_str_color[1])
        }
        else if (textIndex <= 5) {
            shouldColor = text.style.color = text_str_color[1]
            console.log(shouldColor, text);
        }

        g_textAni.restart()
        context.clearRect(0, 0, canvas.width, canvas.height);

        button.classList.add('animate__animated', 'animate__heartBeat');
        setTimeout(function () {
            button.classList.remove('animate__animated', 'animate__heartBeat')
        }, 1000)
    }

    function bindSwing(el) {
        // animate__animated animate__swing
        el.classList += ' animate__animated animate__swing'
        setTimeout(function () {
            el.classList.remove('animate__animated', 'animate__swing')
        }, 1000)
    }

    function bindShake(el) {
        currentColor = window.getComputedStyle(el.target).getPropertyValue('fill')
        g_brownCircleAni.restart()
    }

    // 给色块绑定动画
    for (let i = 0; i < colorBlock.length; i++) {
        const el = colorBlock[i];
        el.addEventListener('click', function (e) {
            console.log(rgbToHex(rgbStringToArray(e.target.style.backgroundColor)));
            currentColor = e.target.style.backgroundColor
            if (i) bindSwing(el.parentNode)
            else {
                el.classList += ' animate__animated animate__swing'
                setTimeout(function () {
                    el.classList.remove('animate__animated', 'animate__swing')
                }, 1000)
            }
        })

    }

    // 
    
    button.addEventListener('click', function(){
        if(!button.classList.contains('end_draw')) return
        else
        {
            // 切换这个屏的整个画面 显示汉堡
            console.log('end_draw');
            screen5_container1.classList.add('animate__animated','animate__fadeOut')
            setTimeout(() => {
                burgerAppearMusic.play()
                screen5_container1.innerHTML = `<div class="screen5_container1_bg">
                <img src="./public/汉堡.svg" alt="" srcset="" class="burger_img">
              </div>`
                screen5_container1.classList.remove('animate__animated','animate__fadeOut')
                screen5_container1.classList.add('animate__animated','animate__fadeIn');
            },3000)
        }
    })
    button.addEventListener('click', bindClickBtn)
    

    lastBrownBoard.addEventListener('click', bindShake)
    console.log(lastBrownBoard);

    context.lineJoin = 'round';
    context.lineCap = 'round';
    // 定义颜色变量
    let currentColor = "rgb(0,0,0,0)";

    // 鼠标按下事件
    canvas.addEventListener("mousedown", start);

    function start(event) {
        isDrawing = true;
        draw(event);
    }

    // 鼠标移动事件
    canvas.addEventListener("mousemove", draw);

    function draw(event) {
        if (!isDrawing) return;

        let rect = canvas.getBoundingClientRect();

        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        // console.log(event.clientX, event.clientY, x, y);
        context.fillStyle = currentColor;
        fillCircle(context, x, y, 10);
    }

    // 鼠标释放事件
    canvas.addEventListener("mouseup", stop);
    canvas.addEventListener("mouseout", stop);


    function stop() {
        isDrawing = false;
    }
});

function rgbToHex(rgb) {
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];

    const hexR = ("0" + r.toString(16)).slice(-2).toUpperCase();
    const hexG = ("0" + g.toString(16)).slice(-2).toUpperCase();
    const hexB = ("0" + b.toString(16)).slice(-2).toUpperCase();

    const hexCode = `#${hexR}${hexG}${hexB}`;
    return hexCode;
}

function rgbStringToArray(rgb) {
    // 从 RGB 字符串中提取数字部分
    const rgbValues = rgb.substring(rgb.indexOf('(') + 1, rgb.indexOf(')')).split(',');

    // 将字符串数组转换为数字数组
    const rgbArray = rgbValues.map(value => parseInt(value.trim(), 10));

    return rgbArray;
}


