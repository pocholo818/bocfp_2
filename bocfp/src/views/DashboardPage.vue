<template>
    <ion-page>
        <HeaderBar title="Dashboard" />

        <!-- content -->
        <ion-content class="ion-padding">

            <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>

            <ion-card id="app-info" class="ion-margin-bottom">
                <ion-card-content>
                    BOCFP is an app that monitors children's BMI to ensure healthy growth and development.
                    It helps identify health issues early, enables early intervention and tracks growth.
                    It is done by calculating BMI using height and weight and comparing it to standard charts for
                    children of that age and gender.
                </ion-card-content>
            </ion-card>

            <ion-card class="ion-margin-bottom">
                <ion-card-header>
                    <ion-card-title>{{ childCount }}</ion-card-title>
                    <ion-card-subtitle>Total Child</ion-card-subtitle>
                </ion-card-header>
            </ion-card>

            <ion-card class="ion-margin-bottom">
                <ion-card-header>
                    <ion-card-title>Remarks</ion-card-title>
                    <!-- <ion-card-subtitle v-for="remarks in childRemarks" :key="remarks.recordId">{{ remarks.remark }}: {{ remarks.total }} ({{ (remarks.total/countTotalRemarks*100).toFixed(2) }}%)</ion-card-subtitle> -->
                    <ion-card-subtitle>Underweight: {{ childRemarks.Underweight }}</ion-card-subtitle>
                    <ion-card-subtitle>Normal: {{ childRemarks.Normal }}</ion-card-subtitle>
                    <ion-card-subtitle>Overweight: {{ childRemarks.Overweight }}</ion-card-subtitle>
                    <ion-card-subtitle>Obese: {{ childRemarks.Obese }}</ion-card-subtitle>
                </ion-card-header>
            </ion-card>

            <ion-card class="ion-margin-bottom">
                <!-- <Pie :data="data" :options="options" /> -->
                <PieChart :data="data" :options="options" />
            </ion-card>

        </ion-content>

    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// ionic stuff
import {
    // IonFab,
    // IonFabButton,
    // IonIcon,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCardContent,
    // IonCardContent,
    // IonSearchbar,
    // toastController,
    // alertController
} from '@ionic/vue';
// icons
import {
    eyeOutline,
    createOutline,
    trashOutline,
    addOutline
} from 'ionicons/icons';
import HeaderBar from '@/components/HeaderBar.vue';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)
import PieChart from '@/components/PieChart.vue'

export default defineComponent({
    name: 'ChildPage',
    components: {
        PieChart,
        HeaderBar,
        // IonFab,
        // IonFabButton,
        // IonIcon,
        IonCard,
        IonCardTitle,
        IonCardSubtitle,
        IonCardHeader,
        IonCardContent,
        // IonSearchbar
        //   ChildCard
    },
    setup() {
        return {
            eyeOutline,
            createOutline,
            trashOutline,
            addOutline
        }
    },
    data() {
        return {
            isOpen: false,
            childList: [],
            childCount: "",
            childRemarks: {},
            countTotalRemarks: 0,
            data: {
                labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
                datasets: [
                    {
                        backgroundColor: ['#ADD8E6', '#41B883', '#FFFF00', '#DD1B16'],
                        data: [0]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }

        };
    },
    methods: {
        setOpen(isOpen: boolean) {
            this.isOpen = isOpen;
        },
        fetchChildRemarks() {
            fetch('http://localhost:5000/child/remarks/')
                .then((response) => response.json())
                .then((json) => {
                    this.childRemarks = json
                    this.data.datasets[0].data = [json.Underweight, json.Normal, json.Overweight, json.Obese]
                    // console.log(this.data)
                })
        },
        fetchChildCount() {
            fetch('http://localhost:5000/child/count')
                .then((response) => response.json())
                .then((json) => {
                    this.childCount = json
                })
        },
        handleRefresh(event: any) {
            setTimeout(() => {
                // Any calls to load data go here
                this.fetchChildRemarks()
                this.fetchChildCount()

                event.target.complete();
            }, 1000);
        }
    },
    // get data
    mounted() {
        this.fetchChildRemarks()
        this.fetchChildCount()
    },
    watch: {
        $route() {
            this.$nextTick(this.fetchChildCount);
        }
    }
});
</script>

<style scoped>
#app-info {
    --background: rgba(0, 0, 0, 0.24);
    --color: white;
    text-align: center;
    box-shadow: none;
}
</style>
