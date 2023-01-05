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
              <ion-card-title>Link Add</ion-card-title>
            </ion-card-header>

            <ion-list>
              <ion-item>
                <ion-searchbar></ion-searchbar>
              </ion-item><br>

              <ion-item>
                <ion-label>Child:</ion-label>

                <ion-select placeholder="Male/Female">
                  <ion-select-option value="M">Male</ion-select-option>
                  <ion-select-option value="F">Female</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Save -->
        <!-- <ion-button expand="block" class="theme" @click="">Link Child</ion-button><br><br><br> -->
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
  IonCardHeader, IonCardTitle
} from '@ionic/vue';
import { stringLiteral } from '@babel/types';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ChildPage2',
  components: {
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
      guardId: "",
      linkDetails: {},
      search: ""
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
    this.guardId = this.router.params.id + "";
  },
  methods: {
    // async record_add() {
    //   const toast = await toastController.create({
    //     duration: 1500,
    //     position: 'top'
    //   })

    //   const data = this.recordDetails;
    //   fetch('http://localhost:5000/record/' + this.childId, {
    //     method: 'POST', // or 'PUT'
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((data) => {
    //       toast.message = 'Success!'
    //       this.recordDetails = {
    //         height: "",
    //         weight: ""
    //       }
    //       this.ionRouter.push("/record_view/" + this.childId);
    //     })
    //     .catch((error) => {
    //       toast.message = error
    //     });

    //   await toast.present();
    // }
  }
});



</script>
  

<style scoped>
ion-toolbar {
  --background: #168554;
  --color: white;
}
</style>