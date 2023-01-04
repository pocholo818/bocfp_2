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
                    <ion-card-title>Editting Information</ion-card-title>
                    <ion-card-subtitle>ID: {{ childId }}</ion-card-subtitle>
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
                                <ion-datetime id="dateOfBirth" displayFormat="YYYY.MM.DD" presentation="date"
                                    v-model="childDetails.bdate" class="dateStyle"></ion-datetime>
                            </ion-modal>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Guardian</ion-label>
                            <ion-input placeholder="Enter Guardian Name" v-model="childDetails.guardian"></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Contact Number</ion-label>
                            <ion-input type="tel" placeholder="Enter Contact Number" maxlength="11"
                                v-model="childDetails.contact"></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Address</ion-label>
                            <ion-input type="tel" placeholder="Enter Contact Number"
                                v-model="childDetails.address"></ion-input>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>

            <!-- Save -->
            <ion-button expand="block" color="success" @click="child_edit">Save</ion-button>

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
    toastController, useIonRouter,
    IonDatetime, IonDatetimeButton, IonModal,
    IonSelect, IonSelectOption
} from '@ionic/vue';
import { useRoute } from 'vue-router';
import { IonRouter } from '@ionic/core/components';
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
        IonButtons, IonHeader, IonToolbar, IonBackButton,
        IonDatetime, IonDatetimeButton, IonModal,
        IonSelect, IonSelectOption
    },

    data() {
        return {
            childId: "",
            childDetails: {}
        }
    },
    setup() {
        const router = useRoute();
        const ionRouter = useIonRouter();

        return {
            router,
            eyeOutline,
            createOutline,
            trashOutline,
            ionRouter
        }
    },
    mounted() {
        this.childId = this.router.params.id + "";

        fetch('http://localhost:5000/child/profile/' + this.childId)
            .then((response) => response.json())
            .then((json) => {
                this.childDetails = json
            })
    },
    methods: {
        async child_edit() {
            const toast = await toastController.create({
                duration: 1500,
                position: 'top'
            })

            const data = this.childDetails;
            console.log(data);

            fetch('http://localhost:5000/childUpdate/:id', {
                method: 'PUT',
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
                    this.ionRouter.push("/child");
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
ion-toolbar {
    --background: #168554;
    --color: white;
}
</style>