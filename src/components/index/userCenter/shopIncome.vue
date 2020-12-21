<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-date-picker
          v-model="startDateValue"
          :type="dateType"
          value-format="yyyy-MM-dd"
          placeholder="起始时间">
        </el-date-picker>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="endDateValue"
          :type="dateType"
          value-format="yyyy-MM-dd"
          placeholder="结束时间">
        </el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click=" getOrderMoneyData "><i class="el-icon-search"></i>查询</el-button>
      </el-col>
      <el-col :span="4" :offset="1" style="margin-top: -10px ">
        <el-card shadow="always">
          时段总金额：{{countMoney}}
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="9">
        <div id="shopIncomeChart" style="width: 1200px;height: 600px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        //时间控件
        startDateValue: this.$moment().format("yyyy-MM-DD"),
        endDateValue: this.$moment().format("yyyy-MM-DD"),
        dateType: "date",


        incomeChart: undefined,
        incomeData: {
          timeData: undefined,//时间段
          moneyData: undefined,//[] 金额 数组
        },
        countMoney: 0,
      }
    },
    watch: {
      selectDateId(newValue) {
        let dateType = this.selectDateType.find((item) => newValue === item.value)
        this.dateType = dateType.typeName;
      },
    },
    created() {
      this.getOrderMoneyData();
    },
    mounted() {
      this.incomeChart = this.$echarts.init(document.getElementById('shopIncomeChart'));
      this.setOptionShop()
    },
    methods: {
      getOrderMoneyData() {
        let _this = this;
        this.$axios({
          url: "order/queryTimeCountMoneyByTime",
          method: "post",
          data: JSON.stringify({
            userLoginName: sessionStorage.getItem("loginName"),
            startTime: this.startDateValue,
            endTime: this.endDateValue,
          }),
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
        }).then((option) => {
          let timeData = [];
          let moneyData = [];
          let countMoney = 0;
          option.data.forEach((item, index) => {
            countMoney += item.money;
            timeData[index] = (_this.$moment(item.endTime).format("yyyy.MM.DD")) + "";
            moneyData.push(item.money);
          });
          _this.incomeData.timeData = timeData;
          _this.incomeData.moneyData = moneyData;
          _this.countMoney = countMoney;
          _this.setOptionShop()
        })
      },
      setOptionShop() {
        /**
         * 有问题
         */
        let timeData = this.incomeData.timeData;
        if (timeData !== undefined && timeData.length > 0) {
          let array = [];
          timeData.forEach((item, index) => {
              array[index] = "2020" + "";
            }
          )
          timeData = array;
          timeData[0] = "ss";
        }
        console.log(timeData)
        let moneyData = this.incomeData.moneyData;
        this.incomeChart.setOption({
          title: {
            text: '商户时间段收益'
          },
          tooltip: {},
          legend: {
            data: ['收益']
          },
          xAxis: {
            data: timeData
          },
          yAxis: {},
          series: [{
            name: '收益',
            type: 'bar',
            data: moneyData,
          }]
        })
      },
    }
  }
</script>
<style scoped>
</style>
