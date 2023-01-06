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
                    <ion-card-title>Add New Child</ion-card-title>
                </ion-card-header>

                <ion-list>
                    <ion-item>
                        <ion-label position="floating">First Name:</ion-label>
                        <ion-input placeholder="Enter First Name" v-model="childDetails.fname"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Last Name:</ion-label>
                        <ion-input placeholder="Enter Last Name" v-model="childDetails.lname"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label>Sex:</ion-label>

                        <ion-select placeholder="Male/Female" v-model="childDetails.sex">
                          <ion-select-option value="M">Male</ion-select-option>
                          <ion-select-option value="F">Female</ion-select-option>
                        </ion-select>
                    </ion-item>

                    <ion-item>
                        <ion-label>Birth Date:</ion-label>
                        <ion-datetime-button datetime="dateOfBirth"></ion-datetime-button>

                      <ion-modal :keep-contents-mounted="true" class="datetime-modal">
                        <ion-datetime id="dateOfBirth" displayFormat="YYYY.MM.DD" class="dateStyle" presentation="date" v-model="childDetails.bdate"></ion-datetime>
                      </ion-modal>
                    </ion-item>
                </ion-list>
                </ion-card-content>
            </ion-card>

            <!-- Save -->
            <ion-button expand="block" class="theme" @click="child_add">Save</ion-button><br><br><br>
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
        IonButtons, IonHeader, IonToolbar,
        IonDatetime, IonDatetimeButton, IonModal ,
        IonItem, IonSelect, IonSelectOption, toastController,
        useIonRouter
    } from '@ionic/vue';
import { stringLiteral } from '@babel/types';
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
        IonButtons, IonHeader, IonToolbar,
        IonDatetime, IonDatetimeButton, IonModal,
        IonItem, IonSelect, IonSelectOption
      },
        data(){
          return {
            childDetails: {
              fname: "",
              lname: "",
              bdate: "",
              sex: "",
              guardian: "",
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
        async child_add(){
          const toast = await toastController.create({
            duration: 1500,
            position: 'top'
          })

          // console.log(this.childDetails)
          // console.log(this.childDetails.bdate.split("T")[0])
          const data = this.childDetails;
          fetch('http://localhost:5000/child', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((data) => {
            toast.message = 'Success!'
            this.childDetails = {
              fname: "",
              lname: "",
              bdate: "",
              sex: "",
              guardian: "",
              contact: "",
              address: ""
            }
            this.router.push("/child");
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