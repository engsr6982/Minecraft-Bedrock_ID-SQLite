// 获取搜索框
let searchInput = document.getElementById('search-input');
// 获取结果列表
let resultList = document.getElementById('result-list');
// 监听搜索框输入
searchInput.addEventListener('input', function () {
    // 清空结果列表
    resultList.innerHTML = '';
    let searchValue = this.value;
    let tk = "MgwMZszHfMhQ2s0YX9fQtKfh3b3qAqrvjKwz8ZxFhk1Cb"
    //GET请求
    $.ajax({
        type: "GET",
        url: `https://api.25565.top/api/web?name=${searchValue}&token=${tk}`,//请求API
        dataType: 'json',
        success: function (res) {
            if (res.code == 200) {
                for (let item of res.data) {
                    let li = document.createElement('li');
                    li.innerHTML = `<h2>名    称：${item.name}</h2><br /><h2>英文ID：${item.id}</h2><br /><h2>特殊值：${item.dv}</h2><br /><h2>归属类：${item.type}</h2><br /><h2>图路径：${item.path}</h2><br /><h2>预览图：</h2><img src="${item.img}" alt="${item.name}"/><br /><br /><div class="hh"></div>`;
                    resultList.appendChild(li);
                }
            }
        }
    })
})