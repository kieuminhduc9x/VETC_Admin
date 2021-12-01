<script>
import { Bar } from 'vue-chartjs'
import Dashboard from '@/api/dashboard'

export default {
  name: 'LowestRevenueByProvinceChart',
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
            backgroundColor: '#de350b',
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
                const data = value
                value = Math.abs(Number(value)) / 1000000
                value = value.toString()
                value = value.split(/(?=(?:...)*$)/)
                value = value.join('.')
                return Number(values[0]) <= 1 ? data + ' triệu' : Number(values[0]) > 1 ? data / 1000000 + ' triệu' : Number(values[0]) >= 1000000 ? value + ' triệu' : value
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
  },
  methods: {
    getDataByType (params) {
      let revenue = null
      switch (this.revenueType) {
        case 1:
          revenue = Dashboard.leastestRevenueProvinceByMonth(params)
          break
        case 2:
          revenue = Dashboard.leastestRevenueProvinceByQuarter(params)
          break
        default:
          revenue = Dashboard.leastestRevenueProvinceByYear(params)
      }
      return revenue
    },
    async getData (params) {
      this.loading = true
      if (params.revenueType) {
        this.revenueType = params.revenueType
      }

      this.compareTimeType = params.compareTimeType
      if (this.compareTimeType === 1) {
        if (this.revenueType === 3) {
          this.data.datasets[0].label = 'Doanh thu năm ' + params.year
        } else if (this.revenueType === 2) {
          this.data.datasets[0].label = 'Doanh thu quý ' + params.quarter + ' năm ' + params.year
        } else {
          this.data.datasets[0].label = 'Doanh thu tháng ' + params.month + ' năm ' + params.year
        }
      } else if (this.compareTimeType === 3) {
        if (this.revenueType === 3) {
          this.data.datasets[0].label = 'Doanh thu năm ' + params.year
        } else if (this.revenueType === 2) {
          this.data.datasets[0].label = 'Doanh thu quý ' + params.quarter + ' năm ' + params.year
        } else {
          this.data.datasets[0].label = 'Doanh thu tháng ' + params.month + ' năm ' + params.year
        }
      } else {
        if (this.revenueType === 3) {
          this.data.datasets[0].label = 'Doanh thu năm ' + params.year
        } else if (this.revenueType === 2) {
          this.data.datasets[0].label = 'Doanh thu quý ' + params.quarter + ' năm ' + params.year
        } else {
          this.data.datasets[0].label = 'Doanh thu tháng ' + params.month + ' năm ' + params.year
        }
      }

      this.getDataByType(params)
        .then(rs => {
          const labels = []
          const data = []
          for (let k = 0; k < rs.length; k++) {
            if (rs.hasOwnProperty(k)) {
              labels.push(rs[k].provinceName)
              data.push(rs[k].revenue)
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
