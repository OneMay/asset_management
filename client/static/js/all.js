window.onload = function() {
    var box = document.getElementById('box');
    var li = box.getElementsByTagName('li');
    var div = box.getElementsByClassName('show');
    for (var i = 0; i < li.length; i++) { //循环历遍onclick事件
        li[i].index = i; //input[0].index=0 index是自定义属性
        li[i].onclick = function() {
            for (var i = 0; i < li.length; i++) { //循环历遍去掉button样式和把div隐藏
                li[i].className = '';
                div[i].style.display = 'none';
            };
            this.className = 'active'; //当前按钮添加样式
            div[this.index].style.display = 'block'; //div显示 this.index是当前div 即div[0]之类的
        };
    };
};