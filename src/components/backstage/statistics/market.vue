<template>
    <div>
        <el-row>
            <el-row :gutter="20">
                <el-col :span="2" :offset="4">
                    <el-select v-model="selectDateId" placeholder="请选择">
                        <el-option
                                v-for="item in selectDateType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-date-picker
                            v-model="startDateValue"
                            :type="dateType"
                            placeholder="起始时间">
                    </el-date-picker>
                </el-col>
                <el-col :span="5">
                    <el-date-picker
                            v-model="endDateValue"
                            :type="dateType"
                            placeholder="结束时间">
                    </el-date-picker>
                </el-col>
            </el-row>
            <el-col :span="9">
                <div id="market_goodsType" style="width: 400px;height: 500px"></div>
            </el-col>
            <el-col :span="9" :offset="1">
                <div v-show="showGoods" style="width: 400px;height: 500px">
                    <div id="market_goods" style="width: 400px;height: 500px"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    // 绘制图表
    export default {
        data() {
            return {
                //时间控件
                startDateValue: undefined,
                endDateValue: undefined,
                dateType: "date",
                selectDateId: '1',
                selectDateType: [
                    {value: "1", label: "日", typeName: 'date'},
                    {value: "2", label: "月", typeName: 'month'},
                    {value: "3", label: "年", typeName: 'year'},
                ],

                goodsTypeChart: undefined,
                goodsChart: undefined,
                showGoods: false,
                goodsType: {
                    legendData: [],
                    seriesData: [],//格式 {value:'',name:''}
                },
                goods: {
                    legendData: [],
                    seriesData: [],//格式 {value:'',name:''}
                }
            }
        },
        created() {
            let data = this.getGoodsTypeData();
            this.goodsType.legendData = data.legend;
            this.goodsType.seriesData = data.series;
        },
        watch: {
            selectDateId(newValue) {
                let dateType = this.selectDateType.find((item) => newValue === item.value)
                this.dateType = dateType.typeName;
            },
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            this.goodsTypeChart = this.$echarts.init(document.getElementById('market_goodsType'));
            this.goodsChart = this.$echarts.init(document.getElementById("market_goods"));
            this.setGoodsTypeChartOption();
            this.setGoodsChartOption();

            let _this = this;
            _this.goodsTypeChart.on('click', function (param) {
                _this.showGoods = true;
                let data = _this.getGoodsTypeData();
                _this.goods.legendData = data.legend;
                _this.goods.seriesData = data.series;
                _this.setGoodsChartOption();
            })
        },
        methods: {
            setGoodsTypeChartOption() {
                this.goodsTypeChart.setOption({
                    title: {
                        text: '销售量',
                        subtext: '实际情况',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: this.goodsType.legendData
                    },
                    series: [
                        {
                            name: '销售量',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: this.goodsType.seriesData,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            setGoodsChartOption() {
                this.goodsChart.setOption({
                    title: {
                        text: '销售量',
                        subtext: '实际情况',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: this.goods.legendData
                    },
                    series: [
                        {
                            name: '销售量',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: this.goods.seriesData,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            getGoodsTypeData() {
                let legend = ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                let series = [
                    {value: 335, name: '直接访问', id: 1},
                    {value: 310, name: '邮件营销', id: 2},
                    {value: 234, name: '联盟广告', id: 3},
                    {value: 135, name: '视频广告', id: 4},
                    {value: 1548, name: '搜索引擎', id: 5}
                ]
                return {
                    legend: legend,
                    series: series,
                }
            },
        },

    }
</script>

<style scoped>

</style>
