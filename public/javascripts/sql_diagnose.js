resizeContainer('sql_performance', 'performance_div', 1, 0.6);
resizeContainer('trans_performance', 'performance_div', 1, 0.6);

let trans_performance_dom_id = echarts.init(document.getElementById('trans_performance'));
let sql_performance_dom_id = echarts.init(document.getElementById('sql_performance'));

table_line(trans_performance_dom_id, 'upload', 'download');
table_line(sql_performance_dom_id, 'upload', 'download');


function gauge_chart(dom_id, data) {
    let option = {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '业务指标',
                type: 'gauge',
                detail: {formatter: '{value}%'},
                data: data
            }
        ]
    };
    dom_id.setOption(option);
}


function network_line(dom_id, title1, title2) {

    data = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]];

    var dateList = data.map(function (item) {
        return item[0];
    });
    var valueList = data.map(function (item) {
        return item[1];
    });

    let option = {

        // Make gradient line here
        visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
        },],
        title: [{
            top: '10%',
            left: 'center',
            text: title1
        }],
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [{
            data: dateList
        }],
        yAxis: [{
            splitLine: {show: false}
        }],
        grid: [{
            bottom: '10%'
        }],
        series: [{
            type: 'line',
            showSymbol: false,
            data: valueList
        }]
    };
    dom_id.setOption(option);
}

function table_line(dom_id) {
    function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        return {
            name: now.toString(),
            value: [
                [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
                Math.round(value)
            ]
        }
    }

    var data = [];
    var now = +new Date(2018, 5, 6);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
        data.push(randomData());
    }

    let option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
        }]
    };

    setInterval(function () {

        for (var i = 0; i < 5; i++) {
            data.shift();
            data.push(randomData());
        }

        dom_id.setOption({
            series: [{
                data: data
            }]
        });
    }, 1000);

    dom_id.setOption(option);
}

function pie_chart(dom_id) {
    let option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            // orient: 'vertical',
            left: 10,
            data: ['Success', 'Fail', 'Hang-up', 'Block']
        },
        series: [
            {
                name: '任务运行状况',
                type: 'pie',
                radius: ['40%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'inside',
                        formatter: '{b}\n\n{c} ({d}%)',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
                    },
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 335, name: 'Fail'},
                    {value: 310, name: 'Hang-up'},
                    {value: 234, name: 'Success'},
                    {value: 135, name: 'Block'},
                ]
            }
        ]
    };
    dom_id.setOption(option);
}
//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeContainer(chart_id, chart_div, width_ratio = 1, height_ratio = false) {
    let container = document.getElementById(chart_id);
    container.style.width = $("#"+chart_div).width() * width_ratio + 'px';
    if (height_ratio != false){
        // 有长宽比例的时候
        container.style.height = $("#"+chart_id).width() * height_ratio + 'px';
    }
}



function loadTopK(query_id){
    console.log("top k");
    $.ajax({
                type:'GET',
                url:'/sql_diagnose/selectTopKByQueryId?query_id='+query_id,
                dataType: 'JSON',
                success:function(data){
                    // do something
                    console.log('loadTopK', data);
                    let topkTable_elem = document.getElementById('topKRows');
                    let html = '';
                    for (var i = 0; i < data.length; i++) {
                        if (data[i]) {
                            html += "<tr>";
                            html += "<td>" + data[i].query_id + "</td>";
                            html += "<td>" + data[i].query + "</td>";
                            html += "</tr>";
                        }
                    }
                    topkTable_elem.innerHTML = html;
                }
            });

}

function loadIndexRecommendation(query) {
    let IndexRecommendation_elem = document.getElementById('IndexRecommendationRows');
    let html = '';
    html += "<tr>";
    html += "<td>" + query.possible_index_1 + "</td>";
    html += "<td>" + query.index_improvement_1 + "</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<td>" + query.possible_index_2 + "</td>";
    html += "<td>" + query.index_improvement_2 + "</td>";
    html += "</tr>";
    IndexRecommendation_elem.innerHTML = html;
}

function loadSlowQueries(slow_queries) {
    let slowQueies_elem = document.getElementById('slowQueriesRows');
    let html = "";
    for(var i = 0; i < slow_queries.length; i++){
        html += "<tr id=" + slow_queries[i].query_id + " >";
        html += "<td>" + slow_queries[i].transaction_id + "</td>";
        html += "<td>" + slow_queries[i].query_id + "</td>";
        html += "<td>" + slow_queries[i].query + "</td>";
        html += "<td>" + slow_queries[i].true_duration + "</td>";
        html += "</tr>";
    }
    slowQueies_elem.innerHTML = html;
}


function loadCostEstimation(query) {
    let costEstimation_elem = document.getElementById('costEstimationRows');
    let html = '';
    html += "<tr>";
    html += "<td>" + query.true_cost + "</td>";
    html += "<td>" + query.page_hit + "</td>";
    html += "<td>" + query.page_read + "</td>";
    html += "</tr>";
    costEstimation_elem.innerHTML = html;
}


function loadDiagnoseInfo(query) {
    let diagnoseInfo_elem = document.getElementById('diagnoseInfo')
    diagnoseInfo_elem.innerHTML = query.diagnose_info
}


function slowQueryClick(a) {
    var lng = document.getElementsByTagName("tr").length;
    for (i = 0; i < lng; i++) {
        var temp = document.getElementsByTagName("tr")[i];
        if (a === temp) {
            //选中的标签样式
            temp.style.background = "#ccc";
            $.ajax({
                type:'GET',
                url:'/sql_diagnose/selectByQueryId?query_id='+a.id,
                dataType: 'JSON',
                success:function(data){
                    console.log(data);
                    loadDiagnoseInfo(data[0]);
                    loadIndexRecommendation(data[0]);
                    loadTopK(a.id);
                    loadCostEstimation(data[0]);
                }
            })

        } else {
            //恢复原状
            temp.style.background = "";
        }
    }
}

$(document).ready(function () {

        jeDate({
            dateCell:"#startTime",
            format:"YYYY-MM-DD hh:mm:ss",
            isinitVal:true,
            isTime:true,
        });

        jeDate({
            dateCell:"#endTime",
            format:"YYYY-MM-DD hh:mm:ss",
            isinitVal:true,
            isTime:true,
            //okfun:function(val){}
        });


		$('body').on("click", '#confirm', function(){
		    let start_time = $('#startTime').val();
            let end_time = $('#endTime').val();
            console.log(start_time, end_time);
            $.ajax({
                type:'GET',
                url:'/sql_diagnose/selectByTimeGap?start_time='+start_time+'&end_time='+end_time,
                dataType: 'JSON',
                success:function(data){
                    loadSlowQueries(data);
                }
            })
        });

		$("#slowQueries tbody").on("click", "tr", function () {
            slowQueryClick(this)
        })


});
