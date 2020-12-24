<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-date-picker
          v-model="startDateValue"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="起始时间">
        </el-date-picker>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="endDateValue"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="结束时间">
        </el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click=" screenInfoByTime "><i class="el-icon-search"></i>查询</el-button>
      </el-col>
      <el-col :span="4" :offset="1" style="margin-top: -10px ">
        <el-card shadow="always">
          时段总金额：{{countMoney}}
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="9">
        <div id="shopIncomeChart" v-show="showIncome" style="width: 1200px;height: 600px;"></div>
        <div v-show="!showIncome">
          <h1>数据为空！</h1>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        //时间控件
        startDateValue: undefined,
        endDateValue: undefined,

        showIncome: true,
        incomeChart: undefined,
        incomeData: {
          timeData: undefined,//时间段
          moneyData: undefined,//[] 金额 数组
        },
        countMoney: 0,
      }
    },
    mounted: function () {
      this.screenInfoByTime();
    },
    methods: {
      screenInfoByTime: async function () {
        await this.getOrderMoneyData();
        if (this.incomeData.timeData.length === 0) {
          this.showIncome = false;
          this.$message.error("数据为空！");
        } else {
          this.showIncome = true;
          this.$nextTick(() => {
            this.setOptionShop();
          })
        }
      },
      getOrderMoneyData: async function () {
        let _this = this;
        await this.$axios({
          url: "order/queryTimeCountMoneyByTime",
          method: "get",
          params: {
            startTime: this.startDateValue,
            endTime: this.endDateValue,
            loginName: sessionStorage.getItem("loginName"),
          }
        }).then((option) => {
          let timeData = [];
          let moneyData = [];
          let countMoney = 0;
          option.data.forEach((item) => {
            countMoney += item.money;
            timeData.push(_this.$moment(item.endTime).format("yyyy-MM-DD"));
            moneyData.push(item.money);
          });
          _this.incomeData.timeData = timeData;
          _this.incomeData.moneyData = moneyData;
          _this.countMoney = countMoney;
        })
      },
      setOptionShop() {
        if (this.incomeChart !== null && this.incomeChart !== undefined) {
          this.incomeChart.dispose();
          this.incomeChart = this.$echarts.init(document.getElementById("shopIncomeChart"));
        } else {
          this.incomeChart = this.$echarts.init(document.getElementById("shopIncomeChart"));
        }

        this.incomeChart.setOption({
          xAxis: {
            type: 'category',
            data: this.incomeData.timeData,
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.incomeData.moneyData,
            type: 'bar'
          }]
        });
      },
    }
  }
</script>
<style scoped>
</style>
