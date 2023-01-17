<template>
  <ion-footer :translucent="true">
    <ion-toolbar>
      <ion-buttons>
        <ion-button @click="prev()"><ion-icon :icon="chevronBack"></ion-icon>&nbsp;Prev</ion-button>
        <ion-button @click="next()">Next&nbsp;<ion-icon :icon="chevronForward"></ion-icon></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonButtons,
  IonButton,
  IonIcon,
  IonFooter,
  IonToolbar
} from '@ionic/vue';
import {
  chevronBack, chevronForward
} from 'ionicons/icons';

export default defineComponent({
  name: 'HeaderBar2',
  components: {
    IonButtons,
    IonButton,
    IonIcon,
    IonFooter,
    IonToolbar
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
  methods: {
    right(){
      console.log("rights")
    }
  }
});
</script> 

<style scoped>
ion-buttons {
  justify-content: center;
}

ion-button {
  color: #168554;
  font-weight: bold
}
</style>