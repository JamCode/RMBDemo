initGlobelChartsOption();
$('#container').highcharts(chartOption());
getData();
setInterval(getData, 1000*5);

function getData(){
    $.ajax({
        url: 'cb/chart',
        type:'get',
        dataType: 'json',
        success:function(data, status){
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
        },
        error:function(status){
            console.log(JSON.stringify(status));
        }
    });
}

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

    var breakBeginTime = Date.UTC(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 11, 0, 0, 0);
    var breakEndTime = Date.UTC(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 13, 0, 0, 0);

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
            // breaks:[
            //     {
            //         from: breakBeginTime,
            //         to: breakEndTime
            //     }
            // ]
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
