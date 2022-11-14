
<template>
  <ion-page>
    <HeaderBar title="Child" />

    <!-- content -->
    <ion-content>

    <ion-item>
      <ion-label position="floating">Search</ion-label>
      <ion-input placeholder="Enter text"></ion-input>
    </ion-item>

    <!-- cards  -->
    <ion-card>
      <ion-card-header>
        <ion-card-title>Arataki Itto</ion-card-title>
        <ion-card-subtitle>Kuki Shinobu</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        <p>ID: 1</p>
        <p>Sex: M</p>
        <p>Birth Date: 2000-06-01</p>
        <p>Guardian Contact Number: 09999999999</p>
        <p>Purok: 11</p><br>

        <div style="text-align:center;">
        <a href="/child_view"><ion-button color="success" style="width: 32%;"><ion-icon  :icon="eyeOutline"></ion-icon></ion-button></a>
        <a href="/child_edit"><ion-button color="warning" style="width: 32%;"><ion-icon :icon="createOutline"></ion-icon></ion-button></a>
        <ion-button color="danger" style="width: 32%;"><ion-icon :icon="trashOutline"></ion-icon></ion-button>
      </div>
      </ion-card-content>
    </ion-card>
        
      </ion-content>
    </ion-page>

</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  // icons
  import { 
    eyeOutline, 
    createOutline,
    trashOutline
  } from 'ionicons/icons';
  // ionic stuff
  import { 
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCardContent,
    IonInput,
    IonIcon
  } from '@ionic/vue';
  import HeaderBar from '@/components/HeaderBar.vue';
  // import {
  //   IonContent,
  //   IonPage,
  // } from '@ionic/vue';

  export default defineComponent({
    name: 'ChildPage',
    components: {
      HeaderBar,
      IonCard,
      IonCardTitle,
      IonCardSubtitle,
      IonCardHeader,
      IonCardContent,
      IonInput,
      IonIcon
    },
      setup() {
      return {
        eyeOutline,
        createOutline,
        trashOutline
      }
    }
  });

  

</script>

<style scoped>
  ion-button{
    --border-width: 100%;
  }
</style>
