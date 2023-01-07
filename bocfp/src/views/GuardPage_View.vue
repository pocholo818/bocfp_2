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
              <ion-card-title>Guardian Information</ion-card-title>
              <ion-card-subtitle>GRDNID: {{ guardProfile.guardian_id }}</ion-card-subtitle>
            </ion-card-header>

            <ion-list>
              <ion-item>
                <ion-label position="floating">First Name:</ion-label>
                <ion-input placeholder="Enter First Name" v-model="guardProfile.fname" readonly></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Last Name:</ion-label>
                <ion-input placeholder="Enter Last Name" v-model="guardProfile.lname" readonly></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Contact Number:</ion-label>
                <ion-input type="tel" placeholder="Enter Contact Number" maxlength="11" v-model="guardProfile.contact"
                  readonly></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Address:</ion-label>
                <ion-input type="text" placeholder="Enter Address" v-model="guardProfile.address" readonly></ion-input>
              </ion-item>


              <ion-card-content style="display: flex; justify-content: end;">
                <!-- <ion-button color="success" :router-link="('/guardian_profile/' + guardId)"
                  style="width: 32%;"><ion-icon :icon="eyeOutline"></ion-icon>&nbsp; View</ion-button> -->
                <ion-button color="warning" :router-link="('/guardian_edit/' + guardId)"
                  ><ion-icon :icon="createOutline"></ion-icon>&nbsp; Edit</ion-button>
                <ion-button color="danger" @click="guardian_delete(guardId)"><ion-icon
                  :icon="trashOutline"></ion-icon>&nbsp;
                  Del<span>ete</span></ion-button>
              </ion-card-content>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- child(s) list -->
        <ion-card>
          <ion-card-header>
            <div style="position: absolute; right: 0; z-index: 1;padding-right: 1.5vw;">
              <span><ion-button class="theme" :router-link="('/link_add/' + guardId)">+</ion-button></span>
            </div>
            <ion-card-title>Child List:</ion-card-title>
            <ion-card-subtitle>Displaying the linked list of child</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-list>
              <div v-if="childList.relationship == ''">
                <h2 style="text-align: center;">{{ childList.message }}</h2>
              </div>

              <div v-else>
                <ion-item v-for="link in childList" :key="link.link_id">
                  <ion-label>
                    <h2>{{ link.fname }} {{ link.lname }}</h2>
                    <p>Guardian Relationship: {{ link.relationship }}</p>
                    <ion-button color="success" :router-link="'/child_view/' + link.id">View</ion-button>
                    <ion-button color="warning">Edit</ion-button>
                    <ion-button color="danger" @click="link_delete(guardId)">Remove Link</ion-button>
                  </ion-label>
                </ion-item>
              </div>

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
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonBackButton,
  alertController,
  toastController
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
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonBackButton
  },
  data() {
    return {
      guardId: "",
      guardProfile: "",
      childList: ""
    }
  },
  setup() {
    const router = useRoute();

    return {
      eyeOutline,
      createOutline,
      trashOutline,
      arrowBack,
      router
    }
  },
  mounted() {
    this.guardId = this.router.params.id + "";

    this.fetchGuardProfile()
    this.fetchChilds()
  },
  methods: {
    fetchGuardProfile() {
      fetch('http://localhost:5000/guardian/profile/' + this.guardId)
        .then((response) => response.json())
        .then((json) => {
          this.guardProfile = json
        })
    },
    fetchChilds() {
      fetch('http://localhost:5000/guardian/link/' + this.guardId)
        .then((response) => response.json())
        .then((json) => {
          this.childList = json
        })
    },
    async link_delete(guardian_id: string) {
      const alert = await alertController.create({
        header: 'Are you sure you want to delete?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'DELETE',
            role: 'confirm',
            handler: async () => {
              const toast = await toastController.create({
                duration: 1500,
                position: 'top'
              })
              const guardId = guardian_id

              fetch('http://localhost:5000/link/del/' + this.guardId, {
                method: 'put'
              })
                .then((data) => {
                  toast.message = 'Success!'
                  this.fetchChilds()
                })
                .catch((error) => {
                  toast.message = error
                });

              await toast.present();
            },
          },
        ],
      });

      await alert.present();
      this.fetchChilds();
    }
  },
  watch: {
    $route() {
      this.$nextTick(this.fetchChilds);
    }
  },
});



</script>
  

<style scoped>
ion-toolbar {
  --background: #168554;
  --color: white;
}
</style>