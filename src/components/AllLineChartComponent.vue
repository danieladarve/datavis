<script>
import { forEach } from "lodash";
import { Line } from 'vue-chartjs';

export default {
  name: "AllLineChartComponent",
  extends: Line,
  props: ['allItemData','itemDataLeft','itemDataRight'],
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
      },
      colours: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']
    }
  },
  watch: {
    allItemData() {
      this.prepData();
      this.$data._chart.update()
    }
  },
  mounted () {
    this.prepData();
    this.renderChart(this.data, { responsive: true, maintainAspectRatio: false });
  },
  methods: {
    range(start, end, step = 1) {
      const len = Math.floor((end - start) / step) + 1
      return Array(len).fill().map((_, idx) => start + (idx * step))
    },
    prepData() {
      let max = 0;
      const datasets = [];
      let n = 0;
      forEach(this.allItemData.Left, (value, key) => {
        if(max < value.AllReadings.length){
          max = value.AllReadings.length;
        }
        datasets.push({
          label: `${key} LS`,
          borderColor: this.colours[n],
          backgroundColor: "transparent",
          data: value.AllWeights
        });
        n = n + 1;
        datasets.push({
          label: `${key} RS`,
          borderColor: this.colours[n],
          backgroundColor: "transparent",
          data: this.allItemData.Right[key].AllWeights
        });
        n = n + 1;
      });

      forEach(this.allItemData.Right, (value) => {
        if(max < value.AllReadings.length){
          max = value.AllReadings.length;
        }
      })
      this.data.labels = this.range(0, max -1, 1);
      this.data.datasets = datasets;
    }
  }
}
</script>

<style scoped>

</style>
