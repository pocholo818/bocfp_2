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
          <ion-card-header>
            <ion-card-title>Add Record</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-label position="floating">Height (cm):</ion-label>
                <ion-input @keypress="numOnly($event)" maxlength="3" placeholder="Enter Height" v-model="recordDetails.height"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Weight (kg):</ion-label>
                <ion-input @keypress="numOnly($event)" maxlength="3" placeholder="Enter Weight" v-model="recordDetails.weight"></ion-input>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Save -->
        <ion-button expand="block" @click="record_add">Add Record</ion-button><br><br><br>
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
      childId: "",
      recordDetails: {
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
    this.childId = this.router.params.id + "";
  },
  methods: {
    async record_add() {
      const toast = await toastController.create({
        duration: 1500,
        position: 'top'
      })

      // checks if empty
      if (this.recordDetails.height && this.recordDetails.weight) {
        const data = this.recordDetails;
        fetch('http://localhost:5000/record/' + this.childId, {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((data) => {
            toast.message = 'Success!'
            this.recordDetails = {
              height: "",
              weight: ""
            }
            this.ionRouter.push("/child_view/" + this.childId);
          })
          .catch((error) => {
            toast.message = error
          });
      }
      else {
        toast.message = "Record is incomplete"
      }

      await toast.present();
    },
    numOnly(evt: KeyboardEvent): void {
      const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
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