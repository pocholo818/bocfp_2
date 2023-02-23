<template>
  <ion-page>
    <ion-header>
      <ion-toolbar style="">
        <ion-buttons slot="start">
          <ion-back-button text="Back" :defaultHref="'/record_view/' + recordDetails.id"></ion-back-button>
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
                <ion-input placeholder="Enter Height" @keypress="numOnly($event)" maxlength="7"
                  v-model="recordDetails.height"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Weight (kg):</ion-label>
                <ion-input placeholder="Enter Weight" @keypress="numOnly($event)" maxlength="6"
                  v-model="recordDetails.weight"></ion-input>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Save -->
        <ion-button expand="block" @click="record_edit">Edit Record</ion-button><br><br><br>
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
  trashOutline,
  arrowBack
} from 'ionicons/icons';
// ionic stuff
import {
  IonInput,
  IonList,
  IonCard,
  IonCardContent,
  IonButtons, IonHeader, IonToolbar,
  IonItem, toastController,
  useIonRouter,
  IonCardHeader, IonCardTitle,
  IonBackButton
} from '@ionic/vue';
import { useRoute } from 'vue-router';
import { instance as api } from "@/network/Network";

export default defineComponent({
  name: 'ChildPage2',
  components: {
    // HeaderBar,
    IonInput,
    IonList,
    IonCard,
    IonCardContent,
    IonButtons, IonHeader, IonToolbar,
    IonItem,
    IonCardHeader, IonCardTitle,
    IonBackButton
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
      arrowBack,
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

        api('/record/' + this.record_id)
        .then((response) => response.data)
        .then((data) => {
          this.recordDetails = data
        })
    },
    async record_edit() {
      const toast = await toastController.create({
        duration: 1500,
        position: 'top'
      })

      // checks if empty
      if (this.recordDetails.height && this.recordDetails.weight) {
        const data = this.recordDetails;
          api.put('/record/' + this.record_id, data)
          .then(response => response.data)
          .then((data) => {
            toast.message = 'Success!'
            this.ionRouter.back()
          })
          .catch((error) => {
            toast.message = error
          });
      } else {
        toast.message = "Record is incomplete"
      }

      await toast.present();
    },
    numOnly(evt: KeyboardEvent): void {
      const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
      const keyPressed: string = evt.key;

      if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault()
      }
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