<template>
  <ion-buttons slot="end">
    <ion-button @click="prev()"><ion-icon :icon="chevronBack"></ion-icon>&nbsp;Prev</ion-button>
    <ion-button @click="next()">Next&nbsp;<ion-icon :icon="chevronForward"></ion-icon></ion-button>
  </ion-buttons>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/vue';
import {
  chevronBack, chevronForward
} from 'ionicons/icons';

export default defineComponent({
  name: 'HeaderBar2',
  components: {
    IonButtons,
    IonButton,
    IonIcon
  },
  props: {
    prev: {
      type: Function,
      required: true
    },
    next: {
      type: Function,
      required: true
    },
  },
  setup() {
    return {
      chevronBack, chevronForward
    }
  },
});
</script> 

<style scoped>
ion-button {
  color: #168554;
  font-weight: bold
}
</style>