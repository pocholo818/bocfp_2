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
                <ion-label position="floating">Household ID:</ion-label>
                <ion-input type="text" placeholder="Enter Household ID" maxlength="7"
                  v-model="guardProfile.household_id" readonly></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Address:</ion-label>
                <ion-input type="text" placeholder="Enter Address" v-model="guardProfile.address" readonly></ion-input>
              </ion-item>

              <!-- options -->
              <ion-card-content style="display: flex; justify-content: end;">
                <ion-button color="warning" :router-link="('/guardian_edit/' + guardId)"><ion-icon
                    :icon="createOutline"></ion-icon>&nbsp; Edit</ion-button>
                <ion-button v-if="guardProfile.soft_delete === 0" color="danger"
                  @click="guardian_delete(guardId)"><ion-icon :icon="trashOutline"></ion-icon>&nbsp;
                  Del<span>ete</span></ion-button>
                <ion-button v-else color="success" @click="guardian_undo()"><ion-icon :icon="arrowUndoOutline">
                  </ion-icon>&nbsp;
                  Retrieve</ion-button>
              </ion-card-content>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- child(s) list -->
        <ion-card>
          <ion-card-header>
            <div style="position: absolute; right: 0; z-index: 1;padding-right: 1.5vw;">
              <span><ion-button :router-link="('/link_add/' + guardId)">+</ion-button></span>
            </div>
            <ion-card-title>Child List:</ion-card-title>
            <ion-card-subtitle>Displaying the linked list of child</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-list>
              <div v-if="child.message">
                <h2 style="text-align: center;">{{ child.message }}</h2>
              </div>

              <div v-else>
                <ion-item class="hide-on-mobile">
                  <ion-label>
                    <h2>{{ child.fname }} {{ child.lname }}</h2>
                    <p>Guardian Relationship: {{ child.relationship }}</p>
                    <ion-button color="success" :router-link="'/child_view/' + child.id"><ion-icon
                        :icon="eyeOutline"></ion-icon>View</ion-button>
                    <ion-button color="warning" :router-link="'/link_edit/' + child.link_id"><ion-icon
                        :icon="createOutline"></ion-icon>Edit</ion-button>
                    <ion-button color="danger" @click="link_delete(child.link_id)"><ion-icon
                        :icon="trashOutline"></ion-icon>Del<span>ete</span>&nbsp;Link</ion-button>
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
  arrowBack,
  arrowUndoOutline
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
  toastController,
  IonButton,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  useIonRouter,
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
      child: ""
    }
  },
  setup() {
    const router = useRoute();
    const ionRouter = useIonRouter()

    return {
      eyeOutline,
      createOutline,
      trashOutline,
      arrowBack,
      arrowUndoOutline,
      router,
      ionRouter
    }
  },
  ionViewWillEnter() {
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
      fetch('http://localhost:5000/link/' + this.guardId + '?type=guardian')
        .then((response) => response.json())
        .then((json) => {
          this.child = json
        })
    },
    async guardian_delete(guardian_id: string) {
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
              const guard_id = guardian_id;

              fetch('http://localhost:5000/guardianDel/' + guard_id, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then((data) => {
                  toast.message = 'Success!'
                })
                .catch((error) => {
                  toast.message = error
                });
              await toast.present();
              this.ionRouter.back()
            },
          },
        ],
      });

      await alert.present();
    },
    async guardian_undo() {
      const alert = await alertController.create({
        header: 'Are you sure you want to retrieve?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'RETRIEVE',
            role: 'confirm',
            handler: async () => {
              const toast = await toastController.create({
                duration: 1500,
                position: 'top'
              })

              const guardian_id = this.guardId

              fetch('http://localhost:5000/guardian/ret/' + guardian_id, {
                method: 'PUT'
              })
                .then((data) => {
                  toast.message = 'Success!'
                })
                .catch((error) => {
                  toast.message = error
                });

              await toast.present();
              this.ionRouter.back()
            },
          },
        ],
      });

      await alert.present();
    },
    async link_delete(link: string) {
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

              const linkId = link

              fetch('http://localhost:5000/link/' + linkId, {
                method: 'DELETE'
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