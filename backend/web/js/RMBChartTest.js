$(function () {
	initGlobelChartsOption();
$('#container').highcharts(chartOption());
    var data = {"code":0,"dealData":[{"t":1461637564075,"rate":8.0248,"vol":136},{"t":1461638271100,"rate":8.028,"vol":111},{"t":1461638418585,"rate":8.0832,"vol":130},{"t":1461639130063,"rate":8.0814,"vol":125},{"t":1461640316451,"rate":8.0943,"vol":119},{"t":1461640787027,"rate":8.0183,"vol":140},{"t":1461641006678,"rate":8.0167,"vol":102},{"t":1461641477334,"rate":8.0488,"vol":122},{"t":1461641874604,"rate":8.0304,"vol":132},{"t":1461643042827,"rate":8.0185,"vol":121},{"t":1461643103196,"rate":8.0249,"vol":137},{"t":1461645053488,"rate":8.0809,"vol":114},{"t":1461645150405,"rate":8.018,"vol":118},{"t":1461646072912,"rate":8.03,"vol":140},{"t":1461649524251,"rate":8.0135,"vol":105},{"t":1461649543805,"rate":8.0168,"vol":135},{"t":1461650436591,"rate":8.0344,"vol":109},{"t":1461652455463,"rate":8.0995,"vol":136},{"t":1461654100402,"rate":8.0052,"vol":113},{"t":1461654754389,"rate":8.0899,"vol":115},{"t":1461656272037,"rate":8.003,"vol":123},{"t":1461656290548,"rate":8.0759,"vol":109},{"t":1461656339256,"rate":8.0952,"vol":100},{"t":1461656991409,"rate":8.031,"vol":131},{"t":1461658956852,"rate":8.0234,"vol":111}],"baseRate":[{"t":1461635524374,"rate":8.0509},{"t":1461637679047,"rate":8.0945},{"t":1461638378385,"rate":8.0568},{"t":1461638810185,"rate":8.0684},{"t":1461640194196,"rate":8.0581},{"t":1461640968360,"rate":8.0342},{"t":1461641455274,"rate":8.0184},{"t":1461642613322,"rate":8.0458},{"t":1461644294362,"rate":8.0852},{"t":1461644530774,"rate":8.0688},{"t":1461645942887,"rate":8.0574},{"t":1461648192354,"rate":8.0752},{"t":1461649139914,"rate":8.0916},{"t":1461651631757,"rate":8.0101},{"t":1461652781026,"rate":8.0728},{"t":1461653223424,"rate":8.0231},{"t":1461653640305,"rate":8.0933},{"t":1461654692295,"rate":8.0233},{"t":1461654862337,"rate":8.0679},{"t":1461656020196,"rate":8.0338},{"t":1461656421733,"rate":8.0948},{"t":1461656675320,"rate":8.0417},{"t":1461656911198,"rate":8.0899},{"t":1461657001073,"rate":8.0322},{"t":1461658842199,"rate":8.0287}]};

    if(data.code === 0){
                console.log(JSON.stringify(data));
                var rate = [];
                for (var i = 0; i < data.dealData.length; i++) {
                    //UTC+8 东八时区
                    rate.push([data.dealData[i].t+8*3600*1000, data.dealData[i].rate]);
                }

                var baseRate = [];
                for (var i = 0; i < data.baseRate.length; i++) {
                    //UTC+8 东八时区
                    baseRate.push([data.baseRate[i].t+8*3600*1000, data.baseRate[i].rate]);
                }

                var volume = [];
                for (var i = 0; i < data.dealData.length; i++) {
                    //UTC+8 东八时区
                    volume.push([data.dealData[i].t+8*3600*1000, data.dealData[i].vol]);
                }

                $('#container').highcharts().series[0].setData(rate);
                $('#container').highcharts().series[1].setData(baseRate);
                $('#container').highcharts().series[2].setData(volume);

            }else{
                console.log('error code:'+ data.code);
            }


});


function initGlobelChartsOption(){
    Highcharts.setOptions({
        global: {
            useUTC: true
        },
        lang: {
            rangeSelectorFrom:'从',
            rangeSelectorTo: '到',
            months: ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'],
            shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'],
            weekdays: ['周末', '周一', '周二', '周三', '周四', '周五', '周六']
        }
    });
}


function chartOption(){
    var curDate = new Date();
    var beginTime = Date.UTC(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 8, 0, 0, 0);
    var endTime = Date.UTC(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 17, 0, 0, 0);
    console.log(curDate.getFullYear());
    console.log(curDate.getMonth());
    console.log( curDate.getDate());
    return {
        credits: false,
        chart: {
            animation: false
        },
        rangeSelector : {
            enabled:false,
            selected : 1
        },
        plotOptions:{
            column:{
                //pointWidth:5 //成交量柱状图宽度
            }
        },
        chart: {
            height: 600
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b><br/>',
            shared: true,
            crosshairs: true
        },
        xAxis: {
            type: 'datetime',
            min:beginTime,
            max:endTime,
            tickInterval: 20 * 60 * 1000,
            startOnTick:true,
            endOntick:true,
            breaks:[
                {
                    from: Date.UTC(2016, 3, 26, 11, 0, 0, 0),
                    to: Date.UTC(2016, 3, 26, 13, 0, 0, 0)
                }
            ]
        },
        yAxis: [{
            title: {
                text: '收益率'
            },
            height: '60%',
            lineWidth: 2
        }, {
            title: {
                text: '成交量'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        }],

        title : {
            text : '成交走势图'
        },

        series : [
            {
                name : '成交收益率',
                data : [],
                step: true,
                pointStart:beginTime
            },
            {
                name: '基准收益率',
                data: [],
                step: true,
                pointStart:beginTime
            },
            {
                type: 'column',
                name: '成交量',
                data: [],
                yAxis: 1,
                pointStart:beginTime
            }
        ]
    };
}
