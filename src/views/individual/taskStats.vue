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
            <div id="total" class="charts"></div>
            <div class='pie-part-charts'>
                <div id="urgent" class="charts"></div>
                <div id="disurgent" class="charts"></div>
            </div>
            <div id="byYear" class="charts"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core';
import { BarChart, PieChart} from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use(
    [TitleComponent, TooltipComponent, LegendComponent, GridComponent, BarChart,PieChart, CanvasRenderer]
);

var chartTaskTotal = null;
var chartTaskUrgent = null;
var chartTaskDisurgent = null;
var chartByYear = null;

export default {
    name: "TaskStats",
    data(){
        return {
            
        }
    },
    mounted(){
        this.initCharts();
        this.generatePieCharts(chartTaskTotal, this.getTaskTotalData());
        this.generatePieCharts(chartTaskUrgent, this.getTaskUrgentData());
        this.generatePieCharts(chartTaskDisurgent, this.getTaskDisurgentData());
        this.generateBarCharts(chartByYear, this.getTaskByYearData());  
    },
    methods:{
        initCharts(){
            chartTaskTotal = echarts.init(document.getElementById('total'));
            chartTaskUrgent = echarts.init(document.getElementById('urgent'));
            chartTaskDisurgent = echarts.init(document.getElementById('disurgent'));
            chartByYear = echarts.init(document.getElementById('byYear'));
        },
        getTaskTotalData(){
            let data = [
                {value:43, name:'未逾期  已完成'},
                {value:6, name:'逾期  已完成'},
                {value:8, name:'未逾期  未完成'},
                {value:3, name:'逾期  未完成'},
            ];
            let legend = ['任务总数']
            return {
                title: "任务总数",
                legend: legend,
                totalNum: 60,
                serie: {
                    name: legend[0],
                    type: 'pie',
                    radius: ['40%', '70%'],
                    data: data
                }
            }
        },
        getTaskUrgentData(){
            let data = [
                {value:7, name:'未逾期  已完成'},
                {value:1, name:'逾期  已完成'},
                {value:2, name:'未逾期  未完成'},
                {value:0, name:'逾期  未完成'},
            ];
            let legend = ['紧急任务']
            return {
                title: "紧急任务",
                legend: legend,
                totalNum: 10,
                serie: {
                    name: legend[0],
                    type: 'pie',
                    radius: ['40%', '70%'],
                    data: data
                }
            }
        },
        getTaskDisurgentData(){
            let data = [
                {value:36, name:'未逾期  已完成'},
                {value:5, name:'逾期  已完成'},
                {value:6, name:'未逾期  未完成'},
                {value:3, name:'逾期  未完成'},
            ];
            let legend = ['非紧急任务'];
            return {
                title: "非紧急任务",
                legend: legend,
                totalNum: 50,
                serie: {
                    name: legend[0],
                    type: 'pie',
                    radius: ['40%', '70%'],
                    data: data
                }
            }
        },
        getTaskByYearData(){
            let data = [[2, 3, 4, 1, 5, 2, 5, 7, 1, 3, 4, 5], [0, 1, 0, 1, 1, 2, 0, 3, 1, 1, 0, 2]];
            let xAxis = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
            let legend = ['已完成', '未完成'];
            return {
                title: "年任务量",
                legend: legend,
                xAxis: {data: xAxis},
                series: data.map((value, index)=>{
                    return {
                        name: legend[index],
                        type: 'bar',
                        stack: 'task',
                        data: value
                    }
                })
            }
        },
        generatePieCharts(chart, param){
            chart.setOption({
                title: { text: param.title },
                tooltip:{ trigger: 'item' },
                legend: { show:false,top: '5%', left: 'center' },
                label: {formatter: '{b}\n{d}%'},
                series: [{   
                        name: '总数',
                        type: 'pie',
                        label: {
                            position: 'center',
                            color: 'white',
                            fontSize: 24,
                            formatter: '{c}'
                        },
                        tooltip: {show: false},
                        radius: ['0%', '30%'],
                        data: [{name:'总数', value:param.totalNum}],
                    },
                    param.serie
                ]
            });
        },
        generateBarCharts(chart, param){
            chart.setOption({
                title: { text: param.title },
                tooltip:{ trigger: 'axis' },
                legend: { data: param.legend},
                xAxis: param.xAxis,
                yAxis: {},
                series: param.series
            });
        },
    }
}
</script>


<style scoped>
    .charts{
        width: 35rem;
        height: 20rem;
    }
    .pie-part-charts{
        display: flex;
    }
</style>