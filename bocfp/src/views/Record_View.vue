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
            <!-- <div style="position: absolute; right: 0; z-index: 1;padding-right: 1.5vw">
              <span><ion-button class="theme" :router-link="('/record_add/' + childId)">+</ion-button></span>
            </div> -->
            <ion-card-title>Record</ion-card-title>
            <ion-card-subtitle>Data Gathered</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-list>
              <div v-if="childRecords.date == ''">
                <h2 style="text-align: center;">{{ childRecords.message }}</h2>
              </div>

              <div v-else>
                <ion-item v-for="record in childRecords" :key="record.recordId">
                  <ion-label>
                    <h2>{{ record.date.split("T")[0] }}</h2>
                    <p>Record ID: {{ record.record_id }}</p>
                    <p>Height: {{ record.height }}cm</p>
                    <p>Weight: {{ record.weight }}kg</p>
                    <p>Remark: {{ record.remark }}</p>
                    <p>BMI: {{ record.output.toFixed(2) }}</p>

                    <ion-label>
                      <div>
                        <ion-button color="warning"
                          :router-link="('/record_edit/' + record.record_id)"><ion-icon
                            :icon="createOutline"></ion-icon>Edit</ion-button>
                        <ion-button color="danger"
                          @click="record_delete(record.record_id)"><ion-icon
                            :icon="trashOutline"></ion-icon>Del<span>ete</span></ion-button>
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
  </ion-page>

</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
// icons
import {
  eyeOutline,
  createOutline,
  trashOutline,
  arrowBack
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
  alertController
} from '@ionic/vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ChildPage2',
  components: {
    // HeaderBar,
    IonList,
    IonCard,
    IonCardContent,
    IonButtons, IonHeader, IonToolbar,
    IonItem,
    IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonBackButton
  },
  data() {
    return {
      childId: "",
      childRecords: ""
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
      fetch('http://localhost:5000/records/' + this.childId)
        .then((response) => response.json())
        .then((json) => {
          this.childRecords = json
        })
    },
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

                            console.log(recordId);

                            fetch('http://localhost:5000/record/del/' + recordId, {
                                method: 'put'
                            })
                                .then((data) => {
                                    toast.message = 'Success!'
                                    // this.$emit('deleted')
                                    this.fetchRecord()
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
            this.fetchRecord();
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