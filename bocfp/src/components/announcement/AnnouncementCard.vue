<template>
  <ion-card class="ion-margin-bottom">
    <ion-card-header>
      <ion-card-title>{{ title }}</ion-card-title>
      <ion-card-subtitle>{{ date.split("T")[0] }}</ion-card-subtitle>

      <div id="actions" v-if='user_id === 1'>
        <ion-button color="warning" @click="openEditAnnouncementModal()">
          <ion-icon :icon="createOutline"></ion-icon>
        </ion-button>
        <ion-button v-if="soft_delete === 0" color="danger" @click="deleteAnnouncement()">
          <ion-icon :icon="trashOutline"></ion-icon>
        </ion-button>
        <ion-button v-else color="success" @click="annouUndo()"><ion-icon :icon="arrowUndoOutline">
          </ion-icon>&nbsp;
          Retrieve</ion-button>
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
  createOutline, 
  trashOutline,
  arrowUndoOutline
} from 'ionicons/icons';

import { instance as api } from "@/network/Network";

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
      arrowUndoOutline,
    }
  },
  props: {
    annou_id: Number,
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
      type: Number,
      required: true
    },
    soft_delete: {
      type: Number,
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

              api.put('/announcement/del/' + this.annou_id)
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
    async annouUndo() {
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

              api.put('/announcement/ret/' + this.annou_id)
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

      await alert.present();
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