// 设置axios的基地址
axios.defaults.baseURL = 'http://119.3.52.214:8080';
new Vue({
    el: "#page",
    data: {
        inputValue: "",
        inputList: [],
        choose: 1,
        value: '',
        list: [],
        s: "",
        data: [],
        page: "",
        pagelist: [],
        part: [],
        pagenum: 1,
        isshow: false,
        radio: '全部',
        token: ''
    },
    created: function () {
        if (window.localStorage.getItem('token') != null) {
            this.token = window.localStorage.getItem('token')
            this.userinfo = JSON.parse(window.localStorage.getItem('data'))
        }
        if (window.localStorage.getItem('inputList') != null) {
            this.inputList = JSON.parse(window.localStorage.getItem('inputList'))
        }
        if (window.localStorage.getItem('input') != '' && window.localStorage.getItem('input') !=
            null) {
            this.inputValue = window.localStorage.getItem('input');
            this.choose = window.localStorage.getItem('choose');
            if (window.localStorage.getItem('time') != null) {
                this.value = window.localStorage.getItem('time').split(',')
                window.localStorage.removeItem('time')
            }
            window.localStorage.removeItem('input')
            window.localStorage.removeItem('choose')
            this.search()
        }
    },
    methods: {
        timeformat: function (time) {
            var d = new Date(time);
            var datetime = d.getFullYear() + '-' + (d.getMonth() + 1).toString().padStart(2, '0') +
                '-' + d.getDate().toString().padStart(2, '0');
            return datetime
        },
        remove: function (index) {
            this.list.splice(index, 1);
        },
        clear: function () {
            this.list = [];
        },
        clearall: function () {
            this.inputList = [];
            window.localStorage.removeItem('inputList')
        },
        setInput: function (index) {
            this.inputValue = this.list[index]
            this.list = ''
        },
        sethistory: function (index) {
            this.inputValue = this.inputList[index].content
            this.choose = this.inputList[index].select
            this.value = this.inputList[index].range
            this.search()
        },
        type: function () {
            this.search()
        },
        init: function (i) {
            this.choose = i
            this.list = ''
            this.inputValue = ''
            this.data = []
            this.isshow = false
        },
        suggest: function () {
            if (this.inputValue != '') {
                var words = '/suggest?keyword=' + this.inputValue + '&type='
                if (this.choose == 1) {
                    words += 'news'
                } else if (this.choose == 2) {
                    words += 'rumor'
                } else if (this.choose == 3) {
                    words += 'weibo'
                }
                axios.get(words).then(response => {
                    this.list = response.data
                    for (let i = 0; i < this.list.length; i++) {
                        this.list[i] = this.list[i].replace(
                                /[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?]/g, '')
                            .slice(0, 50)
                    }
                })
            } else {
                this.list = ''
            }
        },
        search: function () {
            var words = ""
            if (this.value != '' && this.value != null) {
                this.s = "&starttime=" + this.timeformat(this.value[0]) + "&endtime=" + this
                    .timeformat(this.value[1])
            }
            if (this.inputValue != '') {
                if (this.choose == 1) {
                    words = '/searchNews?keyword=' + this.inputValue + this.s
                } else if (this.choose == 2) {
                    var type = ""
                    if (this.radio == '假') {
                        type = "&type=0"
                    } else if (this.radio == '疑') {
                        type = "&type=1"
                    } else if (this.radio == '真') {
                        type = "&type=2"
                    }
                    words = '/searchRumor/?keyword=' + this.inputValue + this.s + type
                } else if (this.choose == 3) {
                    words = '/searchComment?keyword=' + this.inputValue + this.s
                }
                axios.get(words).then(response => {
                    this.data = response.data.data
                    if (this.choose == 2) {
                        for (let i = 0; i < this.data.length; i++) {
                            if (this.data[i].result == '真') {
                                this.data[i].src = './assets/img/0.png'
                                console.log(1)
                            } else if (this.data[i].result == '假') {
                                this.data[i].src = './assets/img/1.png'
                            } else {
                                this.data[i].src = './assets/img/2.png'
                            }
                        }
                    }
                    this.page = Math.round(response.data.totalnum / 10)
                    this.pagelist = Array.from({
                        length: this.page
                    }, (item, pagenum) => pagenum + 1)
                    if (this.pagelist.length > 10) {
                        this.part = this.pagelist.slice(0, 10)
                    } else {
                        this.part = this.pagelist
                    }
                    this.isshow = true
                })
                this.list = ''
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                var flag = true
                for (let i = 0; i < this.inputList.length; i++) {
                    if (this.inputList[i].content == this.inputValue) {
                        flag = false
                        break
                    }
                }
                if (flag) {
                    var inputinfo = {}
                    inputinfo.content = this.inputValue
                    inputinfo.select = this.choose
                    inputinfo.range = this.value
                    if (this.inputList.length <= 10) {
                        this.inputList.push(inputinfo)
                    } else {
                        this.inputList.shift()
                        this.inputList.push(inputinfo)
                    }
                    window.localStorage.setItem('inputList', JSON.stringify(this.inputList))
                    console.log(this.inputList, JSON.stringify(this.inputList))
                }
            }
        },
        postnews: function (s) {
            if (this.token != '') {
                let data = {
                    hid: s,
                    h_type: 'news'
                }
                let url = 'http://119.3.52.214:8080/rest/history/?token=' + this.token
                axios.post(url, data).then(
                    response => {
                        console.log(response)
                    })
            }
        },
        postrumor: function (s) {
            if (this.token != '') {
                let data = {
                    hid: s,
                    h_type: 'rumor'
                }
                let url = 'http://119.3.52.214:8080/rest/history/?token=' + this.token
                axios.post(url, data).then(
                    response => {
                        console.log(response)
                    })
            }
        },
        postweibo: function (s) {
            if (this.token != '') {
                let data = {
                    hid: s,
                    h_type: 'weibo'
                }
                let url = 'http://119.3.52.214:8080/rest/history/?token=' + this.token
                axios.post(url, data).then(
                    response => {
                        console.log(response)
                    })
            }
        },
        onlySetData: function (s) {
            var words = ""
            if (this.choose == 1) {
                words = '/searchNews?keyword=' + this.inputValue + '&page=' + this.pagenum + s
            } else if (this.choose == 2) {
                var type = ""
                if (this.radio == '假') {
                    type = "&type=0"
                } else if (this.radio == '疑') {
                    type = "&type=1"
                } else if (this.radio == '真') {
                    type = "&type=2"
                }
                words = '/searchRumor/?keyword=' + this.inputValue + '&page=' + this.pagenum + s +
                    type
            } else if (this.choose == 3) {
                words = '/searchComment?keyword=' + this.inputValue + '&page=' + this.pagenum + s
            }
            axios.get(words).then(response => {
                this.data = response.data.data
                if (this.choose == 2) {
                    for (let i = 0; i < this.data.length; i++) {
                        if (this.data[i].result == '真') {
                            this.data[i].src = './assets/img/0.png'
                            console.log(1)
                        } else if (this.data[i].result == '假') {
                            this.data[i].src = './assets/img/1.png'
                        } else {
                            this.data[i].src = './assets/img/2.png'
                        }
                    }
                }
            })
            this.list = ''
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
        prev() {
            this.pagenum--;
            if ((this.pagenum - 2) > -1 && this.pagenum == this.part[0]) {
                this.part = this.pagelist.slice(this.pagenum - 2, this.pagenum + 8)
            }
            this.onlySetData(this.s)
        },
        next() {
            this.pagenum++;
            if ((this.pagenum + 1) < this.page && this.pagenum == this.part[9]) {
                this.part = this.pagelist.slice(this.pagenum - 9, this.pagenum + 1)
            }
            this.onlySetData(this.s)
        },
        getpagenum(i) {
            this.pagenum = i
            if ((this.pagenum - 2) > -1 && this.pagenum == this.part[0]) {
                this.part = this.pagelist.slice(this.pagenum - 2, this.pagenum + 8)
            } else if ((this.pagenum + 1) < this.page && this.pagenum == this.part[9]) {
                this.part = this.pagelist.slice(this.pagenum - 9, this.pagenum + 1)
            }
            this.onlySetData(this.s)
        }
    }
})