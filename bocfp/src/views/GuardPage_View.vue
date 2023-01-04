<template>
  <ion-page>
    <ion-header>
      <ion-toolbar style="">
        <ion-buttons slot="start">
          <ion-back-button router-link="/guardian" text="Back"></ion-back-button>
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
  trashOutline
} from 'ionicons/icons';
// ionic stuff
import {
  IonInput,
  IonList,
  IonCard,
  IonCardContent,
  IonBackButton,
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
    IonBackButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonItem,
  },
  data() {
    return {
      guardId: "",
      guardProfile: ""
    }
  },
  setup() {
    const router = useRoute();

    return {
      eyeOutline,
      createOutline,
      trashOutline,
      router
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

  }
});



</script>
  

<style scoped>
ion-toolbar {
  --background: #168554;
  --color: white;
}
</style>