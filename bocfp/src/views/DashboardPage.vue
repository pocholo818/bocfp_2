<template>
    <ion-page>
        <HeaderBar title="Dashboard" />

        <!-- content -->
        <ion-content>

            <ion-card>
                <ion-card-header>
                    <ion-card-title>{{ childCount }}</ion-card-title>
                    <ion-card-subtitle>Total Child</ion-card-subtitle>
                </ion-card-header>
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
import ChildCard from '@/components/ChildCard.vue'
// import {
//   IonContent,
//   IonPage,
// } from '@ionic/vue';

export default defineComponent({
    name: 'ChildPage',
    components: {
        HeaderBar,
        // IonFab,
        // IonFabButton,
        // IonIcon,
        IonCard,
        IonCardTitle,
        IonCardSubtitle,
        IonCardHeader,
        // IonCardContent,
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
            childCount: ""
        };
    },
    methods: {
        setOpen(isOpen: boolean) {
            this.isOpen = isOpen;
        },
        fetchData() {
            fetch('http://localhost:5000/childs')
                .then((response) => response.json())
                .then((json) => {
                    this.childList = json
                })
        },
        fetchChildCount() {
            fetch('http://localhost:5000/child/count')
                .then((response) => response.json())
                .then((json) => {
                    this.childCount = json
                })
        }
    },
    // get data
    mounted() {
        this.fetchData(),
        this.fetchChildCount()
    },
    watch: {
        $route() {
            this.$nextTick(this.fetchData);
        }
    }
});
</script>
  
<style scoped>

</style>
  