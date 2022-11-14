
<template>
    <ion-page>
      <HeaderBar title="Child Edit" />
        <!-- content -->
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Information</ion-card-title>
                    <ion-card-subtitle>ID: 1</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                <ion-list>
                    <ion-item>
                        <ion-label position="floating">First Name</ion-label>
                        <ion-input placeholder="Enter First Name" value="Arataki"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Last Name</ion-label>
                        <ion-input placeholder="Enter Last Name" value="Itto"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Sex</ion-label>
                        <ion-input placeholder="Enter Sex" value="M" disabled></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Birth Date</ion-label>
                        <ion-input placeholder="Enter Birth Date" value="2000-06-01" disabled></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Guardian</ion-label>
                        <ion-input placeholder="Enter Guardian Name" value="Kuki Shinobu"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Contact Number</ion-label>
                        <ion-input type="tel" placeholder="Enter Contact Number" maxlength="11" value="09999999999"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Purok Number</ion-label>
                        <ion-input type="tel" placeholder="Enter Contact Number" maxlength="2" value="11"></ion-input>
                    </ion-item>
                </ion-list>
                </ion-card-content>
            </ion-card>

            <!-- Save -->
            <ion-button expand="block" color="success">Save</ion-button>

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
        IonInput,
        IonList,
        IonCard,
        IonCardTitle,
        IonCardSubtitle,
        IonCardHeader,
        IonCardContent,

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
        IonInput,
        IonList,
        IonCard,
        IonCardTitle,
        IonCardSubtitle,
        IonCardHeader,
        IonCardContent,
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
  
  <!-- <style scoped>
    ion-button{
      --border-width: 100%;
    }
  </style> -->
  