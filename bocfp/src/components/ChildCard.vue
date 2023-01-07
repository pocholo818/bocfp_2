<template>
  <ion-card :router-link="('/child_view/' + data.id)">
    <ion-item>
        <ion-thumbnail slot="start">
          <img alt="pcture"  theme="icon" src="@/assets/images/noPic.png">
        </ion-thumbnail>

        <ion-card-header>
          <ion-card-title>{{ name }}</ion-card-title>
          <ion-card-subtitle>CHLDID: {{ data.id }}</ion-card-subtitle>
        </ion-card-header>
      </ion-item>

    <!-- <ion-card-content>
      <div style="text-align:center;">
        <ion-button color="success" style="width: 32%;" :router-link="'/child_view/' + data.id"><ion-icon
            :icon="eyeOutline"></ion-icon>&nbsp; View</ion-button>
        <ion-button color="warning" style="width: 32%;" :router-link="'/child_edit/' + data.id"><ion-icon
            :icon="createOutline"></ion-icon>&nbsp; Edit</ion-button>
        <ion-button color="danger" style="width: 32%;" @click="child_delete"><ion-icon
            :icon="trashOutline"></ion-icon>&nbsp; Del<span>ete</span></ion-button>
      </div>
    </ion-card-content> -->
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  // IonCardContent,
  // IonIcon,
  IonThumbnail,
  alertController,
  toastController
} from '@ionic/vue';
// icons
import {
  eyeOutline,
  createOutline,
  trashOutline,
  addOutline
} from 'ionicons/icons';

export default defineComponent({
  name: 'ChildCard',
  components: {
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    // IonCardContent,
    // IonIcon,
    IonThumbnail,
  },
  setup() {
    return {
      eyeOutline,
      createOutline,
      trashOutline,
      addOutline
    }
  },
  methods: {
    async child_delete() {
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

              const childId = this.data?.id

              fetch('http://localhost:5000/child/del/' + childId, {
                method: 'PUT'
              })
                .then((data) => {
                  toast.message = 'Success!'
                  this.$emit('deleted')
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
    }
  },
  props: {
    data: Object
  },
  computed: {
    name() {
      return this.data?.fname + ' ' + this.data?.lname
    }
  }
});

</script>

<style scoped>
.icon {
  width: 110px;
  height: 110px;
  border: 1px solid black;
}

@media only screen and (max-width: 768px) {
  span {
    display: none;
  }
}
</style>