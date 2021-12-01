<script>
import { Bar } from 'vue-chartjs'
import Dashboard from '@/api/dashboard'

export default {
  name: 'RevenueByTimeChart',
  extends: Bar,
  data () {
    return {
      revenueType: 3,
      loading: false,
      data: {
        labels: [],
        datasets: [
          {
            label: 'Doanh Thu',
            backgroundColor: [],
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
            title: () => { },
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
    this.options.scales.xAxes[0].ticks.userCallback = (value, index, values) => {
      return (this.revenueType === 1 ? '' : (this.revenueType === 2 ? 'Q' : 'T')) + value
    }
    this.options.tooltips.callbacks.title = (tooltipItem, chart) => {
      return (this.revenueType === 1 ? 'Ngày ' : (this.revenueType === 2 ? 'Quý ' : 'Tháng ')) + tooltipItem[0].xLabel
    }
  },
  methods: {
    getDataByType (params) {
      let revenue = null
      switch (this.revenueType) {
        case 1:
          revenue = Dashboard.revenueByMonth(params)
          break
        case 2:
          revenue = Dashboard.revenueByQuarter(params)
          break
        default:
          revenue = Dashboard.revenueByYear(params)
      }
      return revenue
    },
    async getData (params) {
      if (params.revenueType) {
        this.revenueType = params.revenueType
      }
      // Ghi chú biểu đồ
      this.compareTimeType = params.compareTimeType
      if (this.compareTimeType === 1) {
        if (this.revenueType === 3) {
          this.data.datasets[0].label = 'DT năm ' + params.year
        } else if (this.revenueType === 2) {
          this.data.datasets[0].label = ' năm ' + params.year
        } else {
          this.data.datasets[0].label = 'DT tháng ' + params.month + ' năm ' + params.year
        }
      } else if (this.compareTimeType === 3) {
        if (this.revenueType === 3) {
          this.data.datasets[0].label = 'DT năm ' + params.year
        } else if (this.revenueType === 2) {
          this.data.datasets[0].label = ' năm ' + params.year
        } else {
          this.data.datasets[0].label = 'DT tháng ' + params.month + ' năm ' + params.year
        }
      } else {
        if (this.revenueType === 3) {
          this.data.datasets[0].label = 'DT năm ' + params.year
        } else if (this.revenueType === 2) {
          this.data.datasets[0].label = ' năm ' + params.year
        } else {
          this.data.datasets[0].label = 'DT tháng ' + params.month + ' năm ' + params.year
        }
      }

      this.loading = true
      this.getDataByType(params)
        .then(rs => {
          const labels = []
          const data = []
          this.data.datasets[0].backgroundColor = []
          for (let k = 0; k < rs.length; k++) {
            if (rs.hasOwnProperty(k)) {
              labels.push(rs[k].time)
              data.push(rs[k].revenue)
              let background = '#47bc8a'
              if (this.revenueType === 2) {
                if (parseInt(rs[k].time, 10) === parseInt(params.quarter, 10)) {
                  background = '#025436'
                }
              }
              this.data.datasets[0].backgroundColor.push(background)
            }
          }
          this.data.datasets[0].data = data
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
