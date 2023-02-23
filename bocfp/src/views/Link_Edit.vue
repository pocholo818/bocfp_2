<template>
  <ion-page>
    <ion-header>
      <ion-toolbar style="">
        <ion-buttons slot="start">
          <ion-back-button text="Back"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- content -->
    <ion-content>
      <ion-content class="ion-padding">
        <ion-card>
          <ion-card-content>
            <ion-card-header>
              <ion-card-title>Link Edit</ion-card-title>
            </ion-card-header>

            <ion-list>
              <ion-item>
                <ion-label>Relationship:</ion-label>

                <ion-select placeholder="Select Relationship" v-model="linkDetails.relationship">
                  <ion-select-option value="Mother">Mother</ion-select-option>
                  <ion-select-option value="Father">Father</ion-select-option>
                  <ion-select-option value="Foster Mother">Foster Mother</ion-select-option>
                  <ion-select-option value="Foster Father">Foster Father</ion-select-option>
                  <ion-select-option value="Guardian">Guardian</ion-select-option>
                </ion-select>
              </ion-item>

            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Save -->
        <ion-button expand="block" @click="link_edit()">Edit Link</ion-button><br><br><br>
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
  IonList,
  IonCard,
  IonCardContent,
  IonBackButton,
  IonButtons, IonHeader, IonToolbar,
  IonItem, toastController,
  useIonRouter,
  IonSelect, IonSelectOption,
} from '@ionic/vue';

import { useRoute } from 'vue-router';
import { instance as api } from "@/network/Network";

export default defineComponent({
  name: 'ChildPage2',
  components: {
    IonList,
    IonCard,
    IonCardContent,
    IonBackButton,
    IonButtons, IonHeader, IonToolbar,
    IonItem,
    IonSelect, IonSelectOption,
  },
  data() {
    return {
      linkId: "",
      childList: {},
      linkDetails: {
        // "id": "",
        // "guardian_id": "",
        // "relationship": ""
      },
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
    this.linkId = this.router.params.id + "";
    this.fetchLink()
  },
  methods: {
    async link_edit() {
      const toast = await toastController.create({
        duration: 1500,
        position: 'top'
      })

      const data = this.linkDetails;
      api.put('/link/' + this.linkId, data)
        .then(response => response.data)
        .then((data) => {
          toast.message = 'Success!'
          this.ionRouter.back()
        })
        .catch((error) => {
          toast.message = error
        });

      await toast.present();
  },
  fetchLink() {
    api(`/link/${this.linkId}?type=link`)
      .then((response) => response.data)
      .then((data) => {
        this.linkDetails = data
      })
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