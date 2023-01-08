<template>
  <Pie :data="data" :options="options" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend) 

export default defineComponent({
  name: 'PieChart',
  components: { Pie },
  props: {
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
    }
  },
})
</script>