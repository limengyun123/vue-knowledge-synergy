<template>
    <div class="home-page">
        <el-card class="box-card card-process">
            <div slot="header" class="clearfix">
                <span>进度简明</span>
            </div>
            <div class='brief-process'>
                <div class='brief-process-item' title="三天内需完成的任务">紧急任务<div class='home-page-task home-page-urgent-task'>2</div></div>
                <div class='brief-process-item'>我的任务<div class='home-page-task home-page-my-task'>12</div></div>
                <div class='brief-process-item'>进行中的项目<div class='home-page-task home-page-project-ing'>3</div></div>
            </div>
        </el-card>
        <el-card class="box-card card-dynamic">
            <div slot="header" class="clearfix">
                <span>最新动态</span>
            </div>
            <el-timeline>
                <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :timestamp="activity.timestamp">
                    {{activity.content}}
                </el-timeline-item>
            </el-timeline>
        </el-card>
        <el-card class="box-card card-chart">
            <div slot="header" class="clearfix">
                <span>团队与项目关系图谱</span>
            </div>
            <div id='main'>
            </div>
        </el-card>
    </div>
</template>

<script>
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from 'echarts/components';
import {
    GraphChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

echarts.use(
    [TitleComponent, TooltipComponent, LegendComponent, GraphChart, CanvasRenderer]
);

export default {
    name: 'Main',
    data() {
      return {
            reverse: true,
            activities: [{
            content: '张祁侗上传了文件《需求规格说明书》',
            timestamp: '2021-04-15'
            }, {
            content: '高铭上传了文件《商业计划书》',
            timestamp: '2021-04-10'
            }, {
            content: '章娞薇创建项目“电影院售票系统”',
            timestamp: '2018-04-04'
            }]
      };
    },
    mounted(){
        this.generateGraphCharts();
    },
    methods:{
        generateGraphCharts(){
            let myChart = echarts.init(document.getElementById('main'));
            let graph = this.getData();
            let option = {
                series: [{
                    type: 'graph',
                    layout: 'force',
                    animation: false,
                    label: {
                        show: true,
                        formatter: '{b}',
                        color: '#888888',
                    },
                    draggable: true,
                    data: graph.nodes.map(function (node, idx) {
                        node.id = idx;
                        return node;
                    }),
                    categories: graph.categories,
                    force: {
                        edgeLength: [100, 180],
                        repulsion: 600,
                        // gravity: 1.1
                    },
                    edges: graph.links
                }]
            };
            myChart.setOption(option);
        },
        generateGraphCharts2(){
            let myChart = echarts.init(document.getElementById('main'));
            let graph = this.getData();
            graph.nodes.forEach(function (node) {
                node.label = {
                    show: node.symbolSize > 30
                };
            });
            let option = {
               
                tooltip: {},
                legend: [{
                    // selectedMode: 'single',
                    data: graph.categories.map(function (a) {
                        return a.name;
                    })
                }],
                animationDuration: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [
                    {
                        type: 'graph',
                        layout: 'none',
                        data: graph.nodes,
                        links: graph.links,
                        categories: graph.categories,
                        roam: true,
                        label: {
                            position: 'right',
                            formatter: '{b}'
                        },
                        lineStyle: {
                            color: 'source',
                            curveness: 0.3
                        },
                        emphasis: {
                            focus: 'adjacency',
                            lineStyle: {
                                width: 10
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
        },
        getData(){
            // return require('../../assets/json/les-miserables.json');
            // return require('../../assets/json/webkit-dep.json');
            return require('../../assets/json/team-project.json');
        }

    }
}
</script>

<style lang="less">
@import "../../assets/css/common.less";

.home-page{
    height: calc(100vh);
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
}

.box-card{
    margin: 2rem;
}

.card-process{
    min-width: 25rem;
    flex: 1;
    height: 12rem;
}

.card-dynamic{
    min-width: 15rem;
}
.card-chart{
    min-width: 50rem;
    overflow: scroll;
}

.brief-process{
    display: flex;
}

.brief-process-item{
    flex: 1;
    text-align: center;
    font-size: 1.2rem;
}

.home-page-task{
    font-size: 3rem;
    margin-top: 1rem;
}

.home-page-urgent-task{
    color:@danger-color;
}

.home-page-my-task{
    color:@brand-color;
}

.home-page-project-ing{
    color: @success-color;
}

#main{
    width: 70rem;
    height: 50rem;
}
</style>