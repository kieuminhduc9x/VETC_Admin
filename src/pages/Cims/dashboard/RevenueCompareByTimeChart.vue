<script>
import { Bar } from 'vue-chartjs'
import Dashboard from '@/api/dashboard'

export default {
  name: 'RevenueCompareByTimeChart',
  extends: Bar,
  data () {
    return {
      revenueType: 3,
      compareTimeType: 0,
      params: {},
      loading: false,
      data: {
        labels: [],
        datasets: [
          {
            label: 'DT so sánh',
            backgroundColor: '#de350b',
            borderColor: '#de350b',
            barThickness: 10,
            maxBarThickness: 20,
            minBarLength: 2,
            type: 'line',
            fill: false,
            data: []
          },
          {
            label: 'DT Hiện Tại',
            backgroundColor: '#47bc8a',
            barThickness: 10,
            maxBarThickness: 20,
            minBarLength: 2,
            data: []
          }
        ]
      },
      options: {
        barValueSpacing: 20,
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            title: () => {},
            label: function (tooltipItem, chart) {
              const datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || ''
              let value = tooltipItem.yLabel.toString()
              value = value.split(/(?=(?:...)*$)/)
              value = value.join('.')
              if (chart.labels.length === 4) {
                const label = Number(tooltipItem.label)
                return 'DT quý ' + label + datasetLabel + ':' + ' ' + value
              }
              return datasetLabel + ':' + ' ' + value
            }
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: true
            },
            ticks: {
              userCallback: () => {}
            }
          }],
          yAxes: [{
            gridLines: {
              display: true
            },
            ticks: {
              beginAtZero: true,
              // stepSize: 1000000,
              userCallback: function (value, index, values) {
                if (value) {
                  value = Math.abs(Number(value)) >= 1.0e+9
                    ? Math.abs(Number(value)) / 1000000
                    : Math.abs(Number(value)) >= 1000000
                      ? Math.abs(Number(value)) / 1000000
                      : Math.abs(Number(value)) >= 1000000
                        ? Math.abs(Number(value)) / 1000000
                        : Math.abs(Number(value))
                  value = value.toString()
                  value = value.split(/(?=(?:...)*$)/)
                  value = value.join('.')
                }
                return value + ' Triệu'
              }
            }
          }]
        }
      },
      labels: {
        month: 'Tháng',
        quarter: 'Quý',
        year: 'Năm '
      }
    }
  },
  async mounted () {
    this.options.scales.xAxes[0].ticks.userCallback = (value, index, values) => {
      return (this.revenueType === 1 ? '' : (this.revenueType === 2 ? 'Q' : 'T')) + value
    }
    this.options.tooltips.callbacks.title = (tooltipItem, chart) => {
      let extraLabel = ', '
      if (tooltipItem[0].datasetIndex === 0) {
        extraLabel += this.params.compareTimeType === 3 ? this.params.otherYear : this.params.year
      } else {
        extraLabel += this.params.year
      }
      return (this.revenueType === 1 ? 'Ngày ' : (this.revenueType === 2 ? 'Quý ' : 'Tháng ')) + tooltipItem[0].xLabel + extraLabel
    }
  },
  methods: {
    getDataByType (params) {
      let revenue = null
      switch (this.revenueType) {
        case 1:
          revenue = Dashboard.revenueCompareByMonth(params)
          break
        case 2:
          revenue = Dashboard.revenueCompareByQuarter(params)
          break
        default:
          revenue = Dashboard.revenueCompareByYear(params)
      }
      return revenue
    },
    async getData (params) {
      this.loading = true
      if (params.revenueType) {
        this.revenueType = params.revenueType
      }
      this.params = params

      // Ghi chú biểu đồ
      this.compareTimeType = params.compareTimeType
      if (this.compareTimeType === 1) {
        if (this.revenueType === 3) {
          this.data.datasets[0].label = 'DT năm ' + (params.year - 1)
          this.data.datasets[1].label = 'DT năm ' + params.year
        } else if (this.revenueType === 2) {
          this.data.datasets[0].label = ' năm ' + (params.year - 1)
          this.data.datasets[1].label = ' năm ' + params.year
        } else {
          this.data.datasets[0].label = 'DT tháng ' + params.month + ' năm ' + (params.year - 1)
          this.data.datasets[1].label = 'DT tháng ' + params.month + ' năm ' + params.year
        }
      } else if (this.compareTimeType === 3) {
        if (this.revenueType === 3) {
          this.data.datasets[0].label = 'DT năm ' + params.otherYear
          this.data.datasets[1].label = 'DT năm ' + params.year
        } else if (this.revenueType === 2) {
          this.data.datasets[0].label = ' năm ' + params.otherYear
          this.data.datasets[1].label = ' năm ' + params.year
        } else {
          this.data.datasets[0].label = 'DT tháng ' + params.otherMonth + ' năm ' + params.otherYear
          this.data.datasets[1].label = 'DT tháng ' + params.month + ' năm ' + params.year
        }
      } else {
        if (this.revenueType === 3) {
          this.data.datasets[0].label = 'DT năm ' + params.year
          this.data.datasets[1].label = 'DT năm ' + params.year
        } else if (this.revenueType === 2) {
          this.data.datasets[0].label = ' năm ' + params.year
          this.data.datasets[1].label = ' năm ' + params.year
        } else {
          this.data.datasets[0].label = 'DT tháng ' + (params.month - 1) + ' năm ' + params.year
          this.data.datasets[1].label = 'DT tháng ' + params.month + ' năm ' + params.year
        }
      }

      this.getDataByType(params)
        .then(rs => {
          const labels = []
          const data = []
          const data2 = []
          this.data.datasets[0].backgroundColor = []
          this.data.datasets[1].backgroundColor = []
          for (let k = 0; k < rs.length; k++) {
            if (rs.hasOwnProperty(k)) {
              const time = rs[k].month ?? rs[k].date
              labels.push(time)
              data.push(rs[k].revenueMonthCompare ?? rs[k].revenue)
              data2.push(rs[k].revenueSamePriod ?? rs[k].samePeriodRevenue)
              let background = '#47bc8a'
              const background1 = '#de350b'
              if (this.revenueType === 2) {
                if (parseInt(time, 10) === parseInt(params.quarter, 10)) {
                  background = '#025436'
                  this.data.datasets[0].type = 'bar'
                }
              } else if (this.revenueType === 1) {
                this.data.datasets[0].type = 'line'
              }
              this.data.datasets[1].backgroundColor.push(background)
              this.data.datasets[0].backgroundColor.push(background1)
            }
          }
          this.data.datasets[1].data = data
          this.data.datasets[0].data = data2
          this.data.labels = labels
          this.renderChart(this.data, this.options)
        })
        .catch(error => {
          const msg = this.handleApiError(error)
          if (msg) {
            this.$notification.error({
          message: '',
          description: msg,
          duration: 5
        })
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
