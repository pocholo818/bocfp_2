<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="cancel()">Cancel</ion-button>
      </ion-buttons>

      <ion-title>{{ isEdit? 'Edit': 'Post' }} Announcement</ion-title>

      <ion-buttons slot="end">
        <ion-button :strong="true" @click="editAnnouncement()" v-if="isEdit">Edit</ion-button>
        <ion-button :strong="true" @click="postAnnouncement()" v-else>Post</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-item :counter="96">
      <ion-label position="stacked">Enter title</ion-label>
      <ion-input type="text" maxLength="96" v-model="announcementDetails.title"></ion-input>
    </ion-item>

    <ion-item :counter="512">
      <ion-textarea v-model="announcementDetails.content" placeholder="Type in announcement content" :autoGrow="true"
        maxLength="512">
      </ion-textarea>
    </ion-item>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonInput,
  IonTextarea,
  IonLabel,
  modalController,
  toastController,
} from '@ionic/vue';

import { instance as api } from "@/network/Network";

export default defineComponent({
  name: 'PostEditAnnouncementModal',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonInput,
    IonTextarea,
    IonLabel
  },
  data() {
    return {
      userId: '',
      announcementDetails: {
        title: '',
        content: '',
      }
    }
  },
  props: {
    isEdit: Boolean,
    annou_id: Number,
    title: String,
    content: String,
  },
  mounted() {
    this.userId = localStorage.getItem('user_id') || ''
    this.announcementDetails = {
      title: this?.title || '',
      content: this.content || '',
    }
  },
  methods: {
    async postAnnouncement() {
      const toast = await toastController.create({
        duration: 1500,
        position: 'top'
      })

      // checks if empty post details
      if (this.announcementDetails.title && this.announcementDetails.content) {
        const data = this.announcementDetails;
        api.post('/announcement/new/' + this.userId, data)
          .then(response => response.data)
          .then((data) => {
            this.clearInputs()
            toast.message = "Announcement Posted!"
            return modalController.dismiss(null, 'confirm');
          })
          .catch((error) => {
            toast.message = error
          });

      }
      else {
        toast.message = "Announcement content are incomplete"
      }

      await toast.present();
    },
    async editAnnouncement() {
      const toast = await toastController.create({
        duration: 1500,
        position: 'top'
      })

      if (this.announcementDetails.title && this.announcementDetails.content) {
        const data = this.announcementDetails;
        api.put('/announcement/edit/' + this.annou_id, data)
        .then(response => response.data)
        .then((data) => {
          toast.message = 'Success!'
        })
        .catch((error) => {
          toast.message = error
        });
      }
      else {
        toast.message = "Announcement content are incomplete"
      }

      await toast.present()

      return modalController.dismiss(null, 'confirm');
    },
    cancel() {
      return modalController.dismiss(null, 'cancel');
    },
    clearInputs() {
      this.announcementDetails = {
        title: '',
        content: ''
      }
    }
  },
  //   mounted() {

  //   }
})
</script>

<style scoped>

</style>