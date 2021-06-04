<template>
    <div class='task-statistics-page'>
        <div class='task-chart-item'>
            <el-select v-model="taskUrgentType" slot="prepend" @change="selectUrgentChange" class='task-chart-select'>
                <!-- <el-option label="紧急任务" :value="1"></el-option> -->
                <!-- <el-option label="非紧急任务" :value="2"></el-option> -->
                <el-option label="任务总数" :value="3"></el-option>
            </el-select>
            <div id="task-by-urgent" class='task-chart-area'></div>
        </div>
        <div class='task-chart-item'>
            <el-select v-model="taskTimeRange" slot="prepend" @change="selectTimeChange" class='task-chart-select'>
                <el-option label="近一周任务完成情况" :value="1"></el-option>
                <el-option label="近一月任务完成情况" :value="2"></el-option>
                <el-option label="近一年任务完成情况" :value="3"></el-option>
                <!-- <el-option label="所有任务完成情况" :value="4"></el-option> -->
            </el-select>
            <div id="task-by-time" class="task-chart-area"></div>
        </div>

    </div>
</template>

<script>
import {getTaskByUrgentApi, getTaskByTimeApi} from '../../api/individual';
import * as echarts from 'echarts/core';
import { BarChart, PieChart} from 'echarts/charts';
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use(
    [TooltipComponent, LegendComponent, GridComponent, BarChart,PieChart, CanvasRenderer]
);

var chartTaskByUrgent = null;
var chartTaskByTime = null;

export default {
    name: "TaskStats",
    data(){
        return {
            taskUrgentType:3,
            taskTimeRange: 3
        }
    },
    mounted(){
        this.initCharts();
        //this.generatePieCharts(chartTaskByUrgent, this.getTaskByUrgentAll());
        // this.generateBarCharts(chartTaskByTime, this.getTaskByTime());  
        this.getTaskByUrgent();
        this.getTaskByTime();
    },
    destroyed(){
        chartTaskByUrgent = chartTaskByTime = null;
    },
    methods:{
        initCharts(){
            chartTaskByUrgent = echarts.init(document.getElementById('task-by-urgent'));
            chartTaskByTime = echarts.init(document.getElementById('task-by-time'));
        },
        getTaskByUrgent(){
            getTaskByUrgentApi({type: this.taskUrgentType}).then((result)=>{
                let data = result.data;
                if(data && data.length>0){
                    let afterData = this.processUrgentData(data);
                    this.generatePieCharts(chartTaskByUrgent, afterData);
                }

            }).catch((reason)=>{
                this.$message.error(reason);
            });
        },
        getTaskByTime(){
            getTaskByTimeApi({type: this.taskTimeRange}).then((result)=>{
                let data = result.data;
                console.log(data);
                if(data){
                    let afterData = this.processTimeData(data);
                    console.log(afterData);
                    this.generateBarCharts(chartTaskByTime, afterData);
                }

            }).catch((reason)=>{
                this.$message.error(reason);
            });
        },
        processUrgentData(preData){
            let totalNum = preData.reduce((total, value)=>{return value + total;});
            let data = [
                {value:preData[0], name:'未逾期  已完成'},
                {value:preData[1], name:'逾期  已完成'},
                {value:preData[2], name:'未逾期  未完成'},
                {value:preData[3], name:'逾期  未完成'},
            ];
            let legend = [];
            switch(this.taskUrgentType){
                case 1:
                    legend = ['紧急任务'];
                    break;
                case 2:
                    legend = ['非紧急任务'];
                    break;
                default:
                    legend = ['任务总数'];
            }
            return {
                legend: legend,
                totalNum: totalNum,
                serie: {
                    name: legend[0],
                    type: 'pie',
                    radius: ['40%', '70%'],
                    data: data
                }
            }
        },
        processTimeData(preData){
            console.log(1);
            let data = [preData.finished, preData.unfinished];
            let week = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
            let year= ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
            let legend = ['已完成', '未完成'];
            let xAxis = [];
            let currentTime = new Date();
            console.log(2);
            switch(this.taskTimeRange){
                case 1:
                    let currentDay = currentTime.getDay();
                    let weekR = week.splice(0, (currentDay+6)%7);
                    xAxis = week.concat(weekR);
                    break;
                case 2:
                    // let currentDate = currentTime.getDate();
                    for(let index=1;index<=preData.finished.length;index++)
                        xAxis.push(index+'号');
                    break;
                default:
                    let currentMonth = currentTime.getMonth();
                    let yearR = year.splice(0, currentMonth);
                    xAxis = year.concat(yearR);
            }
            console.log(xAxis);
            return {
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
                tooltip:{ trigger: 'axis' },
                legend: { data: param.legend},
                xAxis: param.xAxis,
                yAxis: {},
                series: param.series
            });
        },
        selectUrgentChange(){
            this.getTaskByUrgent();
        },
        selectTimeChange(){
            this.getTaskByTime();
        }
    }
}
</script>


<style lang="less">
@import "../../assets/css/common.less";

.task-statistics-page{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.task-chart-item{
    margin: 3rem 2rem;
}

.task-chart-area{
    background: white;
    width: 30rem;
    height: 18rem;
    padding: 0.5rem;
    text-align: center;
    box-shadow: #dddddd 0 0 0.6rem;
    border: 0.1rem solid #eeeeee;
    border-radius: 0.4rem;
}

/* 修改el-select的样式*/
.task-chart-select{
    border-left: solid 0.4rem @support-color-ps;
    margin-bottom: 1rem;
}

.task-chart-select .el-input__inner{
    font-size: 1.2rem;
    font-weight: 600;
    color: #555555;    
    background-color: transparent;
    border: none;
} 

/* 修改el-select的样式结束*/

</style>