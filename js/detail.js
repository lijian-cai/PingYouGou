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