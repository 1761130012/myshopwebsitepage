<template>
  <div>
    <el-form ref="timeForm" :model="timeForm" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="2" :offset="1">
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
          <el-form-item prop="startDateValue">
            <el-date-picker
              v-model="timeForm.startDateValue"
              :type="dateType.type"
              :value-format="dateType.format"
              placeholder="起始时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="endDateValue">
            <el-date-picker
              v-model="timeForm.endDateValue"
              :type="dateType.type"
              :value-format="dateType.format"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="screenInfoByTime"><i class="el-icon-search"></i>查询</el-button>
        </el-col>
      </el-row>
    </el-form>
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
        dateType: {
          type: "date",
          format: "yyyy-MM-dd",
        },
        selectDateId: '1',
        selectDateType: [
          {value: "1", label: "日", typeName: 'date', formatName: "yyyy-MM-dd",},
          {value: "2", label: "月", typeName: 'month', formatName: "yyyy-MM-dd",},
          {value: "3", label: "年", typeName: 'year', formatName: "yyyy-MM-dd",},
        ],
        clickTypeId: undefined,
        rules: {
          startDateValue: [
            {required: true, message: '请输入起始时间', trigger: 'blur'},
          ],
          endDateValue: [
            {required: true, message: '请输入结束时间', trigger: 'blur'},
          ],
        },

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
      this.getGoodsTypeData();
    },
    watch: {
      selectDateId(newValue) {
        let dateType = this.selectDateType.find((item) => newValue === item.value)
        this.dateType.type = dateType.typeName;
        this.dateType.format = dateType.formatName;

        //进行 清空
        this.timeForm.startDateValue = undefined;
        this.timeForm.endDateValue = undefined;
      },
    },
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      this.setGoodsTypeChartOption();
      this.setGoodsChartOption();

      let _this = this;
      _this.goodsTypeChart.on('click', function (param) {
        _this.showGoods = true;
        _this.clickTypeId = param.data.id
        //获取 数据
        _this.getGoodsData();
        //在设置
        _this.setGoodsChartOption();
      })
    },
    methods: {
      setGoodsTypeChartOption() {
        if (this.goodsTypeChart !== null && this.goodsTypeChart !== undefined) {
          this.goodsTypeChart.dispose();
          this.goodsTypeChart = this.$echarts.init(document.getElementById("market_goodsType"));
        } else {
          this.goodsTypeChart = this.$echarts.init(document.getElementById("market_goodsType"));
        }
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
      getGoodsTypeData() {
        let legend = ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        let series = [
          {value: 335, name: '直接访问', id: 1},
          {value: 310, name: '邮件营销', id: 2},
          {value: 234, name: '联盟广告', id: 3},
          {value: 135, name: '视频广告', id: 4},
          {value: 1548, name: '搜索引擎', id: 5}
        ]

        let _this = this;
        this.goodsType.legendData = legend;
        this.goodsType.seriesData = series;
        _this.goods.legendData = legend;
        _this.goods.seriesData = series;

        this.$axios({
          url: 'order/queryGoodsNameNumberTypeId',
          method: "get",
          params: {
            startTime: this.timeForm.startDateValue,
            endTime: this.timeForm.endDateValue,
          },
        }).then((option) => {
          console.log(option.data)
        })
      },
      getGoodsData() {
        if (this.clickTypeId) {
          this.$axios({
            url: 'order/queryGoodsNameNumberTypeId',
            method: "get",
            params: {
              startTime: this.timeForm.startDateValue,
              endTime: this.timeForm.endDateValue,
              typeId: this.clickTypeId,
            },
          }).then((option) => {
            console.log(option.data)
          })
        }
      },
      screenInfoByTime() {
        let _this = this;
        this.$refs['timeForm'].validate((valid) => {
          if (valid) {
            if (_this.$moment(_this.timeForm.startDateValue).isAfter(_this.timeForm.endDateValue)) {
              this.$message.error("开始时间不能低于结束时间！");
              return;
            }
            //查询
            _this.getGoodsTypeData();
            this.getGoodsData();
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
