<script>
import { union } from "lodash";
import { Line } from 'vue-chartjs';
export default {
  name: "LineChartComponent",
  extends: Line,
  props: ['itemDataLeft','itemDataRight'],
  data () {
    return {
      data: {
        labels: [0,5,10,15,25,100],
        datasets: [
          {
            label: 'Data One',
            borderColor: "red",
            backgroundColor: "transparent",
            data: [15, 35, 65]
          }
        ]
      }
    }
  },
  mounted () {
    // const minLabel = min([this.itemDataLeft.minWeight, this.itemDataRight.minWeight]);
    // const maxLabel = max([this.itemDataLeft.maxWeight, this.itemDataRight.maxWeight]);
    this.data.labels = this.range(0, this.itemDataLeft.AllWeights.length -1, 1);

    // Datasets
    // Left
    const left = {
      label: "Left Side",
      borderColor: "red",
      backgroundColor: "transparent",
      data: this.itemDataLeft.AllWeights
    }

    // Right
    const right = {
      label: "Right Side",
      borderColor: "blue",
      backgroundColor: "transparent",
      data: this.itemDataRight.AllWeights
    }
    this.data.datasets = union([left],[right]);
    this.renderChart(this.data);
  },
  methods: {
    range(start, end, step = 1) {
      const len = Math.floor((end - start) / step) + 1
      return Array(len).fill().map((_, idx) => start + (idx * step))
    }
  }
}
</script>

<style scoped>

</style>
