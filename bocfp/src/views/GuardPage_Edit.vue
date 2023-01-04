<template>
  <ion-page>
    <ion-header>
      <ion-toolbar style="">
        <ion-buttons slot="start">
          <!-- replace all ion-back-button -->
          <ion-button :router-link="('/guardian')"><ion-icon
              :icon="arrowBack"></ion-icon>&nbsp;Back</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- content -->
    <ion-content>
      <ion-content class="ion-padding">
        <ion-card>
          <!-- <ion-card-header>
                    <ion-card-title>Add Information</ion-card-title>
                </ion-card-header> -->

          <ion-card-content>
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
                <ion-input type="tel" placeholder="Enter Contact Number" maxlength="11"
                  v-model="guardProfile.contact"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Address:</ion-label>
                <ion-input type="text" placeholder="Enter Address" v-model="guardProfile.address"></ion-input>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Save -->
        <ion-button expand="block" color="success" @click="guardian_edit">Save</ion-button>

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
  useIonRouter
} from '@ionic/vue';

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
  },
  data() {
    return {
      guardId: "",
      guardProfile: {}
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
      fetch('http://localhost:5000/guardian/profile/' + this.guardId)
        .then((response) => response.json())
        .then((json) => {
          this.guardProfile = json
        })
    },
    async guardian_edit() {
      const toast = await toastController.create({
        duration: 1500,
        position: 'top'
      })

      const data = this.guardProfile;

      fetch('http://localhost:5000/guardUpdate/:id', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((data) => {
          toast.message = 'Success!'
          this.guardProfile = {
            fname: "",
            lname: "",
            contact: "",
            address: ""
          }
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