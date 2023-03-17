window.onload = function () {
    // 防抖
    function debounce(fn, delay) {
        let timer = null;
        return function (...arg) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(() => {

                fn.call(this, ...arg);
                clearTimeout(timer);
                timer = null;
            }, delay);
        }
    };

    // 获取所有的 input 监听 input 事件
    const button = document.getElementById('submit');
    let inputs = document.querySelectorAll('input');
    inputs.forEach(item => {
        item.addEventListener('input', debounce(checkInputs, 200));
    });

    function checkInputs() {
        switch (this.id) {
            case 'userName':
                checkRequired.call(this, '用户名');
                break;
            case 'pass':
                checkPass.call(this);
                break;
            case 'pass1':
                checkPass.call(this);
                break;
            case 'qq':
                checkQq.call(this);
                break;
            case 'phone':
                checkPhone.call(this);
                break;
            default:
                break;
        }
        // 判断按钮是否可以高亮 
        if (isDisabled()) {
            button['disabled'] = false;
        } else {
            button['disabled'] = true;
        }
    };

    // 验证必须项
    function checkRequired(label) {
        if (!this.value.trim()) {
            setErrorMsg(this, `${label}不能为空`);
            return false;
        } else {
            setSuccessMsg(this);
            return true;
        }
    };

    // 验证密码
    function checkPass() {
        let pass = document.getElementById('pass');
        let pass1 = document.getElementById('pass1');
        let passVal1 = pass.value.trim();
        let passVal2 = pass1.value.trim();
        checkRequired.call(pass, '密码');
        checkRequired.call(pass1, '确认密码');
        if (passVal1 && passVal2 && passVal1 != passVal2) {
            setErrorMsg(this, `密码不一致`);
            return false;
        }
    };

    // 验证 qq
    function checkQq() {
        let str = this.value;
        var reg = /^[1-9][0-9]{4,9}$/gim;
        if (!!str) {
            if (reg.test(str)) {
                setSuccessMsg(this);
            } else {
                setErrorMsg(this, '请输入正确格式的qq');
                return false;
            }
        }
    };

    // 验证手机号
    function checkPhone() {
        let str = this.value;
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
        if (!!str) {
            if (reg.test(str)) {
                setSuccessMsg(this);
            } else {
                setErrorMsg(this, '请输入正确格式的手机号码');
                return false;
            }
        }
    };

    // 设置错误信息
    function setErrorMsg(input, msg) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        small.textContent = msg;
        formControl.classList.remove('success');
        formControl.classList.add('error');
    };

    // 设置正确信息
    function setSuccessMsg(input) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        small.textContent = '';
        formControl.classList.remove('error');
        formControl.classList.add('success');
    };

    // 表单提交
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitClick();
    });

    // 是否高亮提交按钮
    function isDisabled() {
        // 检查所有的必填项
        const inputDom = [...document.querySelectorAll('input[required]')];
        // 所有的错误信息
        const errorDom = [...document.querySelectorAll('small')];
        let count = 0;
        for (let i = 0, l = inputDom.length; i < l; i++) {
            const input = inputDom[i];
            if (!input.value) {
                return false;
            } else {
                count++;
            }
        };

        let isError = errorDom.findIndex(item => {
            return item.innerText != '';
        });

        if (inputDom.length === count && isError == -1) {
            return true;
        };
    };

    // 提交成功后清空所有 input 的值
    function clearInputValues() {
        const inputs = [...document.querySelectorAll('input')];
        inputs.forEach((input) => {
            input.value = ''
        });
    };

    function submitClick() {
        // 检查所有项
        const inputDom = [...document.querySelectorAll('input')];
        for (let i = 0, l = inputDom.length; i < l; i++) {
            const input = inputDom[i];
            checkInputs.call(input);
        }
        // 防止用户重复提提交
        submit.removeEventListener('click', submitClick);

        // 获取输入的信息
        let result = {};
        const inputs = [...document.querySelectorAll('input')];
        inputs.reduce((pre, input) => {
            pre[input.id] = input.value || '';
            return pre;
        }, result);

        // 触发请求地址
        action(result);
    };

    function action(data) {
        let xhr = new XMLHttpRequest();
        let url = 'url';
        xhr.open(url, 'POST');
        xhr.onreadystatechange = function (data) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let res = xhr.responseText;
                if (res.success) {
                    clearInputValues();
                    alert('信息修改成功');
                }
            }
        }
        xhr.send(data);
    }
}


let str = ""
let word = 'abcdefghigklmnopqrstuvwxyz0123456789'
for (let i = 0; i < 17; i++) {
    let randNum = Math.floor(Math.random() * word.length)
    str += word[randNum]
}
console.log('str', str);