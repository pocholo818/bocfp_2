<template>
  <ion-card class="ion-margin-bottom">
    <ion-card-header>
      <ion-card-title>{{ title }}</ion-card-title>
      <ion-card-subtitle>{{ date.split("T")[0] }}</ion-card-subtitle>

      <!-- <div slot="end" style="z-index: 999">
        <ion-button>
          <span>test</span>
        </ion-button>
      </div> -->

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
  IonCardContent
} from '@ionic/vue';

export default defineComponent({
  name: 'AnnouncementCard',
  components: {
    IonCard,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  },
  props: {
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
    }
  }
})
</script>

<style scoped>
ion-card:first-child {
  border: 2px solid var(--ion-color-primary);
}
</style>