// 放大镜
window.addEventListener('load', function(e) {
    let preview_img = document.querySelector('.preview_img')
    let mask = document.querySelector('.mask')
    let bigmask = document.querySelector('.bigmask')
    let bigImg = document.querySelector('.bigImg')
    preview_img.addEventListener('mouseover', function(e) {
        mask.style.display = "block";
        bigmask.style.display = "block";
    })
    preview_img.addEventListener('mouseout', function(e) {
        mask.style.display = "none";
        bigmask.style.display = "none";
    })
    preview_img.addEventListener('mousemove', function(e) {
        // 计算鼠标在盒子内的坐标
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;
        // 减去盒子宽高的一半就是盒子最终的坐标
        let maskX = x - mask.offsetWidth / 2;
        let maskY = y - mask.offsetHeight / 2;
        // 不能超出大框的范围
        let maskMaxX = preview_img.offsetWidth - mask.offsetWidth;
        let maskMaxY = preview_img.offsetHeight - mask.offsetHeight;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMaxX) {
            maskX = maskMaxX;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMaxY) {
            maskY = maskMaxY
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 大图移动的距离 = mask移动端距离*大图片最大移动距离 / 遮挡层的最大移动距离
        // 大图最大移动距离
        let bigMax = bigImg.offsetWidth - bigmask.offsetWidth;
        bigImg.style.left = -(maskX * bigMax / maskMaxX) + 'px';
        bigImg.style.top = -(maskY * bigMax / maskMaxY) + 'px';
    })
});

// tab change
let detail_tab_list = document.querySelector('.detail_tab_list')
let detail_tab_con = document.querySelector('.detail_tab_con')
let lists = detail_tab_list.querySelectorAll('li')
let items = detail_tab_con.querySelectorAll('.item')

for (let i = 0; i < lists.length; i++) {
    lists[i].setAttribute('index', i);
    lists[i].onclick = function() {
        for (let j = 0; j < lists.length; j++) {
            lists[j].className = '';
            items[j].style.display = 'none';
        }
        let index = lists[i].getAttribute('index');
        this.className = 'current';
        items[index].style.display = 'block';
    }
}