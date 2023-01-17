<template>
  <ion-header>
    <ion-toolbar style="">
      <ion-buttons slot="start">
        <ion-back-button default-href="/child" text="Back"></ion-back-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
    IonHeader, 
    IonToolbar,
    IonButtons, 
} from '@ionic/vue';

export default defineComponent({
  name: 'HeaderBar2',
  components: { 
    IonHeader, 
    IonToolbar, 
    IonButtons
    },
  props: {
    title: String
  }
});
</script> 