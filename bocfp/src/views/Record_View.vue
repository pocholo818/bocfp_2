<template>
  <ion-page>
    <ion-header>
      <ion-toolbar style="">
        <ion-buttons slot="start">
          <!-- replace all ion-back-button -->
          <ion-button :router-link="('/child_view/' + childId)"><ion-icon :icon="arrowBack"></ion-icon>&nbsp;Back</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- content -->
    <ion-content>
      <ion-content class="ion-padding">
        <ion-card>
          <ion-card-header>
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
                      <div style="text-align:center;">
                        <ion-button color="warning" style="width: 49%;"
                          :router-link="('/record_edit/' + record.record_id)"><ion-icon
                            :icon="createOutline"></ion-icon></ion-button>
                        <ion-button color="danger" style="width: 49%;"
                          @click="record_delete(record.record_id)"><ion-icon
                            :icon="trashOutline"></ion-icon></ion-button>
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
} from '@ionic/vue';
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
    IonList,
    IonCard,
    IonCardContent,
    IonButtons, IonHeader, IonToolbar,
    IonItem,
    IonCardHeader, IonCardTitle, IonCardSubtitle
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
  }
});



</script>
  

<style scoped>
ion-toolbar {
  --background: #168554;
  --color: white;
}
</style>