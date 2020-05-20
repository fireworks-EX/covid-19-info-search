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
    },
    created: function () {
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
                axios.get('https://lab.isaaclin.cn/nCoV/api/area').then(response => {
                    this.tableData = response.data.results
                    for (let i = 0; i < this.tableData.length; i++) {
                        this.tableData[i].updateTime = this.timeformat(this.tableData[i].updateTime)
                    }
                })
            }
        },
        loadcity: function (str) {
            this.choose = 1
            axios.get('https://lab.isaaclin.cn/nCoV/api/area?province=' + str).then(response => {
                var table = response.data.results[0]
                var city = {}
                city.cityName = table.provinceName
                city.currentConfirmedCount = table.currentConfirmedCount
                city.confirmedCount = table.confirmedCount
                city.suspectedCount = table.suspectedCount
                city.curedCount = table.curedCount
                city.deadCount = table.deadCount
                table.updateTime = this.timeformat(table.updateTime)
                if (table.cities == null) {
                    table.cities = []
                }
                table.cities.push(city)
                this.cityData = table.cities.reverse()
            })
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
    },
    created: function () {},
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
            axios.get('https://lab.isaaclin.cn/nCoV/api/area?province=' + str).then(response => {
                var table = response.data.results[0]
                table.updateTime = this.timeformat(table.updateTime)
                var cities = []
                var city = {}
                city.data = []
                city.cityName = table.provinceName
                city.updateTime = table.updateTime
                city.data.push(table.confirmedCount)
                city.data.push(table.currentConfirmedCount)
                city.data.push(table.suspectedCount)
                city.data.push(table.curedCount)
                city.data.push(table.deadCount)
                cities.push(city)
                if (table.cities != null) {
                    for (let i = 0; i < table.cities.length; i++) {
                        var city = {}
                        city.data = []
                        city.cityName = table.cities[i].cityName
                        city.updateTime = table.updateTime
                        city.data.push(table.cities[i].confirmedCount)
                        city.data.push(table.cities[i].currentConfirmedCount)
                        city.data.push(table.cities[i].suspectedCount)
                        city.data.push(table.cities[i].curedCount)
                        city.data.push(table.cities[i].deadCount)
                        cities.push(city)
                    }
                }
                this.cityData = cities
                this.setOpt(this.cityData[0])
            })
        },
        loadall: function () {
            axios.get('https://lab.isaaclin.cn/nCoV/api/area').then(response => {
                var tableData = response.data.results
                this.updateTime = this.timeformat(tableData[0].updateTime)
                for (let i = 0; i < tableData.length; i++) {
                    if (tableData[i].countryName == '中国' && tableData[i].provinceName != '中国') {
                        // tableData[i].provinceName = tableData[i].provinceName.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g,"")               
                        var all = {}
                        all.name = tableData[i].provinceShortName
                        all.value = tableData[i].confirmedCount
                        this.overall.push(all)
                        // console.log(this.overall)
                        var info = {}
                        info.value = []
                        info.name = tableData[i].provinceShortName
                        var obj1 = {}
                        var obj2 = {}
                        var obj3 = {}
                        var obj4 = {}
                        var obj5 = {}
                        obj1.name = "总确诊人数"
                        obj1.value = tableData[i].confirmedCount
                        info.value.push(obj1)
                        obj2.name = "现存人数"
                        obj2.value = tableData[i].currentConfirmedCount
                        info.value.push(obj2)
                        obj3.name = "疑似人数"
                        obj3.value = tableData[i].suspectedCount
                        info.value.push(obj3)
                        obj4.name = "治愈人数"
                        obj4.value = tableData[i].curedCount
                        info.value.push(obj4)
                        obj5.name = "死亡人数"
                        obj5.value = tableData[i].deadCount
                        info.value.push(obj5)
                        this.detail.push(info)
                    }
                }
                this.setMap()
            })
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