<template>
    <div class='task-statistics-page'>
        <div class='task-chart-item'>
            <el-select v-model="taskUrgentType" slot="prepend" @change="selectUrgentChange" class='task-chart-select' popper-class="task-chart-select-option">
                <el-option label="紧急任务" :value="1"></el-option>
                <el-option label="非紧急任务" :value="2"></el-option>
                <el-option label="任务总数" :value="3"></el-option>
            </el-select>
            <div id="task-by-urgent" class='task-chart-area'></div>
        </div>
        <!-- <div class='task-chart-item'>
            <div>任务总数</div>
            <div id="urgent" class="task-chart-area"></div>
        </div>
        <div class='task-chart-item'>
            <div>任务总数</div>
            <div id="disurgent" class="task-chart-area"></div>
        </div> -->
        <div class='task-chart-item'>
            <el-select v-model="taskTimeRange" slot="prepend" @change="selectTimeChange" class='task-chart-select' popper-class="task-chart-select-option">
                <el-option label="近一周任务完成情况" :value="1"></el-option>
                <el-option label="近一月任务完成情况" :value="2"></el-option>
                <el-option label="近一年任务完成情况" :value="3"></el-option>
                <el-option label="近三年任务完成情况" :value="4"></el-option>
            </el-select>
            <div id="task-by-time" class="task-chart-area"></div>
        </div>

    </div>
</template>

<script>
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
        this.generatePieCharts(chartTaskByUrgent, this.getTaskByUrgentAll());
        this.generateBarCharts(chartTaskByTime, this.getTaskByTime());  
    },
    methods:{
        initCharts(){
            chartTaskByUrgent = echarts.init(document.getElementById('task-by-urgent'));
            chartTaskByTime = echarts.init(document.getElementById('task-by-time'));
        },
        getTaskByUrgentAll(){
            let data = [
                {value:43, name:'未逾期  已完成'},
                {value:6, name:'逾期  已完成'},
                {value:8, name:'未逾期  未完成'},
                {value:3, name:'逾期  未完成'},
            ];
            let legend = ['任务总数']
            return {
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
        getTaskByUrgentTrue(){
            let data = [
                {value:7, name:'未逾期  已完成'},
                {value:1, name:'逾期  已完成'},
                {value:2, name:'未逾期  未完成'},
                {value:0, name:'逾期  未完成'},
            ];
            let legend = ['紧急任务']
            return {
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
        getTaskByUrgentFalse(){
            let data = [
                {value:36, name:'未逾期  已完成'},
                {value:5, name:'逾期  已完成'},
                {value:6, name:'未逾期  未完成'},
                {value:3, name:'逾期  未完成'},
            ];
            let legend = ['非紧急任务'];
            return {
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
        getTaskByTime(){
            let data = [[2, 3, 4, 1, 5, 2, 5, 7, 1, 3, 4, 5], [0, 1, 0, 1, 1, 2, 0, 3, 1, 1, 0, 2]];
            let xAxis = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
            let legend = ['已完成', '未完成'];
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
        selectUrgentChange(e){
            switch(e){
                case 1:
                    this.generatePieCharts(chartTaskByUrgent, this.getTaskByUrgentTrue());
                    break;
                case 2:
                    this.generatePieCharts(chartTaskByUrgent, this.getTaskByUrgentFalse());
                    break;
                default:
                    this.generatePieCharts(chartTaskByUrgent, this.getTaskByUrgentAll());
                    break;
            }
        },
        selectTimeChange(e){}
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

.task-chart-select-option .el-select-dropdown__item:hover{
    background-color:@support-color-bg;
}

.task-chart-select-option .selected{
    color:@main-color;
}
/* 修改el-select的样式结束*/

</style>