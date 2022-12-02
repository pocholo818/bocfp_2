
<template>
    <ion-page>
        <!-- <HeaderBar title="Child View" /> -->
        <!-- <HeaderBar2 title="Child Edit" /> -->

        <ion-header>
            <ion-toolbar style="">
                <ion-buttons slot="start">
                    <ion-back-button router-link="/child" text="Back"></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <!-- content -->
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Information</ion-card-title>
                    <ion-card-subtitle>ID: {{ childId }}</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                    <ion-list>
                        <ion-item>
                            <ion-label position="floating">First Name</ion-label>
                            <ion-input placeholder="Enter First Name" v-model="childDetails.fname" readonly></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Last Name</ion-label>
                            <ion-input placeholder="Enter Last Name" v-model="childDetails.lname" readonly></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Sex</ion-label>
                            <ion-input placeholder="Enter Sex" v-model="childDetails.sex" readonly></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label>Birth Date:</ion-label>
                            <ion-datetime-button datetime="dateOfBirth"></ion-datetime-button>

                            <ion-modal :keep-contents-mounted="true" class="datetime-modal">
                                <ion-datetime id="dateOfBirth" displayFormat="YYYY.MM.DD" presentation="date" v-model="childDetails.bdate" readonly></ion-datetime>
                            </ion-modal>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Guardian</ion-label>
                            <ion-input placeholder="Enter Guardian Name" v-model="childDetails.guardian"
                                readonly></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Contact Number</ion-label>
                            <ion-input type="tel" placeholder="Enter Contact Number" maxlength="11"
                                v-model="childDetails.contact" readonly></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Address</ion-label>
                            <ion-input type="tel" placeholder="Enter Contact Number" v-model="childDetails.address"
                                readonly></ion-input>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>

            <ion-card>
                <ion-card-header>
                    <ion-card-title>Record</ion-card-title>
                    <ion-card-subtitle>Data Gathered</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                    <ion-list>
                        <ion-item>
                            <ion-label>
                                <h2>2022-11-15</h2>
                                <p>Height: 172cm</p>
                                <p>Weight: 58kg</p>
                                <p>Remark: Normal</p>
                            </ion-label>
                        </ion-item>

                        <ion-item>
                            <ion-label>
                                <h2>2022-11-15</h2>
                                <p>Height: 172cm</p>
                                <p>Weight: 58kg</p>
                                <p>Remark: Normal</p>
                            </ion-label>
                        </ion-item>
                    </ion-list>
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
    IonInput,
    IonList,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCardContent,
    IonButtons, 
    IonHeader, 
    IonToolbar, 
    IonBackButton,
    IonDatetime, IonDatetimeButton, IonModal

} from '@ionic/vue';
import { useRoute } from 'vue-router';
// import HeaderBar from '@/components/HeaderBar.vue';
// import {
//   IonContent,
//   IonPage,
// } from '@ionic/vue';

export default defineComponent({
    name: 'ChildPage',
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
        IonDatetime, IonDatetimeButton, IonModal
    },
    data() {
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
ion-toolbar {
    --background: #168554;
    --color: white;
}
</style>