
<template>
    <ion-page>
        <!-- <HeaderBar title="Child View" /> -->
        <!-- <HeaderBar2 title="Child Edit" /> -->

        <ion-header>
            <ion-toolbar style="">
                <ion-buttons slot="start">
                    <!-- <ion-back-button router-link="/child" text="Back"></ion-back-button> -->
                    <ion-button router-link="/child"><ion-icon :icon="arrowBack"></ion-icon>&nbsp;Back</ion-button>
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
                                <ion-datetime id="dateOfBirth" displayFormat="YYYY.MM.DD" presentation="date"
                                    v-model="childDetails.bdate" class="dateStyle" readonly></ion-datetime>
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
                    <div style="display: flex; justify-content: space-between; align-items: center">
                        <ion-card-title>Record</ion-card-title>
                        <ion-button class="theme" :router-link="('/record_add/' + childId)">+</ion-button>
                    </div>
                    <ion-card-subtitle>Data Gathered</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                    <ion-list>
                        <ion-item v-for="record in childRecords" :key="record.recordId">
                            <ion-label>
                                <h2>{{ record.date.split("T")[0] }}</h2>
                                <p>Record ID: {{ record.record_id }}</p>
                                <p>Height: {{ record.height }}cm</p>
                                <p>Weight: {{ record.weight }}kg</p>
                                <p>Remark: {{ record.remark }}</p>

                                <ion-label>
                                    <div style="text-align:center;">
                                        <ion-button color="warning" style="width: 49%;"
                                            :router-link="('/record_edit/' + record.record_id)"><ion-icon
                                                :icon="createOutline"></ion-icon></ion-button>
                                        <ion-button color="danger" style="width: 49%;" @click="record_delete"><ion-icon
                                                :icon="trashOutline"></ion-icon></ion-button>
                                    </div>
                                </ion-label>
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
    trashOutline,
    arrowBack
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
    IonDatetime, IonDatetimeButton, IonModal,
    alertController, toastController

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
        IonButtons, IonHeader, IonToolbar,
        IonDatetime, IonDatetimeButton, IonModal
    },
    data() {
        return {
            childId: "",
            childDetails: {},
            childRecords: {}
        }
    },
    setup() {
        const router = useRoute();

        return {
            router,
            eyeOutline,
            createOutline,
            trashOutline,
            arrowBack
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
        this.fetchRecord()
    },
    methods: {
        fetchRecord() {
            fetch('http://localhost:5000/records/' + this.childId)
                .then((response) => response.json())
                .then((json) => {
                    this.childRecords = json
                })
        },
        async record_delete() {
            const alert = await alertController.create({
                header: 'Are you sure you want to delete?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    },
                    {
                        text: 'DELETE',
                        role: 'confirm',
                        handler: async () => {
                            const toast = await toastController.create({
                                duration: 1500,
                                position: 'top'
                            })

                            const childId = + this.childId;

                            fetch('http://localhost:5000/child/' + childId, {
                                method: 'DELETE'
                            })
                                .then((data) => {
                                    toast.message = 'Success!'
                                    this.$emit('deleted')
                                })
                                .catch((error) => {
                                    toast.message = error
                                });

                            await toast.present();
                        },
                    },
                ],
            });

            await alert.present();
        }
    },
    watch: {
        $route() {
            this.$nextTick(this.fetchRecord);
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