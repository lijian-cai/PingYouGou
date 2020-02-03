function clearCurrent(imgNums, circles, _this) {
    for (let i = 0; i < imgNums; i++) {
        circles.children[i].className = '';
    }
    _this.className = 'current'
}

window.addEventListener('load', function() {
    let focus = document.querySelector('.focus')
    let arrow_l = document.querySelector('.arrow-l')
    let arrow_r = document.querySelector('.arrow-r')
    arrow_l.style.display = 'none';
    arrow_r.style.display = 'none';
    let timer = setInterval(function() {
        // 手动调用定时器
        arrow_r.click()
    }, 2000)
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer)
        timer = null
    })
    focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
            timer = setInterval(function() {
                arrow_r.click()
            }, 2000)
        })
        // 通过图片生成小圆圈
    let ful = focus.querySelector('ul')
    let circles = focus.querySelector('.circles')
    let imgNums = ful.children.length
    let num = 0;
    let circleNum = 0
    for (let i = 0; i < imgNums; i++) {
        let li = document.createElement('li')
        circles.appendChild(li)
        li.setAttribute('index', i)
        li.addEventListener('click', function() {
            clearCurrent(imgNums, circles, this)
            let index = this.getAttribute('index')
            num = index
            circleNum = index
                // ul的移动距离 = 小圆圈索引*图片的宽度, 注意是负值, 因为是往左移动
            animation(ful, -index * focus.offsetWidth, .01)
        })
    }
    circles.children[0].className = 'current'
    let firstImgClone = ful.children[0].cloneNode(true)
    ful.appendChild(firstImgClone)
    arrow_r.addEventListener('click', function() {
        circleNum++
        if (circleNum == imgNums) circleNum = 0;
        if (num == imgNums) {
            // 无缝滚动
            ful.style.left = 0;
            num = 0;
        }
        num++;
        animation(ful, -num * focus.offsetWidth, .01)
        clearCurrent(imgNums, circles, circles.children[circleNum])

    })
    arrow_l.addEventListener('click', function() {
        if (circleNum == 0) circleNum = imgNums;
        circleNum--
        if (num == 0) {
            // 无缝滚动
            ful.style.left = -imgNums * focus.offsetWidth;
            num = imgNums;
        }
        num--;
        animation(ful, -num * focus.offsetWidth, .01)
        clearCurrent(imgNums, circles, circles.children[circleNum])

    })
});