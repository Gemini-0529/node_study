const uname = document.getElementById('uname')
    const pwd = document.getElementById('pwd')
    const login = document.getElementById('login')
    const loginpost = document.getElementById('loginpost')
    login.onclick = ()=>{
      fetch(`/api/login?uname=${uname.value}&pwd=${pwd.value}`)
      .then(res=>res.text())
      .then(res=>{
        alert(res)
      })
    }
    loginpost.onclick = ()=>{
      fetch(`/api/loginpost`, {
        method: 'post',
        body: JSON.stringify({
          uname: uname.value,
          pwd: pwd.value,
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res=>res.text())
      .then(res=>{
        console.log(res);
      })
    }