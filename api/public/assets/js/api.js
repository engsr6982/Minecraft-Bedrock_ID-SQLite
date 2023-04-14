//访问量
function view(num){
    $.ajax({
            type: "GET",
            url: `https://api.25565.top/api/view?id=${num}`,//请求API
            dataType: 'json',
            success:function(res){
            console.log(res)
            if(res.code==200){
                $(".view").html(res.data[0].view);
                $(".web_api").html(res.data[0].web_api);
                $(".serach-api").html(res.data[0].serach_api);
            }
            else{
                $(".view").html('请求失败');
                $(".web_api").html('请求失败');
                $(".serach-api").html('请求失败');
                }
            }
        })
}
view(1)
window.setInterval(function(){view(0)},60000)//循环请求
//注意！请在网站任意位置引用jQuery
//  <script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script><!--百度jQuery-->
