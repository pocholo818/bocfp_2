<template>
    <ion-page>
      <!-- <HeaderBar title="Child Edit" /> -->
      <!-- <HeaderBar2 title="Child Edit" /> -->

        <ion-header>
            <ion-toolbar style="">
            <ion-buttons slot="start">
                <ion-back-button default-href="/child" text="Back"></ion-back-button>
            </ion-buttons>
            </ion-toolbar>
        </ion-header>

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
                        <ion-input placeholder="Enter Sex" value="M"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Birth Date</ion-label>
                        <ion-input placeholder="Enter Birth Date" value="2000-06-01"></ion-input>
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
                        <ion-label position="floating">Address</ion-label>
                        <ion-input type="tel" placeholder="Enter Contact Number" value="2075th Narra Lane Old Cabalan Olongapo City, Zambales"></ion-input>
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
        IonButtons, IonHeader, IonToolbar, IonBackButton

    } from '@ionic/vue';
    // import HeaderBar from '@/components/HeaderBar.vue';
    // import {
    //   IonContent,
    //   IonPage,
    // } from '@ionic/vue';
  
    export default defineComponent({
      name: 'ChildPage2',
      components: {
        // HeaderBar,
        IonInput,
        IonList,
        IonCard,
        IonCardTitle,
        IonCardSubtitle,
        IonCardHeader,
        IonCardContent,
        IonButtons, IonHeader, IonToolbar, IonBackButton
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
    ion-toolbar{
        --background: #168554;
        --color: white;
    }
</style>