<template>
  <ion-page>
    <ion-header>
      <ion-toolbar style="">
        <ion-buttons slot="start">
          <ion-back-button text="Back" :defaultHref="'/record_add/' + `${childId}`"></ion-back-button>
        </ion-buttons>
        <PageButtons :prev="prevData" :next="nextData" />
      </ion-toolbar>
    </ion-header>

    <!-- content -->
    <ion-content>
      <ion-content class="ion-padding">
        <ion-card>
          <ion-card-header>
            <div style="position: absolute; right: 0; z-index: 1;padding-right: 1.5vw">
              <span><ion-button :router-link="('/record_add/' + childId)">+</ion-button></span>
            </div>
            <ion-card-title>Record</ion-card-title>
            <ion-card-subtitle>Data Gathered</ion-card-subtitle>

            <!-- search filter -->
            <ion-item>
              <ion-select @ionChange="fetchRecord" v-model="recordFilter" placeholder="Select Filter">
                <ion-select-option value="all">All</ion-select-option>
                <ion-select-option value="deleted">Deleted</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-card-header>

          <ion-card-content>
            <ion-list>
              <div v-if="childRecords.message">
                <h2 style="text-align: center;">{{ childRecords.message }}</h2>
              </div>

              <div v-else>
                <ion-item v-for="record in childRecords" :key="record.recordId">
                  <ion-label>
                    <h2>{{ formatDate(record.date) }}</h2>
                    <p>Record ID: {{ record.record_id }}</p>
                    <p>Height: {{ record.height }}cm</p>
                    <p>Weight: {{ record.weight }}kg</p>
                    <p>Remark: {{ record.remark }}</p>
                    <p>BMI: {{ record.output.toFixed(2) }}</p>
                    <p>Recorded by: {{ record.fname }} {{ record.lname }}</p>

                    <ion-label>
                      <div>
                        <ion-button color="warning" :router-link="('/record_edit/' + record.record_id)"><ion-icon
                            :icon="createOutline"></ion-icon>Edit</ion-button>
                        <ion-button v-if="record.soft_delete === 0" color="danger"
                          @click="record_delete(record.record_id)"><ion-icon
                            :icon="trashOutline"></ion-icon>Del<span>ete</span></ion-button>
                        <ion-button v-else color="success" @click="record_undo(record.record_id)"><ion-icon
                            :icon="arrowUndoOutline">
                          </ion-icon>&nbsp;
                          Retrieve</ion-button>
                      </div>
                    </ion-label>
                  </ion-label>
                </ion-item>
              </div>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </ion-content>

    </ion-content>

    <PageButtons :prev="prevData" :next="nextData" />

  </ion-page>

</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
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
  IonList,
  IonCard,
  IonCardContent,
  IonButtons, IonHeader, IonToolbar,
  IonItem, toastController,
  useIonRouter,
  IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonBackButton,
  alertController,
  IonSelect, IonSelectOption,
} from '@ionic/vue';

import { useRoute } from 'vue-router';
import PageButtons from '@/components/PageButtons.vue';
import moment from 'moment'
import { instance as api } from "@/network/Network";

export default defineComponent({
  name: 'ChildPage2',
  components: {
    PageButtons,
    IonList,
    IonCard,
    IonCardContent,
    IonButtons, IonHeader, IonToolbar,
    IonItem,
    IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonBackButton,
    IonSelect, IonSelectOption,
  },
  data() {
    return {
      childId: "",
      childRecords: "",
      limit: 10,
      offset: 0,
      isNextEnabled: true,
      recordFilter: "all"
    }
  },
  setup() {
    const ionRouter = useIonRouter();
    const router = useRoute()

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
  mounted() {
    this.childId = this.router.params.id + "";

    this.fetchRecord()
  },
  methods: {
    fetchRecord() {
      api(`/records/` + this.childId + `?limit=${this.limit}&offset=${this.offset}&filter=${this.recordFilter}`)
        .then((response) => response.data)
        .then((data) => {
          this.childRecords = data

          if (data.message) {
            this.isNextEnabled = false
            return
          }
          else {
            this.isNextEnabled = true
          }
        })
    },
    // hard delete
    // async record_delete(record_id: string) {
    //   const alert = await alertController.create({
    //     header: 'Are you sure you want to delete?',
    //     buttons: [
    //       {
    //         text: 'Cancel',
    //         role: 'cancel'
    //       },
    //       {
    //         text: 'DELETE',
    //         role: 'confirm',
    //         handler: async () => {
    //           const toast = await toastController.create({
    //             duration: 1500,
    //             position: 'top'
    //           })
    //           const recordId = record_id


    //           fetch('http://localhost:5000/record/del/' + recordId, {
    //             method: 'DELETE'
    //           })
    //             .then((data) => {
    //               toast.message = 'Success!'
    //               this.fetchRecord();
    //             })
    //             .catch((error) => {
    //               toast.message = error
    //             });

    //           await toast.present();
    //         },
    //       },
    //     ],
    //   });

    //   await alert.present();
    // },
    async record_delete(record_id: string) {
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
              const recordId = record_id

              api.put('/record/del/' + recordId)
                .then((data) => {
                  toast.message = 'Success!'
                  this.fetchRecord();
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
    },
    async record_undo(record_id: string) {
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

              const recordId = record_id

              api.put('/record/ret/' + recordId)
                .then((data) => {
                  toast.message = 'Success!'
                  this.fetchRecord();
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
    },
    prevData() {
      const offset = this.offset -= this.limit
      if (offset <= 0) {
        this.offset = 0
      }
      else {
        this.offset = offset
      }

      this.fetchRecord()
    },
    nextData() {
      if (this.isNextEnabled) {
        this.offset += this.limit

        this.fetchRecord()
      }
    },
    formatDate(value: string) {
      if (value) {
        return moment(String(value)).format('MMM DD, YYYY hh:mm A')
      }
    }
  },
  watch: {
    $route() {
      this.$nextTick(this.fetchRecord);
    }
  },
});



</script>
  

<style scoped>
ion-toolbar {
  --background: #168554;
  --color: white;
}

@media only screen and (max-width: 768px) {
  span {
    display: none;
  }
}
</style>