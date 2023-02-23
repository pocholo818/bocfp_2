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
                <ion-label>Search Child</ion-label>
                <ion-searchbar @input="searchData($event.target.value)" v-model="search"
                  placeholder="Search Child Here"></ion-searchbar>
              </ion-item><br>

              <ion-item>
                <ion-label>test</ion-label>
                <ion-radio-group :allow-empty-selection="true" v-model="linkDetails.id" style="width: 100%;">

                  <template v-if="text == false">
                    <ion-item>
                      <ion-card-subtitle style="text-align: center; margin-left: auto; margin-right: auto;">Type in the
                        Search bar</ion-card-subtitle>
                    </ion-item>
                  </template>

                  <template v-if="childList.message">
                    <ion-item>
                      <ion-label value="" style="text-align: center;">{{ childList.message }}</ion-label>
                    </ion-item>
                  </template>

                  <template v-else>
                    <ion-item v-for="child in childList" :key="child.childList">
                      <ion-radio slot="start" v-bind:value="child.id"></ion-radio>
                      <ion-label>{{ child.fname }} {{ child.lname }}</ion-label>
                    </ion-item><br>
                  </template>

                </ion-radio-group>
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
        <ion-button expand="block" @click="link_add">Link Child</ion-button><br><br><br>
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
  IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonSelect, IonSelectOption,
  IonSearchbar,
  IonRadioGroup,
  IonRadio
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
    IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonSelect, IonSelectOption,
    IonSearchbar,
    IonRadioGroup,
    IonRadio
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
      text: false,
      check: { "message": "" },
      limit: 5,
      offset: 0,
      searchTimeout: 0,
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
        const data = this.linkDetails;

        api.post('/link/add/' + this.guardId, data)
          .then(response => response.data)
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
            toast.message = error.response.data.message
          });

        toast.message = "Success!"
      }
      else {
        toast.message = "Child Or Relationship is Empty"
      }

      await toast.present();
    },
    // search
    searchData(search: string) {
      this.linkDetails.id = ""
      search = search.trim()
      if (search.length) {
        clearTimeout(this.searchTimeout)
        this.searchTimeout = setTimeout(() => {
          api(`/childs?search=${search}&limit=${this.limit}&offset=${this.offset}`)
            .then((response) => response.data)
            .then((data) => {
              this.text = true
              this.childList = data
            })
        }, 500)
      }
      else {
        // this.linkDetails = {"id": "", "guardian_id": "", "relationship": ""}
        this.linkDetails.id = ""
        this.childList = []
        this.text = false
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