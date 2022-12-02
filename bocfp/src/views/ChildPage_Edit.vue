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
                        <ion-input placeholder="Enter First Name" v-model="childDetails.fname"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Last Name</ion-label>
                        <ion-input placeholder="Enter Last Name" v-model="childDetails.lname"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Sex</ion-label>
                        <ion-input placeholder="Enter Sex" v-model="childDetails.sex"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Birth Date</ion-label>
                        <ion-input placeholder="Enter Birth Date" v-model="childDetails.bdate"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Guardian</ion-label>
                        <ion-input placeholder="Enter Guardian Name" v-model="childDetails.guardian"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Contact Number</ion-label>
                        <ion-input type="tel" placeholder="Enter Contact Number" maxlength="11" v-model="childDetails.contact"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Address</ion-label>
                        <ion-input type="tel" placeholder="Enter Contact Number" v-model="childDetails.address"></ion-input>
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
        IonButtons, IonHeader, IonToolbar, IonBackButton,
    } from '@ionic/vue';
    import { useRoute } from 'vue-router';
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
            data(){
                return {
                    childId: "",
                    childDetails: {}
            }
        },
            setup() {
                const router = useRoute();

                return {
                    router,
                    eyeOutline,
                    createOutline,
                    trashOutline
            }
    },
    mounted() {
        this.childId = this.router.params.id + "";
        // console.log(this.router.params.id)

        fetch('http://localhost:5000/child/' + this.childId)
      .then((response) => response.json())
      .then((json) => { 
        this.childDetails = json
      })
    }
    });
  
    
  
  </script>
  

  <style scoped>
    ion-toolbar{
        --background: #168554;
        --color: white;
    }
</style>