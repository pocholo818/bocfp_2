<template>
  <ion-page>
    <ion-header>
      <ion-toolbar style="">
        <ion-buttons slot="start">
          <ion-back-button router-link="/child" text="Back"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- content -->
    <ion-content>
      <ion-content class="ion-padding">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Add Record</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-label position="floating">Height (cm):</ion-label>
                <ion-input placeholder="Enter Height" v-model="recordDetails.height"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Weight (kg):</ion-label>
                <ion-input placeholder="Enter Weight" v-model="recordDetails.weight"></ion-input>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Save -->
        <ion-button expand="block" class="theme" @click="record_edit">Edit Record</ion-button><br><br><br>
      </ion-content>

    </ion-content>
  </ion-page>

</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
// icons
import {
  eyeOutline,
  createOutline,
  trashOutline
} from 'ionicons/icons';
// ionic stuff
import {
  IonInput,
  IonList,
  IonCard,
  IonCardContent,
  IonBackButton,
  IonButtons, IonHeader, IonToolbar,
  IonItem, toastController,
  useIonRouter,
  IonCardHeader, IonCardTitle
} from '@ionic/vue';
import { stringLiteral } from '@babel/types';
import { useRoute } from 'vue-router';
// import HeaderBar from '@/components/HeaderBar.vue';
// import {
//   IonContent,
//   IonPage,
// } from '@ionic/vue';

export default defineComponent({
  name: 'ChildPage2',
  components: {
    // HeaderBar,
    IonInput,
    IonList,
    IonCard,
    IonCardContent,
    IonBackButton,
    IonButtons, IonHeader, IonToolbar,
    IonItem,
    IonCardHeader, IonCardTitle
  },
  data() {
    return {
      record_id: "",
      recordDetails: {
        id: "",
        height: "",
        weight: ""
      }
    }
  },
  setup() {
    const ionRouter = useIonRouter();
    const router = useRoute()

    return {
      eyeOutline,
      createOutline,
      trashOutline,
      router,
      ionRouter
    }
  },
  mounted() {
    this.record_id = this.router.params.id + "";
    this.fetchRecord()
  },
  methods: {
    fetchRecord() {
      this.record_id = this.router.params.id + "";

      fetch('http://localhost:5000/record/' + this.record_id)
        .then((response) => response.json())
        .then((json) => {
          this.recordDetails = json
        })
    },
    async record_edit() {
            const toast = await toastController.create({
                duration: 1500,
                position: 'top'
            })

            const data = this.recordDetails;
            fetch('http://localhost:5000/record/' + this.record_id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((data) => {
                    toast.message = 'Success!'
                    this.ionRouter.back()
                })
                .catch((error) => {
                    toast.message = error
                });

            await toast.present();
        }
  }
});



</script>
  

<style scoped>
ion-toolbar {
  --background: #168554;
  --color: white;
}
</style>