<template>
  <Line :data="data" :options="options" v-if="loaded" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Line } from 'vue-chartjs'
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default defineComponent({
  name: 'LineChart',
  components: { Line },
  props: {
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
    }
  },
  data() {
    return {
      loaded: true,
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        // refresh upon data changes
        this.loaded = false
        setTimeout(() => this.loaded = true, 0)
      }
    }
  }
})
</script>