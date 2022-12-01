<template>
    <ion-page>
        <ion-header>
            <ion-toolbar style="">
            <ion-buttons slot="start">
              <ion-back-button router-link="/child" text="Back"></ion-back-button>
            </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <!-- content -->
        <ion-content>
            <ion-content class="ion-padding">
          <ion-card>
                <!-- <ion-card-header>
                    <ion-card-title>Add Information</ion-card-title>
                </ion-card-header> -->

                <ion-card-content>
                <ion-list>
                    <ion-item>
                        <ion-label position="floating">First Name:</ion-label>
                        <ion-input placeholder="Enter First Name"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Last Name:</ion-label>
                        <ion-input placeholder="Enter Last Name" ></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Sex:</ion-label>
                        <ion-input placeholder="Enter Sex"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Birth Date:</ion-label>
                        <ion-input placeholder="Enter Birth Date"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Guardian:</ion-label>
                        <ion-input placeholder="Enter Guardian Name"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Contact Number:</ion-label>
                        <ion-input type="tel" placeholder="Enter Contact Number" maxlength="11"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Address:</ion-label>
                        <ion-input type="text" placeholder="Enter Address"></ion-input>
                    </ion-item>
                </ion-list>
                </ion-card-content>
            </ion-card>

            <!-- Save -->
            <ion-button expand="block" class="theme">Save</ion-button><br><br><br>
            </ion-content>

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
        IonCardContent,
        IonBackButton,
        IonButtons, IonHeader, IonToolbar

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
        IonCardContent,
        IonBackButton,
        IonButtons, IonHeader, IonToolbar
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

    .theme{
    --background: #168554;
    color: white;
}
</style>