<template>
  <div>
    <el-row>
      <el-col :span="9">
        <div id="market_goodsType" style="width: 100%;height: 500px"></div>
      </el-col>
      <el-col :span="9" :offset="1">
        <div  v-show="showGoods" style="width: 400px">
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
