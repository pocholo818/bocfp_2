<template>
  <ion-buttons slot="end">
    <ion-button @click="prev()">Prev</ion-button>
    <ion-button @click="next()">Next</ion-button>
  </ion-buttons>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonButtons,
  IonButton
} from '@ionic/vue';

export default defineComponent({
  name: 'HeaderBar2',
  components: {
    IonButtons,
    IonButton
  },
  props: {
    prev: Function,
    next: Function
  }
});
</script> 