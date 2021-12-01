
<script>
import { Bar } from './BaseChart.js'

export default {
  extends: Bar,
  // eslint-disable-next-line vue/require-prop-types
  props: ['chartdata', 'options'],
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
