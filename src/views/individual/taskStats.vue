<template>
    <div>
        <!-- <div>
            <p>共收到任务XXX项</p>
                <p>您已完成的任务数为x1+x2</p>
                    <p>其中您在规定时间内完成的任务数为x1</p>
                    <p>其中您逾期完成的任务数为x2</p>
                <p>您未完成的任务数为y1+y2</p>
                    <p>其中未逾期的任务数为y1</p>
                    <p>其中逾期的任务数为y2</p>

            <p>紧急任务共XXX项</p>
                <p>您已完成的任务数为x1+x2</p>
                    <p>其中您在规定时间内完成的任务数为x1</p>
                    <p>其中您逾期完成的任务数为x2</p>
                <p>您未完成的任务数为y1+y2</p>
                    <p>其中未逾期的任务数为y1</p>
                    <p>其中逾期的任务数为y2</p>
            <p>非紧急任务共XXX项</p>
                <p>您已完成的任务数为x1+x2</p>
                    <p>其中您在规定时间内完成的任务数为x1</p>
                    <p>其中您逾期完成的任务数为x2</p>
                <p>您未完成的任务数为y1+y2</p>
                    <p>其中未逾期的任务数为y1</p>
                    <p>其中逾期的任务数为y2</p>
        </div> -->
        <div>
            <div class="charts" id="total"></div>
            <div class='pie-part-charts'>
                <div id="urgent" class="charts"></div>
                <div id="disurgent" class="charts"></div>
            </div>
            <div class="charts" id="byYear"></div>
        </div>
    </div>
</template>

<script>
var echarts = require('echarts');

export default {
    name: "TaskStats",
    data(){
        return {
            
        }
    },
    mounted(){
        let data1 = [ // 数据数组，name 为数据项名称，value 为数据项值，itemStyle:{color: 'red'}
            {value:43, name:'未逾期  已完成'},
            {value:6, name:'逾期  已完成'},
            {value:8, name:'未逾期  未完成'},
            {value:3, name:'逾期  未完成'},
        ];
        let data2 = [
            {value:7, name:'未逾期  已完成'},
            {value:1, name:'逾期  已完成'},
            {value:2, name:'未逾期  未完成'},
            {value:0, name:'逾期  未完成'},
        ];
        let data3 = [ 
            {value:36, name:'未逾期  已完成'},
            {value:5, name:'逾期  已完成'},
            {value:6, name:'未逾期  未完成'},
            {value:3, name:'逾期  未完成'},
        ];
        let dataFinished = [2, 3, 4, 1, 5, 2, 5, 7, 1, 3, 4, 5];
        let dataUnfinished = [0, 1, 0, 1, 1, 2, 0, 3, 1, 1, 0, 2];
        
        this.initPieCharts("total", '任务总数', data1, 60);
        this.initPieCharts("urgent", '紧急任务', data2, 10);
        this.initPieCharts("disurgent", '非紧急任务', data3, 50);
        this.initBarCharts("byYear","全年任务完成情况", dataFinished,dataUnfinished);
    },
    methods:{
        initPieCharts(nodeName, title, data, totalNum){ 
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(nodeName));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: title
                },
                legend: {
                    show: false,
                    orient: 'vertical',
                    x: 'left',
                    y: 'center',
                },
                 tooltip: {
                    trigger: 'item',
                    showDelay: 20,
                    hideDelay: 100,
                    transitionDuration : 0.4,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    borderColor: '#333', 
                    borderRadius: 4,
                    borderWidth: 0, 
                    padding: 5,
                    formatter: '{d}%' // 展示格式
                },
                series : [
                    {
                        name: title,
                        type: 'pie',    // 设置图表类型为饼图
                        radius: ['50%','70%'],  // 饼图的内半径、外半径，占比可视区域较短的一边
                        label: {
                            normal:{
                                position: 'outside',
                                formatter: '{b} {c}项'
                            }
                        },
                        data: data,
                        // color:['#D6A3DC','#F7DB70','#EABEBF','#A5DEE5']
                        // color:['#654C90','#D04E59','#3AB8A9','#E3AD24']
                    }
                ],
                graphic: { // 添加原生图形元素组件
                    elements: [
                        {
                            type: 'text', // 组件类型
                            left: 'center', //定位
                            top: '43%', // 定位
                            style: { // 样式
                            text: '总任务数', //文字
                            fontSize: 13, //文字大小
                            textAlign: 'center', //定位
                            width: 30,
                            height: 30,
                            fill: 'darkgray' // 字体颜色
                            }
                        },
                        {
                            type: 'text',
                            left: 'center',
                            top: '52%',
                            style: {
                            text: totalNum+'项',
                            fontSize: 18,
                            textAlign: 'center',
                            width: 30,
                            height: 25,
                            fill: '#aaaaaa'
                            }
                        }
                    ]
                }
            });
        },
        initBarCharts(nodeName, title, dataFinished, dataUnfinished){
            var myChart = echarts.init(document.getElementById(nodeName));
            myChart.setOption({
                title: {
                    text: title
                },
                tooltip:{
                    trigger:'axis'
                },
                legend: {
                    data: ['未完成','已完成' ]
                },
                xAxis: {
                    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                },
                yAxis: {},
                series: [
                    {
                        name: '未完成',
                        type: 'bar',
                        stack: 'task',
                        data: dataUnfinished,                       
                    },
                    {
                        name: '已完成',
                        type: 'bar',
                        stack: 'task',
                        data: dataFinished,
                    }
                ]
            });
        }
    }
}
</script>


<style scoped>
    .charts{
        width: 30rem;
        height: 20rem;
    }
    .pie-part-charts{
        display: flex;
    }
</style>