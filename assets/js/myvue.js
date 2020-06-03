Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((
            "00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
// 实例化vue
var user = new Vue({
    el: "#user",
    data: {
        token: '',
        userinfo: ''
    },
    created: function () {
        if (window.localStorage.getItem('token') != null) {
            this.token = window.localStorage.getItem('token')
            this.userinfo = JSON.parse(window.localStorage.getItem('data'))
        }
    },
    methods: {
    }
})
var app = new Vue({
    el: "#todoapp",
    data: {
        list: [],
        inputValue: "",
        choose: 1,
        value: ''
    },
    methods: {
        remove: function (index) {
            this.list.splice(index, 1);
        },
        clear: function () {
            this.list = [];
        },
        setInput: function (index) {
            this.inputValue = this.list[index]
            this.list = ''
        },
        News: function () {
            this.choose = 1
            this.list = ''
            this.inputValue = ''
        },
        Rumor: function () {
            this.choose = 2
            this.list = ''
            this.inputValue = ''
        },
        Comment: function () {
            this.choose = 3
            this.list = ''
            this.inputValue = ''
        },
        suggest: function () {
            if (this.inputValue != '') {
                var words = 'http://119.3.52.214:8080/suggest?keyword=' + this.inputValue + '&type='
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
                        this.list[i] = this.list[i].replace(/[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?]/g, '')
                            .slice(0, 50)
                    }
                })
            } else {
                this.list = ''
            }
        },
        search: function () {
            if (this.value != '') {
                window.localStorage.setItem('time', this.value)
                this.value = ''
            }
            window.localStorage.setItem('choose', this.choose);
            window.localStorage.setItem('input', this.inputValue);
            this.inputValue = '';
            window.location.href = './result.html';
        },
    }
})
var news = new Vue({
    el: "#news",
    data: {
        newsList: [],
    },
    created: function () {
        this.setNewsList()
    },
    methods: {
        setNewsList: function () {
            axios.get('http://119.3.52.214:8080/realTimeData/').then(
                response => {
                    this.newsList = response.data.news
                })
        },
    }
})
var tables = new Vue({
    el: "#tables",
    data: {
        choose: 0,
        tableData: [],
        cityData: '',
        selectList: [
            "安徽省",
            "澳门",
            "北京市",
            "重庆市",
            "福建省",
            "甘肃省",
            "广东省",
            "广西壮族自治区",
            "贵州省",
            "海南省",
            "河北省",
            "河南省",
            "黑龙江省",
            "湖北省",
            "湖南省",
            "吉林省",
            "江苏省",
            "江西省",
            "辽宁省",
            "内蒙古自治区",
            "宁夏回族自治区",
            "青海省",
            "山东省",
            "山西省",
            "陕西省",
            "上海市",
            "四川省",
            "台湾",
            "天津市",
            "西藏自治区",
            "香港",
            "新疆维吾尔自治区",
            "云南省",
            "浙江省",
            "中国"
        ],
        world: '',
        chinacity: ''
    },
    created: function () {
        this.world = [{
                "continentName": "非洲",
                "countryName": "尼日利亚",
                "provinceName": "尼日利亚",
                "cityName": "尼日利亚",
                "confirmedCount": "6175",
                "suspectedCount": "0",
                "curedCount": "1644",
                "deadCount": "191",
                "currentConfirmedCount": "4340",
                "updateTime": "2020/5/19 8:58"
            },
            {
                "continentName": "欧洲",
                "countryName": "摩尔多瓦",
                "provinceName": "摩尔多瓦",
                "cityName": "摩尔多瓦",
                "confirmedCount": "6060",
                "suspectedCount": "0",
                "curedCount": "2408",
                "deadCount": "211",
                "currentConfirmedCount": "3441",
                "updateTime": "2020/5/19 8:58"
            },
            {
                "continentName": "亚洲",
                "countryName": "中国",
                "provinceName": "中国",
                "cityName": "中国",
                "confirmedCount": "84503",
                "suspectedCount": "0",
                "curedCount": "79708",
                "deadCount": "4645",
                "currentConfirmedCount": "150",
                "updateTime": "2020/5/19 8:49"
            },
            {
                "continentName": "欧洲",
                "countryName": "北马其顿",
                "provinceName": "北马其顿",
                "cityName": "北马其顿",
                "confirmedCount": "1817",
                "suspectedCount": "0",
                "curedCount": "1301",
                "deadCount": "104",
                "currentConfirmedCount": "412",
                "updateTime": "2020/5/19 8:08"
            },
            {
                "continentName": "欧洲",
                "countryName": "冰岛",
                "provinceName": "冰岛",
                "cityName": "冰岛",
                "confirmedCount": "1802",
                "suspectedCount": "0",
                "curedCount": "1755",
                "deadCount": "10",
                "currentConfirmedCount": "37",
                "updateTime": "2020/5/19 8:08"
            },
            {
                "continentName": "欧洲",
                "countryName": "俄罗斯",
                "provinceName": "俄罗斯",
                "cityName": "俄罗斯",
                "confirmedCount": "290678",
                "suspectedCount": "0",
                "curedCount": "70209",
                "deadCount": "2722",
                "currentConfirmedCount": "217747",
                "updateTime": "2020/5/19 8:07"
            },
            {
                "continentName": "亚洲",
                "countryName": "孟加拉国",
                "provinceName": "孟加拉国",
                "cityName": "孟加拉国",
                "confirmedCount": "23870",
                "suspectedCount": "0",
                "curedCount": "4585",
                "deadCount": "349",
                "currentConfirmedCount": "18936",
                "updateTime": "2020/5/19 8:07"
            },
            {
                "continentName": "亚洲",
                "countryName": "阿联酋",
                "provinceName": "阿联酋",
                "cityName": "阿联酋",
                "confirmedCount": "24190",
                "suspectedCount": "0",
                "curedCount": "9577",
                "deadCount": "224",
                "currentConfirmedCount": "14389",
                "updateTime": "2020/5/19 8:07"
            },
            {
                "continentName": "欧洲",
                "countryName": "罗马尼亚",
                "provinceName": "罗马尼亚",
                "cityName": "罗马尼亚",
                "confirmedCount": "17036",
                "suspectedCount": "0",
                "curedCount": "9930",
                "deadCount": "1107",
                "currentConfirmedCount": "5999",
                "updateTime": "2020/5/19 8:07"
            },
            {
                "continentName": "非洲",
                "countryName": "赞比亚共和国",
                "provinceName": "赞比亚共和国",
                "cityName": "赞比亚共和国",
                "confirmedCount": "753",
                "suspectedCount": "0",
                "curedCount": "188",
                "deadCount": "7",
                "currentConfirmedCount": "558",
                "updateTime": "2020/5/19 8:07"
            },
            {
                "continentName": "非洲",
                "countryName": "中非共和国",
                "provinceName": "中非共和国",
                "cityName": "中非共和国",
                "confirmedCount": "366",
                "suspectedCount": "0",
                "curedCount": "18",
                "deadCount": "0",
                "currentConfirmedCount": "348",
                "updateTime": "2020/5/19 8:07"
            },
            {
                "continentName": "北美洲",
                "countryName": "海地",
                "provinceName": "海地",
                "cityName": "海地",
                "confirmedCount": "358",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "20",
                "currentConfirmedCount": "338",
                "updateTime": "2020/5/19 8:07"
            },
            {
                "continentName": "亚洲",
                "countryName": "尼泊尔",
                "provinceName": "尼泊尔",
                "cityName": "尼泊尔",
                "confirmedCount": "357",
                "suspectedCount": "0",
                "curedCount": "36",
                "deadCount": "2",
                "currentConfirmedCount": "319",
                "updateTime": "2020/5/19 8:07"
            },
            {
                "continentName": "欧洲",
                "countryName": "马恩岛",
                "provinceName": "马恩岛",
                "cityName": "马恩岛",
                "confirmedCount": "335",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "24",
                "currentConfirmedCount": "311",
                "updateTime": "2020/5/19 8:07"
            },
            {
                "continentName": "非洲",
                "countryName": "佛得角",
                "provinceName": "佛得角",
                "cityName": "佛得角",
                "confirmedCount": "328",
                "suspectedCount": "0",
                "curedCount": "44",
                "deadCount": "3",
                "currentConfirmedCount": "281",
                "updateTime": "2020/5/19 8:07"
            },
            {
                "continentName": "非洲",
                "countryName": "贝宁",
                "provinceName": "贝宁",
                "cityName": "贝宁",
                "confirmedCount": "339",
                "suspectedCount": "0",
                "curedCount": "62",
                "deadCount": "2",
                "currentConfirmedCount": "275",
                "updateTime": "2020/5/19 8:07"
            },
            {
                "continentName": "非洲",
                "countryName": "毛里求斯",
                "provinceName": "毛里求斯",
                "cityName": "毛里求斯",
                "confirmedCount": "332",
                "suspectedCount": "0",
                "curedCount": "322",
                "deadCount": "10",
                "currentConfirmedCount": "0",
                "updateTime": "2020/5/19 8:07"
            },
            {
                "continentName": "欧洲",
                "countryName": "英国",
                "provinceName": "英国",
                "cityName": "英国",
                "confirmedCount": "246406",
                "suspectedCount": "0",
                "curedCount": "539",
                "deadCount": "34796",
                "currentConfirmedCount": "211071",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "南美洲",
                "countryName": "巴西",
                "provinceName": "巴西",
                "cityName": "巴西",
                "confirmedCount": "255200",
                "suspectedCount": "0",
                "curedCount": "100459",
                "deadCount": "16839",
                "currentConfirmedCount": "137902",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "南美洲",
                "countryName": "秘鲁",
                "provinceName": "秘鲁",
                "cityName": "秘鲁",
                "confirmedCount": "94933",
                "suspectedCount": "0",
                "curedCount": "30306",
                "deadCount": "2789",
                "currentConfirmedCount": "61838",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "亚洲",
                "countryName": "土耳其",
                "provinceName": "土耳其",
                "cityName": "土耳其",
                "confirmedCount": "150593",
                "suspectedCount": "0",
                "curedCount": "111577",
                "deadCount": "4171",
                "currentConfirmedCount": "34845",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "欧洲",
                "countryName": "瑞典",
                "provinceName": "瑞典",
                "cityName": "瑞典",
                "confirmedCount": "30377",
                "suspectedCount": "0",
                "curedCount": "4971",
                "deadCount": "3698",
                "currentConfirmedCount": "21708",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "亚洲",
                "countryName": "印度尼西亚",
                "provinceName": "印度尼西亚",
                "cityName": "印度尼西亚",
                "confirmedCount": "18010",
                "suspectedCount": "0",
                "curedCount": "4324",
                "deadCount": "1191",
                "currentConfirmedCount": "12495",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "北美洲",
                "countryName": "多米尼加",
                "provinceName": "多米尼加",
                "cityName": "多米尼加",
                "confirmedCount": "12314",
                "suspectedCount": "0",
                "curedCount": "993",
                "deadCount": "428",
                "currentConfirmedCount": "10893",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "欧洲",
                "countryName": "爱尔兰",
                "provinceName": "爱尔兰",
                "cityName": "爱尔兰",
                "confirmedCount": "24200",
                "suspectedCount": "0",
                "curedCount": "13386",
                "deadCount": "1547",
                "currentConfirmedCount": "9267",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "亚洲",
                "countryName": "菲律宾",
                "provinceName": "菲律宾",
                "cityName": "菲律宾",
                "confirmedCount": "12718",
                "suspectedCount": "0",
                "curedCount": "2729",
                "deadCount": "831",
                "currentConfirmedCount": "9158",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "北美洲",
                "countryName": "巴拿马",
                "provinceName": "巴拿马",
                "cityName": "巴拿马",
                "confirmedCount": "9628",
                "suspectedCount": "0",
                "curedCount": "455",
                "deadCount": "269",
                "currentConfirmedCount": "8904",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "非洲",
                "countryName": "埃及",
                "provinceName": "埃及",
                "cityName": "埃及",
                "confirmedCount": "12764",
                "suspectedCount": "0",
                "curedCount": "3440",
                "deadCount": "645",
                "currentConfirmedCount": "8679",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "亚洲",
                "countryName": "阿富汗",
                "provinceName": "阿富汗",
                "cityName": "阿富汗",
                "confirmedCount": "7072",
                "suspectedCount": "0",
                "curedCount": "801",
                "deadCount": "173",
                "currentConfirmedCount": "6098",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "南美洲",
                "countryName": "阿根廷",
                "provinceName": "阿根廷",
                "cityName": "阿根廷",
                "confirmedCount": "7805",
                "suspectedCount": "0",
                "curedCount": "2534",
                "deadCount": "636",
                "currentConfirmedCount": "4635",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "非洲",
                "countryName": "尼日利亚",
                "provinceName": "尼日利亚",
                "cityName": "尼日利亚",
                "confirmedCount": "5959",
                "suspectedCount": "0",
                "curedCount": "1594",
                "deadCount": "182",
                "currentConfirmedCount": "4183",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "非洲",
                "countryName": "摩洛哥",
                "provinceName": "摩洛哥",
                "cityName": "摩洛哥",
                "confirmedCount": "6952",
                "suspectedCount": "0",
                "curedCount": "3758",
                "deadCount": "192",
                "currentConfirmedCount": "3002",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "非洲",
                "countryName": "马约特",
                "provinceName": "马约特",
                "cityName": "马约特",
                "confirmedCount": "1342",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "18",
                "currentConfirmedCount": "1324",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "欧洲",
                "countryName": "丹麦",
                "provinceName": "丹麦",
                "cityName": "丹麦",
                "confirmedCount": "10968",
                "suspectedCount": "0",
                "curedCount": "9107",
                "deadCount": "548",
                "currentConfirmedCount": "1313",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "北美洲",
                "countryName": "萨尔瓦多",
                "provinceName": "萨尔瓦多",
                "cityName": "萨尔瓦多",
                "confirmedCount": "1338",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "27",
                "currentConfirmedCount": "1311",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "非洲",
                "countryName": "索马里",
                "provinceName": "索马里",
                "cityName": "索马里",
                "confirmedCount": "1455",
                "suspectedCount": "0",
                "curedCount": "163",
                "deadCount": "57",
                "currentConfirmedCount": "1235",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "非洲",
                "countryName": "刚果（金）",
                "provinceName": "刚果（金）",
                "cityName": "刚果（金）",
                "confirmedCount": "1538",
                "suspectedCount": "0",
                "curedCount": "272",
                "deadCount": "61",
                "currentConfirmedCount": "1205",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "亚洲",
                "countryName": "塔吉克斯坦",
                "provinceName": "塔吉克斯坦",
                "cityName": "塔吉克斯坦",
                "confirmedCount": "1729",
                "suspectedCount": "0",
                "curedCount": "493",
                "deadCount": "41",
                "currentConfirmedCount": "1195",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "欧洲",
                "countryName": "斯洛文尼亚",
                "provinceName": "斯洛文尼亚",
                "cityName": "斯洛文尼亚",
                "confirmedCount": "1466",
                "suspectedCount": "0",
                "curedCount": "270",
                "deadCount": "104",
                "currentConfirmedCount": "1092",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "亚洲",
                "countryName": "韩国",
                "provinceName": "韩国",
                "cityName": "韩国",
                "confirmedCount": "11065",
                "suspectedCount": "0",
                "curedCount": "9904",
                "deadCount": "263",
                "currentConfirmedCount": "898",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "欧洲",
                "countryName": "挪威",
                "provinceName": "挪威",
                "cityName": "挪威",
                "confirmedCount": "8244",
                "suspectedCount": "0",
                "curedCount": "7114",
                "deadCount": "232",
                "currentConfirmedCount": "898",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "欧洲",
                "countryName": "斯洛伐克",
                "provinceName": "斯洛伐克",
                "cityName": "斯洛伐克",
                "confirmedCount": "1494",
                "suspectedCount": "0",
                "curedCount": "806",
                "deadCount": "28",
                "currentConfirmedCount": "660",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "亚洲",
                "countryName": "黎巴嫩",
                "provinceName": "黎巴嫩",
                "cityName": "黎巴嫩",
                "confirmedCount": "931",
                "suspectedCount": "0",
                "curedCount": "247",
                "deadCount": "26",
                "currentConfirmedCount": "658",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "非洲",
                "countryName": "吉布提",
                "provinceName": "吉布提",
                "cityName": "吉布提",
                "confirmedCount": "1518",
                "suspectedCount": "0",
                "curedCount": "935",
                "deadCount": "7",
                "currentConfirmedCount": "576",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "欧洲",
                "countryName": "立陶宛",
                "provinceName": "立陶宛",
                "cityName": "立陶宛",
                "confirmedCount": "1541",
                "suspectedCount": "0",
                "curedCount": "988",
                "deadCount": "56",
                "currentConfirmedCount": "497",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "亚洲",
                "countryName": "塞浦路斯",
                "provinceName": "塞浦路斯",
                "cityName": "塞浦路斯",
                "confirmedCount": "916",
                "suspectedCount": "0",
                "curedCount": "504",
                "deadCount": "26",
                "currentConfirmedCount": "386",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "欧洲",
                "countryName": "卢森堡",
                "provinceName": "卢森堡",
                "cityName": "卢森堡",
                "confirmedCount": "3945",
                "suspectedCount": "0",
                "curedCount": "3602",
                "deadCount": "107",
                "currentConfirmedCount": "236",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "南美洲",
                "countryName": "乌拉圭",
                "provinceName": "乌拉圭",
                "cityName": "乌拉圭",
                "confirmedCount": "734",
                "suspectedCount": "0",
                "curedCount": "492",
                "deadCount": "19",
                "currentConfirmedCount": "223",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "北美洲",
                "countryName": "阿鲁巴",
                "provinceName": "阿鲁巴",
                "cityName": "阿鲁巴",
                "confirmedCount": "101",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "3",
                "currentConfirmedCount": "98",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "欧洲",
                "countryName": "黑山",
                "provinceName": "黑山",
                "cityName": "黑山",
                "confirmedCount": "325",
                "suspectedCount": "0",
                "curedCount": "265",
                "deadCount": "9",
                "currentConfirmedCount": "51",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "非洲",
                "countryName": "毛里求斯",
                "provinceName": "毛里求斯",
                "cityName": "毛里求斯",
                "confirmedCount": "332",
                "suspectedCount": "0",
                "curedCount": "322",
                "deadCount": "10",
                "currentConfirmedCount": "0",
                "updateTime": "2020/5/19 8:02"
            },
            {
                "continentName": "欧洲",
                "countryName": "俄罗斯",
                "provinceName": "俄罗斯",
                "cityName": "俄罗斯",
                "confirmedCount": "290678",
                "suspectedCount": "0",
                "curedCount": "70209",
                "deadCount": "2722",
                "currentConfirmedCount": "217747",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "南美洲",
                "countryName": "秘鲁",
                "provinceName": "秘鲁",
                "cityName": "秘鲁",
                "confirmedCount": "94933",
                "suspectedCount": "0",
                "curedCount": "30306",
                "deadCount": "2789",
                "currentConfirmedCount": "61838",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "欧洲",
                "countryName": "荷兰",
                "provinceName": "荷兰",
                "cityName": "荷兰",
                "confirmedCount": "44141",
                "suspectedCount": "0",
                "curedCount": "291",
                "deadCount": "5694",
                "currentConfirmedCount": "38156",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "北美洲",
                "countryName": "加拿大",
                "provinceName": "加拿大",
                "cityName": "加拿大",
                "confirmedCount": "78072",
                "suspectedCount": "0",
                "curedCount": "39228",
                "deadCount": "5842",
                "currentConfirmedCount": "33002",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "南美洲",
                "countryName": "厄瓜多尔",
                "provinceName": "厄瓜多尔",
                "cityName": "厄瓜多尔",
                "confirmedCount": "33182",
                "suspectedCount": "0",
                "curedCount": "3433",
                "deadCount": "2736",
                "currentConfirmedCount": "27013",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "南美洲",
                "countryName": "智利",
                "provinceName": "智利",
                "cityName": "智利",
                "confirmedCount": "46059",
                "suspectedCount": "0",
                "curedCount": "20165",
                "deadCount": "478",
                "currentConfirmedCount": "25416",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "欧洲",
                "countryName": "葡萄牙",
                "provinceName": "葡萄牙",
                "cityName": "葡萄牙",
                "confirmedCount": "29209",
                "suspectedCount": "0",
                "curedCount": "4636",
                "deadCount": "1231",
                "currentConfirmedCount": "23342",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "南美洲",
                "countryName": "哥伦比亚",
                "provinceName": "哥伦比亚",
                "cityName": "哥伦比亚",
                "confirmedCount": "16295",
                "suspectedCount": "0",
                "curedCount": "1210",
                "deadCount": "592",
                "currentConfirmedCount": "14493",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "欧洲",
                "countryName": "乌克兰",
                "provinceName": "乌克兰",
                "cityName": "乌克兰",
                "confirmedCount": "18616",
                "suspectedCount": "0",
                "curedCount": "5276",
                "deadCount": "535",
                "currentConfirmedCount": "12805",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "欧洲",
                "countryName": "德国",
                "provinceName": "德国",
                "cityName": "德国",
                "confirmedCount": "174697",
                "suspectedCount": "0",
                "curedCount": "154600",
                "deadCount": "7935",
                "currentConfirmedCount": "12162",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "亚洲",
                "countryName": "科威特",
                "provinceName": "科威特",
                "cityName": "科威特",
                "confirmedCount": "15691",
                "suspectedCount": "0",
                "curedCount": "4339",
                "deadCount": "118",
                "currentConfirmedCount": "11234",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "北美洲",
                "countryName": "巴拿马",
                "provinceName": "巴拿马",
                "cityName": "巴拿马",
                "confirmedCount": "9628",
                "suspectedCount": "0",
                "curedCount": "455",
                "deadCount": "269",
                "currentConfirmedCount": "8904",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "非洲",
                "countryName": "南非",
                "provinceName": "南非",
                "cityName": "南非",
                "confirmedCount": "16433",
                "suspectedCount": "0",
                "curedCount": "7298",
                "deadCount": "286",
                "currentConfirmedCount": "8849",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "亚洲",
                "countryName": "日本",
                "provinceName": "日本",
                "cityName": "日本",
                "confirmedCount": "16367",
                "suspectedCount": "0",
                "curedCount": "11415",
                "deadCount": "768",
                "currentConfirmedCount": "4184",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "南美洲",
                "countryName": "玻利维亚",
                "provinceName": "玻利维亚",
                "cityName": "玻利维亚",
                "confirmedCount": "3826",
                "suspectedCount": "0",
                "curedCount": "159",
                "deadCount": "165",
                "currentConfirmedCount": "3502",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "亚洲",
                "countryName": "以色列",
                "provinceName": "以色列",
                "cityName": "以色列",
                "confirmedCount": "16621",
                "suspectedCount": "0",
                "curedCount": "13014",
                "deadCount": "272",
                "currentConfirmedCount": "3335",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "欧洲",
                "countryName": "奥地利",
                "provinceName": "奥地利",
                "cityName": "奥地利",
                "confirmedCount": "16201",
                "suspectedCount": "0",
                "curedCount": "13228",
                "deadCount": "629",
                "currentConfirmedCount": "2344",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "非洲",
                "countryName": "苏丹",
                "provinceName": "苏丹",
                "cityName": "苏丹",
                "confirmedCount": "2591",
                "suspectedCount": "0",
                "curedCount": "247",
                "deadCount": "105",
                "currentConfirmedCount": "2239",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "非洲",
                "countryName": "喀麦隆",
                "provinceName": "喀麦隆",
                "cityName": "喀麦隆",
                "confirmedCount": "3529",
                "suspectedCount": "0",
                "curedCount": "1567",
                "deadCount": "140",
                "currentConfirmedCount": "1822",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "欧洲",
                "countryName": "匈牙利",
                "provinceName": "匈牙利",
                "cityName": "匈牙利",
                "confirmedCount": "3535",
                "suspectedCount": "0",
                "curedCount": "1400",
                "deadCount": "462",
                "currentConfirmedCount": "1673",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "非洲",
                "countryName": "几内亚",
                "provinceName": "几内亚",
                "cityName": "几内亚",
                "confirmedCount": "2796",
                "suspectedCount": "0",
                "curedCount": "1263",
                "deadCount": "16",
                "currentConfirmedCount": "1517",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "非洲",
                "countryName": "塞内加尔",
                "provinceName": "塞内加尔",
                "cityName": "塞内加尔",
                "confirmedCount": "2544",
                "suspectedCount": "0",
                "curedCount": "1076",
                "deadCount": "26",
                "currentConfirmedCount": "1442",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "亚洲",
                "countryName": "阿塞拜疆",
                "provinceName": "阿塞拜疆",
                "cityName": "阿塞拜疆",
                "confirmedCount": "3387",
                "suspectedCount": "0",
                "curedCount": "2055",
                "deadCount": "40",
                "currentConfirmedCount": "1292",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "北美洲",
                "countryName": "古巴",
                "provinceName": "古巴",
                "cityName": "古巴",
                "confirmedCount": "1872",
                "suspectedCount": "0",
                "curedCount": "525",
                "deadCount": "79",
                "currentConfirmedCount": "1268",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "非洲",
                "countryName": "刚果（金）",
                "provinceName": "刚果（金）",
                "cityName": "刚果（金）",
                "confirmedCount": "1538",
                "suspectedCount": "0",
                "curedCount": "272",
                "deadCount": "61",
                "currentConfirmedCount": "1205",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "亚洲",
                "countryName": "乌兹别克斯坦",
                "provinceName": "乌兹别克斯坦",
                "cityName": "乌兹别克斯坦",
                "confirmedCount": "2762",
                "suspectedCount": "0",
                "curedCount": "2213",
                "deadCount": "12",
                "currentConfirmedCount": "537",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "非洲",
                "countryName": "坦桑尼亚",
                "provinceName": "坦桑尼亚",
                "cityName": "坦桑尼亚",
                "confirmedCount": "509",
                "suspectedCount": "0",
                "curedCount": "167",
                "deadCount": "21",
                "currentConfirmedCount": "321",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "亚洲",
                "countryName": "格鲁吉亚",
                "provinceName": "格鲁吉亚",
                "cityName": "格鲁吉亚",
                "confirmedCount": "701",
                "suspectedCount": "0",
                "curedCount": "425",
                "deadCount": "12",
                "currentConfirmedCount": "264",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "非洲",
                "countryName": "马达加斯加",
                "provinceName": "马达加斯加",
                "cityName": "马达加斯加",
                "confirmedCount": "322",
                "suspectedCount": "0",
                "curedCount": "119",
                "deadCount": "1",
                "currentConfirmedCount": "202",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "非洲",
                "countryName": "埃塞俄比亚",
                "provinceName": "埃塞俄比亚",
                "cityName": "埃塞俄比亚",
                "confirmedCount": "317",
                "suspectedCount": "0",
                "curedCount": "112",
                "deadCount": "5",
                "currentConfirmedCount": "200",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "非洲",
                "countryName": "突尼斯",
                "provinceName": "突尼斯",
                "cityName": "突尼斯",
                "confirmedCount": "1037",
                "suspectedCount": "0",
                "curedCount": "802",
                "deadCount": "45",
                "currentConfirmedCount": "190",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "欧洲",
                "countryName": "克罗地亚",
                "provinceName": "克罗地亚",
                "cityName": "克罗地亚",
                "confirmedCount": "2228",
                "suspectedCount": "0",
                "curedCount": "1946",
                "deadCount": "95",
                "currentConfirmedCount": "187",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "亚洲",
                "countryName": "越南",
                "provinceName": "越南",
                "cityName": "越南",
                "confirmedCount": "320",
                "suspectedCount": "0",
                "curedCount": "169",
                "deadCount": "0",
                "currentConfirmedCount": "151",
                "updateTime": "2020/5/19 7:52"
            },
            {
                "continentName": "北美洲",
                "countryName": "美国",
                "provinceName": "美国",
                "cityName": "美国",
                "confirmedCount": "1506732",
                "suspectedCount": "0",
                "curedCount": "283178",
                "deadCount": "90236",
                "currentConfirmedCount": "1133318",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "欧洲",
                "countryName": "英国",
                "provinceName": "英国",
                "cityName": "英国",
                "confirmedCount": "246406",
                "suspectedCount": "0",
                "curedCount": "539",
                "deadCount": "34796",
                "currentConfirmedCount": "211071",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "欧洲",
                "countryName": "意大利",
                "provinceName": "意大利",
                "cityName": "意大利",
                "confirmedCount": "225886",
                "suspectedCount": "0",
                "curedCount": "127326",
                "deadCount": "32007",
                "currentConfirmedCount": "66553",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "欧洲",
                "countryName": "西班牙",
                "provinceName": "西班牙",
                "cityName": "西班牙",
                "confirmedCount": "231606",
                "suspectedCount": "0",
                "curedCount": "150376",
                "deadCount": "27709",
                "currentConfirmedCount": "53521",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "欧洲",
                "countryName": "法国",
                "provinceName": "法国",
                "cityName": "法国",
                "confirmedCount": "142903",
                "suspectedCount": "0",
                "curedCount": "61728",
                "deadCount": "28239",
                "currentConfirmedCount": "52936",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "亚洲",
                "countryName": "土耳其",
                "provinceName": "土耳其",
                "cityName": "土耳其",
                "confirmedCount": "150593",
                "suspectedCount": "0",
                "curedCount": "111577",
                "deadCount": "4171",
                "currentConfirmedCount": "34845",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "北美洲",
                "countryName": "加拿大",
                "provinceName": "加拿大",
                "cityName": "加拿大",
                "confirmedCount": "78072",
                "suspectedCount": "0",
                "curedCount": "38550",
                "deadCount": "5842",
                "currentConfirmedCount": "33680",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "南美洲",
                "countryName": "哥伦比亚",
                "provinceName": "哥伦比亚",
                "cityName": "哥伦比亚",
                "confirmedCount": "16295",
                "suspectedCount": "0",
                "curedCount": "1210",
                "deadCount": "592",
                "currentConfirmedCount": "14493",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "欧洲",
                "countryName": "乌克兰",
                "provinceName": "乌克兰",
                "cityName": "乌克兰",
                "confirmedCount": "18616",
                "suspectedCount": "0",
                "curedCount": "5276",
                "deadCount": "535",
                "currentConfirmedCount": "12805",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "亚洲",
                "countryName": "科威特",
                "provinceName": "科威特",
                "cityName": "科威特",
                "confirmedCount": "15691",
                "suspectedCount": "0",
                "curedCount": "4339",
                "deadCount": "118",
                "currentConfirmedCount": "11234",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "欧洲",
                "countryName": "波兰",
                "provinceName": "波兰",
                "cityName": "波兰",
                "confirmedCount": "18885",
                "suspectedCount": "0",
                "curedCount": "7628",
                "deadCount": "936",
                "currentConfirmedCount": "10321",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "亚洲",
                "countryName": "阿富汗",
                "provinceName": "阿富汗",
                "cityName": "阿富汗",
                "confirmedCount": "7072",
                "suspectedCount": "0",
                "curedCount": "784",
                "deadCount": "173",
                "currentConfirmedCount": "6115",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "亚洲",
                "countryName": "巴林",
                "provinceName": "巴林",
                "cityName": "巴林",
                "confirmedCount": "7156",
                "suspectedCount": "0",
                "curedCount": "2929",
                "deadCount": "12",
                "currentConfirmedCount": "4215",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "非洲",
                "countryName": "阿尔及利亚",
                "provinceName": "阿尔及利亚",
                "cityName": "阿尔及利亚",
                "confirmedCount": "7201",
                "suspectedCount": "0",
                "curedCount": "3625",
                "deadCount": "555",
                "currentConfirmedCount": "3021",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "非洲",
                "countryName": "摩洛哥",
                "provinceName": "摩洛哥",
                "cityName": "摩洛哥",
                "confirmedCount": "6952",
                "suspectedCount": "0",
                "curedCount": "3758",
                "deadCount": "192",
                "currentConfirmedCount": "3002",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "欧洲",
                "countryName": "捷克",
                "provinceName": "捷克",
                "cityName": "捷克",
                "confirmedCount": "8527",
                "suspectedCount": "0",
                "curedCount": "5633",
                "deadCount": "298",
                "currentConfirmedCount": "2596",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "欧洲",
                "countryName": "奥地利",
                "provinceName": "奥地利",
                "cityName": "奥地利",
                "confirmedCount": "16154",
                "suspectedCount": "0",
                "curedCount": "13228",
                "deadCount": "629",
                "currentConfirmedCount": "2297",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "亚洲",
                "countryName": "马来西亚",
                "provinceName": "马来西亚",
                "cityName": "马来西亚",
                "confirmedCount": "6941",
                "suspectedCount": "0",
                "curedCount": "5615",
                "deadCount": "113",
                "currentConfirmedCount": "1213",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "大洋洲",
                "countryName": "澳大利亚",
                "provinceName": "澳大利亚",
                "cityName": "澳大利亚",
                "confirmedCount": "7060",
                "suspectedCount": "0",
                "curedCount": "6389",
                "deadCount": "99",
                "currentConfirmedCount": "572",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "欧洲",
                "countryName": "立陶宛",
                "provinceName": "立陶宛",
                "cityName": "立陶宛",
                "confirmedCount": "1541",
                "suspectedCount": "0",
                "curedCount": "988",
                "deadCount": "56",
                "currentConfirmedCount": "497",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "非洲",
                "countryName": "刚果（布）",
                "provinceName": "刚果（布）",
                "cityName": "刚果（布）",
                "confirmedCount": "412",
                "suspectedCount": "0",
                "curedCount": "110",
                "deadCount": "15",
                "currentConfirmedCount": "287",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "非洲",
                "countryName": "多哥",
                "provinceName": "多哥",
                "cityName": "多哥",
                "confirmedCount": "301",
                "suspectedCount": "0",
                "curedCount": "99",
                "deadCount": "11",
                "currentConfirmedCount": "191",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "欧洲",
                "countryName": "黑山",
                "provinceName": "黑山",
                "cityName": "黑山",
                "confirmedCount": "325",
                "suspectedCount": "0",
                "curedCount": "265",
                "deadCount": "9",
                "currentConfirmedCount": "51",
                "updateTime": "2020/5/19 7:44"
            },
            {
                "continentName": "北美洲",
                "countryName": "美国",
                "provinceName": "美国",
                "cityName": "美国",
                "confirmedCount": "1490195",
                "suspectedCount": "0",
                "curedCount": "272265",
                "deadCount": "89636",
                "currentConfirmedCount": "1128294",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "俄罗斯",
                "provinceName": "俄罗斯",
                "cityName": "俄罗斯",
                "confirmedCount": "290678",
                "suspectedCount": "0",
                "curedCount": "70209",
                "deadCount": "2722",
                "currentConfirmedCount": "217747",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "英国",
                "provinceName": "英国",
                "cityName": "英国",
                "confirmedCount": "246406",
                "suspectedCount": "0",
                "curedCount": "539",
                "deadCount": "34636",
                "currentConfirmedCount": "211231",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "南美洲",
                "countryName": "巴西",
                "provinceName": "巴西",
                "cityName": "巴西",
                "confirmedCount": "241080",
                "suspectedCount": "0",
                "curedCount": "94122",
                "deadCount": "16118",
                "currentConfirmedCount": "130840",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "意大利",
                "provinceName": "意大利",
                "cityName": "意大利",
                "confirmedCount": "225435",
                "suspectedCount": "0",
                "curedCount": "125176",
                "deadCount": "31908",
                "currentConfirmedCount": "68351",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "南美洲",
                "countryName": "秘鲁",
                "provinceName": "秘鲁",
                "cityName": "秘鲁",
                "confirmedCount": "92273",
                "suspectedCount": "0",
                "curedCount": "28621",
                "deadCount": "2648",
                "currentConfirmedCount": "61004",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "印度",
                "provinceName": "印度",
                "cityName": "印度",
                "confirmedCount": "96169",
                "suspectedCount": "0",
                "curedCount": "36824",
                "deadCount": "3029",
                "currentConfirmedCount": "56316",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "西班牙",
                "provinceName": "西班牙",
                "cityName": "西班牙",
                "confirmedCount": "231606",
                "suspectedCount": "0",
                "curedCount": "149576",
                "deadCount": "27709",
                "currentConfirmedCount": "54321",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "法国",
                "provinceName": "法国",
                "cityName": "法国",
                "confirmedCount": "142411",
                "suspectedCount": "0",
                "curedCount": "61213",
                "deadCount": "28108",
                "currentConfirmedCount": "53090",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "荷兰",
                "provinceName": "荷兰",
                "cityName": "荷兰",
                "confirmedCount": "44141",
                "suspectedCount": "0",
                "curedCount": "291",
                "deadCount": "5694",
                "currentConfirmedCount": "38156",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "土耳其",
                "provinceName": "土耳其",
                "cityName": "土耳其",
                "confirmedCount": "149435",
                "suspectedCount": "0",
                "curedCount": "109962",
                "deadCount": "4140",
                "currentConfirmedCount": "35333",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "加拿大",
                "provinceName": "加拿大",
                "cityName": "加拿大",
                "confirmedCount": "77002",
                "suspectedCount": "0",
                "curedCount": "38550",
                "deadCount": "5782",
                "currentConfirmedCount": "32670",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "比利时",
                "provinceName": "比利时",
                "cityName": "比利时",
                "confirmedCount": "55559",
                "suspectedCount": "0",
                "curedCount": "14657",
                "deadCount": "9080",
                "currentConfirmedCount": "31822",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "巴基斯坦",
                "provinceName": "巴基斯坦",
                "cityName": "巴基斯坦",
                "confirmedCount": "42125",
                "suspectedCount": "0",
                "curedCount": "11922",
                "deadCount": "903",
                "currentConfirmedCount": "29300",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "卡塔尔",
                "provinceName": "卡塔尔",
                "cityName": "卡塔尔",
                "confirmedCount": "33969",
                "suspectedCount": "0",
                "curedCount": "4899",
                "deadCount": "15",
                "currentConfirmedCount": "29055",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "沙特阿拉伯",
                "provinceName": "沙特阿拉伯",
                "cityName": "沙特阿拉伯",
                "confirmedCount": "57345",
                "suspectedCount": "0",
                "curedCount": "28748",
                "deadCount": "320",
                "currentConfirmedCount": "28277",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "南美洲",
                "countryName": "厄瓜多尔",
                "provinceName": "厄瓜多尔",
                "cityName": "厄瓜多尔",
                "confirmedCount": "33182",
                "suspectedCount": "0",
                "curedCount": "3433",
                "deadCount": "2736",
                "currentConfirmedCount": "27013",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "南美洲",
                "countryName": "智利",
                "provinceName": "智利",
                "cityName": "智利",
                "confirmedCount": "43781",
                "suspectedCount": "0",
                "curedCount": "19213",
                "deadCount": "450",
                "currentConfirmedCount": "24118",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "葡萄牙",
                "provinceName": "葡萄牙",
                "cityName": "葡萄牙",
                "confirmedCount": "29209",
                "suspectedCount": "0",
                "curedCount": "4636",
                "deadCount": "1231",
                "currentConfirmedCount": "23342",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "瑞典",
                "provinceName": "瑞典",
                "cityName": "瑞典",
                "confirmedCount": "30143",
                "suspectedCount": "0",
                "curedCount": "4971",
                "deadCount": "3679",
                "currentConfirmedCount": "21493",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "新加坡",
                "provinceName": "新加坡",
                "cityName": "新加坡",
                "confirmedCount": "28343",
                "suspectedCount": "0",
                "curedCount": "8342",
                "deadCount": "22",
                "currentConfirmedCount": "19979",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "伊朗",
                "provinceName": "伊朗",
                "cityName": "伊朗",
                "confirmedCount": "122492",
                "suspectedCount": "0",
                "curedCount": "95661",
                "deadCount": "7057",
                "currentConfirmedCount": "19774",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "白俄罗斯",
                "provinceName": "白俄罗斯",
                "cityName": "白俄罗斯",
                "confirmedCount": "29650",
                "suspectedCount": "0",
                "curedCount": "9932",
                "deadCount": "165",
                "currentConfirmedCount": "19553",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "孟加拉国",
                "provinceName": "孟加拉国",
                "cityName": "孟加拉国",
                "confirmedCount": "23870",
                "suspectedCount": "0",
                "curedCount": "4585",
                "deadCount": "349",
                "currentConfirmedCount": "18936",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "阿联酋",
                "provinceName": "阿联酋",
                "cityName": "阿联酋",
                "confirmedCount": "23358",
                "suspectedCount": "0",
                "curedCount": "8512",
                "deadCount": "220",
                "currentConfirmedCount": "14626",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "南美洲",
                "countryName": "哥伦比亚",
                "provinceName": "哥伦比亚",
                "cityName": "哥伦比亚",
                "confirmedCount": "15574",
                "suspectedCount": "0",
                "curedCount": "1210",
                "deadCount": "574",
                "currentConfirmedCount": "13790",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "乌克兰",
                "provinceName": "乌克兰",
                "cityName": "乌克兰",
                "confirmedCount": "18616",
                "suspectedCount": "0",
                "curedCount": "5276",
                "deadCount": "535",
                "currentConfirmedCount": "12805",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "印度尼西亚",
                "provinceName": "印度尼西亚",
                "cityName": "印度尼西亚",
                "confirmedCount": "18010",
                "suspectedCount": "0",
                "curedCount": "4324",
                "deadCount": "1191",
                "currentConfirmedCount": "12495",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "德国",
                "provinceName": "德国",
                "cityName": "德国",
                "confirmedCount": "174697",
                "suspectedCount": "0",
                "curedCount": "154600",
                "deadCount": "7935",
                "currentConfirmedCount": "12162",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "科威特",
                "provinceName": "科威特",
                "cityName": "科威特",
                "confirmedCount": "15691",
                "suspectedCount": "0",
                "curedCount": "4339",
                "deadCount": "118",
                "currentConfirmedCount": "11234",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "多米尼加",
                "provinceName": "多米尼加",
                "cityName": "多米尼加",
                "confirmedCount": "12314",
                "suspectedCount": "0",
                "curedCount": "993",
                "deadCount": "428",
                "currentConfirmedCount": "10893",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "墨西哥",
                "provinceName": "墨西哥",
                "cityName": "墨西哥",
                "confirmedCount": "49219",
                "suspectedCount": "0",
                "curedCount": "33329",
                "deadCount": "5177",
                "currentConfirmedCount": "10713",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "波兰",
                "provinceName": "波兰",
                "cityName": "波兰",
                "confirmedCount": "18529",
                "suspectedCount": "0",
                "curedCount": "7175",
                "deadCount": "925",
                "currentConfirmedCount": "10429",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "爱尔兰",
                "provinceName": "爱尔兰",
                "cityName": "爱尔兰",
                "confirmedCount": "24112",
                "suspectedCount": "0",
                "curedCount": "13386",
                "deadCount": "1543",
                "currentConfirmedCount": "9183",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "菲律宾",
                "provinceName": "菲律宾",
                "cityName": "菲律宾",
                "confirmedCount": "12718",
                "suspectedCount": "0",
                "curedCount": "2729",
                "deadCount": "831",
                "currentConfirmedCount": "9158",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "巴拿马",
                "provinceName": "巴拿马",
                "cityName": "巴拿马",
                "confirmedCount": "9628",
                "suspectedCount": "0",
                "curedCount": "455",
                "deadCount": "269",
                "currentConfirmedCount": "8904",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "埃及",
                "provinceName": "埃及",
                "cityName": "埃及",
                "confirmedCount": "12229",
                "suspectedCount": "0",
                "curedCount": "3172",
                "deadCount": "630",
                "currentConfirmedCount": "8427",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "南非",
                "provinceName": "南非",
                "cityName": "南非",
                "confirmedCount": "15515",
                "suspectedCount": "0",
                "curedCount": "7006",
                "deadCount": "264",
                "currentConfirmedCount": "8245",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "阿富汗",
                "provinceName": "阿富汗",
                "cityName": "阿富汗",
                "confirmedCount": "7072",
                "suspectedCount": "0",
                "curedCount": "784",
                "deadCount": "173",
                "currentConfirmedCount": "6115",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "塞尔维亚",
                "provinceName": "塞尔维亚",
                "cityName": "塞尔维亚",
                "confirmedCount": "11565",
                "suspectedCount": "0",
                "curedCount": "5404",
                "deadCount": "259",
                "currentConfirmedCount": "5902",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "罗马尼亚",
                "provinceName": "罗马尼亚",
                "cityName": "罗马尼亚",
                "confirmedCount": "16871",
                "suspectedCount": "0",
                "curedCount": "9890",
                "deadCount": "1097",
                "currentConfirmedCount": "5884",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "南美洲",
                "countryName": "阿根廷",
                "provinceName": "阿根廷",
                "cityName": "阿根廷",
                "confirmedCount": "7805",
                "suspectedCount": "0",
                "curedCount": "2534",
                "deadCount": "636",
                "currentConfirmedCount": "4635",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "巴林",
                "provinceName": "巴林",
                "cityName": "巴林",
                "confirmedCount": "7156",
                "suspectedCount": "0",
                "curedCount": "2929",
                "deadCount": "12",
                "currentConfirmedCount": "4215",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "日本",
                "provinceName": "日本",
                "cityName": "日本",
                "confirmedCount": "16367",
                "suspectedCount": "0",
                "curedCount": "11415",
                "deadCount": "768",
                "currentConfirmedCount": "4184",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "尼日利亚",
                "provinceName": "尼日利亚",
                "cityName": "尼日利亚",
                "confirmedCount": "5959",
                "suspectedCount": "0",
                "curedCount": "1594",
                "deadCount": "182",
                "currentConfirmedCount": "4183",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "加纳",
                "provinceName": "加纳",
                "cityName": "加纳",
                "confirmedCount": "5735",
                "suspectedCount": "0",
                "curedCount": "1754",
                "deadCount": "29",
                "currentConfirmedCount": "3952",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "阿曼",
                "provinceName": "阿曼",
                "cityName": "阿曼",
                "confirmedCount": "5379",
                "suspectedCount": "0",
                "curedCount": "1496",
                "deadCount": "23",
                "currentConfirmedCount": "3860",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "南美洲",
                "countryName": "玻利维亚",
                "provinceName": "玻利维亚",
                "cityName": "玻利维亚",
                "confirmedCount": "3826",
                "suspectedCount": "0",
                "curedCount": "159",
                "deadCount": "165",
                "currentConfirmedCount": "3502",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "摩尔多瓦",
                "provinceName": "摩尔多瓦",
                "cityName": "摩尔多瓦",
                "confirmedCount": "6060",
                "suspectedCount": "0",
                "curedCount": "2408",
                "deadCount": "211",
                "currentConfirmedCount": "3441",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "以色列",
                "provinceName": "以色列",
                "cityName": "以色列",
                "confirmedCount": "16621",
                "suspectedCount": "0",
                "curedCount": "13014",
                "deadCount": "272",
                "currentConfirmedCount": "3335",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "哈萨克斯坦",
                "provinceName": "哈萨克斯坦",
                "cityName": "哈萨克斯坦",
                "confirmedCount": "6440",
                "suspectedCount": "0",
                "curedCount": "3256",
                "deadCount": "34",
                "currentConfirmedCount": "3150",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "摩洛哥",
                "provinceName": "摩洛哥",
                "cityName": "摩洛哥",
                "confirmedCount": "6930",
                "suspectedCount": "0",
                "curedCount": "3732",
                "deadCount": "192",
                "currentConfirmedCount": "3006",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "阿尔及利亚",
                "provinceName": "阿尔及利亚",
                "cityName": "阿尔及利亚",
                "confirmedCount": "7019",
                "suspectedCount": "0",
                "curedCount": "3507",
                "deadCount": "548",
                "currentConfirmedCount": "2964",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "亚美尼亚",
                "provinceName": "亚美尼亚",
                "cityName": "亚美尼亚",
                "confirmedCount": "4823",
                "suspectedCount": "0",
                "curedCount": "2019",
                "deadCount": "61",
                "currentConfirmedCount": "2743",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "捷克",
                "provinceName": "捷克",
                "cityName": "捷克",
                "confirmedCount": "8475",
                "suspectedCount": "0",
                "curedCount": "5435",
                "deadCount": "298",
                "currentConfirmedCount": "2742",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "波多黎各",
                "provinceName": "波多黎各",
                "cityName": "波多黎各",
                "confirmedCount": "2646",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "123",
                "currentConfirmedCount": "2523",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "洪都拉斯",
                "provinceName": "洪都拉斯",
                "cityName": "洪都拉斯",
                "confirmedCount": "2565",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "138",
                "currentConfirmedCount": "2427",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "奥地利",
                "provinceName": "奥地利",
                "cityName": "奥地利",
                "confirmedCount": "16154",
                "suspectedCount": "0",
                "curedCount": "13228",
                "deadCount": "629",
                "currentConfirmedCount": "2297",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "苏丹",
                "provinceName": "苏丹",
                "cityName": "苏丹",
                "confirmedCount": "2591",
                "suspectedCount": "0",
                "curedCount": "247",
                "deadCount": "105",
                "currentConfirmedCount": "2239",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "几内亚",
                "provinceName": "几内亚",
                "cityName": "几内亚",
                "confirmedCount": "2727",
                "suspectedCount": "0",
                "curedCount": "895",
                "deadCount": "16",
                "currentConfirmedCount": "1816",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "芬兰",
                "provinceName": "芬兰",
                "cityName": "芬兰",
                "confirmedCount": "6380",
                "suspectedCount": "0",
                "curedCount": "4300",
                "deadCount": "300",
                "currentConfirmedCount": "1780",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "瑞士",
                "provinceName": "瑞士",
                "cityName": "瑞士",
                "confirmedCount": "30504",
                "suspectedCount": "0",
                "curedCount": "27145",
                "deadCount": "1602",
                "currentConfirmedCount": "1757",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "危地马拉",
                "provinceName": "危地马拉",
                "cityName": "危地马拉",
                "confirmedCount": "1763",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "33",
                "currentConfirmedCount": "1730",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "匈牙利",
                "provinceName": "匈牙利",
                "cityName": "匈牙利",
                "confirmedCount": "3535",
                "suspectedCount": "0",
                "curedCount": "1400",
                "deadCount": "462",
                "currentConfirmedCount": "1673",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "保加利亚",
                "provinceName": "保加利亚",
                "cityName": "保加利亚",
                "confirmedCount": "2235",
                "suspectedCount": "0",
                "curedCount": "499",
                "deadCount": "110",
                "currentConfirmedCount": "1626",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "塞内加尔",
                "provinceName": "塞内加尔",
                "cityName": "塞内加尔",
                "confirmedCount": "2544",
                "suspectedCount": "0",
                "curedCount": "1076",
                "deadCount": "26",
                "currentConfirmedCount": "1442",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "喀麦隆",
                "provinceName": "喀麦隆",
                "cityName": "喀麦隆",
                "confirmedCount": "3047",
                "suspectedCount": "0",
                "curedCount": "1553",
                "deadCount": "139",
                "currentConfirmedCount": "1355",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "马约特",
                "provinceName": "马约特",
                "cityName": "马约特",
                "confirmedCount": "1342",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "18",
                "currentConfirmedCount": "1324",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "萨尔瓦多",
                "provinceName": "萨尔瓦多",
                "cityName": "萨尔瓦多",
                "confirmedCount": "1338",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "27",
                "currentConfirmedCount": "1311",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "阿塞拜疆",
                "provinceName": "阿塞拜疆",
                "cityName": "阿塞拜疆",
                "confirmedCount": "3387",
                "suspectedCount": "0",
                "curedCount": "2055",
                "deadCount": "40",
                "currentConfirmedCount": "1292",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "塔吉克斯坦",
                "provinceName": "塔吉克斯坦",
                "cityName": "塔吉克斯坦",
                "confirmedCount": "1322",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "41",
                "currentConfirmedCount": "1281",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "丹麦",
                "provinceName": "丹麦",
                "cityName": "丹麦",
                "confirmedCount": "10927",
                "suspectedCount": "0",
                "curedCount": "9107",
                "deadCount": "547",
                "currentConfirmedCount": "1273",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "古巴",
                "provinceName": "古巴",
                "cityName": "古巴",
                "confirmedCount": "1872",
                "suspectedCount": "0",
                "curedCount": "525",
                "deadCount": "79",
                "currentConfirmedCount": "1268",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "索马里",
                "provinceName": "索马里",
                "cityName": "索马里",
                "confirmedCount": "1455",
                "suspectedCount": "0",
                "curedCount": "163",
                "deadCount": "57",
                "currentConfirmedCount": "1235",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "马来西亚",
                "provinceName": "马来西亚",
                "cityName": "马来西亚",
                "confirmedCount": "6941",
                "suspectedCount": "0",
                "curedCount": "5615",
                "deadCount": "113",
                "currentConfirmedCount": "1213",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "刚果（金）",
                "provinceName": "刚果（金）",
                "cityName": "刚果（金）",
                "confirmedCount": "1538",
                "suspectedCount": "0",
                "curedCount": "272",
                "deadCount": "61",
                "currentConfirmedCount": "1205",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "希腊",
                "provinceName": "希腊",
                "cityName": "希腊",
                "confirmedCount": "2834",
                "suspectedCount": "0",
                "curedCount": "1473",
                "deadCount": "163",
                "currentConfirmedCount": "1198",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "伊拉克",
                "provinceName": "伊拉克",
                "cityName": "伊拉克",
                "confirmedCount": "3554",
                "suspectedCount": "0",
                "curedCount": "2310",
                "deadCount": "127",
                "currentConfirmedCount": "1117",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "斯洛文尼亚",
                "provinceName": "斯洛文尼亚",
                "cityName": "斯洛文尼亚",
                "confirmedCount": "1466",
                "suspectedCount": "0",
                "curedCount": "270",
                "deadCount": "104",
                "currentConfirmedCount": "1092",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "科特迪瓦",
                "provinceName": "科特迪瓦",
                "cityName": "科特迪瓦",
                "confirmedCount": "2109",
                "suspectedCount": "0",
                "curedCount": "1004",
                "deadCount": "27",
                "currentConfirmedCount": "1078",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "加蓬",
                "provinceName": "加蓬",
                "cityName": "加蓬",
                "confirmedCount": "1320",
                "suspectedCount": "0",
                "curedCount": "244",
                "deadCount": "11",
                "currentConfirmedCount": "1065",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "马尔代夫",
                "provinceName": "马尔代夫",
                "cityName": "马尔代夫",
                "confirmedCount": "1094",
                "suspectedCount": "0",
                "curedCount": "58",
                "deadCount": "4",
                "currentConfirmedCount": "1032",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "几内亚比绍",
                "provinceName": "几内亚比绍",
                "cityName": "几内亚比绍",
                "confirmedCount": "990",
                "suspectedCount": "0",
                "curedCount": "26",
                "deadCount": "4",
                "currentConfirmedCount": "960",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "韩国",
                "provinceName": "韩国",
                "cityName": "韩国",
                "confirmedCount": "11065",
                "suspectedCount": "0",
                "curedCount": "9904",
                "deadCount": "263",
                "currentConfirmedCount": "898",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "挪威",
                "provinceName": "挪威",
                "cityName": "挪威",
                "confirmedCount": "8244",
                "suspectedCount": "0",
                "curedCount": "7114",
                "deadCount": "232",
                "currentConfirmedCount": "898",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "波黑",
                "provinceName": "波黑",
                "cityName": "波黑",
                "confirmedCount": "2289",
                "suspectedCount": "0",
                "curedCount": "1261",
                "deadCount": "132",
                "currentConfirmedCount": "896",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "哥斯达黎加",
                "provinceName": "哥斯达黎加",
                "cityName": "哥斯达黎加",
                "confirmedCount": "853",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "10",
                "currentConfirmedCount": "843",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "赤道几内亚",
                "provinceName": "赤道几内亚",
                "cityName": "赤道几内亚",
                "confirmedCount": "719",
                "suspectedCount": "0",
                "curedCount": "22",
                "deadCount": "7",
                "currentConfirmedCount": "690",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "斯洛伐克",
                "provinceName": "斯洛伐克",
                "cityName": "斯洛伐克",
                "confirmedCount": "1494",
                "suspectedCount": "0",
                "curedCount": "806",
                "deadCount": "28",
                "currentConfirmedCount": "660",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "黎巴嫩",
                "provinceName": "黎巴嫩",
                "cityName": "黎巴嫩",
                "confirmedCount": "931",
                "suspectedCount": "0",
                "curedCount": "247",
                "deadCount": "26",
                "currentConfirmedCount": "658",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "圣马力诺",
                "provinceName": "圣马力诺",
                "cityName": "圣马力诺",
                "confirmedCount": "668",
                "suspectedCount": "0",
                "curedCount": "2",
                "deadCount": "41",
                "currentConfirmedCount": "625",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "南美洲",
                "countryName": "巴拉圭",
                "provinceName": "巴拉圭",
                "cityName": "巴拉圭",
                "confirmedCount": "786",
                "suspectedCount": "0",
                "curedCount": "198",
                "deadCount": "11",
                "currentConfirmedCount": "577",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "吉布提",
                "provinceName": "吉布提",
                "cityName": "吉布提",
                "confirmedCount": "1518",
                "suspectedCount": "0",
                "curedCount": "935",
                "deadCount": "7",
                "currentConfirmedCount": "576",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "大洋洲",
                "countryName": "澳大利亚",
                "provinceName": "澳大利亚",
                "cityName": "澳大利亚",
                "confirmedCount": "7060",
                "suspectedCount": "0",
                "curedCount": "6389",
                "deadCount": "99",
                "currentConfirmedCount": "572",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "赞比亚共和国",
                "provinceName": "赞比亚共和国",
                "cityName": "赞比亚共和国",
                "confirmedCount": "753",
                "suspectedCount": "0",
                "curedCount": "188",
                "deadCount": "7",
                "currentConfirmedCount": "558",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "乌兹别克斯坦",
                "provinceName": "乌兹别克斯坦",
                "cityName": "乌兹别克斯坦",
                "confirmedCount": "2762",
                "suspectedCount": "0",
                "curedCount": "2213",
                "deadCount": "12",
                "currentConfirmedCount": "537",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "南美洲",
                "countryName": "委内瑞拉",
                "provinceName": "委内瑞拉",
                "cityName": "委内瑞拉",
                "confirmedCount": "541",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "10",
                "currentConfirmedCount": "531",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "肯尼亚",
                "provinceName": "肯尼亚",
                "cityName": "肯尼亚",
                "confirmedCount": "912",
                "suspectedCount": "0",
                "curedCount": "336",
                "deadCount": "50",
                "currentConfirmedCount": "526",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "拉脱维亚",
                "provinceName": "拉脱维亚",
                "cityName": "拉脱维亚",
                "confirmedCount": "1008",
                "suspectedCount": "0",
                "curedCount": "464",
                "deadCount": "19",
                "currentConfirmedCount": "525",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "牙买加",
                "provinceName": "牙买加",
                "cityName": "牙买加",
                "confirmedCount": "517",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "9",
                "currentConfirmedCount": "508",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "立陶宛",
                "provinceName": "立陶宛",
                "cityName": "立陶宛",
                "confirmedCount": "1541",
                "suspectedCount": "0",
                "curedCount": "988",
                "deadCount": "56",
                "currentConfirmedCount": "497",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "乍得",
                "provinceName": "乍得",
                "cityName": "乍得",
                "confirmedCount": "503",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "53",
                "currentConfirmedCount": "450",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "爱沙尼亚",
                "provinceName": "爱沙尼亚",
                "cityName": "爱沙尼亚",
                "confirmedCount": "1784",
                "suspectedCount": "0",
                "curedCount": "1275",
                "deadCount": "64",
                "currentConfirmedCount": "445",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "留尼旺",
                "provinceName": "留尼旺",
                "cityName": "留尼旺",
                "confirmedCount": "443",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "0",
                "currentConfirmedCount": "443",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "斯里兰卡",
                "provinceName": "斯里兰卡",
                "cityName": "斯里兰卡",
                "confirmedCount": "986",
                "suspectedCount": "0",
                "curedCount": "538",
                "deadCount": "9",
                "currentConfirmedCount": "439",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "北马其顿",
                "provinceName": "北马其顿",
                "cityName": "北马其顿",
                "confirmedCount": "1792",
                "suspectedCount": "0",
                "curedCount": "1293",
                "deadCount": "101",
                "currentConfirmedCount": "398",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "塞浦路斯",
                "provinceName": "塞浦路斯",
                "cityName": "塞浦路斯",
                "confirmedCount": "916",
                "suspectedCount": "0",
                "curedCount": "504",
                "deadCount": "26",
                "currentConfirmedCount": "386",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "吉尔吉斯斯坦",
                "provinceName": "吉尔吉斯斯坦",
                "cityName": "吉尔吉斯斯坦",
                "confirmedCount": "1216",
                "suspectedCount": "0",
                "curedCount": "827",
                "deadCount": "14",
                "currentConfirmedCount": "375",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "海地",
                "provinceName": "海地",
                "cityName": "海地",
                "confirmedCount": "358",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "20",
                "currentConfirmedCount": "338",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "塞拉利昂",
                "provinceName": "塞拉利昂",
                "cityName": "塞拉利昂",
                "confirmedCount": "505",
                "suspectedCount": "0",
                "curedCount": "141",
                "deadCount": "32",
                "currentConfirmedCount": "332",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "坦桑尼亚",
                "provinceName": "坦桑尼亚",
                "cityName": "坦桑尼亚",
                "confirmedCount": "509",
                "suspectedCount": "0",
                "curedCount": "167",
                "deadCount": "21",
                "currentConfirmedCount": "321",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "尼泊尔",
                "provinceName": "尼泊尔",
                "cityName": "尼泊尔",
                "confirmedCount": "357",
                "suspectedCount": "0",
                "curedCount": "36",
                "deadCount": "2",
                "currentConfirmedCount": "319",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "中非共和国",
                "provinceName": "中非共和国",
                "cityName": "中非共和国",
                "confirmedCount": "327",
                "suspectedCount": "0",
                "curedCount": "12",
                "deadCount": "0",
                "currentConfirmedCount": "315",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "马里",
                "provinceName": "马里",
                "cityName": "马里",
                "confirmedCount": "860",
                "suspectedCount": "0",
                "curedCount": "494",
                "deadCount": "52",
                "currentConfirmedCount": "314",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "马恩岛",
                "provinceName": "马恩岛",
                "cityName": "马恩岛",
                "confirmedCount": "335",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "24",
                "currentConfirmedCount": "311",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "巴勒斯坦",
                "provinceName": "巴勒斯坦",
                "cityName": "巴勒斯坦",
                "confirmedCount": "560",
                "suspectedCount": "0",
                "curedCount": "263",
                "deadCount": "4",
                "currentConfirmedCount": "293",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "刚果（布）",
                "provinceName": "刚果（布）",
                "cityName": "刚果（布）",
                "confirmedCount": "412",
                "suspectedCount": "0",
                "curedCount": "110",
                "deadCount": "15",
                "currentConfirmedCount": "287",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "南苏丹",
                "provinceName": "南苏丹",
                "cityName": "南苏丹",
                "confirmedCount": "290",
                "suspectedCount": "0",
                "curedCount": "4",
                "deadCount": "4",
                "currentConfirmedCount": "282",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "佛得角",
                "provinceName": "佛得角",
                "cityName": "佛得角",
                "confirmedCount": "328",
                "suspectedCount": "0",
                "curedCount": "44",
                "deadCount": "3",
                "currentConfirmedCount": "281",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "贝宁",
                "provinceName": "贝宁",
                "cityName": "贝宁",
                "confirmedCount": "339",
                "suspectedCount": "0",
                "curedCount": "62",
                "deadCount": "2",
                "currentConfirmedCount": "275",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "泽西岛",
                "provinceName": "泽西岛",
                "cityName": "泽西岛",
                "confirmedCount": "297",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "27",
                "currentConfirmedCount": "270",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "格鲁吉亚",
                "provinceName": "格鲁吉亚",
                "cityName": "格鲁吉亚",
                "confirmedCount": "701",
                "suspectedCount": "0",
                "curedCount": "425",
                "deadCount": "12",
                "currentConfirmedCount": "264",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "克罗地亚",
                "provinceName": "克罗地亚",
                "cityName": "克罗地亚",
                "confirmedCount": "2226",
                "suspectedCount": "0",
                "curedCount": "1869",
                "deadCount": "95",
                "currentConfirmedCount": "262",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "根西岛",
                "provinceName": "根西岛",
                "cityName": "根西岛",
                "confirmedCount": "252",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "13",
                "currentConfirmedCount": "239",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "安道尔",
                "provinceName": "安道尔",
                "cityName": "安道尔",
                "confirmedCount": "761",
                "suspectedCount": "0",
                "curedCount": "472",
                "deadCount": "51",
                "currentConfirmedCount": "238",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "卢森堡",
                "provinceName": "卢森堡",
                "cityName": "卢森堡",
                "confirmedCount": "3945",
                "suspectedCount": "0",
                "curedCount": "3602",
                "deadCount": "107",
                "currentConfirmedCount": "236",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "约旦",
                "provinceName": "约旦",
                "cityName": "约旦",
                "confirmedCount": "629",
                "suspectedCount": "0",
                "curedCount": "390",
                "deadCount": "9",
                "currentConfirmedCount": "230",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "南美洲",
                "countryName": "乌拉圭",
                "provinceName": "乌拉圭",
                "cityName": "乌拉圭",
                "confirmedCount": "734",
                "suspectedCount": "0",
                "curedCount": "492",
                "deadCount": "19",
                "currentConfirmedCount": "223",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "阿尔巴尼亚",
                "provinceName": "阿尔巴尼亚",
                "cityName": "阿尔巴尼亚",
                "confirmedCount": "948",
                "suspectedCount": "0",
                "curedCount": "714",
                "deadCount": "31",
                "currentConfirmedCount": "203",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "圣多美和普林西比",
                "provinceName": "圣多美和普林西比",
                "cityName": "圣多美和普林西比",
                "confirmedCount": "208",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "7",
                "currentConfirmedCount": "201",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "埃塞俄比亚",
                "provinceName": "埃塞俄比亚",
                "cityName": "埃塞俄比亚",
                "confirmedCount": "317",
                "suspectedCount": "0",
                "curedCount": "112",
                "deadCount": "5",
                "currentConfirmedCount": "200",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "南美洲",
                "countryName": "法属圭亚那",
                "provinceName": "法属圭亚那",
                "cityName": "法属圭亚那",
                "confirmedCount": "197",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "1",
                "currentConfirmedCount": "196",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "多哥",
                "provinceName": "多哥",
                "cityName": "多哥",
                "confirmedCount": "301",
                "suspectedCount": "0",
                "curedCount": "99",
                "deadCount": "11",
                "currentConfirmedCount": "191",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "突尼斯",
                "provinceName": "突尼斯",
                "cityName": "突尼斯",
                "confirmedCount": "1037",
                "suspectedCount": "0",
                "curedCount": "802",
                "deadCount": "45",
                "currentConfirmedCount": "190",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "马达加斯加",
                "provinceName": "马达加斯加",
                "cityName": "马达加斯加",
                "confirmedCount": "304",
                "suspectedCount": "0",
                "curedCount": "114",
                "deadCount": "1",
                "currentConfirmedCount": "189",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "斯威士兰",
                "provinceName": "斯威士兰",
                "cityName": "斯威士兰",
                "confirmedCount": "203",
                "suspectedCount": "0",
                "curedCount": "13",
                "deadCount": "2",
                "currentConfirmedCount": "188",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "法罗群岛",
                "provinceName": "法罗群岛",
                "cityName": "法罗群岛",
                "confirmedCount": "187",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "0",
                "currentConfirmedCount": "187",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "乌干达",
                "provinceName": "乌干达",
                "cityName": "乌干达",
                "confirmedCount": "248",
                "suspectedCount": "0",
                "curedCount": "63",
                "deadCount": "0",
                "currentConfirmedCount": "185",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "马耳他",
                "provinceName": "马耳他",
                "cityName": "马耳他",
                "confirmedCount": "553",
                "suspectedCount": "0",
                "curedCount": "367",
                "deadCount": "6",
                "currentConfirmedCount": "180",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "马提尼克",
                "provinceName": "马提尼克",
                "cityName": "马提尼克",
                "confirmedCount": "192",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "14",
                "currentConfirmedCount": "178",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "泰国",
                "provinceName": "泰国",
                "cityName": "泰国",
                "confirmedCount": "3031",
                "suspectedCount": "0",
                "curedCount": "2798",
                "deadCount": "56",
                "currentConfirmedCount": "177",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "布基纳法索",
                "provinceName": "布基纳法索",
                "cityName": "布基纳法索",
                "confirmedCount": "796",
                "suspectedCount": "0",
                "curedCount": "592",
                "deadCount": "51",
                "currentConfirmedCount": "153",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "尼日尔",
                "provinceName": "尼日尔",
                "cityName": "尼日尔",
                "confirmedCount": "904",
                "suspectedCount": "0",
                "curedCount": "698",
                "deadCount": "54",
                "currentConfirmedCount": "152",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "越南",
                "provinceName": "越南",
                "cityName": "越南",
                "confirmedCount": "320",
                "suspectedCount": "0",
                "curedCount": "169",
                "deadCount": "0",
                "currentConfirmedCount": "151",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "直布罗陀",
                "provinceName": "直布罗陀",
                "cityName": "直布罗陀",
                "confirmedCount": "147",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "1",
                "currentConfirmedCount": "146",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "大洋洲",
                "countryName": "关岛",
                "provinceName": "关岛",
                "cityName": "关岛",
                "confirmedCount": "149",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "5",
                "currentConfirmedCount": "144",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "瓜德罗普岛",
                "provinceName": "瓜德罗普岛",
                "cityName": "瓜德罗普岛",
                "confirmedCount": "155",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "13",
                "currentConfirmedCount": "142",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "其他",
                "countryName": "钻石公主号邮轮",
                "provinceName": "钻石公主号邮轮",
                "cityName": "钻石公主号邮轮",
                "confirmedCount": "712",
                "suspectedCount": "0",
                "curedCount": "574",
                "deadCount": "13",
                "currentConfirmedCount": "125",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "利比里亚",
                "provinceName": "利比里亚",
                "cityName": "利比里亚",
                "confirmedCount": "226",
                "suspectedCount": "0",
                "curedCount": "85",
                "deadCount": "21",
                "currentConfirmedCount": "120",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "缅甸",
                "provinceName": "缅甸",
                "cityName": "缅甸",
                "confirmedCount": "188",
                "suspectedCount": "0",
                "curedCount": "62",
                "deadCount": "6",
                "currentConfirmedCount": "120",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "蒙古",
                "provinceName": "蒙古",
                "cityName": "蒙古",
                "confirmedCount": "140",
                "suspectedCount": "0",
                "curedCount": "24",
                "deadCount": "0",
                "currentConfirmedCount": "116",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "卢旺达",
                "provinceName": "卢旺达",
                "cityName": "卢旺达",
                "confirmedCount": "292",
                "suspectedCount": "0",
                "curedCount": "178",
                "deadCount": "0",
                "currentConfirmedCount": "114",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "百慕大",
                "provinceName": "百慕大",
                "cityName": "百慕大",
                "confirmedCount": "123",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "9",
                "currentConfirmedCount": "114",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "也门共和国",
                "provinceName": "也门共和国",
                "cityName": "也门共和国",
                "confirmedCount": "132",
                "suspectedCount": "0",
                "curedCount": "1",
                "deadCount": "21",
                "currentConfirmedCount": "110",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "特立尼达和多巴哥",
                "provinceName": "特立尼达和多巴哥",
                "cityName": "特立尼达和多巴哥",
                "confirmedCount": "116",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "8",
                "currentConfirmedCount": "108",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "莫桑比克",
                "provinceName": "莫桑比克",
                "cityName": "莫桑比克",
                "confirmedCount": "137",
                "suspectedCount": "0",
                "curedCount": "34",
                "deadCount": "0",
                "currentConfirmedCount": "103",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "阿鲁巴",
                "provinceName": "阿鲁巴",
                "cityName": "阿鲁巴",
                "confirmedCount": "101",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "3",
                "currentConfirmedCount": "98",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "开曼群岛",
                "provinceName": "开曼群岛",
                "cityName": "开曼群岛",
                "confirmedCount": "94",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "2",
                "currentConfirmedCount": "92",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "巴哈马",
                "provinceName": "巴哈马",
                "cityName": "巴哈马",
                "confirmedCount": "96",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "11",
                "currentConfirmedCount": "85",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "南美洲",
                "countryName": "圭亚那",
                "provinceName": "圭亚那",
                "cityName": "圭亚那",
                "confirmedCount": "117",
                "suspectedCount": "0",
                "curedCount": "27",
                "deadCount": "10",
                "currentConfirmedCount": "80",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "巴巴多斯",
                "provinceName": "巴巴多斯",
                "cityName": "巴巴多斯",
                "confirmedCount": "86",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "7",
                "currentConfirmedCount": "79",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "柬埔寨",
                "provinceName": "柬埔寨",
                "cityName": "柬埔寨",
                "confirmedCount": "122",
                "suspectedCount": "0",
                "curedCount": "50",
                "deadCount": "0",
                "currentConfirmedCount": "72",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "毛里塔尼亚",
                "provinceName": "毛里塔尼亚",
                "cityName": "毛里塔尼亚",
                "confirmedCount": "62",
                "suspectedCount": "0",
                "curedCount": "6",
                "deadCount": "4",
                "currentConfirmedCount": "52",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "黑山",
                "provinceName": "黑山",
                "cityName": "黑山",
                "confirmedCount": "325",
                "suspectedCount": "0",
                "curedCount": "265",
                "deadCount": "9",
                "currentConfirmedCount": "51",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "马拉维",
                "provinceName": "马拉维",
                "cityName": "马拉维",
                "confirmedCount": "70",
                "suspectedCount": "0",
                "curedCount": "24",
                "deadCount": "3",
                "currentConfirmedCount": "43",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "利比亚",
                "provinceName": "利比亚",
                "cityName": "利比亚",
                "confirmedCount": "65",
                "suspectedCount": "0",
                "curedCount": "24",
                "deadCount": "3",
                "currentConfirmedCount": "38",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "欧洲",
                "countryName": "冰岛",
                "provinceName": "冰岛",
                "cityName": "冰岛",
                "confirmedCount": "1802",
                "suspectedCount": "0",
                "curedCount": "1755",
                "deadCount": "10",
                "currentConfirmedCount": "37",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "布隆迪共和国",
                "provinceName": "布隆迪共和国",
                "cityName": "布隆迪共和国",
                "confirmedCount": "42",
                "suspectedCount": "0",
                "curedCount": "4",
                "deadCount": "1",
                "currentConfirmedCount": "37",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "津巴布韦",
                "provinceName": "津巴布韦",
                "cityName": "津巴布韦",
                "confirmedCount": "44",
                "suspectedCount": "0",
                "curedCount": "5",
                "deadCount": "4",
                "currentConfirmedCount": "35",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "叙利亚",
                "provinceName": "叙利亚",
                "cityName": "叙利亚",
                "confirmedCount": "58",
                "suspectedCount": "0",
                "curedCount": "27",
                "deadCount": "3",
                "currentConfirmedCount": "28",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "博茨瓦纳",
                "provinceName": "博茨瓦纳",
                "cityName": "博茨瓦纳",
                "confirmedCount": "25",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "1",
                "currentConfirmedCount": "24",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "格林那达",
                "provinceName": "格林那达",
                "cityName": "格林那达",
                "confirmedCount": "22",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "0",
                "currentConfirmedCount": "22",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "冈比亚",
                "provinceName": "冈比亚",
                "cityName": "冈比亚",
                "confirmedCount": "24",
                "suspectedCount": "0",
                "curedCount": "2",
                "deadCount": "1",
                "currentConfirmedCount": "21",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "不丹",
                "provinceName": "不丹",
                "cityName": "不丹",
                "confirmedCount": "21",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "0",
                "currentConfirmedCount": "21",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "大洋洲",
                "countryName": "北马里亚纳群岛联邦",
                "provinceName": "北马里亚纳群岛联邦",
                "cityName": "北马里亚纳群岛联邦",
                "confirmedCount": "21",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "2",
                "currentConfirmedCount": "19",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "亚洲",
                "countryName": "文莱",
                "provinceName": "文莱",
                "cityName": "文莱",
                "confirmedCount": "141",
                "suspectedCount": "0",
                "curedCount": "131",
                "deadCount": "1",
                "currentConfirmedCount": "9",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "北美洲",
                "countryName": "英属维尔京群岛",
                "provinceName": "英属维尔京群岛",
                "cityName": "英属维尔京群岛",
                "confirmedCount": "8",
                "suspectedCount": "0",
                "curedCount": "0",
                "deadCount": "1",
                "currentConfirmedCount": "7",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "毛里求斯",
                "provinceName": "毛里求斯",
                "cityName": "毛里求斯",
                "confirmedCount": "332",
                "suspectedCount": "0",
                "curedCount": "322",
                "deadCount": "10",
                "currentConfirmedCount": "0",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "大洋洲",
                "countryName": "新西兰",
                "provinceName": "新西兰",
                "cityName": "新西兰",
                "confirmedCount": "1149",
                "suspectedCount": "4",
                "curedCount": "1347",
                "deadCount": "21",
                "currentConfirmedCount": "-219",
                "updateTime": "2020/5/19 7:26"
            },
            {
                "continentName": "非洲",
                "countryName": "索马里",
                "provinceName": "索马里",
                "cityName": "索马里",
                "confirmedCount": "1455",
                "suspectedCount": "0",
                "curedCount": "163",
                "deadCount": "57",
                "currentConfirmedCount": "1235",
                "updateTime": "2020/5/19 0:40"
            },
            {
                "continentName": "亚洲",
                "countryName": "伊拉克",
                "provinceName": "伊拉克",
                "cityName": "伊拉克",
                "confirmedCount": "3554",
                "suspectedCount": "0",
                "curedCount": "2310",
                "deadCount": "127",
                "currentConfirmedCount": "1117",
                "updateTime": "2020/5/19 0:40"
            },
            {
                "continentName": "欧洲",
                "countryName": "爱沙尼亚",
                "provinceName": "爱沙尼亚",
                "cityName": "爱沙尼亚",
                "confirmedCount": "1784",
                "suspectedCount": "0",
                "curedCount": "1275",
                "deadCount": "64",
                "currentConfirmedCount": "445",
                "updateTime": "2020/5/19 0:40"
            },
            {
                "continentName": "亚洲",
                "countryName": "泰国",
                "provinceName": "泰国",
                "cityName": "泰国",
                "confirmedCount": "3028",
                "suspectedCount": "0",
                "curedCount": "2798",
                "deadCount": "56",
                "currentConfirmedCount": "174",
                "updateTime": "2020/5/19 0:40"
            },
            {
                "continentName": "亚洲",
                "countryName": "日本",
                "provinceName": "日本",
                "cityName": "日本",
                "confirmedCount": "16367",
                "suspectedCount": "0",
                "curedCount": "11415",
                "deadCount": "768",
                "currentConfirmedCount": "4184",
                "updateTime": "2020/5/19 0:37"
            },
            {
                "continentName": "欧洲",
                "countryName": "捷克",
                "provinceName": "捷克",
                "cityName": "捷克",
                "confirmedCount": "8460",
                "suspectedCount": "0",
                "curedCount": "5435",
                "deadCount": "298",
                "currentConfirmedCount": "2727",
                "updateTime": "2020/5/19 0:37"
            },
            {
                "continentName": "欧洲",
                "countryName": "芬兰",
                "provinceName": "芬兰",
                "cityName": "芬兰",
                "confirmedCount": "6380",
                "suspectedCount": "0",
                "curedCount": "4300",
                "deadCount": "300",
                "currentConfirmedCount": "1780",
                "updateTime": "2020/5/19 0:37"
            },
            {
                "continentName": "欧洲",
                "countryName": "英国",
                "provinceName": "英国",
                "cityName": "英国",
                "confirmedCount": "246406",
                "suspectedCount": "0",
                "curedCount": "539",
                "deadCount": "34636",
                "currentConfirmedCount": "211231",
                "updateTime": "2020/5/19 0:34"
            },
            {
                "continentName": "欧洲",
                "countryName": "意大利",
                "provinceName": "意大利",
                "cityName": "意大利",
                "confirmedCount": "225435",
                "suspectedCount": "0",
                "curedCount": "125176",
                "deadCount": "31908",
                "currentConfirmedCount": "68351",
                "updateTime": "2020/5/19 0:34"
            }
        ]
        this.chinacity = [
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "合肥",
                    "confirmedCount": "174",
                    "suspectedCount": "0",
                    "curedCount": "173",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "蚌埠",
                    "confirmedCount": "160",
                    "suspectedCount": "0",
                    "curedCount": "155",
                    "deadCount": "5",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "阜阳",
                    "confirmedCount": "155",
                    "suspectedCount": "0",
                    "curedCount": "155",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "亳州",
                    "confirmedCount": "108",
                    "suspectedCount": "0",
                    "curedCount": "108",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "安庆",
                    "confirmedCount": "83",
                    "suspectedCount": "0",
                    "curedCount": "83",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "六安",
                    "confirmedCount": "69",
                    "suspectedCount": "0",
                    "curedCount": "69",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "宿州",
                    "confirmedCount": "41",
                    "suspectedCount": "0",
                    "curedCount": "41",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "马鞍山",
                    "confirmedCount": "38",
                    "suspectedCount": "0",
                    "curedCount": "38",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "芜湖",
                    "confirmedCount": "34",
                    "suspectedCount": "0",
                    "curedCount": "34",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "铜陵",
                    "confirmedCount": "29",
                    "suspectedCount": "0",
                    "curedCount": "29",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "淮北",
                    "confirmedCount": "28",
                    "suspectedCount": "0",
                    "curedCount": "28",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "淮南",
                    "confirmedCount": "27",
                    "suspectedCount": "0",
                    "curedCount": "27",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "池州",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "滁州",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "黄山",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "宣城",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "安徽省",
                    "confirmedCount": "991",
                    "suspectedCount": "0",
                    "curedCount": "985",
                    "deadCount": "6",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "澳门",
                    "cityName": "澳门",
                    "confirmedCount": "45",
                    "suspectedCount": "9",
                    "curedCount": "44",
                    "deadCount": "0",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/17 8:11"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "朝阳区",
                    "confirmedCount": "75",
                    "suspectedCount": "0",
                    "curedCount": "0",
                    "deadCount": "0",
                    "currentConfirmedCount": "75",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "海淀区",
                    "confirmedCount": "64",
                    "suspectedCount": "0",
                    "curedCount": "0",
                    "deadCount": "0",
                    "currentConfirmedCount": "64",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "西城区",
                    "confirmedCount": "53",
                    "suspectedCount": "0",
                    "curedCount": "0",
                    "deadCount": "0",
                    "currentConfirmedCount": "53",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "丰台区",
                    "confirmedCount": "43",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "40",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "大兴区",
                    "confirmedCount": "39",
                    "suspectedCount": "0",
                    "curedCount": "16",
                    "deadCount": "0",
                    "currentConfirmedCount": "23",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "外地来京",
                    "confirmedCount": "25",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "23",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "昌平区",
                    "confirmedCount": "29",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "19",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "通州区",
                    "confirmedCount": "19",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "18",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "房山区",
                    "confirmedCount": "16",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "13",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "东城区",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "13",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "怀柔区",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "0",
                    "deadCount": "0",
                    "currentConfirmedCount": "7",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "密云区",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "0",
                    "deadCount": "0",
                    "currentConfirmedCount": "7",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "石景山区",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "5",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "境外输入",
                    "confirmedCount": "174",
                    "suspectedCount": "3",
                    "curedCount": "170",
                    "deadCount": "0",
                    "currentConfirmedCount": "4",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "门头沟区",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "延庆区",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "0",
                    "deadCount": "0",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "顺义区",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "待明确地区",
                    "confirmedCount": "0",
                    "suspectedCount": "0",
                    "curedCount": "351",
                    "deadCount": "9",
                    "currentConfirmedCount": "-360",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "北京市",
                    "confirmedCount": "593",
                    "suspectedCount": "164",
                    "curedCount": "578",
                    "deadCount": "9",
                    "currentConfirmedCount": "6",
                    "updateTime": "2020/5/18 8:38"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "万州区",
                    "confirmedCount": "118",
                    "suspectedCount": "0",
                    "curedCount": "114",
                    "deadCount": "4",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "江北区",
                    "confirmedCount": "28",
                    "suspectedCount": "0",
                    "curedCount": "28",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "云阳县",
                    "confirmedCount": "25",
                    "suspectedCount": "0",
                    "curedCount": "25",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "合川区",
                    "confirmedCount": "23",
                    "suspectedCount": "0",
                    "curedCount": "23",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "綦江区",
                    "confirmedCount": "23",
                    "suspectedCount": "0",
                    "curedCount": "23",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "长寿区",
                    "confirmedCount": "22",
                    "suspectedCount": "0",
                    "curedCount": "22",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "奉节县",
                    "confirmedCount": "22",
                    "suspectedCount": "0",
                    "curedCount": "22",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "九龙坡区",
                    "confirmedCount": "21",
                    "suspectedCount": "0",
                    "curedCount": "20",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "开州区",
                    "confirmedCount": "21",
                    "suspectedCount": "0",
                    "curedCount": "20",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "忠县",
                    "confirmedCount": "21",
                    "suspectedCount": "0",
                    "curedCount": "21",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "渝中区",
                    "confirmedCount": "20",
                    "suspectedCount": "0",
                    "curedCount": "20",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "垫江县",
                    "confirmedCount": "20",
                    "suspectedCount": "0",
                    "curedCount": "20",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "潼南区",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "18",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "渝北区",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "两江新区",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "南岸区",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "15",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "石柱县",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "15",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "大足区",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "巫溪县",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "铜梁区",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "丰都县",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "巫山县",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "沙坪坝区",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "璧山区",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "荣昌区",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "大渡口区",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "巴南区",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "涪陵区",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "永川区",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "江津区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "梁平区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "高新区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "境外输入",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "黔江区",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "城口县",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "彭水县",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "武隆区",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "秀山县",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "酉阳县",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "万盛经开区",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "重庆市",
                    "confirmedCount": "579",
                    "suspectedCount": "1",
                    "curedCount": "573",
                    "deadCount": "6",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "福州",
                    "confirmedCount": "72",
                    "suspectedCount": "0",
                    "curedCount": "71",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "境外输入人员",
                    "confirmedCount": "60",
                    "suspectedCount": "1",
                    "curedCount": "60",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "莆田",
                    "confirmedCount": "56",
                    "suspectedCount": "0",
                    "curedCount": "56",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "泉州",
                    "confirmedCount": "47",
                    "suspectedCount": "0",
                    "curedCount": "47",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "厦门",
                    "confirmedCount": "35",
                    "suspectedCount": "0",
                    "curedCount": "35",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "宁德",
                    "confirmedCount": "26",
                    "suspectedCount": "0",
                    "curedCount": "26",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "漳州",
                    "confirmedCount": "20",
                    "suspectedCount": "0",
                    "curedCount": "20",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "南平",
                    "confirmedCount": "20",
                    "suspectedCount": "0",
                    "curedCount": "20",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "三明",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "龙岩",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "福建省",
                    "confirmedCount": "356",
                    "suspectedCount": "3",
                    "curedCount": "355",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "境外输入",
                    "confirmedCount": "47",
                    "suspectedCount": "0",
                    "curedCount": "47",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "兰州",
                    "confirmedCount": "36",
                    "suspectedCount": "0",
                    "curedCount": "34",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "天水",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "12",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "平凉",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "定西",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "甘南",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "白银",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "陇南",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "庆阳",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "临夏",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "张掖",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "金昌",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "省级（湖北输入）",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "甘肃省",
                    "confirmedCount": "139",
                    "suspectedCount": "0",
                    "curedCount": "137",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "广州",
                    "confirmedCount": "506",
                    "suspectedCount": "4",
                    "curedCount": "503",
                    "deadCount": "1",
                    "currentConfirmedCount": "2",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "深圳",
                    "confirmedCount": "462",
                    "suspectedCount": "1",
                    "curedCount": "458",
                    "deadCount": "3",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "珠海",
                    "confirmedCount": "103",
                    "suspectedCount": "1",
                    "curedCount": "102",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "东莞",
                    "confirmedCount": "100",
                    "suspectedCount": "0",
                    "curedCount": "99",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "佛山",
                    "confirmedCount": "100",
                    "suspectedCount": "1",
                    "curedCount": "100",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "中山",
                    "confirmedCount": "69",
                    "suspectedCount": "0",
                    "curedCount": "69",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "惠州",
                    "confirmedCount": "62",
                    "suspectedCount": "0",
                    "curedCount": "62",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "汕头",
                    "confirmedCount": "26",
                    "suspectedCount": "0",
                    "curedCount": "26",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "江门",
                    "confirmedCount": "24",
                    "suspectedCount": "0",
                    "curedCount": "24",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "湛江",
                    "confirmedCount": "24",
                    "suspectedCount": "2",
                    "curedCount": "24",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "肇庆",
                    "confirmedCount": "20",
                    "suspectedCount": "0",
                    "curedCount": "19",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "梅州",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "阳江",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "茂名",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "清远",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "12",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "揭阳",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "韶关",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "潮州",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "汕尾",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "河源",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "广东省",
                    "confirmedCount": "1590",
                    "suspectedCount": "11",
                    "curedCount": "1579",
                    "deadCount": "8",
                    "currentConfirmedCount": "3",
                    "updateTime": "2020/5/17 8:31"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "南宁",
                    "confirmedCount": "55",
                    "suspectedCount": "0",
                    "curedCount": "55",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "北海",
                    "confirmedCount": "44",
                    "suspectedCount": "0",
                    "curedCount": "43",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "桂林",
                    "confirmedCount": "32",
                    "suspectedCount": "0",
                    "curedCount": "32",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "河池",
                    "confirmedCount": "28",
                    "suspectedCount": "0",
                    "curedCount": "27",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "柳州",
                    "confirmedCount": "24",
                    "suspectedCount": "0",
                    "curedCount": "24",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "防城港",
                    "confirmedCount": "19",
                    "suspectedCount": "0",
                    "curedCount": "19",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "玉林",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "来宾",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "钦州",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "贵港",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "梧州",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "贺州",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "百色",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "境外输入",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "广西壮族自治区",
                    "confirmedCount": "254",
                    "suspectedCount": "0",
                    "curedCount": "252",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "贵阳",
                    "confirmedCount": "36",
                    "suspectedCount": "0",
                    "curedCount": "35",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "遵义",
                    "confirmedCount": "32",
                    "suspectedCount": "0",
                    "curedCount": "32",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "毕节",
                    "confirmedCount": "23",
                    "suspectedCount": "0",
                    "curedCount": "23",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "黔南州",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "六盘水",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "铜仁",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "黔东南州",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "安顺",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "黔西南州",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "境外输入",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "贵州省",
                    "confirmedCount": "147",
                    "suspectedCount": "0",
                    "curedCount": "145",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "三亚",
                    "confirmedCount": "55",
                    "suspectedCount": "0",
                    "curedCount": "53",
                    "deadCount": "1",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "海口",
                    "confirmedCount": "39",
                    "suspectedCount": "0",
                    "curedCount": "39",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "儋州",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "万宁",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "澄迈",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "昌江",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "琼海",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "临高",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "陵水",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "定安",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "文昌",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "东方",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "保亭",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "乐东",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "琼中",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "海南省",
                    "confirmedCount": "169",
                    "suspectedCount": "0",
                    "curedCount": "162",
                    "deadCount": "6",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/15 21:09"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "唐山",
                    "confirmedCount": "58",
                    "suspectedCount": "0",
                    "curedCount": "57",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "沧州",
                    "confirmedCount": "48",
                    "suspectedCount": "0",
                    "curedCount": "45",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "张家口",
                    "confirmedCount": "41",
                    "suspectedCount": "0",
                    "curedCount": "41",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "保定",
                    "confirmedCount": "32",
                    "suspectedCount": "0",
                    "curedCount": "32",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "邯郸",
                    "confirmedCount": "32",
                    "suspectedCount": "0",
                    "curedCount": "32",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "廊坊",
                    "confirmedCount": "30",
                    "suspectedCount": "0",
                    "curedCount": "30",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "石家庄",
                    "confirmedCount": "29",
                    "suspectedCount": "0",
                    "curedCount": "29",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "邢台",
                    "confirmedCount": "23",
                    "suspectedCount": "0",
                    "curedCount": "22",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "秦皇岛",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "境外输入",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "衡水",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "承德",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "河北省",
                    "confirmedCount": "328",
                    "suspectedCount": "0",
                    "curedCount": "322",
                    "deadCount": "6",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "信阳",
                    "confirmedCount": "274",
                    "suspectedCount": "0",
                    "curedCount": "272",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "郑州",
                    "confirmedCount": "157",
                    "suspectedCount": "0",
                    "curedCount": "152",
                    "deadCount": "5",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "南阳",
                    "confirmedCount": "156",
                    "suspectedCount": "0",
                    "curedCount": "153",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "驻马店",
                    "confirmedCount": "139",
                    "suspectedCount": "0",
                    "curedCount": "139",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "商丘",
                    "confirmedCount": "91",
                    "suspectedCount": "0",
                    "curedCount": "88",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "周口",
                    "confirmedCount": "76",
                    "suspectedCount": "0",
                    "curedCount": "75",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "平顶山",
                    "confirmedCount": "58",
                    "suspectedCount": "0",
                    "curedCount": "57",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "新乡",
                    "confirmedCount": "57",
                    "suspectedCount": "0",
                    "curedCount": "54",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "安阳",
                    "confirmedCount": "53",
                    "suspectedCount": "0",
                    "curedCount": "53",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "许昌",
                    "confirmedCount": "39",
                    "suspectedCount": "0",
                    "curedCount": "38",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "漯河",
                    "confirmedCount": "36",
                    "suspectedCount": "0",
                    "curedCount": "36",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "焦作",
                    "confirmedCount": "32",
                    "suspectedCount": "0",
                    "curedCount": "31",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "洛阳",
                    "confirmedCount": "31",
                    "suspectedCount": "0",
                    "curedCount": "30",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "开封",
                    "confirmedCount": "26",
                    "suspectedCount": "0",
                    "curedCount": "26",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "鹤壁",
                    "confirmedCount": "19",
                    "suspectedCount": "0",
                    "curedCount": "19",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "濮阳",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "三门峡",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "济源",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "境外输入",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "河南省",
                    "confirmedCount": "1276",
                    "suspectedCount": "0",
                    "curedCount": "1254",
                    "deadCount": "22",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "境外输入",
                    "confirmedCount": "386",
                    "suspectedCount": "386",
                    "curedCount": "386",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "哈尔滨",
                    "confirmedCount": "264",
                    "suspectedCount": "8",
                    "curedCount": "260",
                    "deadCount": "4",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "双鸭山",
                    "confirmedCount": "52",
                    "suspectedCount": "0",
                    "curedCount": "49",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "绥化",
                    "confirmedCount": "47",
                    "suspectedCount": "0",
                    "curedCount": "43",
                    "deadCount": "4",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "鸡西",
                    "confirmedCount": "46",
                    "suspectedCount": "0",
                    "curedCount": "46",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "齐齐哈尔",
                    "confirmedCount": "43",
                    "suspectedCount": "0",
                    "curedCount": "42",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "大庆",
                    "confirmedCount": "27",
                    "suspectedCount": "0",
                    "curedCount": "26",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "牡丹江",
                    "confirmedCount": "25",
                    "suspectedCount": "0",
                    "curedCount": "25",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "七台河",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "佳木斯",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "15",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "黑河",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "鹤岗",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "大兴安岭",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "伊春",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "黑龙江省",
                    "confirmedCount": "945",
                    "suspectedCount": "394",
                    "curedCount": "932",
                    "deadCount": "13",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "武汉",
                    "confirmedCount": "50340",
                    "suspectedCount": "0",
                    "curedCount": "46464",
                    "deadCount": "3869",
                    "currentConfirmedCount": "7",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "孝感",
                    "confirmedCount": "3518",
                    "suspectedCount": "0",
                    "curedCount": "3389",
                    "deadCount": "129",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "黄冈",
                    "confirmedCount": "2907",
                    "suspectedCount": "0",
                    "curedCount": "2782",
                    "deadCount": "125",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "荆州",
                    "confirmedCount": "1580",
                    "suspectedCount": "0",
                    "curedCount": "1528",
                    "deadCount": "52",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "鄂州",
                    "confirmedCount": "1394",
                    "suspectedCount": "0",
                    "curedCount": "1335",
                    "deadCount": "59",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "随州",
                    "confirmedCount": "1307",
                    "suspectedCount": "0",
                    "curedCount": "1262",
                    "deadCount": "45",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "襄阳",
                    "confirmedCount": "1175",
                    "suspectedCount": "0",
                    "curedCount": "1135",
                    "deadCount": "40",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "黄石",
                    "confirmedCount": "1015",
                    "suspectedCount": "0",
                    "curedCount": "976",
                    "deadCount": "39",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "宜昌",
                    "confirmedCount": "931",
                    "suspectedCount": "0",
                    "curedCount": "894",
                    "deadCount": "37",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "荆门",
                    "confirmedCount": "928",
                    "suspectedCount": "0",
                    "curedCount": "887",
                    "deadCount": "41",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "咸宁",
                    "confirmedCount": "836",
                    "suspectedCount": "0",
                    "curedCount": "821",
                    "deadCount": "15",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "十堰",
                    "confirmedCount": "672",
                    "suspectedCount": "0",
                    "curedCount": "664",
                    "deadCount": "8",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "仙桃",
                    "confirmedCount": "575",
                    "suspectedCount": "0",
                    "curedCount": "553",
                    "deadCount": "22",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "天门",
                    "confirmedCount": "496",
                    "suspectedCount": "0",
                    "curedCount": "481",
                    "deadCount": "15",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "恩施州",
                    "confirmedCount": "252",
                    "suspectedCount": "0",
                    "curedCount": "245",
                    "deadCount": "7",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "潜江",
                    "confirmedCount": "198",
                    "suspectedCount": "0",
                    "curedCount": "189",
                    "deadCount": "9",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "神农架林区",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "湖北省",
                    "confirmedCount": "68135",
                    "suspectedCount": "0",
                    "curedCount": "63616",
                    "deadCount": "4512",
                    "currentConfirmedCount": "7",
                    "updateTime": "2020/5/19 8:47"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "长沙",
                    "confirmedCount": "242",
                    "suspectedCount": "0",
                    "curedCount": "240",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "岳阳",
                    "confirmedCount": "156",
                    "suspectedCount": "0",
                    "curedCount": "155",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "邵阳",
                    "confirmedCount": "102",
                    "suspectedCount": "0",
                    "curedCount": "101",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "常德",
                    "confirmedCount": "82",
                    "suspectedCount": "0",
                    "curedCount": "82",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "株洲",
                    "confirmedCount": "80",
                    "suspectedCount": "0",
                    "curedCount": "80",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "娄底",
                    "confirmedCount": "76",
                    "suspectedCount": "0",
                    "curedCount": "76",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "益阳",
                    "confirmedCount": "60",
                    "suspectedCount": "0",
                    "curedCount": "60",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "衡阳",
                    "confirmedCount": "48",
                    "suspectedCount": "0",
                    "curedCount": "48",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "永州",
                    "confirmedCount": "44",
                    "suspectedCount": "0",
                    "curedCount": "44",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "怀化",
                    "confirmedCount": "40",
                    "suspectedCount": "0",
                    "curedCount": "40",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "郴州",
                    "confirmedCount": "39",
                    "suspectedCount": "0",
                    "curedCount": "39",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "湘潭",
                    "confirmedCount": "36",
                    "suspectedCount": "0",
                    "curedCount": "36",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "湘西自治州",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "张家界",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "境外输入",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "湖南省",
                    "confirmedCount": "1019",
                    "suspectedCount": "0",
                    "curedCount": "1015",
                    "deadCount": "4",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "吉林市",
                    "confirmedCount": "56",
                    "suspectedCount": "12",
                    "curedCount": "29",
                    "deadCount": "1",
                    "currentConfirmedCount": "26",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "长春",
                    "confirmedCount": "49",
                    "suspectedCount": "1",
                    "curedCount": "49",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "四平市",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "辽源",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "延边",
                    "confirmedCount": "7",
                    "suspectedCount": "1",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "公主岭",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "通化",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "松原",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "梅河口",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "白城",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "吉林省",
                    "confirmedCount": "151",
                    "suspectedCount": "19",
                    "curedCount": "123",
                    "deadCount": "2",
                    "currentConfirmedCount": "26",
                    "updateTime": "2020/5/19 8:49"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "南京",
                    "confirmedCount": "93",
                    "suspectedCount": "0",
                    "curedCount": "93",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "苏州",
                    "confirmedCount": "87",
                    "suspectedCount": "0",
                    "curedCount": "87",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "徐州",
                    "confirmedCount": "79",
                    "suspectedCount": "0",
                    "curedCount": "79",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "淮安",
                    "confirmedCount": "66",
                    "suspectedCount": "0",
                    "curedCount": "66",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "无锡",
                    "confirmedCount": "55",
                    "suspectedCount": "0",
                    "curedCount": "55",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "常州",
                    "confirmedCount": "51",
                    "suspectedCount": "0",
                    "curedCount": "51",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "连云港",
                    "confirmedCount": "48",
                    "suspectedCount": "0",
                    "curedCount": "48",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "南通",
                    "confirmedCount": "40",
                    "suspectedCount": "0",
                    "curedCount": "40",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "泰州",
                    "confirmedCount": "37",
                    "suspectedCount": "0",
                    "curedCount": "37",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "盐城",
                    "confirmedCount": "27",
                    "suspectedCount": "0",
                    "curedCount": "27",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "扬州",
                    "confirmedCount": "23",
                    "suspectedCount": "0",
                    "curedCount": "23",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "境外输入",
                    "confirmedCount": "22",
                    "suspectedCount": "0",
                    "curedCount": "22",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "宿迁",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "镇江",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "12",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "江苏省",
                    "confirmedCount": "653",
                    "suspectedCount": "3",
                    "curedCount": "653",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "南昌",
                    "confirmedCount": "230",
                    "suspectedCount": "0",
                    "curedCount": "230",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "新余",
                    "confirmedCount": "130",
                    "suspectedCount": "0",
                    "curedCount": "130",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "上饶",
                    "confirmedCount": "123",
                    "suspectedCount": "0",
                    "curedCount": "123",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "九江",
                    "confirmedCount": "118",
                    "suspectedCount": "0",
                    "curedCount": "118",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "宜春",
                    "confirmedCount": "106",
                    "suspectedCount": "0",
                    "curedCount": "106",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "赣州",
                    "confirmedCount": "76",
                    "suspectedCount": "0",
                    "curedCount": "75",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "抚州",
                    "confirmedCount": "72",
                    "suspectedCount": "0",
                    "curedCount": "72",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "萍乡",
                    "confirmedCount": "33",
                    "suspectedCount": "0",
                    "curedCount": "33",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "吉安",
                    "confirmedCount": "22",
                    "suspectedCount": "0",
                    "curedCount": "22",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "鹰潭",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "18",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "景德镇",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "境外输入",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "赣江新区",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "江西省",
                    "confirmedCount": "937",
                    "suspectedCount": "0",
                    "curedCount": "936",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "沈阳",
                    "confirmedCount": "31",
                    "suspectedCount": "0",
                    "curedCount": "28",
                    "deadCount": "0",
                    "currentConfirmedCount": "3",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "境外输入",
                    "confirmedCount": "21",
                    "suspectedCount": "0",
                    "curedCount": "21",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "大连",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "18",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "锦州",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "12",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "葫芦岛",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "丹东",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "盘锦",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "阜新",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "铁岭",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "朝阳",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "鞍山",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "本溪",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "辽阳",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "营口",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "抚顺",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "辽宁省",
                    "confirmedCount": "149",
                    "suspectedCount": "0",
                    "curedCount": "144",
                    "deadCount": "2",
                    "currentConfirmedCount": "3",
                    "updateTime": "2020/5/14 8:10"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "境外输入人员",
                    "confirmedCount": "139",
                    "suspectedCount": "34",
                    "curedCount": "121",
                    "deadCount": "0",
                    "currentConfirmedCount": "18",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "呼伦贝尔",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "鄂尔多斯",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "包头",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "赤峰",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "锡林郭勒盟",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "巴彦淖尔",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "呼和浩特",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "通辽",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "乌兰察布",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "乌海市",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "兴安盟",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "内蒙古自治区",
                    "confirmedCount": "216",
                    "suspectedCount": "34",
                    "curedCount": "196",
                    "deadCount": "1",
                    "currentConfirmedCount": "19",
                    "updateTime": "2020/5/19 8:23"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "宁夏回族自治区",
                    "cityName": "银川",
                    "confirmedCount": "36",
                    "suspectedCount": "0",
                    "curedCount": "36",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/16 16:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "宁夏回族自治区",
                    "cityName": "吴忠",
                    "confirmedCount": "28",
                    "suspectedCount": "0",
                    "curedCount": "28",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/16 16:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "宁夏回族自治区",
                    "cityName": "固原",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/16 16:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "宁夏回族自治区",
                    "cityName": "中卫",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/16 16:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "宁夏回族自治区",
                    "cityName": "宁东",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/16 16:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "宁夏回族自治区",
                    "cityName": "石嘴山",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/16 16:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "宁夏回族自治区",
                    "cityName": "宁夏回族自治区",
                    "confirmedCount": "75",
                    "suspectedCount": "0",
                    "curedCount": "75",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/16 16:47"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "青海省",
                    "cityName": "西宁",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "15",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/2/23 19:19"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "青海省",
                    "cityName": "海北州",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/2/23 19:19"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "青海省",
                    "cityName": "青海省",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "18",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/2/23 19:19"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "境外输入",
                    "confirmedCount": "25",
                    "suspectedCount": "14",
                    "curedCount": "24",
                    "deadCount": "0",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "济宁",
                    "confirmedCount": "260",
                    "suspectedCount": "0",
                    "curedCount": "260",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "青岛",
                    "confirmedCount": "65",
                    "suspectedCount": "0",
                    "curedCount": "64",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "临沂",
                    "confirmedCount": "49",
                    "suspectedCount": "0",
                    "curedCount": "49",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "济南",
                    "confirmedCount": "47",
                    "suspectedCount": "0",
                    "curedCount": "47",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "烟台",
                    "confirmedCount": "47",
                    "suspectedCount": "0",
                    "curedCount": "47",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "潍坊",
                    "confirmedCount": "44",
                    "suspectedCount": "0",
                    "curedCount": "44",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "威海",
                    "confirmedCount": "38",
                    "suspectedCount": "0",
                    "curedCount": "37",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "聊城",
                    "confirmedCount": "38",
                    "suspectedCount": "0",
                    "curedCount": "38",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "德州",
                    "confirmedCount": "37",
                    "suspectedCount": "0",
                    "curedCount": "35",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "泰安",
                    "confirmedCount": "35",
                    "suspectedCount": "0",
                    "curedCount": "33",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "淄博",
                    "confirmedCount": "30",
                    "suspectedCount": "0",
                    "curedCount": "29",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "枣庄",
                    "confirmedCount": "24",
                    "suspectedCount": "0",
                    "curedCount": "24",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "菏泽",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "18",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "日照",
                    "confirmedCount": "16",
                    "suspectedCount": "0",
                    "curedCount": "16",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "滨州",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "15",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "山东省",
                    "confirmedCount": "788",
                    "suspectedCount": "14",
                    "curedCount": "780",
                    "deadCount": "7",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/16 8:47"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "境外输入",
                    "confirmedCount": "64",
                    "suspectedCount": "64",
                    "curedCount": "64",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "晋中",
                    "confirmedCount": "37",
                    "suspectedCount": "0",
                    "curedCount": "37",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "太原",
                    "confirmedCount": "21",
                    "suspectedCount": "0",
                    "curedCount": "21",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "运城",
                    "confirmedCount": "19",
                    "suspectedCount": "0",
                    "curedCount": "19",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "大同",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "12",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "晋城",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "长治",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "朔州",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "忻州",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "吕梁",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "阳泉",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "临汾",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "山西省",
                    "confirmedCount": "198",
                    "suspectedCount": "64",
                    "curedCount": "198",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "境外输入",
                    "confirmedCount": "63",
                    "suspectedCount": "0",
                    "curedCount": "61",
                    "deadCount": "0",
                    "currentConfirmedCount": "2",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "西安",
                    "confirmedCount": "120",
                    "suspectedCount": "0",
                    "curedCount": "117",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "安康",
                    "confirmedCount": "26",
                    "suspectedCount": "0",
                    "curedCount": "26",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "汉中",
                    "confirmedCount": "26",
                    "suspectedCount": "0",
                    "curedCount": "26",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "咸阳",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "渭南",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "15",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "宝鸡",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "延安",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "铜川",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "商洛",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "榆林",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "韩城",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "杨凌",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "陕西省",
                    "confirmedCount": "308",
                    "suspectedCount": "1",
                    "curedCount": "303",
                    "deadCount": "3",
                    "currentConfirmedCount": "2",
                    "updateTime": "2020/5/19 8:33"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "境外输入",
                    "confirmedCount": "326",
                    "suspectedCount": "4",
                    "curedCount": "309",
                    "deadCount": "0",
                    "currentConfirmedCount": "17",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "外地来沪",
                    "confirmedCount": "112",
                    "suspectedCount": "0",
                    "curedCount": "110",
                    "deadCount": "1",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "浦东新区",
                    "confirmedCount": "61",
                    "suspectedCount": "0",
                    "curedCount": "60",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "宝山区",
                    "confirmedCount": "22",
                    "suspectedCount": "0",
                    "curedCount": "21",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "闵行区",
                    "confirmedCount": "19",
                    "suspectedCount": "0",
                    "curedCount": "19",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "徐汇区",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "静安区",
                    "confirmedCount": "16",
                    "suspectedCount": "0",
                    "curedCount": "15",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "松江区",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "长宁区",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "普陀区",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "杨浦区",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "嘉定区",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "奉贤区",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "虹口区",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "黄浦区",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "青浦区",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "金山区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "崇明区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "上海市",
                    "confirmedCount": "666",
                    "suspectedCount": "300",
                    "curedCount": "641",
                    "deadCount": "7",
                    "currentConfirmedCount": "18",
                    "updateTime": "2020/5/18 8:15"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "成都",
                    "confirmedCount": "166",
                    "suspectedCount": "13",
                    "curedCount": "163",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "甘孜州",
                    "confirmedCount": "78",
                    "suspectedCount": "0",
                    "curedCount": "78",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "达州",
                    "confirmedCount": "42",
                    "suspectedCount": "0",
                    "curedCount": "42",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "南充",
                    "confirmedCount": "39",
                    "suspectedCount": "0",
                    "curedCount": "39",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "广安",
                    "confirmedCount": "30",
                    "suspectedCount": "0",
                    "curedCount": "30",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "泸州",
                    "confirmedCount": "24",
                    "suspectedCount": "0",
                    "curedCount": "24",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "巴中",
                    "confirmedCount": "24",
                    "suspectedCount": "0",
                    "curedCount": "24",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "绵阳",
                    "confirmedCount": "22",
                    "suspectedCount": "0",
                    "curedCount": "22",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "内江",
                    "confirmedCount": "22",
                    "suspectedCount": "0",
                    "curedCount": "22",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "德阳",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "18",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "遂宁",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "攀枝花",
                    "confirmedCount": "16",
                    "suspectedCount": "0",
                    "curedCount": "16",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "凉山州",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "宜宾",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "12",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "自贡",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "眉山",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "雅安",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "广元",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "资阳",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "乐山",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "阿坝州",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "四川省",
                    "confirmedCount": "561",
                    "suspectedCount": "13",
                    "curedCount": "558",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "台湾",
                    "cityName": "台湾",
                    "confirmedCount": "440",
                    "suspectedCount": "348",
                    "curedCount": "398",
                    "deadCount": "7",
                    "currentConfirmedCount": "35",
                    "updateTime": "2020/5/18 16:31"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "境外输入",
                    "confirmedCount": "56",
                    "suspectedCount": "0",
                    "curedCount": "54",
                    "deadCount": "0",
                    "currentConfirmedCount": "2",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "宝坻区",
                    "confirmedCount": "60",
                    "suspectedCount": "0",
                    "curedCount": "58",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "河东区",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "河北区",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "12",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "北辰区",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "南开区",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "和平区",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "外地来津",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "东丽区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "宁河区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "河西区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "西青区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "滨海新区",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "武清区",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "红桥区",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "津南区",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "天津市",
                    "confirmedCount": "192",
                    "suspectedCount": "48",
                    "curedCount": "187",
                    "deadCount": "3",
                    "currentConfirmedCount": "2",
                    "updateTime": "2020/5/17 9:58"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "西藏自治区",
                    "cityName": "拉萨",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/2/23 19:19"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "西藏自治区",
                    "cityName": "西藏自治区",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/2/23 19:19"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "香港",
                    "cityName": "香港",
                    "confirmedCount": "1055",
                    "suspectedCount": "47",
                    "curedCount": "1025",
                    "deadCount": "4",
                    "currentConfirmedCount": "26",
                    "updateTime": "2020/5/18 18:47"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "乌鲁木齐",
                    "confirmedCount": "23",
                    "suspectedCount": "0",
                    "curedCount": "23",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "伊犁州",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "18",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "兵团第四师",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "兵团第八师石河子市",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "兵团第九师",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "昌吉州",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "吐鲁番市",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "巴州",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "兵团第十二师",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "兵团第六师五家渠市",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "兵团第七师",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "阿克苏地区",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "新疆维吾尔自治区",
                    "confirmedCount": "76",
                    "suspectedCount": "0",
                    "curedCount": "73",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "昆明",
                    "confirmedCount": "53",
                    "suspectedCount": "0",
                    "curedCount": "53",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "昭通",
                    "confirmedCount": "25",
                    "suspectedCount": "0",
                    "curedCount": "25",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "西双版纳",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "玉溪",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "曲靖",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "大理州",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "境外输入",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "红河州",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "保山",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "丽江",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "德宏州",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "普洱",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "楚雄州",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "文山州",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "临沧",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "云南省",
                    "confirmedCount": "185",
                    "suspectedCount": "0",
                    "curedCount": "183",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "温州",
                    "confirmedCount": "504",
                    "suspectedCount": "0",
                    "curedCount": "503",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "杭州",
                    "confirmedCount": "181",
                    "suspectedCount": "0",
                    "curedCount": "181",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "宁波",
                    "confirmedCount": "157",
                    "suspectedCount": "0",
                    "curedCount": "157",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "台州",
                    "confirmedCount": "146",
                    "suspectedCount": "0",
                    "curedCount": "146",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "金华",
                    "confirmedCount": "55",
                    "suspectedCount": "0",
                    "curedCount": "55",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "境外输入",
                    "confirmedCount": "50",
                    "suspectedCount": "2",
                    "curedCount": "50",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "嘉兴",
                    "confirmedCount": "46",
                    "suspectedCount": "0",
                    "curedCount": "46",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "绍兴",
                    "confirmedCount": "42",
                    "suspectedCount": "0",
                    "curedCount": "42",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "省十里丰监狱",
                    "confirmedCount": "36",
                    "suspectedCount": "0",
                    "curedCount": "36",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "丽水",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "衢州",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "湖州",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "舟山",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "浙江省",
                    "confirmedCount": "1268",
                    "suspectedCount": "3",
                    "curedCount": "1267",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "中国",
                    "cityName": "中国",
                    "confirmedCount": "84503",
                    "suspectedCount": "0",
                    "curedCount": "79708",
                    "deadCount": "4645",
                    "currentConfirmedCount": "150",
                    "updateTime": "2020/5/19 8:49"
                }
            ]
        ]
        this.loadprovince()
    },
    methods: {
        timeformat: function (time) {
            return (new Date(time).Format("yyyy-MM-dd hh:mm:ss"))
        },
        tableRowClassName({
            row,
            rowIndex
        }) {
            if (rowIndex % 2 == 0) {
                return 'warning-row';
            } else if (rowIndex % 3 == 0) {
                return 'main-row';
            } else if (rowIndex % 4 == 0) {
                return 'success-row';
            }
            return '';
        },
        loadprovince: function () {
            this.choose = 0
            if (this.tableData.length == 0) {
                this.tableData = this.world
                // axios.get('https://lab.isaaclin.cn/nCoV/api/area').then(response => {
                //     this.tableData = response.data.results
                //     for (let i = 0; i < this.tableData.length; i++) {
                //         this.tableData[i].updateTime = this.timeformat(this.tableData[i].updateTime)
                //     }
                // })
            }
        },
        loadcity: function (str) {
            this.choose = 1
            for (let i = 0; i < this.chinacity.length; i++) {
                if (str == this.chinacity[i][0].provinceName) {
                    this.cityData = this.chinacity[i].reverse()
                    break
                }
            }
            // axios.get('https://lab.isaaclin.cn/nCoV/api/area?province=' + str).then(response => {
            //     var table = response.data.results[0]
            //     var city = {}
            //     city.cityName = table.provinceName
            //     city.currentConfirmedCount = table.currentConfirmedCount
            //     city.confirmedCount = table.confirmedCount
            //     city.suspectedCount = table.suspectedCount
            //     city.curedCount = table.curedCount
            //     city.deadCount = table.deadCount
            //     table.updateTime = this.timeformat(table.updateTime)
            //     if (table.cities == null) {
            //         table.cities = []
            //     }
            //     table.cities.push(city)
            //     this.cityData = table.cities.reverse()
            // })
        },
    }
})
var charts = new Vue({
    el: "#charts",
    data: {
        chart: '',
        map: '',
        option: '',
        cityData: [],
        overall: [],
        detail: [],
        updateTime: '',
        provinceList: [
            "安徽省",
            "澳门",
            "北京市",
            "重庆市",
            "福建省",
            "甘肃省",
            "广东省",
            "广西壮族自治区",
            "贵州省",
            "海南省",
            "河北省",
            "河南省",
            "黑龙江省",
            "湖北省",
            "湖南省",
            "吉林省",
            "江苏省",
            "江西省",
            "辽宁省",
            "内蒙古自治区",
            "宁夏回族自治区",
            "青海省",
            "山东省",
            "山西省",
            "陕西省",
            "上海市",
            "四川省",
            "台湾",
            "天津市",
            "西藏自治区",
            "香港",
            "新疆维吾尔自治区",
            "云南省",
            "浙江省",
            "中国"
        ],
        chinacity: ''
    },
    created: function () {
        this.chinacity = [
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "合肥",
                    "confirmedCount": "174",
                    "suspectedCount": "0",
                    "curedCount": "173",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "蚌埠",
                    "confirmedCount": "160",
                    "suspectedCount": "0",
                    "curedCount": "155",
                    "deadCount": "5",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "阜阳",
                    "confirmedCount": "155",
                    "suspectedCount": "0",
                    "curedCount": "155",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "亳州",
                    "confirmedCount": "108",
                    "suspectedCount": "0",
                    "curedCount": "108",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "安庆",
                    "confirmedCount": "83",
                    "suspectedCount": "0",
                    "curedCount": "83",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "六安",
                    "confirmedCount": "69",
                    "suspectedCount": "0",
                    "curedCount": "69",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "宿州",
                    "confirmedCount": "41",
                    "suspectedCount": "0",
                    "curedCount": "41",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "马鞍山",
                    "confirmedCount": "38",
                    "suspectedCount": "0",
                    "curedCount": "38",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "芜湖",
                    "confirmedCount": "34",
                    "suspectedCount": "0",
                    "curedCount": "34",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "铜陵",
                    "confirmedCount": "29",
                    "suspectedCount": "0",
                    "curedCount": "29",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "淮北",
                    "confirmedCount": "28",
                    "suspectedCount": "0",
                    "curedCount": "28",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "淮南",
                    "confirmedCount": "27",
                    "suspectedCount": "0",
                    "curedCount": "27",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "池州",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "滁州",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "黄山",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "宣城",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "安徽省",
                    "cityName": "安徽省",
                    "confirmedCount": "991",
                    "suspectedCount": "0",
                    "curedCount": "985",
                    "deadCount": "6",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 20:04"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "澳门",
                    "cityName": "澳门",
                    "confirmedCount": "45",
                    "suspectedCount": "9",
                    "curedCount": "44",
                    "deadCount": "0",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/17 8:11"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "朝阳区",
                    "confirmedCount": "75",
                    "suspectedCount": "0",
                    "curedCount": "0",
                    "deadCount": "0",
                    "currentConfirmedCount": "75",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "海淀区",
                    "confirmedCount": "64",
                    "suspectedCount": "0",
                    "curedCount": "0",
                    "deadCount": "0",
                    "currentConfirmedCount": "64",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "西城区",
                    "confirmedCount": "53",
                    "suspectedCount": "0",
                    "curedCount": "0",
                    "deadCount": "0",
                    "currentConfirmedCount": "53",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "丰台区",
                    "confirmedCount": "43",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "40",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "大兴区",
                    "confirmedCount": "39",
                    "suspectedCount": "0",
                    "curedCount": "16",
                    "deadCount": "0",
                    "currentConfirmedCount": "23",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "外地来京",
                    "confirmedCount": "25",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "23",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "昌平区",
                    "confirmedCount": "29",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "19",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "通州区",
                    "confirmedCount": "19",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "18",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "房山区",
                    "confirmedCount": "16",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "13",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "东城区",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "13",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "怀柔区",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "0",
                    "deadCount": "0",
                    "currentConfirmedCount": "7",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "密云区",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "0",
                    "deadCount": "0",
                    "currentConfirmedCount": "7",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "石景山区",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "5",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "境外输入",
                    "confirmedCount": "174",
                    "suspectedCount": "3",
                    "curedCount": "170",
                    "deadCount": "0",
                    "currentConfirmedCount": "4",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "门头沟区",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "延庆区",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "0",
                    "deadCount": "0",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "顺义区",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "待明确地区",
                    "confirmedCount": "0",
                    "suspectedCount": "0",
                    "curedCount": "351",
                    "deadCount": "9",
                    "currentConfirmedCount": "-360",
                    "updateTime": "2020/5/18 8:38"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "北京市",
                    "cityName": "北京市",
                    "confirmedCount": "593",
                    "suspectedCount": "164",
                    "curedCount": "578",
                    "deadCount": "9",
                    "currentConfirmedCount": "6",
                    "updateTime": "2020/5/18 8:38"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "万州区",
                    "confirmedCount": "118",
                    "suspectedCount": "0",
                    "curedCount": "114",
                    "deadCount": "4",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "江北区",
                    "confirmedCount": "28",
                    "suspectedCount": "0",
                    "curedCount": "28",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "云阳县",
                    "confirmedCount": "25",
                    "suspectedCount": "0",
                    "curedCount": "25",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "合川区",
                    "confirmedCount": "23",
                    "suspectedCount": "0",
                    "curedCount": "23",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "綦江区",
                    "confirmedCount": "23",
                    "suspectedCount": "0",
                    "curedCount": "23",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "长寿区",
                    "confirmedCount": "22",
                    "suspectedCount": "0",
                    "curedCount": "22",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "奉节县",
                    "confirmedCount": "22",
                    "suspectedCount": "0",
                    "curedCount": "22",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "九龙坡区",
                    "confirmedCount": "21",
                    "suspectedCount": "0",
                    "curedCount": "20",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "开州区",
                    "confirmedCount": "21",
                    "suspectedCount": "0",
                    "curedCount": "20",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "忠县",
                    "confirmedCount": "21",
                    "suspectedCount": "0",
                    "curedCount": "21",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "渝中区",
                    "confirmedCount": "20",
                    "suspectedCount": "0",
                    "curedCount": "20",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "垫江县",
                    "confirmedCount": "20",
                    "suspectedCount": "0",
                    "curedCount": "20",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "潼南区",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "18",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "渝北区",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "两江新区",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "南岸区",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "15",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "石柱县",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "15",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "大足区",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "巫溪县",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "铜梁区",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "丰都县",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "巫山县",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "沙坪坝区",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "璧山区",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "荣昌区",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "大渡口区",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "巴南区",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "涪陵区",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "永川区",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "江津区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "梁平区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "高新区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "境外输入",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "黔江区",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "城口县",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "彭水县",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "武隆区",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "秀山县",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "酉阳县",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "万盛经开区",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "重庆市",
                    "cityName": "重庆市",
                    "confirmedCount": "579",
                    "suspectedCount": "1",
                    "curedCount": "573",
                    "deadCount": "6",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 8:43"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "福州",
                    "confirmedCount": "72",
                    "suspectedCount": "0",
                    "curedCount": "71",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "境外输入人员",
                    "confirmedCount": "60",
                    "suspectedCount": "1",
                    "curedCount": "60",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "莆田",
                    "confirmedCount": "56",
                    "suspectedCount": "0",
                    "curedCount": "56",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "泉州",
                    "confirmedCount": "47",
                    "suspectedCount": "0",
                    "curedCount": "47",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "厦门",
                    "confirmedCount": "35",
                    "suspectedCount": "0",
                    "curedCount": "35",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "宁德",
                    "confirmedCount": "26",
                    "suspectedCount": "0",
                    "curedCount": "26",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "漳州",
                    "confirmedCount": "20",
                    "suspectedCount": "0",
                    "curedCount": "20",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "南平",
                    "confirmedCount": "20",
                    "suspectedCount": "0",
                    "curedCount": "20",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "三明",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "龙岩",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "福建省",
                    "cityName": "福建省",
                    "confirmedCount": "356",
                    "suspectedCount": "3",
                    "curedCount": "355",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 8:53"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "境外输入",
                    "confirmedCount": "47",
                    "suspectedCount": "0",
                    "curedCount": "47",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "兰州",
                    "confirmedCount": "36",
                    "suspectedCount": "0",
                    "curedCount": "34",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "天水",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "12",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "平凉",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "定西",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "甘南",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "白银",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "陇南",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "庆阳",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "临夏",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "张掖",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "金昌",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "省级（湖北输入）",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "甘肃省",
                    "cityName": "甘肃省",
                    "confirmedCount": "139",
                    "suspectedCount": "0",
                    "curedCount": "137",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/16 21:44"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "广州",
                    "confirmedCount": "506",
                    "suspectedCount": "4",
                    "curedCount": "503",
                    "deadCount": "1",
                    "currentConfirmedCount": "2",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "深圳",
                    "confirmedCount": "462",
                    "suspectedCount": "1",
                    "curedCount": "458",
                    "deadCount": "3",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "珠海",
                    "confirmedCount": "103",
                    "suspectedCount": "1",
                    "curedCount": "102",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "东莞",
                    "confirmedCount": "100",
                    "suspectedCount": "0",
                    "curedCount": "99",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "佛山",
                    "confirmedCount": "100",
                    "suspectedCount": "1",
                    "curedCount": "100",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "中山",
                    "confirmedCount": "69",
                    "suspectedCount": "0",
                    "curedCount": "69",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "惠州",
                    "confirmedCount": "62",
                    "suspectedCount": "0",
                    "curedCount": "62",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "汕头",
                    "confirmedCount": "26",
                    "suspectedCount": "0",
                    "curedCount": "26",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "江门",
                    "confirmedCount": "24",
                    "suspectedCount": "0",
                    "curedCount": "24",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "湛江",
                    "confirmedCount": "24",
                    "suspectedCount": "2",
                    "curedCount": "24",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "肇庆",
                    "confirmedCount": "20",
                    "suspectedCount": "0",
                    "curedCount": "19",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "梅州",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "阳江",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "茂名",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "清远",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "12",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "揭阳",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "韶关",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "潮州",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "汕尾",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "河源",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广东省",
                    "cityName": "广东省",
                    "confirmedCount": "1590",
                    "suspectedCount": "11",
                    "curedCount": "1579",
                    "deadCount": "8",
                    "currentConfirmedCount": "3",
                    "updateTime": "2020/5/17 8:31"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "南宁",
                    "confirmedCount": "55",
                    "suspectedCount": "0",
                    "curedCount": "55",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "北海",
                    "confirmedCount": "44",
                    "suspectedCount": "0",
                    "curedCount": "43",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "桂林",
                    "confirmedCount": "32",
                    "suspectedCount": "0",
                    "curedCount": "32",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "河池",
                    "confirmedCount": "28",
                    "suspectedCount": "0",
                    "curedCount": "27",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "柳州",
                    "confirmedCount": "24",
                    "suspectedCount": "0",
                    "curedCount": "24",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "防城港",
                    "confirmedCount": "19",
                    "suspectedCount": "0",
                    "curedCount": "19",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "玉林",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "来宾",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "钦州",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "贵港",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "梧州",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "贺州",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "百色",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "境外输入",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "广西壮族自治区",
                    "cityName": "广西壮族自治区",
                    "confirmedCount": "254",
                    "suspectedCount": "0",
                    "curedCount": "252",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/2 8:16"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "贵阳",
                    "confirmedCount": "36",
                    "suspectedCount": "0",
                    "curedCount": "35",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "遵义",
                    "confirmedCount": "32",
                    "suspectedCount": "0",
                    "curedCount": "32",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "毕节",
                    "confirmedCount": "23",
                    "suspectedCount": "0",
                    "curedCount": "23",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "黔南州",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "六盘水",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "铜仁",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "黔东南州",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "安顺",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "黔西南州",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "境外输入",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "贵州省",
                    "cityName": "贵州省",
                    "confirmedCount": "147",
                    "suspectedCount": "0",
                    "curedCount": "145",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/19 8:51"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "三亚",
                    "confirmedCount": "55",
                    "suspectedCount": "0",
                    "curedCount": "53",
                    "deadCount": "1",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "海口",
                    "confirmedCount": "39",
                    "suspectedCount": "0",
                    "curedCount": "39",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "儋州",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "万宁",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "澄迈",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "昌江",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "琼海",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "临高",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "陵水",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "定安",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "文昌",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "东方",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "保亭",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "乐东",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "琼中",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/15 21:09"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "海南省",
                    "cityName": "海南省",
                    "confirmedCount": "169",
                    "suspectedCount": "0",
                    "curedCount": "162",
                    "deadCount": "6",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/15 21:09"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "唐山",
                    "confirmedCount": "58",
                    "suspectedCount": "0",
                    "curedCount": "57",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "沧州",
                    "confirmedCount": "48",
                    "suspectedCount": "0",
                    "curedCount": "45",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "张家口",
                    "confirmedCount": "41",
                    "suspectedCount": "0",
                    "curedCount": "41",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "保定",
                    "confirmedCount": "32",
                    "suspectedCount": "0",
                    "curedCount": "32",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "邯郸",
                    "confirmedCount": "32",
                    "suspectedCount": "0",
                    "curedCount": "32",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "廊坊",
                    "confirmedCount": "30",
                    "suspectedCount": "0",
                    "curedCount": "30",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "石家庄",
                    "confirmedCount": "29",
                    "suspectedCount": "0",
                    "curedCount": "29",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "邢台",
                    "confirmedCount": "23",
                    "suspectedCount": "0",
                    "curedCount": "22",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "秦皇岛",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "境外输入",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "衡水",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "承德",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河北省",
                    "cityName": "河北省",
                    "confirmedCount": "328",
                    "suspectedCount": "0",
                    "curedCount": "322",
                    "deadCount": "6",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:55"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "信阳",
                    "confirmedCount": "274",
                    "suspectedCount": "0",
                    "curedCount": "272",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "郑州",
                    "confirmedCount": "157",
                    "suspectedCount": "0",
                    "curedCount": "152",
                    "deadCount": "5",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "南阳",
                    "confirmedCount": "156",
                    "suspectedCount": "0",
                    "curedCount": "153",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "驻马店",
                    "confirmedCount": "139",
                    "suspectedCount": "0",
                    "curedCount": "139",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "商丘",
                    "confirmedCount": "91",
                    "suspectedCount": "0",
                    "curedCount": "88",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "周口",
                    "confirmedCount": "76",
                    "suspectedCount": "0",
                    "curedCount": "75",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "平顶山",
                    "confirmedCount": "58",
                    "suspectedCount": "0",
                    "curedCount": "57",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "新乡",
                    "confirmedCount": "57",
                    "suspectedCount": "0",
                    "curedCount": "54",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "安阳",
                    "confirmedCount": "53",
                    "suspectedCount": "0",
                    "curedCount": "53",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "许昌",
                    "confirmedCount": "39",
                    "suspectedCount": "0",
                    "curedCount": "38",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "漯河",
                    "confirmedCount": "36",
                    "suspectedCount": "0",
                    "curedCount": "36",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "焦作",
                    "confirmedCount": "32",
                    "suspectedCount": "0",
                    "curedCount": "31",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "洛阳",
                    "confirmedCount": "31",
                    "suspectedCount": "0",
                    "curedCount": "30",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "开封",
                    "confirmedCount": "26",
                    "suspectedCount": "0",
                    "curedCount": "26",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "鹤壁",
                    "confirmedCount": "19",
                    "suspectedCount": "0",
                    "curedCount": "19",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "濮阳",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "三门峡",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "济源",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "境外输入",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "河南省",
                    "cityName": "河南省",
                    "confirmedCount": "1276",
                    "suspectedCount": "0",
                    "curedCount": "1254",
                    "deadCount": "22",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/14 8:43"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "境外输入",
                    "confirmedCount": "386",
                    "suspectedCount": "386",
                    "curedCount": "386",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "哈尔滨",
                    "confirmedCount": "264",
                    "suspectedCount": "8",
                    "curedCount": "260",
                    "deadCount": "4",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "双鸭山",
                    "confirmedCount": "52",
                    "suspectedCount": "0",
                    "curedCount": "49",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "绥化",
                    "confirmedCount": "47",
                    "suspectedCount": "0",
                    "curedCount": "43",
                    "deadCount": "4",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "鸡西",
                    "confirmedCount": "46",
                    "suspectedCount": "0",
                    "curedCount": "46",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "齐齐哈尔",
                    "confirmedCount": "43",
                    "suspectedCount": "0",
                    "curedCount": "42",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "大庆",
                    "confirmedCount": "27",
                    "suspectedCount": "0",
                    "curedCount": "26",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "牡丹江",
                    "confirmedCount": "25",
                    "suspectedCount": "0",
                    "curedCount": "25",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "七台河",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "佳木斯",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "15",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "黑河",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "鹤岗",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "大兴安岭",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "伊春",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "黑龙江省",
                    "cityName": "黑龙江省",
                    "confirmedCount": "945",
                    "suspectedCount": "394",
                    "curedCount": "932",
                    "deadCount": "13",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 8:15"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "武汉",
                    "confirmedCount": "50340",
                    "suspectedCount": "0",
                    "curedCount": "46464",
                    "deadCount": "3869",
                    "currentConfirmedCount": "7",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "孝感",
                    "confirmedCount": "3518",
                    "suspectedCount": "0",
                    "curedCount": "3389",
                    "deadCount": "129",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "黄冈",
                    "confirmedCount": "2907",
                    "suspectedCount": "0",
                    "curedCount": "2782",
                    "deadCount": "125",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "荆州",
                    "confirmedCount": "1580",
                    "suspectedCount": "0",
                    "curedCount": "1528",
                    "deadCount": "52",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "鄂州",
                    "confirmedCount": "1394",
                    "suspectedCount": "0",
                    "curedCount": "1335",
                    "deadCount": "59",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "随州",
                    "confirmedCount": "1307",
                    "suspectedCount": "0",
                    "curedCount": "1262",
                    "deadCount": "45",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "襄阳",
                    "confirmedCount": "1175",
                    "suspectedCount": "0",
                    "curedCount": "1135",
                    "deadCount": "40",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "黄石",
                    "confirmedCount": "1015",
                    "suspectedCount": "0",
                    "curedCount": "976",
                    "deadCount": "39",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "宜昌",
                    "confirmedCount": "931",
                    "suspectedCount": "0",
                    "curedCount": "894",
                    "deadCount": "37",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "荆门",
                    "confirmedCount": "928",
                    "suspectedCount": "0",
                    "curedCount": "887",
                    "deadCount": "41",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "咸宁",
                    "confirmedCount": "836",
                    "suspectedCount": "0",
                    "curedCount": "821",
                    "deadCount": "15",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "十堰",
                    "confirmedCount": "672",
                    "suspectedCount": "0",
                    "curedCount": "664",
                    "deadCount": "8",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "仙桃",
                    "confirmedCount": "575",
                    "suspectedCount": "0",
                    "curedCount": "553",
                    "deadCount": "22",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "天门",
                    "confirmedCount": "496",
                    "suspectedCount": "0",
                    "curedCount": "481",
                    "deadCount": "15",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "恩施州",
                    "confirmedCount": "252",
                    "suspectedCount": "0",
                    "curedCount": "245",
                    "deadCount": "7",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "潜江",
                    "confirmedCount": "198",
                    "suspectedCount": "0",
                    "curedCount": "189",
                    "deadCount": "9",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "神农架林区",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖北省",
                    "cityName": "湖北省",
                    "confirmedCount": "68135",
                    "suspectedCount": "0",
                    "curedCount": "63616",
                    "deadCount": "4512",
                    "currentConfirmedCount": "7",
                    "updateTime": "2020/5/19 8:47"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "长沙",
                    "confirmedCount": "242",
                    "suspectedCount": "0",
                    "curedCount": "240",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "岳阳",
                    "confirmedCount": "156",
                    "suspectedCount": "0",
                    "curedCount": "155",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "邵阳",
                    "confirmedCount": "102",
                    "suspectedCount": "0",
                    "curedCount": "101",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "常德",
                    "confirmedCount": "82",
                    "suspectedCount": "0",
                    "curedCount": "82",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "株洲",
                    "confirmedCount": "80",
                    "suspectedCount": "0",
                    "curedCount": "80",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "娄底",
                    "confirmedCount": "76",
                    "suspectedCount": "0",
                    "curedCount": "76",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "益阳",
                    "confirmedCount": "60",
                    "suspectedCount": "0",
                    "curedCount": "60",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "衡阳",
                    "confirmedCount": "48",
                    "suspectedCount": "0",
                    "curedCount": "48",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "永州",
                    "confirmedCount": "44",
                    "suspectedCount": "0",
                    "curedCount": "44",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "怀化",
                    "confirmedCount": "40",
                    "suspectedCount": "0",
                    "curedCount": "40",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "郴州",
                    "confirmedCount": "39",
                    "suspectedCount": "0",
                    "curedCount": "39",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "湘潭",
                    "confirmedCount": "36",
                    "suspectedCount": "0",
                    "curedCount": "36",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "湘西自治州",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "张家界",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "境外输入",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "湖南省",
                    "cityName": "湖南省",
                    "confirmedCount": "1019",
                    "suspectedCount": "0",
                    "curedCount": "1015",
                    "deadCount": "4",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/18 9:15"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "吉林市",
                    "confirmedCount": "56",
                    "suspectedCount": "12",
                    "curedCount": "29",
                    "deadCount": "1",
                    "currentConfirmedCount": "26",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "长春",
                    "confirmedCount": "49",
                    "suspectedCount": "1",
                    "curedCount": "49",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "四平市",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "辽源",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "延边",
                    "confirmedCount": "7",
                    "suspectedCount": "1",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "公主岭",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "通化",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "松原",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "梅河口",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "白城",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:49"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "吉林省",
                    "cityName": "吉林省",
                    "confirmedCount": "151",
                    "suspectedCount": "19",
                    "curedCount": "123",
                    "deadCount": "2",
                    "currentConfirmedCount": "26",
                    "updateTime": "2020/5/19 8:49"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "南京",
                    "confirmedCount": "93",
                    "suspectedCount": "0",
                    "curedCount": "93",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "苏州",
                    "confirmedCount": "87",
                    "suspectedCount": "0",
                    "curedCount": "87",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "徐州",
                    "confirmedCount": "79",
                    "suspectedCount": "0",
                    "curedCount": "79",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "淮安",
                    "confirmedCount": "66",
                    "suspectedCount": "0",
                    "curedCount": "66",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "无锡",
                    "confirmedCount": "55",
                    "suspectedCount": "0",
                    "curedCount": "55",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "常州",
                    "confirmedCount": "51",
                    "suspectedCount": "0",
                    "curedCount": "51",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "连云港",
                    "confirmedCount": "48",
                    "suspectedCount": "0",
                    "curedCount": "48",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "南通",
                    "confirmedCount": "40",
                    "suspectedCount": "0",
                    "curedCount": "40",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "泰州",
                    "confirmedCount": "37",
                    "suspectedCount": "0",
                    "curedCount": "37",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "盐城",
                    "confirmedCount": "27",
                    "suspectedCount": "0",
                    "curedCount": "27",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "扬州",
                    "confirmedCount": "23",
                    "suspectedCount": "0",
                    "curedCount": "23",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "境外输入",
                    "confirmedCount": "22",
                    "suspectedCount": "0",
                    "curedCount": "22",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "宿迁",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "镇江",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "12",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江苏省",
                    "cityName": "江苏省",
                    "confirmedCount": "653",
                    "suspectedCount": "3",
                    "curedCount": "653",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/11 9:29"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "南昌",
                    "confirmedCount": "230",
                    "suspectedCount": "0",
                    "curedCount": "230",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "新余",
                    "confirmedCount": "130",
                    "suspectedCount": "0",
                    "curedCount": "130",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "上饶",
                    "confirmedCount": "123",
                    "suspectedCount": "0",
                    "curedCount": "123",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "九江",
                    "confirmedCount": "118",
                    "suspectedCount": "0",
                    "curedCount": "118",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "宜春",
                    "confirmedCount": "106",
                    "suspectedCount": "0",
                    "curedCount": "106",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "赣州",
                    "confirmedCount": "76",
                    "suspectedCount": "0",
                    "curedCount": "75",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "抚州",
                    "confirmedCount": "72",
                    "suspectedCount": "0",
                    "curedCount": "72",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "萍乡",
                    "confirmedCount": "33",
                    "suspectedCount": "0",
                    "curedCount": "33",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "吉安",
                    "confirmedCount": "22",
                    "suspectedCount": "0",
                    "curedCount": "22",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "鹰潭",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "18",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "景德镇",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "境外输入",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "赣江新区",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "江西省",
                    "cityName": "江西省",
                    "confirmedCount": "937",
                    "suspectedCount": "0",
                    "curedCount": "936",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/10 9:22"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "沈阳",
                    "confirmedCount": "31",
                    "suspectedCount": "0",
                    "curedCount": "28",
                    "deadCount": "0",
                    "currentConfirmedCount": "3",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "境外输入",
                    "confirmedCount": "21",
                    "suspectedCount": "0",
                    "curedCount": "21",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "大连",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "18",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "锦州",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "12",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "葫芦岛",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "丹东",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "盘锦",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "阜新",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "铁岭",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "朝阳",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "鞍山",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "本溪",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "辽阳",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "营口",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "抚顺",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/14 8:10"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "辽宁省",
                    "cityName": "辽宁省",
                    "confirmedCount": "149",
                    "suspectedCount": "0",
                    "curedCount": "144",
                    "deadCount": "2",
                    "currentConfirmedCount": "3",
                    "updateTime": "2020/5/14 8:10"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "境外输入人员",
                    "confirmedCount": "139",
                    "suspectedCount": "34",
                    "curedCount": "121",
                    "deadCount": "0",
                    "currentConfirmedCount": "18",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "呼伦贝尔",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "鄂尔多斯",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "包头",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "赤峰",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "锡林郭勒盟",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "巴彦淖尔",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "呼和浩特",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "通辽",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "乌兰察布",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "乌海市",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "兴安盟",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:23"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "内蒙古自治区",
                    "cityName": "内蒙古自治区",
                    "confirmedCount": "216",
                    "suspectedCount": "34",
                    "curedCount": "196",
                    "deadCount": "1",
                    "currentConfirmedCount": "19",
                    "updateTime": "2020/5/19 8:23"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "宁夏回族自治区",
                    "cityName": "银川",
                    "confirmedCount": "36",
                    "suspectedCount": "0",
                    "curedCount": "36",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/16 16:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "宁夏回族自治区",
                    "cityName": "吴忠",
                    "confirmedCount": "28",
                    "suspectedCount": "0",
                    "curedCount": "28",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/16 16:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "宁夏回族自治区",
                    "cityName": "固原",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/16 16:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "宁夏回族自治区",
                    "cityName": "中卫",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/16 16:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "宁夏回族自治区",
                    "cityName": "宁东",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/16 16:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "宁夏回族自治区",
                    "cityName": "石嘴山",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/16 16:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "宁夏回族自治区",
                    "cityName": "宁夏回族自治区",
                    "confirmedCount": "75",
                    "suspectedCount": "0",
                    "curedCount": "75",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/16 16:47"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "青海省",
                    "cityName": "西宁",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "15",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/2/23 19:19"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "青海省",
                    "cityName": "海北州",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/2/23 19:19"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "青海省",
                    "cityName": "青海省",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "18",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/2/23 19:19"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "境外输入",
                    "confirmedCount": "25",
                    "suspectedCount": "14",
                    "curedCount": "24",
                    "deadCount": "0",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "济宁",
                    "confirmedCount": "260",
                    "suspectedCount": "0",
                    "curedCount": "260",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "青岛",
                    "confirmedCount": "65",
                    "suspectedCount": "0",
                    "curedCount": "64",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "临沂",
                    "confirmedCount": "49",
                    "suspectedCount": "0",
                    "curedCount": "49",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "济南",
                    "confirmedCount": "47",
                    "suspectedCount": "0",
                    "curedCount": "47",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "烟台",
                    "confirmedCount": "47",
                    "suspectedCount": "0",
                    "curedCount": "47",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "潍坊",
                    "confirmedCount": "44",
                    "suspectedCount": "0",
                    "curedCount": "44",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "威海",
                    "confirmedCount": "38",
                    "suspectedCount": "0",
                    "curedCount": "37",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "聊城",
                    "confirmedCount": "38",
                    "suspectedCount": "0",
                    "curedCount": "38",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "德州",
                    "confirmedCount": "37",
                    "suspectedCount": "0",
                    "curedCount": "35",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "泰安",
                    "confirmedCount": "35",
                    "suspectedCount": "0",
                    "curedCount": "33",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "淄博",
                    "confirmedCount": "30",
                    "suspectedCount": "0",
                    "curedCount": "29",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "枣庄",
                    "confirmedCount": "24",
                    "suspectedCount": "0",
                    "curedCount": "24",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "菏泽",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "18",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "日照",
                    "confirmedCount": "16",
                    "suspectedCount": "0",
                    "curedCount": "16",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "滨州",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "15",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/16 8:47"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山东省",
                    "cityName": "山东省",
                    "confirmedCount": "788",
                    "suspectedCount": "14",
                    "curedCount": "780",
                    "deadCount": "7",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/16 8:47"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "境外输入",
                    "confirmedCount": "64",
                    "suspectedCount": "64",
                    "curedCount": "64",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "晋中",
                    "confirmedCount": "37",
                    "suspectedCount": "0",
                    "curedCount": "37",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "太原",
                    "confirmedCount": "21",
                    "suspectedCount": "0",
                    "curedCount": "21",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "运城",
                    "confirmedCount": "19",
                    "suspectedCount": "0",
                    "curedCount": "19",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "大同",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "12",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "晋城",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "长治",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "朔州",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "忻州",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "吕梁",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "阳泉",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "临汾",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "山西省",
                    "cityName": "山西省",
                    "confirmedCount": "198",
                    "suspectedCount": "64",
                    "curedCount": "198",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/13 8:33"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "境外输入",
                    "confirmedCount": "63",
                    "suspectedCount": "0",
                    "curedCount": "61",
                    "deadCount": "0",
                    "currentConfirmedCount": "2",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "西安",
                    "confirmedCount": "120",
                    "suspectedCount": "0",
                    "curedCount": "117",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "安康",
                    "confirmedCount": "26",
                    "suspectedCount": "0",
                    "curedCount": "26",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "汉中",
                    "confirmedCount": "26",
                    "suspectedCount": "0",
                    "curedCount": "26",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "咸阳",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "渭南",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "15",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "宝鸡",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "延安",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "铜川",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "商洛",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "榆林",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "韩城",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "杨凌",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/19 8:33"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "陕西省",
                    "cityName": "陕西省",
                    "confirmedCount": "308",
                    "suspectedCount": "1",
                    "curedCount": "303",
                    "deadCount": "3",
                    "currentConfirmedCount": "2",
                    "updateTime": "2020/5/19 8:33"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "境外输入",
                    "confirmedCount": "326",
                    "suspectedCount": "4",
                    "curedCount": "309",
                    "deadCount": "0",
                    "currentConfirmedCount": "17",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "外地来沪",
                    "confirmedCount": "112",
                    "suspectedCount": "0",
                    "curedCount": "110",
                    "deadCount": "1",
                    "currentConfirmedCount": "1",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "浦东新区",
                    "confirmedCount": "61",
                    "suspectedCount": "0",
                    "curedCount": "60",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "宝山区",
                    "confirmedCount": "22",
                    "suspectedCount": "0",
                    "curedCount": "21",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "闵行区",
                    "confirmedCount": "19",
                    "suspectedCount": "0",
                    "curedCount": "19",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "徐汇区",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "静安区",
                    "confirmedCount": "16",
                    "suspectedCount": "0",
                    "curedCount": "15",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "松江区",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "长宁区",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "普陀区",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "杨浦区",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "嘉定区",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "奉贤区",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "虹口区",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "黄浦区",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "青浦区",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "金山区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "崇明区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/18 8:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "上海市",
                    "cityName": "上海市",
                    "confirmedCount": "666",
                    "suspectedCount": "300",
                    "curedCount": "641",
                    "deadCount": "7",
                    "currentConfirmedCount": "18",
                    "updateTime": "2020/5/18 8:15"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "成都",
                    "confirmedCount": "166",
                    "suspectedCount": "13",
                    "curedCount": "163",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "甘孜州",
                    "confirmedCount": "78",
                    "suspectedCount": "0",
                    "curedCount": "78",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "达州",
                    "confirmedCount": "42",
                    "suspectedCount": "0",
                    "curedCount": "42",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "南充",
                    "confirmedCount": "39",
                    "suspectedCount": "0",
                    "curedCount": "39",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "广安",
                    "confirmedCount": "30",
                    "suspectedCount": "0",
                    "curedCount": "30",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "泸州",
                    "confirmedCount": "24",
                    "suspectedCount": "0",
                    "curedCount": "24",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "巴中",
                    "confirmedCount": "24",
                    "suspectedCount": "0",
                    "curedCount": "24",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "绵阳",
                    "confirmedCount": "22",
                    "suspectedCount": "0",
                    "curedCount": "22",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "内江",
                    "confirmedCount": "22",
                    "suspectedCount": "0",
                    "curedCount": "22",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "德阳",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "18",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "遂宁",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "攀枝花",
                    "confirmedCount": "16",
                    "suspectedCount": "0",
                    "curedCount": "16",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "凉山州",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "宜宾",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "12",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "自贡",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "眉山",
                    "confirmedCount": "8",
                    "suspectedCount": "0",
                    "curedCount": "8",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "雅安",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "广元",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "资阳",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "乐山",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "阿坝州",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "四川省",
                    "cityName": "四川省",
                    "confirmedCount": "561",
                    "suspectedCount": "13",
                    "curedCount": "558",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/4/24 9:27"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "台湾",
                    "cityName": "台湾",
                    "confirmedCount": "440",
                    "suspectedCount": "348",
                    "curedCount": "398",
                    "deadCount": "7",
                    "currentConfirmedCount": "35",
                    "updateTime": "2020/5/18 16:31"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "境外输入",
                    "confirmedCount": "56",
                    "suspectedCount": "0",
                    "curedCount": "54",
                    "deadCount": "0",
                    "currentConfirmedCount": "2",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "宝坻区",
                    "confirmedCount": "60",
                    "suspectedCount": "0",
                    "curedCount": "58",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "河东区",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "河北区",
                    "confirmedCount": "12",
                    "suspectedCount": "0",
                    "curedCount": "12",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "北辰区",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "南开区",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "和平区",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "外地来津",
                    "confirmedCount": "6",
                    "suspectedCount": "0",
                    "curedCount": "6",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "东丽区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "宁河区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "河西区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "西青区",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "滨海新区",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "武清区",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "红桥区",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "津南区",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/17 9:58"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "天津市",
                    "cityName": "天津市",
                    "confirmedCount": "192",
                    "suspectedCount": "48",
                    "curedCount": "187",
                    "deadCount": "3",
                    "currentConfirmedCount": "2",
                    "updateTime": "2020/5/17 9:58"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "西藏自治区",
                    "cityName": "拉萨",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/2/23 19:19"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "西藏自治区",
                    "cityName": "西藏自治区",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/2/23 19:19"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "香港",
                    "cityName": "香港",
                    "confirmedCount": "1055",
                    "suspectedCount": "47",
                    "curedCount": "1025",
                    "deadCount": "4",
                    "currentConfirmedCount": "26",
                    "updateTime": "2020/5/18 18:47"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "乌鲁木齐",
                    "confirmedCount": "23",
                    "suspectedCount": "0",
                    "curedCount": "23",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "伊犁州",
                    "confirmedCount": "18",
                    "suspectedCount": "0",
                    "curedCount": "18",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "兵团第四师",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "兵团第八师石河子市",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "兵团第九师",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "昌吉州",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "吐鲁番市",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "巴州",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "兵团第十二师",
                    "confirmedCount": "3",
                    "suspectedCount": "0",
                    "curedCount": "3",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "兵团第六师五家渠市",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "兵团第七师",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "阿克苏地区",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "新疆维吾尔自治区",
                    "cityName": "新疆维吾尔自治区",
                    "confirmedCount": "76",
                    "suspectedCount": "0",
                    "curedCount": "73",
                    "deadCount": "3",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/3/8 13:31"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "昆明",
                    "confirmedCount": "53",
                    "suspectedCount": "0",
                    "curedCount": "53",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "昭通",
                    "confirmedCount": "25",
                    "suspectedCount": "0",
                    "curedCount": "25",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "西双版纳",
                    "confirmedCount": "15",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "玉溪",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "曲靖",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "大理州",
                    "confirmedCount": "13",
                    "suspectedCount": "0",
                    "curedCount": "13",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "境外输入",
                    "confirmedCount": "11",
                    "suspectedCount": "0",
                    "curedCount": "11",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "红河州",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "保山",
                    "confirmedCount": "9",
                    "suspectedCount": "0",
                    "curedCount": "9",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "丽江",
                    "confirmedCount": "7",
                    "suspectedCount": "0",
                    "curedCount": "7",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "德宏州",
                    "confirmedCount": "5",
                    "suspectedCount": "0",
                    "curedCount": "5",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "普洱",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "楚雄州",
                    "confirmedCount": "4",
                    "suspectedCount": "0",
                    "curedCount": "4",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "文山州",
                    "confirmedCount": "2",
                    "suspectedCount": "0",
                    "curedCount": "2",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "临沧",
                    "confirmedCount": "1",
                    "suspectedCount": "0",
                    "curedCount": "1",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "云南省",
                    "cityName": "云南省",
                    "confirmedCount": "185",
                    "suspectedCount": "0",
                    "curedCount": "183",
                    "deadCount": "2",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/10 8:11"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "温州",
                    "confirmedCount": "504",
                    "suspectedCount": "0",
                    "curedCount": "503",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "杭州",
                    "confirmedCount": "181",
                    "suspectedCount": "0",
                    "curedCount": "181",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "宁波",
                    "confirmedCount": "157",
                    "suspectedCount": "0",
                    "curedCount": "157",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "台州",
                    "confirmedCount": "146",
                    "suspectedCount": "0",
                    "curedCount": "146",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "金华",
                    "confirmedCount": "55",
                    "suspectedCount": "0",
                    "curedCount": "55",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "境外输入",
                    "confirmedCount": "50",
                    "suspectedCount": "2",
                    "curedCount": "50",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "嘉兴",
                    "confirmedCount": "46",
                    "suspectedCount": "0",
                    "curedCount": "46",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "绍兴",
                    "confirmedCount": "42",
                    "suspectedCount": "0",
                    "curedCount": "42",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "省十里丰监狱",
                    "confirmedCount": "36",
                    "suspectedCount": "0",
                    "curedCount": "36",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "丽水",
                    "confirmedCount": "17",
                    "suspectedCount": "0",
                    "curedCount": "17",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "衢州",
                    "confirmedCount": "14",
                    "suspectedCount": "0",
                    "curedCount": "14",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "湖州",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "舟山",
                    "confirmedCount": "10",
                    "suspectedCount": "0",
                    "curedCount": "10",
                    "deadCount": "0",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                },
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "浙江省",
                    "cityName": "浙江省",
                    "confirmedCount": "1268",
                    "suspectedCount": "3",
                    "curedCount": "1267",
                    "deadCount": "1",
                    "currentConfirmedCount": "0",
                    "updateTime": "2020/5/5 9:15"
                }
            ],
            [
                {
                    "continentName": "亚洲",
                    "countryName": "中国",
                    "provinceName": "中国",
                    "cityName": "中国",
                    "confirmedCount": "84503",
                    "suspectedCount": "0",
                    "curedCount": "79708",
                    "deadCount": "4645",
                    "currentConfirmedCount": "150",
                    "updateTime": "2020/5/19 8:49"
                }
            ]
        ]
    },
    mounted: function () {
        var that = this
        // 基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(document.getElementById('chart'));
        this.map = echarts.init(document.getElementById('map'));
        // 指定图表的配置项和数据
        this.option = {
            title: {
                text: '',
                subtext: '',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['人数']
            },
            // toolbox: {
            //   show: true,
            //   feature: {
            //     mark: {
            //       show: true
            //     },
            //     dataView: {
            //       show: true,
            //       readOnly: false
            //     },
            //     magicType: {
            //       show: true,
            //       type: ['line', 'bar']
            //     },
            //     restore: {
            //       show: true
            //     },
            //     saveAsImage: {
            //       show: true
            //     }
            //   }
            // },
            calculable: true,
            xAxis: [{
                type: 'category',
                data: ['总确诊人数', '现存人数', '疑似人数', '治愈人数', '死亡人数']
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '人数',
                type: 'bar',
                data: '',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                }
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(this.option);
        // this.map.setOption(this.option);

        setTimeout(function () {
            that.loadcity('中国');
        }, 1500);

        setTimeout(function () {
            that.loadall();
        }, 3000);
    },
    methods: {
        timeformat: function (time) {
            return (new Date(time).Format("yyyy-MM-dd hh:mm:ss"))
        },
        loadcity: function (str) {
            for (let i = 0; i < this.chinacity.length; i++) {
                if (str == this.chinacity[i][0].provinceName) {
                    this.cityData = this.chinacity[i].reverse()
                    for (let j = 0; j < this.cityData.length; j++) {
                        this.cityData[j].data = []
                        this.cityData[j].data.push(this.cityData[j].confirmedCount)
                        this.cityData[j].data.push(this.cityData[j].currentConfirmedCount)
                        this.cityData[j].data.push(this.cityData[j].suspectedCount)
                        this.cityData[j].data.push(this.cityData[j].curedCount)
                        this.cityData[j].data.push(this.cityData[j].deadCount)
                    }
                    this.setOpt(this.cityData[0])
                    break
                }
            }
            // axios.get('https://lab.isaaclin.cn/nCoV/api/area?province=' + str).then(response => {
            //     var table = response.data.results[0]
            //     table.updateTime = this.timeformat(table.updateTime)
            //     var cities = []
            //     var city = {}
            //     city.data = []
            //     city.cityName = table.provinceName
            //     city.updateTime = table.updateTime
            //     city.data.push(table.confirmedCount)
            //     city.data.push(table.currentConfirmedCount)
            //     city.data.push(table.suspectedCount)
            //     city.data.push(table.curedCount)
            //     city.data.push(table.deadCount)
            //     cities.push(city)
            //     if (table.cities != null) {
            //         for (let i = 0; i < table.cities.length; i++) {
            //             var city = {}
            //             city.data = []
            //             city.cityName = table.cities[i].cityName
            //             city.updateTime = table.updateTime
            //             city.data.push(table.cities[i].confirmedCount)
            //             city.data.push(table.cities[i].currentConfirmedCount)
            //             city.data.push(table.cities[i].suspectedCount)
            //             city.data.push(table.cities[i].curedCount)
            //             city.data.push(table.cities[i].deadCount)
            //             cities.push(city)
            //         }
            //     }
            //     this.cityData = cities
            //     this.setOpt(this.cityData[0])
            // })
        },
        loadall: function () {
            var tableData = this.chinacity
            for (let i = 0; i < tableData.length-1; i++) {
                    tableData[i][tableData[i].length-1].provinceName = tableData[i][tableData[i].length-1].provinceName.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g,"")               
                    var all = {}
                    all.name = tableData[i][tableData[i].length-1].provinceName
                    all.value = tableData[i][tableData[i].length-1].confirmedCount
                    this.overall.push(all)
                    // console.log(this.overall)
                    var info = {}
                    info.value = []
                    info.name = tableData[i][tableData[i].length-1].provinceName
                    var obj1 = {}
                    var obj2 = {}
                    var obj3 = {}
                    var obj4 = {}
                    var obj5 = {}
                    obj1.name = "总确诊人数"
                    obj1.value = tableData[i][tableData[i].length-1].confirmedCount
                    info.value.push(obj1)
                    obj2.name = "现存人数"
                    obj2.value = tableData[i][tableData[i].length-1].currentConfirmedCount
                    info.value.push(obj2)
                    obj3.name = "疑似人数"
                    obj3.value = tableData[i][tableData[i].length-1].suspectedCount
                    info.value.push(obj3)
                    obj4.name = "治愈人数"
                    obj4.value = tableData[i][tableData[i].length-1].curedCount
                    info.value.push(obj4)
                    obj5.name = "死亡人数"
                    obj5.value = tableData[i][tableData[i].length-1].deadCount
                    info.value.push(obj5)
                    this.detail.push(info)
            }
            this.setMap()
            // axios.get('https://lab.isaaclin.cn/nCoV/api/area').then(response => {
            //     var tableData = response.data.results
            //     this.updateTime = this.timeformat(tableData[0].updateTime)
            //     for (let i = 0; i < tableData.length; i++) {
            //         if (tableData[i].countryName == '中国' && tableData[i].provinceName != '中国') {
            //             // tableData[i].provinceName = tableData[i].provinceName.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g,"")               
            //             var all = {}
            //             all.name = tableData[i].provinceShortName
            //             all.value = tableData[i].confirmedCount
            //             this.overall.push(all)
            //             // console.log(this.overall)
            //             var info = {}
            //             info.value = []
            //             info.name = tableData[i].provinceShortName
            //             var obj1 = {}
            //             var obj2 = {}
            //             var obj3 = {}
            //             var obj4 = {}
            //             var obj5 = {}
            //             obj1.name = "总确诊人数"
            //             obj1.value = tableData[i].confirmedCount
            //             info.value.push(obj1)
            //             obj2.name = "现存人数"
            //             obj2.value = tableData[i].currentConfirmedCount
            //             info.value.push(obj2)
            //             obj3.name = "疑似人数"
            //             obj3.value = tableData[i].suspectedCount
            //             info.value.push(obj3)
            //             obj4.name = "治愈人数"
            //             obj4.value = tableData[i].curedCount
            //             info.value.push(obj4)
            //             obj5.name = "死亡人数"
            //             obj5.value = tableData[i].deadCount
            //             info.value.push(obj5)
            //             this.detail.push(info)
            //         }
            //     }
            //     this.setMap()
            // })
            // console.log(this.overall)
            // console.log(this.detail)
        },
        setOpt: function (city) {
            this.option.title.text = city.cityName + '疫情数据'
            this.option.title.subtext = '更新时间：' + city.updateTime
            this.option.series[0].data = city.data
            this.chart.setOption(this.option);
        },
        setMap: function (city) {
            var that = this
            var name_title = "全国各省疫情状况分布图"
            var subname = '更新时间：' + this.updateTime
            var nameColor = " rgb(55, 75, 113)"
            var name_fontFamily = '等线'
            var subname_fontSize = 15
            var name_fontSize = 18
            var mapName = 'china'
            var geoCoordMap = {};
            var toolTipData = this.detail
            /*获取地图数据*/
            this.map.showLoading();
            var mapFeatures = echarts.getMap(mapName).geoJson.features;
            this.map.hideLoading();
            mapFeatures.forEach(function (v) {
                // 地区名称
                var name = v.properties.name;
                // 地区经纬度
                geoCoordMap[name] = v.properties.cp;
            });
            // console.log("============geoCoordMap===================")
            // console.log(geoCoordMap)
            // console.log("================data======================")
            // console.log(data)
            // console.log(toolTipData)
            var max = 480,
                min = 9; // todo 
            var maxSize4Pin = 10,
                minSize4Pin = 2;

            var res = [];
            for (var i = 0; i < that.overall.length; i++) {
                var geoCoord = geoCoordMap[that.overall[i].name];
                // console.log(geoCoord)
                if (geoCoord) {
                    // console.log(geoCoord.concat(that.overall[i].value))
                    res.push({
                        name: that.overall[i].name,
                        value: geoCoord.concat(that.overall[i].value),
                    });
                }
            }
            // console.log(res)

            var temp = that.overall.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 5)

            var rest = [];
            for (var i = 0; i < temp.length; i++) {
                var geoCoord = geoCoordMap[temp[i].name];
                // console.log(geoCoord)
                if (geoCoord) {
                    // console.log(geoCoord.concat(that.overall[i].value))
                    rest.push({
                        name: temp[i].name,
                        value: geoCoord.concat(temp[i].value),
                    });
                }
            }
            // console.log(rest)


            option = {
                title: {
                    text: name_title,
                    subtext: subname,
                    x: 'center',
                    textStyle: {
                        color: nameColor,
                        fontFamily: name_fontFamily,
                        fontSize: name_fontSize
                    },
                    subtextStyle: {
                        fontSize: subname_fontSize,
                        fontFamily: name_fontFamily
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        if (typeof (params.value)[2] == "undefined") {
                            var toolTiphtml = ''
                            for (var i = 0; i < toolTipData.length; i++) {
                                if (params.name == toolTipData[i].name) {
                                    toolTiphtml += toolTipData[i].name + ':<br>'
                                    for (var j = 0; j < toolTipData[i].value.length; j++) {
                                        toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j]
                                            .value + "<br>"
                                    }
                                }
                            }
                            // console.log(toolTiphtml)
                            return toolTiphtml;
                        } else {
                            var toolTiphtml = ''
                            for (var i = 0; i < toolTipData.length; i++) {
                                if (params.name == toolTipData[i].name) {
                                    toolTiphtml += toolTipData[i].name + ':<br>'
                                    for (var j = 0; j < toolTipData[i].value.length; j++) {
                                        toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j]
                                            .value + "<br>"
                                    }
                                }
                            }
                            // console.log(toolTiphtml)
                            return toolTiphtml;
                        }
                    }
                },
                visualMap: {
                    show: true,
                    min: 0,
                    max: 70000,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'], // 文本，默认为数值文本
                    calculable: true,
                    seriesIndex: [1],
                    inRange: {
                        // color: ['#3B5077', '#031525'] // 蓝黑
                        // color: ['#ffc0cb', '#800080'] // 红紫
                        // color: ['#3C3B3F', '#605C3C'] // 黑绿
                        // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                        // color: ['#23074d', '#cc5333'] // 紫红
                        color: ['#00467F', '#A5CC82'] // 蓝绿
                        // color: ['#1488CC', '#2B32B2'] // 浅蓝
                        // color: ['#00467F', '#A5CC82'] // 蓝绿
                        // color: ['#00467F', '#A5CC82'] // 蓝绿
                        // color: ['#00467F', '#A5CC82'] // 蓝绿
                        // color: ['#00467F', '#A5CC82'] // 蓝绿

                    }
                },
                geo: {
                    show: true,
                    map: mapName,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false,
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7',
                        }
                    }
                },
                series: [{
                        name: '散点',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: res,
                        symbolSize: function (val) {
                            return 10;
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#05C3F9'
                            }
                        }
                    },
                    {
                        type: 'map',
                        map: mapName,
                        geoIndex: 0,
                        aspectScale: 0.75, //长宽比
                        showLegendSymbol: false, // 存在legend时显示
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#031525',
                                borderColor: '#3B5077',
                            },
                            emphasis: {
                                areaColor: '#2B91B7'
                            }
                        },
                        animation: false,
                        data: that.overall
                    },
                    {
                        name: '点',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbol: 'pin', //气泡
                        symbolSize: function (val) {
                            return 40;
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 12,
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#F62157', //标志颜色
                            }
                        },
                        zlevel: 6,
                        data: res,
                    },
                    {
                        name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: rest,
                        symbolSize: function (val) {
                            return 10;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'yellow',
                                shadowBlur: 10,
                                shadowColor: 'yellow'
                            }
                        },
                        zlevel: 1
                    },

                ]
            };
            this.map.setOption(option);
        },
        detailmap: function () {
            window.location.href = './detail.html';
        }
    }
})
var feeling = new Vue({
    el: "#cloud",
    data: {
        linepie: '',
        option1: '',
        wordcloud: '',
        option2: '',
        words: '',
        monthList: [1, 2, 4],
        yue: '',
        news: []
    },
    created: function () {},
    mounted: function () {
        this.linepie = echarts.init(document.getElementById('linepie'));
        this.wordcloud = echarts.init(document.getElementById('wordcloud'));
        var maskImage = new Image();
        //重点：云彩图片的base64码
        maskImage.src =
            'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNTQ4LjE3NiA1NDguMTc2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NDguMTc2IDU0OC4xNzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNTI0LjE4MywyOTcuMDY1Yy0xNS45ODUtMTkuODkzLTM2LjI2NS0zMi42OTEtNjAuODE1LTM4LjM5OWM3LjgxLTExLjk5MywxMS43MDQtMjUuMTI2LDExLjcwNC0zOS4zOTkgICBjMC0yMC4xNzctNy4xMzktMzcuNDAxLTIxLjQwOS01MS42NzhjLTE0LjI3My0xNC4yNzItMzEuNDk4LTIxLjQxMS01MS42NzUtMjEuNDExYy0xOC4yNzEsMC0zNC4wNzEsNS45MDEtNDcuMzksMTcuNzAzICAgYy0xMS4yMjUtMjcuMDI4LTI5LjA3NS00OC45MTctNTMuNTI5LTY1LjY2N2MtMjQuNDYtMTYuNzQ2LTUxLjcyOC0yNS4xMjUtODEuODAyLTI1LjEyNWMtNDAuMzQ5LDAtNzQuODAyLDE0LjI3OS0xMDMuMzUzLDQyLjgzICAgYy0yOC41NTMsMjguNTQ0LTQyLjgyNSw2Mi45OTktNDIuODI1LDEwMy4zNTFjMCwyLjg1NiwwLjE5MSw2Ljk0NSwwLjU3MSwxMi4yNzVjLTIyLjA3OCwxMC4yNzktMzkuODc2LDI1LjgzOC01My4zODksNDYuNjg2ICAgQzYuNzU5LDI5OS4wNjcsMCwzMjIuMDU1LDAsMzQ3LjE4YzAsMzUuMjExLDEyLjUxNyw2NS4zMzMsMzcuNTQ0LDkwLjM1OWMyNS4wMjgsMjUuMDMzLDU1LjE1LDM3LjU0OCw5MC4zNjIsMzcuNTQ4aDMxMC42MzYgICBjMzAuMjU5LDAsNTYuMDk2LTEwLjcxNSw3Ny41MTItMzIuMTIxYzIxLjQxMy0yMS40MTIsMzIuMTIxLTQ3LjI0OSwzMi4xMjEtNzcuNTE1ICAgQzU0OC4xNzIsMzM5Ljc1Nyw1NDAuMTc0LDMxNi45NTIsNTI0LjE4MywyOTcuMDY1eiIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=';

        this.option1 = {
            color: ["#00ffa1", "#00fcff", "#f0e751", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3",
                "#9d96f5", "#8378EA", "#96BFFF"
            ],
            legend: [{
                show: true,
                top: '10%',
                right: '2%',
                textStyle: {
                    fontSize: 12,
                    color: '#000'
                },
                data: ['乐观', '平静', '悲伤', "愤怒", "担忧"]
            }],
            graphic: { //图形中间文字
                type: "text",
                right: 65,
                top: "center",
                style: {
                    text: '',
                    textAlign: "center",
                    fill: "#000",
                    fontSize: 10
                }
            },
            grid: {
                left: '10%',
                top: '25%',
                width: '60%',
                height: '50%'
            },
            dataZoom: [{
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 10,
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 10,
                }
            ],
            tooltip: {
                trigger: 'axis'
            },
            // toolbox: {
            //   feature: {
            //     mark: {
            //       show: true
            //     },
            //     dataView: {
            //       show: true,
            //       readOnly: false
            //     },
            //     restore: {
            //       show: true
            //     },
            //     saveAsImage: {
            //       show: true
            //     }
            //   }
            // },
            xAxis: {
                type: 'category',
                data: '',
                boundaryGap: false,
                axisLabel: {
                    interval: 0,
                }
            },
            yAxis: {
                name: '情感统计',
                type: 'value',
            },
            series: [{
                name: '乐观',
                smooth: true,
                type: 'line',
                lineStyle: {
                    normal: {
                        width: 2, //设置线宽
                        shadowColor: 'rgba(0,0,0,0.4)'
                    }
                },
                data: ''
            }, {
                name: '平静',
                smooth: true,
                type: 'line',
                lineStyle: {
                    normal: {
                        width: 2, //设置线宽
                        shadowColor: 'rgba(0,0,0,0.4)'
                    }
                },
                data: ''
            }, {
                name: '悲伤',
                smooth: true,
                type: 'line',
                lineStyle: {
                    normal: {
                        width: 2, //设置线宽
                        shadowColor: 'rgba(0,0,0,0.4)'
                    }
                },
                data: ''
            }, {
                name: '愤怒',
                smooth: true,
                type: 'line',
                lineStyle: {
                    normal: {
                        width: 2, //设置线宽
                        shadowColor: 'rgba(0,0,0,0.4)'
                    }
                },
                data: ''
            }, {
                name: '担忧',
                smooth: true,
                type: 'line',
                lineStyle: {
                    normal: {
                        width: 2, //设置线宽
                        shadowColor: 'rgba(0,0,0,0.4)'
                    }
                },
                data: ''
            }, {
                type: 'pie',
                center: ['84%', '50%'],
                radius: ['20%', '25%'],
                labelLine: {
                    normal: {
                        length: 10,
                        length2: 5,
                        show: true
                    }
                },
                label: {
                    normal: {
                        formatter: '{d} %',
                        textStyle: {
                            color: '#87CEFA',
                            fontSize: 10
                        }
                    },
                },
                color: ['#39cad4', '#51ebb3', '#f9f48e', '#fba790', '#21b4f6', '#F136AF', '#FF875C', ],
                data: [{
                    name: '乐观',
                    value: ''
                }, {
                    name: '平静',
                    value: ''
                }, {
                    name: '悲伤',
                    value: ''
                }, {
                    name: '愤怒',
                    value: ''
                }, {
                    name: '担忧',
                    value: ''
                }]
            }]
        };

        this.option2 = {
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            series: [{
                type: 'wordCloud',
                gridSize: 1,
                sizeRange: [12, 55],
                rotationRange: [-45, 0, 45, 90],
                maskImage: maskImage,
                textStyle: {
                    normal: {
                        color: function () {
                            return 'rgb(' +
                                Math.round(Math.random() * 255) +
                                ', ' + Math.round(Math.random() * 255) +
                                ', ' + Math.round(Math.random() * 255) + ')'
                        }
                    }
                },

                left: 'center',
                top: 'center',
                right: null,
                bottom: null,
                width: '90%',
                height: '110%',
                data: []
            }]
        }

        this.setFeeling(1)
    },
    methods: {
        setFeeling: function (n) {
            var that = this
            var r1 = [];
            var r2 = [];
            var r3 = [];
            var r4 = [];
            var r5 = [];
            var MyDate = [];
            this.yue = n
            axios.get('http://119.3.52.214:8080/sentimentPredict/?month=' + n).then(response => {
                var feeling = response.data.typeCount
                for (let i = 0; i < feeling.length; i++) {
                    MyDate.push(feeling[i].date)
                    r1.push(feeling[i].value.乐观)
                    r2.push(feeling[i].value.平静)
                    r3.push(feeling[i].value.悲伤)
                    r4.push(feeling[i].value.愤怒)
                    r5.push(feeling[i].value.担忧)
                }
                this.option1.xAxis.data = MyDate
                this.option1.graphic.style.text = MyDate[0]
                this.option1.series[0].data = r1
                this.option1.series[1].data = r2
                this.option1.series[2].data = r3
                this.option1.series[3].data = r4
                this.option1.series[4].data = r5
                this.option1.series[5].data[0] = r1[0]
                this.option1.series[5].data[1] = r2[0]
                this.option1.series[5].data[2] = r3[0]
                this.option1.series[5].data[3] = r4[0]
                this.option1.series[5].data[4] = r5[0]

                this.linepie.off('click')
                // 点击事件
                this.linepie.on('click', function (params) {
                    if (params.componentType === 'series' && params.seriesType === 'line') {
                        var dataIndex = params.dataIndex;
                        that.linepie.setOption({
                            graphic: { //图形中间文字
                                type: "text",
                                right: 65,
                                top: "center",
                                style: {
                                    text: MyDate[dataIndex],
                                    textAlign: "center",
                                    fill: "#000",
                                    fontSize: 10
                                }
                            },
                            series: [{
                                name: '乐观',
                                smooth: true,
                                type: 'line',
                                lineStyle: {
                                    normal: {
                                        width: 2, //设置线宽
                                        shadowColor: 'rgba(0,0,0,0.4)'
                                    }
                                },
                                data: r1
                            }, {
                                name: '平静',
                                smooth: true,
                                type: 'line',
                                lineStyle: {
                                    normal: {
                                        width: 2, //设置线宽
                                        shadowColor: 'rgba(0,0,0,0.4)'
                                    }
                                },
                                data: r2
                            }, {
                                name: '悲伤',
                                smooth: true,
                                type: 'line',
                                lineStyle: {
                                    normal: {
                                        width: 2, //设置线宽
                                        shadowColor: 'rgba(0,0,0,0.4)'
                                    }
                                },
                                data: r3
                            }, {
                                name: '愤怒',
                                smooth: true,
                                type: 'line',
                                lineStyle: {
                                    normal: {
                                        width: 2, //设置线宽
                                        shadowColor: 'rgba(0,0,0,0.4)'
                                    }
                                },
                                data: r4
                            }, {
                                name: '担忧',
                                smooth: true,
                                type: 'line',
                                lineStyle: {
                                    normal: {
                                        width: 2, //设置线宽
                                        shadowColor: 'rgba(0,0,0,0.4)'
                                    }
                                },
                                data: r5
                            }, {
                                type: 'pie',
                                center: ['84%', '50%'],
                                radius: ['20%', '25%'],
                                labelLine: {
                                    normal: {
                                        length: 10,
                                        length2: 5,
                                        show: true
                                    }
                                },
                                label: {
                                    normal: {
                                        formatter: '{d} %',
                                        textStyle: {
                                            color: '#87CEFA',
                                            fontSize: 10
                                        }
                                    },
                                },
                                color: ['#39cad4', '#51ebb3', '#f9f48e', '#fba790', '#21b4f6',
                                    '#F136AF', '#FF875C',
                                ],
                                data: [{
                                    name: '乐观',
                                    value: r1[dataIndex]
                                }, {
                                    name: '平静',
                                    value: r2[dataIndex]
                                }, {
                                    name: '悲伤',
                                    value: r3[dataIndex]
                                }, {
                                    name: '愤怒',
                                    value: r4[dataIndex]
                                }, {
                                    name: '担忧',
                                    value: r5[dataIndex]
                                }]
                            }]
                        })
                    }
                    that.setCloud(MyDate[dataIndex])
                });

                this.linepie.setOption(this.option1);

                if (n == 1) {
                    this.words = '2020-01-01'
                } else if (n == 2) {
                    this.words = '2020-02-01'
                } else if (n == 4) {
                    this.words = '2020-04-01'
                }
                this.setCloud(this.words)
            })
        },
        setCloud: function (str) {
            axios.get('http://119.3.52.214:8080/sentimentWordCount?month=' + this.yue + '&date=' + str).then(
                response => {
                    this.option2.series[0].data = response.data
                    this.wordcloud.setOption(this.option2)
                    this.setNews(str)
                })
        },
        setNews: function (str) {
            axios.get('http://119.3.52.214:8080/newsbydate/?date=' + str).then(
                response => {
                    this.news = response.data.data
                })
        },
        closeNews: function (str) {
            this.news = []
        },
    }
})