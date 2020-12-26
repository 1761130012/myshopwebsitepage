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
      <el-col :span="5" :offset="1">
        <el-card shadow="always">
          总收入：{{countMoney}}
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="1">
        <div v-show="showIncome" style="width: 1000px;height: 600px" id="incomeChart">
        </div>
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
        countMoney: 0,
        timeForm: {
          startDateValue: undefined,
          endDateValue: undefined,
        },
        incomeChart: undefined,
        showIncome: true,
        income: {
          legendData: [],//格式 ['','']
          seriesData: [],//格式 ['','']
        }
      }
    },
    mounted: function () {
      this.screenInfoByTime();
    },
    methods: {
      getIncomeData: async function () {
        let legendData = [];
        let seriesData = [];
        let _this = this;
        await this.$axios({
          url: "order/queryIncomeByTime",
          params: {
            startTime: this.timeForm.startDateValue,
            endTime: this.timeForm.endDateValue,
          }
        })
          .then((option) => {
            let data = option.data;
            let countMoney = 0
            Object.keys(data).forEach((item) => {
              legendData.push(_this.$moment(item).format("yyyy-MM-DD"));
              countMoney += data[item];
              seriesData.push(data[item]);
            });
            _this.countMoney = countMoney;
          })
        this.income.legendData = legendData;
        this.income.seriesData = seriesData;
      },
      setIncomeData() {
        if (this.incomeChart !== null && this.incomeChart !== undefined) {
          this.incomeChart.dispose();
          this.incomeChart = this.$echarts.init(document.getElementById("incomeChart"));
        } else {
          this.incomeChart = this.$echarts.init(document.getElementById("incomeChart"));
        }


        this.incomeChart.setOption({
          xAxis: {
            type: 'category',
            data: this.income.legendData,
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.income.seriesData,
            type: 'bar'
          }]
        });
      },
      screenInfoByTime: async function () {
        await this.getIncomeData();
        this.showIncome = true;
        if (this.income.legendData.length === 0) {
          this.$nextTick(() => {
            this.$message.error("数据为空！")
            this.showIncome = false;
          })
          return;
        }
        await this.setIncomeData();
      }
    },
  }
</script>

<style scoped>

</style>
