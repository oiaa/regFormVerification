var namerule = document.querySelector('.namerule');
var namerulelink = document.querySelector('.namerulelink');
var input = document.querySelectorAll('input');
var span = document.querySelectorAll('.hint');
var piece = document.querySelectorAll('.piece')
var pieceTip = document.querySelector('.piecetip')
var next = document.querySelector('.next')


//弹出姓名填写规则
namerulelink.onmouseover = function() {
    namerule.style.display = 'block';
}
namerulelink.onmouseout = function() {
    namerule.style.display = 'none';
}

//正则
var reg = {
    0: /^[a-zA-Z0-9]{6,15}$/, //用户名
    1: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/, //密码
    2: null,
    3: /[\u4e00-\u9fa5]{2,}/, //中文姓名
    4: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/, //身份证号
    5: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, // 邮箱
    6: /^1[3|4|5|7|8][0-9]{9}$/ //手机号
}

//提示
var hint = {
    0: '用户名是6-20位字母、数字或“_”,字母开头',
    1: '密码6-20位，包括数字字母或符号，中间不能有空格',
    2: '两次输入密码不一致',
    3: '两位到四位的中文汉字',
    4: '5位或者18位的数字',
    5: '邮箱格式不正确',
    6: '手机号格式不正确'
}

//循环绑定正则验证事件
for (var i = 0 ; i < 7 ; i++) {
    (function(i){       
        input[i].oninput = function(e){
            if(i != 2) {
                if (reg[i].test(this.value)) {
                    span[i].innerHTML = 'OK';
                    span[i].style.color = '#a3a380';
                    checkall[i] = 1;
                } else {
                    span[i].innerHTML = hint[i];
                    span[i].style.color = 'red';
                    checkall[i] = 0;
                }
            } 
            if (i == 2) {
                if (this.value == input[i-1].value && this.value != '') {
                    span[i].innerHTML = 'OK';
                    span[i].style.color = '#a3a380';
                    checkall[i] = 1;
                } else {
                    span[i].innerHTML = hint[i];
                    span[i].style.color = 'red';
                    checkall[i] = 0;
                }
            }
        }
    })(i)
}

//重新绑定登录密码事件

input[1].oninput = function() {
    if (/^[1-9]{6,20}$/.test(this.value)||/^[a-zA-Z]{6,20}$/.test(this.value)||/^\W{6,20}$/.test(this.value)) {
        piece[0].style.background = 'red';
        pieceTip.innerHTML = '';
        checkall[1] = 1;
    } else {
        pieceTip.innerHTML = hint[1];
    }
    
    if (/^[1-9|a-z]{6,20}$/.test(this.value)||/^[\W|a-z]{6,20}$/.test(this.value)||/^[\W|1-9]{6,20}$/.test(this.value)) {
        piece[1].style.background = 'orange';
        pieceTip.innerHTML = '';
        checkall[1] = 1;
    } else {
        piece[1].style.background = '#ddd';
        pieceTip.innerHTML = hint[1];
    }

    if (/\W[0-9a-zA-Z]*/.test(this.value)) {
        piece[2].style.background = 'green';
        pieceTip.innerHTML = '';
        checkall[1] = 1;
    } else {
        piece[2].style.background = '#ddd';
        pieceTip.innerHTML = hint[1];
    }
}

//按钮
var checkall = [0,0,0,0,0,0,0,0];
function check() {
    for(var p in checkall) {
        if (checkall[p] == 0) {
            alert('不正确');
            return 0;
        }
    }
    alert("正确！！！！");
    return 0;
}



next.onclick = function () {
    if(input[7].checked) {
        checkall[7] = 1;
    }
    check();
}