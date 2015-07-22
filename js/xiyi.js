$(document).ready(function(){

	var animate = function(){
		for(var i=0; i<=7; i++){
			$(".xiadan_btn i").eq(i).delay(200*i).fadeIn();
		}	
	}
	animate();	
	
	//导航下拉框
	$(".more").click(function(){
		$(".more_list").show();
	})
	$(".more_list").click(function(){
		$(this).hide();
	})

	//轮播图
	TouchSlide({ slideCell:"#banner",titCell:".on_list ul", mainCell:".img_list ul", titOnClassName:"active", effect:"leftLoop",delayTime:500, interTime:4000, autoPage:true, autoPlay:true});
    
    //底部导航切换
    $(".iconfont").click(function(){
    	$(this).addClass("nav_on").parent().siblings().find("a").removeClass("nav_on");
    })

    /*订单列表选项卡*/
	$(".state_tab li").click(function(){
		$(this).addClass("tab_on").siblings().removeClass("tab_on");
		$(".state_body>ul").eq($(this).index()).show().siblings().hide();	
    });

	/*服务价格选项卡*/
	$(".xidi_tab li").click(function(){
		$(this).addClass("tab_on").siblings().removeClass("tab_on");
		$(".xidi_list").eq($(this).index()).show().siblings().hide();	
    });

	/*分类选项卡*/
	$(".xidi_left li").click(function(){
		$(this).addClass("xidi_on").siblings().removeClass("xidi_on");
		$(".xidi_right ul").eq($(this).index()).show().siblings().hide();	
    });
	
	/*物流进度条*/  
	var wuliu_state = function(){
		var state = $(".code span").text();
		if(state == "[已完成]"){
			$(".wuliu li").css("border-left",".1rem solid #ff4081");
			$(".wuliu i").css({"background":"#ff4081","border":".08rem solid #ffbad2"});
		}
	}
	wuliu_state();

	/*充值金额*/ 
	$(".num_btn li").click(function(){
		$(this).addClass("num_on").siblings().removeClass("num_on");
		var value = $(".num_on").find("span").text();
		$(".input_rmb input").val(value);
	})
	$(".input_rmb input").click(function(){
		$(".num_btn li").removeClass("num_on");
	})
	$("#chongzhi").click(function(e){
		var money = $(".input_rmb input").val();
		if(!isNaN(money) && money != ""){  //为数字且不为空
			return true;
		}else{
			layer.open({
				content:'充值金额不能为空且必须为数字'
			})
			e.preventDefault();
		}
	})
	
	//发送验证码
	var wait=90;
	$("#code").disabled = false;   
	function time(o) {
        if (wait == 0) {
	            o.removeAttribute("disabled");           
	            o.value="获取验证码";
	            wait = 90;
	            $(".yanzhengma").css({"background":"#ffc107"});
	        } else {
	            o.setAttribute("disabled", true);
	            o.value="重新发送(" + wait + ")";
	            wait--;
	            setTimeout(function() {
	                time(o)
	            },
	            1000)
	            $(".yanzhengma").css("background","#bbb");
	        }
	    }
	$("#code").click(function(){
		var user = $(".yonghu").val();
		if(/^13\d{9}$/g.test(user)||(/^15[8,9]\d{8}$/g.test(user))){
			time(this);
		}else{
			layer.open({
				content:'请输入正确的手机号码'
			})
		}
	});

	//表单为空禁用提交按钮
	var str_val = $(".login input").val(),
	    save_val = $("input#save").val();
	if(str_val == "快速注册"){
		var yanzheng = function(){
			var user = $(".yonghu").val(),
				code = $(".yzcode").val(),
				psw1 = $(".psw1").val(),
				psw2 = $(".psw2").val();
			if(!user || !code || !psw1 || !psw2){
				$(".login input").css("background","#bbb");
				$(".login input").attr("disabled","disabled");
			}else{
				$(".login input").css("background","#2196f3");
				$(".login input").removeAttr("disabled");
			}
		}
		window.setInterval(yanzheng,300); 
	}else if(str_val == "登  录"){
		var yanzheng = function(){
			var user = $(".yonghu").val(),
				psw = $(".psw").val();
			if(!user || !psw){
				$(".login input").css("background","#bbb");
				$(".login input").attr("disabled","disabled");
			}else{
				$(".login input").css("background","#2196f3");
				$(".login input").removeAttr("disabled");
			}
		}
		window.setInterval(yanzheng,300); 
	}else if(str_val == "验证账户"){
		var yanzheng = function(){
			var user = $(".yonghu").val(),
				code = $(".yzcode").val();
			if(!user || !code){
				$(".login input").css("background","#bbb");
				$(".login input").attr("disabled","disabled");
			}else{
				$(".login input").css("background","#2196f3");
				$(".login input").removeAttr("disabled");
			}
		}
		window.setInterval(yanzheng,300); 
	}else if(str_val == "确认密码"){
		var yanzheng = function(){
			var psw_one = $(".psw_one").val(),
	 			psw_two = $(".psw_two").val();
			if(!psw_one || !psw_two){
				$(".login input").css("background","#bbb");
				$(".login input").attr("disabled","disabled");
			}else{
				$(".login input").css("background","#2196f3");
				$(".login input").removeAttr("disabled");
			}
		}
		window.setInterval(yanzheng,300); 
	}else if(save_val == "保  存" || save_val == "保存新地址"){
		var yanzheng = function(){
			var name = $("#name").val(),
				tel = $("#telephone").val();
				addr = $("#address").val();
			if(!name || !tel || !addr){
				$("input#save").css("background","#bbb");
				$("input#save").attr("disabled","disabled");
			}else{
				$("input#save").css("background","#2196f3");
				$("input#save").removeAttr("disabled");
			}
		}
		window.setInterval(yanzheng,300); 
	}

	//注册表单验证
	$("#reg").click(function(e){
		var user = $(".yonghu").val(),
			psw1 = $(".psw1").val(),
			psw2 = $(".psw2").val(),
			bool = $('.ido input').is(":checked"); 
		if(!(/^13\d{9}$/g.test(user)||(/^15[8,9]\d{8}$/g.test(user)))){  //手机号码正则
			layer.open({
				content:'手机号码填写错误'
			})
			e.preventDefault();
		}else if(psw1 != psw2){
			layer.open({
				content:'两次输入的密码不一致'
			})
			e.preventDefault();
		}else if(bool == false){
			layer.open({
				content:'必须同意三九洗涤协议才可以注册'
			})
			e.preventDefault();
		}
	})

	//重置密码表单验证
	$("#reset").click(function(e){
		var psw_one = $(".psw_one").val(),
			psw_two = $(".psw_two").val();
		if(psw_one != psw_two){
			layer.open({
				content:'两次输入的密码不一致'
			})
			e.preventDefault();
		}else{
			layer.open({
				content:'新密码设置成功'
			})
		}
	})

	//收货地址表单验证
	$("#save").click(function(e){
		var tel = $("#telephone").val();
		if(!(/^13\d{9}$/g.test(tel)||(/^15[8,9]\d{8}$/g.test(tel)))){  //手机号码正则
			layer.open({
				content:'手机号码填写错误'
			})
			e.preventDefault();
		}else{
			layer.open({
				content: '是否设置为默认地址？',
				btn: ['确认', '取消'],
				shadeClose: false,
				yes: function(){
					layer.open({content: '已设置为默认地址', time: 1});
					var GoTo = function(){
						location.href="address.html"
					}
					window.setInterval(GoTo,800); 
				}, no: function(){
					layer.close();
					location.href="address.html" 
				}
			});	
			e.preventDefault();
		}
	})
	$(".del_btn").click(function(e){
		layer.open({
			content: '是否删除该地址？删除后将无法恢复！',
			btn: ['删除', '取消'],
			shadeClose: false,
			yes: function(){
				layer.open({content: '已删除', time: 1});
				var GoTo = function(){
					location.href="address.html"
				}
				window.setInterval(GoTo,800); 
			}, no: function(){
				layer.close();
			}
		});	
		e.preventDefault();
	})

	//物流图片
	$(".yifu_img img").click(function(){
		var img = $(this).attr("src");
		layer.open({
			type: 1,
			content: '<img src="' + img + '"></a>',
			style: 'width:100%; height:auto; border:none; text-align:center; background:rgba(0,0,0,0);box-shadow:none;',
			success: function(){
				$(".layermcont").click(function(){
					layer.closeAll();
				})
			}
		});   
	})

	//获取当天日期
	var Today = function(){

		var now = new Date();
       
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
       
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
       
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
       
        clock += month + "-";
       
        if(day < 10)
            clock += "0";
        clock += day;

        /*  
        clock += day + " ";
         
        if(hh < 10)
            clock += "0";
           
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm; 
        return(clock); */

        $("#date").val(clock);
	}
	Today();
	 

	//Root em
	function rootEm() {
		var cw = $(window).width();
		cw = cw / 16;
		//计算倍数，数值可变。
		if (cw < 20) { cw = 20 } //最小宽度
		if (cw > 40) { cw = 40 } //最大宽度
		$("html").css({fontSize:cw + 'px'});
	};
	rootEm();
	$(window).resize(function () { rootEm(); });
})