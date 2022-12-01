<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ name }}</ion-card-title>
      <ion-card-subtitle>{{ data.guardian }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <p>ID: {{ data.id }}</p>
      <p>Sex: {{ data.sex}}</p>
      <p>Birth Date: {{ data.bdate }}</p>
      <p>Guardian Contact Number: {{ data.contact }}</p>
      <p>Address: {{ data.address }}</p><br>

      <div style="text-align:center;">
        <ion-button color="success" style="width: 32%;"  router-link="/child_view"><ion-icon  :icon="eyeOutline"></ion-icon></ion-button>
        <a href="/child_edit"><ion-button color="warning" style="width: 32%;"><ion-icon :icon="createOutline"></ion-icon></ion-button></a>
        <ion-button color="danger" style="width: 32%;"><ion-icon :icon="trashOutline"></ion-icon></ion-button>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { 
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCardContent,
    IonIcon
  } from '@ionic/vue';
    // icons
  import { 
  eyeOutline, 
  createOutline,
  trashOutline,
  addOutline
  } from 'ionicons/icons';

  export default defineComponent({
    name: 'ChildCard',
    components: {
      IonCard,
      IonCardTitle,
      IonCardSubtitle,
      IonCardHeader,
      IonCardContent,
      IonIcon
    },
    setup() {
      return {
        eyeOutline,
        createOutline,
        trashOutline,
        addOutline
      }
    },
    props: {
      data: Object
    },
    computed: {
      name() {
        return this.data.fname + ' ' + this.data.lname
      }
    }
  });
</script>