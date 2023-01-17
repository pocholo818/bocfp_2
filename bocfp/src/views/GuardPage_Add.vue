<template>
    <ion-page>
        <ion-header>
            <ion-toolbar style="">
            <ion-buttons slot="start">
              <ion-back-button text="Back"></ion-back-button>
            </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <!-- content -->
        <ion-content>
            <ion-content class="ion-padding">
          <ion-card>
                <ion-card-content>
                  <ion-card-header>
                    <ion-card-title>Add New Guardian</ion-card-title>
                  </ion-card-header>

                <ion-list>
                    <ion-item>
                        <ion-label position="floating">First Name:</ion-label>
                        <ion-input placeholder="Enter First Name" v-model="guardianDetails.fname"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Last Name:</ion-label>
                        <ion-input placeholder="Enter Last Name" v-model="guardianDetails.lname"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Contact Number:</ion-label>
                        <ion-input type="tel" placeholder="Enter Contact Number" maxlength="11" v-model="guardianDetails.contact"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Address:</ion-label>
                        <ion-input type="text" placeholder="Enter Address" v-model="guardianDetails.address"></ion-input>
                    </ion-item>
                </ion-list>
                </ion-card-content>
            </ion-card>

            <!-- Save -->
            <ion-button expand="block" @click="guardian_add">Save</ion-button><br><br><br>
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
        IonButtons, 
        IonHeader, 
        IonToolbar,
        IonItem, 
        toastController,
        useIonRouter,
        IonCardHeader,
        IonCardTitle
    } from '@ionic/vue';
  
    export default defineComponent({
      name: 'ChildPage2',
      components: {
        // HeaderBar,
        IonInput,
        IonList,
        IonCard,
        IonCardContent,
        IonBackButton,
        IonButtons, 
        IonHeader, 
        IonToolbar,
        IonItem, 
        IonCardHeader,
        IonCardTitle
      },
        data(){
          return {
            guardianDetails: {
              fname: "",
              lname: "",
              contact: "",
              address: ""
            }
          }
        },
        setup() {
        const router = useIonRouter();
        return {
          eyeOutline,
          createOutline,
          trashOutline,
          router
        }
      },
      methods:{
        async guardian_add(){
          const toast = await toastController.create({
            duration: 1500,
            position: 'top'
          })

          const data = this.guardianDetails;
          fetch('http://localhost:5000/guardian/new', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((data) => {
            toast.message = 'Success!'
            this.guardianDetails = {
              fname: "",
              lname: "",
              contact: "",
              address: ""
            }
            this.router.push("/guardian");
          })
          .catch((error) => {
            toast.message = error
          });

          await toast.present();
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