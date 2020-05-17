resizeContainer('card_pie', 'card_pie_div', 0.6, 0.6);
resizeContainer('cost_pie', 'cost_pie_div', 0.6, 0.6);

let card_pie_dom_id = echarts.init(document.getElementById('card_pie'));
let cost_pie_dom_id = echarts.init(document.getElementById('cost_pie'));
let card_pie_option = {
    title: {
        text: 'Cardinality Estimation q-error',
        x:'center',
        y:'bottom',
        textStyle:{
            color: 'grey',
            fontWeight: 'normal',
        }
    },
    series:[
        {
            name: 'Cardinality Estimation q-error',
            type: 'pie',    // 设置图表类型为饼图
            radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: [          // 数据数组，name 为数据项名称，value 为数据项值
                {value: 65, name: '1-10'},
                {value: 27, name: '10-100'},
                {value: 8, name: '100-1000'},
            ]
        }
    ]
}

let cost_pie_option = {
    title: {
        text: 'Cost Estimation q-error',
        x:'center',
        y:'bottom',
        textStyle:{
            color: 'grey',
            fontWeight: 'normal',
        }
    },
    series:[
        {
            name: 'Cost Estimation q-error',
            type: 'pie',    // 设置图表类型为饼图
            radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: [          // 数据数组，name 为数据项名称，value 为数据项值
                {value: 74, name: '1-10'},
                {value: 22, name: '10-100'},
                {value: 4, name: '100-1000'},
            ]
        }
    ]
}

card_pie_dom_id.setOption(card_pie_option)
cost_pie_dom_id.setOption(cost_pie_option)




//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeContainer(chart_id, chart_div, width_ratio = 1, height_ratio = false) {
    let container = document.getElementById(chart_id);
    container.style.width = $("#"+chart_div).width() * width_ratio + 'px';
    if (height_ratio != false){
        // 有长宽比例的时候
        container.style.height = $("#"+chart_id).width() * height_ratio + 'px';
    }
}