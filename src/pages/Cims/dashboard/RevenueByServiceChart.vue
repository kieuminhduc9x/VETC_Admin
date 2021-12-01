<script>
import { Bar } from 'vue-chartjs'
import Dashboard from '@/api/dashboard'

export default {
  name: 'RevenueByServiceChart',
  extends: Bar,
  data () {
    return {
      revenueType: 3,
      loading: false,
      data: {
        labels: [],
        datasets: [
          {
            label: 'Kế Hoạch',
            backgroundColor: '#feb626',
            borderColor: '#feb626',
            barThickness: 10,
            maxBarThickness: 20,
            minBarLength: 2,
            data: [],
            type: 'line',
            fill: false
          },
          {
            label: 'Doanh Thu',
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
                return Number(values[0]) <= 1 ? data + ' triệu' : Number(values[0]) > 1 ? value + ' triệu' : Number(values[0]) >= 1000000 ? value + ' triệu' : value
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
          revenue = Dashboard.revenueProductByMonth(params)
          break
        case 2:
          revenue = Dashboard.revenueProductByQuarter(params)
          break
        default:
          revenue = Dashboard.revenueProductByYear(params)
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
          this.data.datasets[0].label = 'Kế hoạch năm ' + params.year
          this.data.datasets[1].label = 'Doanh thu năm ' + params.year
        } else if (this.revenueType === 2) {
          this.data.datasets[0].label = 'Kế hoạch quý ' + params.quarter + ' năm ' + params.year
          this.data.datasets[1].label = 'Doanh thu quý ' + params.quarter + ' năm ' + params.year
        } else {
          this.data.datasets[0].label = 'Kế hoạch tháng ' + params.month + ' năm ' + params.year
          this.data.datasets[1].label = 'Doanh thu tháng ' + params.month + ' năm ' + params.year
        }
      } else if (this.compareTimeType === 3) {
        if (this.revenueType === 3) {
          this.data.datasets[0].label = 'Kế hoạch năm ' + params.year
          this.data.datasets[1].label = 'Doanh thu năm ' + params.year
        } else if (this.revenueType === 2) {
          this.data.datasets[0].label = 'Kế hoạch quý ' + params.quarter + ' năm ' + params.year
          this.data.datasets[1].label = 'Doanh thu quý ' + params.quarter + ' năm ' + params.year
        } else {
          this.data.datasets[0].label = 'Kế hoạch tháng ' + params.month + ' năm ' + params.year
          this.data.datasets[1].label = 'Doanh thu tháng ' + params.month + ' năm ' + params.year
        }
      } else {
        if (this.revenueType === 3) {
          this.data.datasets[0].label = 'Kế hoạch năm ' + params.year
          this.data.datasets[1].label = 'Doanh thu năm ' + params.year
        } else if (this.revenueType === 2) {
          this.data.datasets[0].label = 'Kế hoạch quý ' + params.quarter + ' năm ' + params.year
          this.data.datasets[1].label = 'Doanh thu quý ' + params.quarter + ' năm ' + params.year
        } else {
          this.data.datasets[0].label = 'Kế hoạch tháng ' + params.month + ' năm ' + params.year
          this.data.datasets[1].label = 'Doanh thu tháng ' + params.month + ' năm ' + params.year
        }
      }

      this.getDataByType(params)
        .then(rs => {
          const labels = []
          const data = []
          const planData = []
          for (let k = 0; k < rs.length; k++) {
            if (rs.hasOwnProperty(k)) {
              labels.push(rs[k].productCode)
              data.push(rs[k].revenue ?? rs[k].actualRevenue)
              planData.push(rs[k].planRevenue)
            }
          }
          this.data.datasets[1].data = data
          this.data.datasets[0].data = planData
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
