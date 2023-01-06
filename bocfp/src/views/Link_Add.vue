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
                <ion-searchbar v-on:keyup.enter="onEnter" v-model="search"></ion-searchbar>
              </ion-item><br>

              <ion-item>
                <ion-label>Child:</ion-label>

                <ion-select placeholder="Select Child" v-model="linkDetails.id">
                  <template v-if="childList.message">
                    <ion-select-option value="">{{ childList.message }}</ion-select-option>
                  </template>

                  <template v-else>
                    <ion-select-option v-for="child in childList" :key="child.childList" v-bind:value="child.id">{{
                      child.fname
                    }} {{ child.lname }}</ion-select-option>
                  </template>
                </ion-select>
              </ion-item>

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
        <!-- <ion-button expand="block" class="theme" @click="link_add">Link Child</ion-button><br><br><br> -->
        <ion-button expand="block" class="theme" @click="link_add">Link Child</ion-button><br><br><br>
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
  IonCardHeader, IonCardTitle,
  IonSelect, IonSelectOption,
  IonSearchbar
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
    IonCardHeader, IonCardTitle,
    IonSelect, IonSelectOption,
    IonSearchbar
  },
  data() {
    return {
      guardId: "",
      childList: {},
      linkDetails: {
        "id": "",
        "guardian_id": "",
        "relationship": ""
      },
      search: "",
      check: { "guardian_id": "" }
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
    async link_add() {
      const toast = await toastController.create({
        duration: 1500,
        position: 'top'
      })

      // checks if empty
      if (this.linkDetails.id && this.linkDetails.relationship) {
        // !empty
        fetch('http://localhost:5000/child/link/' + this.linkDetails.id)
          .then((response) => response.json())
          .then((json) => {
            this.check = json
          })

        // checks for links
        if (this.check.guardian_id != '') {
          const data = this.linkDetails;
          fetch('http://localhost:5000/link/add/' + this.guardId, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((data) => {
              toast.message = 'Success!'
              this.linkDetails = {
                "id": "",
                "guardian_id": "",
                "relationship": ""
              }
              this.ionRouter.push("/guardian_profile/" + this.guardId);
            })
            .catch((error) => {
              toast.message = error
            });
        }
        else {
          toast.message = "Child is already linked"
        }
      }
      else {
        toast.message = "Child Or Relationship is Empty"
      }

      await toast.present();
    },
    searchData() {
      fetch('http://localhost:5000/child/search/' + this.search)
        .then((response) => response.json())
        .then((json) => {
          this.childList = json
        })
    },
    onEnter: function () {
      if (this.search != "") {
        this.searchData()
      }
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