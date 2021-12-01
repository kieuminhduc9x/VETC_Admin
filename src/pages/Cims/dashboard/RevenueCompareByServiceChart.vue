<script>
import { Bar } from 'vue-chartjs'
import Dashboard from '@/api/dashboard'

export default {
  name: 'RevenueCompareByServiceChart',
  extends: Bar,
  data () {
    return {
      loading: false,
      data: {
        labels: [],
        datasets: [
          {
            label: 'DT So Sánh',
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
              return datasetLabel + ':' + ' ' + value
            }
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: true
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
                return value + ' triệu'
              }
            }
          }]
        }
      },
      labels: {
        month: '',
        quarter: 'Quý ',
        year: 'Quý '
      }
    }
  },
  async mounted () {
    this.options.tooltips.callbacks.title = (tooltipItem, chart) => {
      return tooltipItem[0].xLabel
    }
  },
  methods: {
    getDataByType (params) {
      let revenue = null
      switch (this.revenueType) {
        case 1:
          revenue = Dashboard.revenueCompareProductByMonth(params)
          break
        case 2:
          params = {
            compareTimeType: params.compareTimeType,
            listProductCode: params.listProductCode,
            otherQuarter: params.otherQuarter || 4,
            otherYear: params.otherYear || 2020,
            quarter: params.quarter,
            type: params.type,
            year: params.year
          }
          revenue = Dashboard.revenueCompareProductByQuarter(params)
          break
        default:
          revenue = Dashboard.revenueCompareProductByYear(params)
      }
      return revenue
    },
    async getData (params) {
      this.loading = true
      if (params.revenueType) {
        this.revenueType = params.revenueType
      }

      // Ghi chú biểu đồ
      this.compareTimeType = params.compareTimeType
      if (this.compareTimeType === 1) {
        if (this.revenueType === 3) {
          this.data.datasets[0].label = 'DT năm ' + (params.year - 1)
          this.data.datasets[1].label = 'DT năm ' + params.year
        } else if (this.revenueType === 2) {
          this.data.datasets[0].label = 'DT quý ' + params.quarter + ' năm ' + (params.year - 1)
          this.data.datasets[1].label = 'DT quý ' + params.quarter + ' năm ' + params.year
        } else {
          this.data.datasets[0].label = 'DT tháng ' + params.month + ' năm ' + (params.year - 1)
          this.data.datasets[1].label = 'DT tháng ' + params.month + ' năm ' + params.year
        }
      } else if (this.compareTimeType === 3) {
        if (this.revenueType === 3) {
          this.data.datasets[0].label = 'DT năm ' + params.otherYear
          this.data.datasets[1].label = 'DT năm ' + params.year
        } else if (this.revenueType === 2) {
          this.data.datasets[0].label = 'DT quý ' + params.otherQuarter + ' năm ' + params.otherYear
          this.data.datasets[1].label = 'DT quý ' + params.quarter + ' năm ' + params.year
        } else {
          this.data.datasets[0].label = 'DT tháng ' + params.otherMonth + ' năm ' + params.otherYear
          this.data.datasets[1].label = 'DT tháng ' + params.month + ' năm ' + params.year
        }
      } else {
        if (this.revenueType === 3) {
          this.data.datasets[0].label = 'DT năm ' + params.year
          this.data.datasets[1].label = 'DT năm ' + params.year
        } else if (this.revenueType === 2) {
          this.data.datasets[0].label = 'DT quý ' + params.otherQuarter + ' năm ' + params.year
          this.data.datasets[1].label = 'DT quý ' + params.quarter + ' năm ' + params.year
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
          for (let k = 0; k < rs.length; k++) {
            if (rs.hasOwnProperty(k)) {
              labels.push(rs[k].month ?? rs[k].productCode)
              data2.push(rs[k].revenueMonthCompare ?? rs[k].revenue)
              data.push(rs[k].revenueSamePriod ?? rs[k].samePeriodRevenue)
            }
          }
          this.data.datasets[0].data = data
          this.data.datasets[1].data = data2
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
