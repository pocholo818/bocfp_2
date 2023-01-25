<template>
  <ion-card class="ion-margin-bottom">
    <ion-card-header>
      <ion-card-title>{{ title }}</ion-card-title>
      <ion-card-subtitle>{{ date.split("T")[0] }}</ion-card-subtitle>

      <div id="actions" v-if='user_id === "1"'>
        <ion-button color="warning" @click="openEditAnnouncementModal()">
          <ion-icon :icon="createOutline"></ion-icon>
        </ion-button>
        <ion-button color="danger" @click="deleteAnnouncement()">
          <ion-icon :icon="trashOutline"></ion-icon>
        </ion-button>
      </div>
    </ion-card-header>

    <ion-card-content>
      {{ content }}
    </ion-card-content>

  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonCard,
  IonCardSubtitle,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  modalController,
  IonIcon,
  alertController,
  toastController
} from '@ionic/vue';
import PostEditAnnouncementModal from '@/components/announcement/PostEditAnnouncementModal.vue'
import {
  createOutline, trashOutline
} from 'ionicons/icons';

export default defineComponent({
  name: 'AnnouncementCard',
  components: {
    IonCard,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  },
  setup() {
    return {
      createOutline,
      trashOutline,
    }
  },
  props: {
    annou_id: String,
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    }
  },
  methods: {
    async deleteAnnouncement() {
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

              fetch('http://localhost:5000/announcement/del/' + this.annou_id, {
                method: 'PUT'
              })
              .then((data) => {
                toast.message = 'Success!'
                this.$emit('updateAnnouncementList')
              })
              .catch((error) => {
                toast.message = error
              });

              await toast.present();
            },
          },
        ],
      });

      await alert.present()
    },
    async openEditAnnouncementModal() {
      const modal = await modalController.create({
        component: PostEditAnnouncementModal,
        componentProps: {
          isEdit: true,
          annou_id: this.annou_id,
          title: this.title,
          content: this.content
        }
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
        this.$emit('updateAnnouncementList')
      }
    }
  }
})
</script>

<style scoped>
ion-card:first-child {
  border: 2px solid var(--ion-color-primary);
}

#actions {
  position: absolute;
  top: 4px;
  right: 4px;
}
</style>