<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5" :offset="1">
        <el-date-picker
          v-model="timeForm.startDateValue"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="起始时间">
        </el-date-picker>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="timeForm.endDateValue"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="结束时间">
        </el-date-picker>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="screenInfoByTime"><i class="el-icon-search"></i>查询</el-button>
      </el-col>
    </el-row>
    <el-row>
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
    inject: ["reload"],
    data() {
      return {
        //时间控件
        timeForm: {
          startDateValue: undefined,
          endDateValue: undefined,
        },
        clickTypeId: undefined,
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
    mounted: async function () {
      await this.getGoodsTypeData();
      // 基于准备好的dom，初始化echarts实例
      this.setGoodsTypeChartOption();
      this.setGoodsChartOption();
    },
    methods: {
      setGoodsTypeChartOption() {
        if (this.goodsTypeChart !== null && this.goodsTypeChart !== undefined) {
          this.goodsTypeChart.dispose();
          this.goodsTypeChart = this.$echarts.init(document.getElementById("market_goodsType"));
        } else {
          this.goodsTypeChart = this.$echarts.init(document.getElementById("market_goodsType"));
        }

        let _this = this;
        _this.goodsTypeChart.on('click', async function (param) {
          _this.showGoods = true;
          _this.clickTypeId = param.data.id
          //获取 数据
          await _this.getGoodsData();
          //在设置
          await _this.setGoodsChartOption();
        })

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
        if (this.goodsChart !== null && this.goodsChart !== undefined) {
          this.goodsChart.dispose();
          this.goodsChart = this.$echarts.init(document.getElementById("market_goods"));
        } else {
          this.goodsChart = this.$echarts.init(document.getElementById("market_goods"));
        }
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
      getGoodsTypeData: async function () {
        let legend = []
        let series = []
        let _this = this;
        await this.$axios({
          url: 'order/queryGoodTypeNumByTime',
          method: "get",
          params: {
            startTime: this.timeForm.startDateValue,
            endTime: this.timeForm.endDateValue,
          },
        }).then((option) => {
          if (option.data == null || option.data.length === 0) {
            _this.$message.error("没数据!");
            return;
          }
          option.data.forEach((item) => {
            legend.push(item.name);
            series.push({value: item.countNum, name: item.name, id: item.typeId});
          });
        })

        this.goodsType.legendData = legend;
        this.goodsType.seriesData = series;
      },
      getGoodsData: async function () {
        if (this.clickTypeId) {
          let legend = []
          let series = []
          let _this = this;
          await this.$axios({
            url: 'order/queryGoodsNameNumberTypeId',
            method: "get",
            params: {
              startTime: this.timeForm.startDateValue,
              endTime: this.timeForm.endDateValue,
              typeId: this.clickTypeId,
            },
          }).then((option) => {
            if (option.data == null || option.data.length === 0) {
              _this.$message.error("没数据!");
              return;
            }

            option.data.forEach((item) => {
              legend.push(item.name);
              series.push({value: item.countNum, name: item.name});
            })
          })
          this.goods.legendData = legend;
          this.goods.seriesData = series;
        }
      },
      screenInfoByTime: async function () {
        let startDateValue = this.timeForm.startDateValue;
        let endDateValue = this.timeForm.endDateValue;
        if ((startDateValue != null && endDateValue != null) && this.$moment(startDateValue).isAfter(endDateValue)) {
          this.$message.error("开始时间不能低于结束时间！");
          return;
        }
        //查询
        await this.getGoodsTypeData();
        await this.getGoodsData();
        //进行 设置
        await this.setGoodsTypeChartOption();
        await this.setGoodsChartOption();
      },
    },
  }
</script>

<style scoped>

</style>
