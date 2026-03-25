let heart = document.querySelector('.heart')
let card = document.querySelector('.card')
let box = document.querySelector('#box')

// === 图片插入配置表 ===
// 顺序很重要：对应文章中出现的第1个、第2个、第3个波浪号(~)
/*const imgList = [
    // 回忆1：单张图模式 (type: 'single')
    { 
        type: 'single', 
        src: '../"相应文件夹"/"相应照片".png',
    },

        type: 'double', 
        src1: '../"相应文件夹"/"相应照片".png', 
        src2: '../"相应文件夹"/"相应照片".png' 
    },
 
    // ...以此类推，你想插多少次就在这里加多少个对象
];*/

// 定义一个计数器，记录当前用到第几组图片了
let imgIndex = 0;



heart.addEventListener('click', function () {
    // 1. 音乐切换逻辑
    let birthdayMusic = document.getElementById("bgm");
    if (birthdayMusic) {
        birthdayMusic.pause();
        birthdayMusic.remove();
    }

    let letterMusic = document.createElement("audio");
    letterMusic.setAttribute("src", "../music/月球下的人.mp3");
    letterMusic.setAttribute("autoplay", "autoplay");
    letterMusic.setAttribute("loop", "loop");
    // 【修改点 1】给新音乐添加一个固定ID，方便后面获取播放进度
    letterMusic.id = "letter-bgm"; 
    document.body.appendChild(letterMusic);

    // 2. 翻盖动画
    card.classList.add('open');

    // 3. 延时等待跳转
    setTimeout(() => {
        card.style.opacity = '0';
        box.style.zIndex = '50';
        box.style.opacity = '1'; 

        // --- 打字机逻辑 ---
        let i = 0
        let str = '慧雅子生日快乐呀！：<'+
        '又陪你走过一岁，真的觉得很幸运，能成为你的朋友。！<'+
        '认识你这么久，我们之间有过争吵变扭，但是我们也会和好，我始终相信相互吸引的两个人是永远不会走散的。<'+
        '我总是说我们俩真的很像，但是并不是的，你比我多一些坚强 勇敢 温柔又明亮，像名字一样，聪慧雅致，自带让人安心的力量，<'+
        '所以我总是愿意跟你分享不管是开心的也好 难过的也好 我都愿意跟你分享，你也总是能够接收我的情绪，及时安慰和帮助我，所以我总是很庆幸有你这样的朋友，难过时你会耐心听我倾诉，开心时你比我还雀跃，那些一起分享的日常、偷偷说的悄悄话、并肩走过的时光，都是我心里最珍贵的回忆。<'+
        '以后希望我们还像现在这样 一直这样不管是开心的也好 还是难过的也好 都跟我分享，我们就这样相互长大。<'+
        '新的一岁，愿你被世界温柔以待，想要的都拥有，得不到的都释怀，永远自在、快乐、闪闪发光。不用成为多厉害的人，只要做最舒服、最开心的慧雅子就好。<'+
        '生日快乐，我滴宝，爱你哟<'+
        '^2026年3月27日<'+
        '^杨女士';
        //let strp = '<p>'
        let strp = '<p style="text-indent: 0;">'

        function print() {
            if (str[i] == '<') {
                // 遇到 < 符号：结束当前段落，开始新段落
                document.getElementById("box").innerHTML = strp + "</p><p>" + (i < str.length - 1 ? '|' : ''); 
                strp += "</p><p>";
            } 
            else if (str[i] == '^') {
                // 【新增逻辑】遇到 ^ 符号：结束当前段，开始一个“右对齐”的段落
                // 这里的 class="right-align" 对应我们在 CSS 里加的样式
                let rightHtml = '</p><p class="right-align">';
                document.getElementById("box").innerHTML = strp + rightHtml + (i < str.length - 1 ? '|' : '');
                strp += rightHtml;
            }

            // ================== 【修改重点】通用图片插入逻辑 ==================
            else if (str[i] == '~') {
                // 1. 获取当前应该显示的图片配置
                let currentConfig = imgList[imgIndex]; 
                
                let imgHtml = '';
                
                // 2. 判断是否存在配置（防止忘记写配置导致报错）
                if (currentConfig) {
                    if (currentConfig.type === 'single') {
                        // --- 单图模式 ---
                        imgHtml = `</p><div class="inserted-img-box">
                                    <img src="${currentConfig.src}" class="inserted-img">
                                   </div><p>`;
                    } else if (currentConfig.type === 'double') {
                        // --- 双图模式 ---
                        imgHtml = `</p><div class="double-img-box">
                                    <img src="${currentConfig.src1}" class="double-img-item">
                                    <img src="${currentConfig.src2}" class="double-img-item">
                                   </div><p>`;
                    }
                    // 计数器加1，下次遇到 ~ 就用数组里的下一个配置
                    imgIndex++;
                }

                document.getElementById("box").innerHTML = strp + imgHtml + (i < str.length - 1 ? '|' : '');
                strp += imgHtml;
            }
            // ================== 【修改结束】 ==================

            else {
                // 普通文字
                strp += str[i];
                // 注意：这里需要补全标签闭合来防止样式错乱，但在打字过程中浏览器通常能自动容错
                // 为了光标位置正确，我们把光标放在 p 标签内容里面
                document.getElementById("box").innerHTML = strp + (i < str.length - 1 ? '|' : '');
            }
            i++;
        }

        setTimeout(() => {
            let printid = setInterval(() => {
                print();
                if (i == str.length) {
                    clearInterval(printid);
                    // 打字结束，显示按钮
                    showBonusButton();
                }
            }, 80);// 打字速度 
        }, 1500); 

    }, 2200); 
})

// --- 优化后的按钮显示函数 ---
function showBonusButton() {
    let btnContainer = document.createElement("div");
    btnContainer.style.marginTop = "70px"; 
    btnContainer.style.textAlign = "center";
    btnContainer.style.width = "100%";
    btnContainer.style.opacity = "0";
    btnContainer.style.transition = "opacity 2s"; 
    btnContainer.style.flexShrink = "0"; 

    let btn = document.createElement("a");
    // 【修改点 2】去掉 href 属性，改用 JS 点击事件处理跳转
    // btn.href = "贺卡.html"; 
    btn.href = "javascript:void(0);"; // 防止点击后页面跳动
    
    btn.innerText = "✨ 开启下一篇章 ✨"; 
    
    // === 按钮点击事件：获取时间并跳转 ===
    btn.addEventListener('click', function() {
        // 1. 获取正在播放的音乐元素
        let music = document.getElementById("letter-bgm");
        let currentTime = 0;
        
        // 2. 如果音乐存在，获取当前播放的秒数
        if (music) {
            currentTime = music.currentTime;
        }
        
        // 3. 带着时间参数跳转到贺卡页面
        // 贺卡页面会自动读取 ?audioTime=xxx 并从这个位置开始播放
        window.location.href = "贺卡.html?audioTime=" + currentTime;
    });

    // === 样式区域 (保持你之前满意的样式) ===
    btn.style.display = "inline-block";
    btn.style.padding = "12px 45px"; 
    btn.style.fontSize = "24px"; 
    btn.style.fontWeight = "normal"; 
    btn.style.color = "#fff";
    btn.style.background = "rgba(160, 60, 92, 0.9)"; 
    btn.style.borderRadius = "50px";
    btn.style.textDecoration = "none";
    btn.style.fontFamily = "'HanYiShangWei', cursive";
    btn.style.boxShadow = "0 5px 15px rgba(160, 60, 92, 0.4)";
    btn.style.backdropFilter = "blur(5px)";
    btn.style.border = "1px solid rgba(255,255,255,0.7)"; 
    
    btn.onmouseover = function() { 
        this.style.background = "rgba(180, 70, 105, 1)"; 
        this.style.transform = "scale(1.03) translateY(-2px)";
        this.style.boxShadow = "0 8px 20px rgba(160, 60, 92, 0.6)";
    };
    btn.onmouseout = function() { 
        this.style.background = "rgba(160, 60, 92, 0.9)"; 
        this.style.transform = "scale(1)";
        this.style.boxShadow = "0 5px 15px rgba(160, 60, 92, 0.4)";
    };
    btn.style.transition = "all 0.3s ease-in-out";
    btn.style.letterSpacing = "2px"; 

    btnContainer.appendChild(btn);
    box.appendChild(btnContainer);
    
    box.scrollTo({
        top: box.scrollHeight,
        behavior: 'smooth'
    });

    setTimeout(() => {
        btnContainer.style.opacity = "1";
    }, 100);
}