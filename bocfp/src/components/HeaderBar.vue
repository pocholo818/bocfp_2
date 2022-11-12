<template>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
    IonHeader, 
    IonToolbar,
    IonButtons, 
    IonTitle, 
    IonMenuButton
} from '@ionic/vue';

export default defineComponent({
  name: 'HeaderBar',
  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle,
    IonMenuButton,
    IonButtons
    },
  props: {
    title: String
  }
});
</script> 

<style scoped>
    ion-toolbar{
        --background: #168554;
        --color: white;
    }
</style>