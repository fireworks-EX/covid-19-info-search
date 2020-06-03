var login = new Vue({
    el: "#login",
    data: {
        username: '',
        password: ''
    },
    methods: {
        check: function () {
            if (this.username == '') {
                this.$message.error('用户名不能为空');
            } else if (this.password == '') {
                this.$message.error('密码不能为空');
            } else {
                let data = {
                    name: this.username,
                    password: this.password
                }
                axios.post('http://119.3.52.214:8080/rest/users/?action=login', data).then(
                    response => {
                        window.localStorage.setItem('data', JSON.stringify(data))
                        window.localStorage.setItem('token', response.data.token)
                        window.location.href = './index.html'
                    })
            }
        },
        back: function () {
            window.location.href = './index.html'
        }
    }
})

var reg = new Vue({
    el: "#reg",
    data: {
        username: '',
        password: '',
        password2: ''
    },
    methods: {
        check: function () {
            if (this.username == '') {
                this.$message.error('用户名不能为空');
            } else if (this.password == '' || this.password2 == '') {
                this.$message.error('密码不能为空');
            } else if (this.password != this.password2) {
                this.$message.error('两次输入密码不一致');
            } else {
                let data = {
                    name: this.username,
                    password: this.password
                }
                axios.post('http://119.3.52.214:8080/rest/users/?action=register', data).then(
                    response => {
                        if (response.status != 201) {
                            this.$message.error('该用户名已被注册');
                        } else {
                            axios.post('http://119.3.52.214:8080/rest/users/?action=login', data)
                                .then(
                                    responses => {
                                        window.localStorage.setItem('data', JSON.stringify(data))
                                        window.localStorage.setItem('token', response.data.token)
                                        window.location.href = './index.html'
                                    })
                        }
                    })
            }
        },
        back: function () {
            window.location.href = './index.html'
        }
    }
})

var userpage = new Vue({
    el: "#userpage",
    data: {
        token: '',
        userinfo: '',
        historyList: [],
        recommendList: [],
        choose: 3
    },
    created: function () {
        this.token = window.localStorage.getItem('token')
        this.userinfo = JSON.parse(window.localStorage.getItem('data'))
        this.choose = 3
    },
    methods: {
        history: function () {
            this.choose = 1
            let words = 'http://119.3.52.214:8080/rest/history/?token=' + this.token
            axios.get(words).then(response => {
                this.historyList = response.data
            })
        },
        recommendation: function () {
            this.choose = 2
            let words = 'http://119.3.52.214:8080/rest/recommendNews/?token=' + this.token
            axios.get(words).then(response => {
                this.recommendList = response.data
            })
        },
        myinfo: function () {
            this.choose = 3
        },
        quit: function () {
            this.choose = 0
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('data')
            window.location.href = './login.html'
        },
    }
})