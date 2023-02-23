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
              <ion-card-title>Edit Guardian Information</ion-card-title>
            </ion-card-header>

            <ion-list>
              <ion-item>
                <ion-label position="floating">First Name:</ion-label>
                <ion-input placeholder="Enter First Name" v-model="guardProfile.fname"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Last Name:</ion-label>
                <ion-input placeholder="Enter Last Name" v-model="guardProfile.lname"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Contact Number:</ion-label>
                <ion-input type="tel" @keypress="numOnly($event)" placeholder="Enter Contact Number" maxlength="11"
                  v-model="guardProfile.contact"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Household ID:</ion-label>
                <ion-input type="text" @keyup="uppercase()" placeholder="Enter Household ID" maxlength="7"
                  v-model="guardProfile.household_id"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Address:</ion-label>
                <ion-input type="text" placeholder="Enter Address" v-model="guardProfile.address"></ion-input>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Save -->
        <ion-button expand="block" class="theme" @click="guardian_edit">Save</ion-button>

      </ion-content>
    </ion-content>
  </ion-page>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
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
  IonButtons,
  IonHeader,
  IonToolbar,
  IonItem,
  toastController,
  useIonRouter,
  IonBackButton,
  IonCardHeader,
  IonCardTitle
} from '@ionic/vue';

import { instance as api } from "@/network/Network";

export default defineComponent({
  name: 'ChildPage2',
  components: {
    // HeaderBar,
    IonInput,
    IonList,
    IonCard,
    IonCardContent,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonItem,
    IonBackButton,
    IonCardHeader,
    IonCardTitle
  },
  data() {
    return {
      guardId: "",
      guardProfile: {
        fname: "",
        lname: "",
        contact: "",
        household_id: "",
        address: ""
      }
    }
  },
  setup() {
    const router = useRoute();
    const ionRouter = useIonRouter();

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
    this.guardId = this.router.params.id + "";

    this.fetchGuardProfile()
  },
  methods: {
    fetchGuardProfile() {
      api('/guardian/profile/' + this.guardId)
        .then((response) => response.data)
        .then((data) => {
          this.guardProfile = data
        })
    },
    async guardian_edit() {
      const toast = await toastController.create({
        duration: 1500,
        position: 'top'
      })

      const data = this.guardProfile;

      // checks if empty inputs
      if (this.guardProfile.fname && this.guardProfile.lname && this.guardProfile.contact
        && this.guardProfile.address && this.guardProfile.household_id) {
        // check if household id is less than 7
        api.put(`/guardUpdate/${this.guardId}`, data)
          .then((response) => response.data)
          .then((data) => {
            
            toast.message = 'Success!'
            this.guardProfile = {
              fname: "",
              lname: "",
              contact: "",
              household_id: "",
              address: ""
            }
            this.ionRouter.back()
          })
          .catch((error) => {
            toast.message = error.response.data.message
          });

      }
      else {
        toast.message = "Guardian's details are incomplete"
      }

      await toast.present();
    },
    numOnly(evt: KeyboardEvent): void {
      const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const keyPressed: string = evt.key;

      if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault()
      }
    },
    uppercase() {
      this.guardProfile.household_id = this.guardProfile.household_id.toUpperCase();
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