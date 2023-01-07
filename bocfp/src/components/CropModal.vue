<template>
  <ion-header>
    <ion-toolbar>
      <ion-button slot="start" @click="cancel">Cancel</ion-button>

      <ion-title class="ion-no-padding">Crop Profile Pic</ion-title>

      <ion-button 
        slot="end" color="secondary"
        @click="uploadProfilePic"
      >
        Confirm
      </ion-button>
    </ion-toolbar>
  </ion-header>

	<ion-content class="ion-padding">
    <cropper
      ref="myCropper"
      class="cropper"
      :src="img"
      :stencil-props="{
        aspectRatio: 1
      }"
    />
	</ion-content>
</template>

<script setup lang="ts">
import {
  modalController,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/vue';
import { ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const myCropper = ref(null)

// eslint-disable-next-line no-undef
const props = defineProps<{
  img: string
}>();

function cancel() {
  return modalController.dismiss(null, 'cancel');
}

function uploadProfilePic() {
  return modalController.dismiss(myCropper.value.getResult().canvas.toDataURL("image/jpeg"), 'confirm')
}

</script>

<style scoped>
ion-content {
  --spacing: 32px;
  
  --padding-top: 48px;
  --padding-bottom: var(--spacing);
  --padding-start: var(--spacing);
  --padding-end: var(--spacing);
}
</style>