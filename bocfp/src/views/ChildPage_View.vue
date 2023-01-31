
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
            <ion-card>
                <ion-card-content>
                    <ion-card-header>
                        <ion-card-title>Child Information</ion-card-title>
                    </ion-card-header>

                    <!-- picture -->
                    <!-- <img alt="picture" class="icon" src="@/assets/images/noPic.png"> -->
                    <img alt="picture" class="icon" :src="childDetails.image">


                    <ion-card-subtitle style="text-align: center;">CHLDID: {{ childId }}</ion-card-subtitle>

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
                            <ion-label position="floating">Age</ion-label>
                            <ion-input placeholder="Enter Age" v-model="childDetails.age" readonly></ion-input>
                        </ion-item><br>

                        <!-- options -->
                        <ion-card-content style="display: flex; justify-content: end;">
                            <ion-button color="warning" :router-link="('/child_edit/' + childId)"><ion-icon
                                    :icon="createOutline"></ion-icon>&nbsp; Edit</ion-button>
                            <ion-button color="danger" @click="child_delete(childId)"><ion-icon :icon="trashOutline">
                                </ion-icon>&nbsp;
                                Del<span>ete</span></ion-button>
                        </ion-card-content>

                        <!-- child's guardian -->
                        <ion-card-header>
                            <ion-card-title>Guardian</ion-card-title>
                            <ion-card-subtitle v-if="guardianDetails.relationship != ''">GRDNID: {{
                                guardianDetails.guardian_id
                            }}</ion-card-subtitle>
                        </ion-card-header>

                        <div v-if="guardianDetails.relationship == ''">
                            <h2 style="text-align: center;">{{ guardianDetails.message }}</h2>
                            <br>
                        </div>

                        <div v-else>
                            <ion-item>
                                <ion-label position="floating">Guardian</ion-label>
                                <ion-input placeholder="Enter Guardian Name" v-model="guardianName"
                                    readonly></ion-input>
                            </ion-item>

                            <ion-item>
                                <ion-label position="floating">Relationship</ion-label>
                                <ion-input placeholder="Enter Guardian Name" v-model="guardianDetails.relationship"
                                    readonly></ion-input>
                            </ion-item>

                            <ion-item>
                                <ion-label position="floating">Contact Number</ion-label>
                                <ion-input type="tel" placeholder="Enter Contact Number" maxlength="11"
                                    v-model="guardianDetails.contact" readonly></ion-input>
                            </ion-item>

                            <ion-item>
                                <ion-label position="floating">Address</ion-label>
                                <ion-input type="tel" placeholder="Enter Address" v-model="guardianDetails.address"
                                    readonly></ion-input>
                            </ion-item><br>
                        </div>

                        <!-- latest record -->
                        <ion-card-header>
                            <div style="position: absolute; right: 0; z-index: 1;padding-right: 1.5vw">
                                <span><ion-button :router-link="('/record_add/' + childId)">+</ion-button></span>
                            </div>
                            <ion-card-title>Record</ion-card-title>
                            <ion-card-subtitle>Displaying the latest record</ion-card-subtitle>
                        </ion-card-header>

                        <div v-if="childNewRecord.remark == ''">
                            <h2 style="text-align: center;">{{ childNewRecord.message }}</h2>
                        </div>

                        <div v-else>
                            <ion-item>
                                <ion-label position="floating">Remark</ion-label>
                                <ion-input type="text" placeholder="Enter Remark" v-model="totalRemark"
                                    readonly></ion-input>
                            </ion-item>

                            <ion-item>
                                <ion-label position="floating">Height (cm):</ion-label>
                                <ion-input placeholder="Enter Height" v-model="childNewRecord.height"
                                    readonly></ion-input>
                            </ion-item>

                            <ion-item>
                                <ion-label position="floating">Weight (kg):</ion-label>
                                <ion-input placeholder="Enter Weight" v-model="childNewRecord.weight"
                                    readonly></ion-input>
                            </ion-item>
                            <ion-button :router-link="('/record_view/' + childId)">View all
                                Records</ion-button><br>

                            <!-- line chart -->
                            <div>
                                <LineChart :data="data" :options="options" />
                            </div>
                        </div>

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
    alertController, toastController,
    IonBackButton,
    useIonRouter,

} from '@ionic/vue';
import { useRoute } from 'vue-router';
import LineChart from '@/components/LineChart.vue'
import moment from 'moment'

export default defineComponent({
    name: 'ChildPage',
    components: {
        LineChart,
        IonInput,
        IonList,
        IonCard,
        IonCardTitle,
        IonCardSubtitle,
        IonCardHeader,
        IonCardContent,
        IonButtons, IonHeader, IonToolbar,
        IonDatetime, IonDatetimeButton, IonModal,
        IonBackButton,
    },
    ionViewWillEnter() {
        this.childId = this.router.params.id + "";

        fetch('http://localhost:5000/child/profile/' + this.childId)
            .then((response) => response.json())
            .then((json) => {
                this.childDetails = json

                if (!this.childDetails.image) {
                    this.childDetails.image = require("@/assets/images/noPic.png")
                }
            })
        this.fetchGuardian()
        this.fetchLatestRecord()
        this.fetchRecords()
    },
    data() {
        return {
            childId: "",
            childDetails: { "image": "" },
            childRecords: "",
            childNewRecord: "",
            totalRemark: "",
            guardianDetails: "",
            guardianName: "",
            childAllRecords: "",
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Records',
                        backgroundColor: '#f87979',
                        data: []
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    setup() {
        const router = useRoute();
        const ionRouter = useIonRouter()

        return {
            router,
            eyeOutline,
            createOutline,
            trashOutline,
            arrowBack,
            ionRouter
        }
    },
    methods: {
        fetchGuardian() {
            fetch('http://localhost:5000/child/link/' + this.childId)
                .then((response) => response.json())
                .then((json) => {
                    this.guardianDetails = json
                    this.guardianName = `${json.fname} ${json.lname}`
                })
        },
        fetchLatestRecord() {
            fetch('http://localhost:5000/child/newRecord/' + this.childId)
                .then((response) => response.json())
                .then((json) => {
                    this.childNewRecord = json

                    if (json.remark == "") {
                        this.totalRemark = ""
                    }
                    else {
                        this.totalRemark = `${json.remark} (${json.output.toFixed(2)})`
                    }
                });
        },
        fetchRecords() {
            fetch(`http://localhost:5000/records/` + this.childId + `?limit=${10}&offset=${0}`)
                .then((response) => response.json())
                .then((json) => {
                    this.childAllRecords = json

                    if (!json.message) {
                        this.data.labels = json.map((item: any) => moment(String(item.date)).format('MMM DD, YYYY hh:mm A'))
                        this.data.datasets[0].data = json.map((item: any) => item.output)
                    }
                })
        },
        async record_delete(record_id: string) {
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
                            const recordId = record_id

                            console.log(recordId);

                            fetch('http://localhost:5000/record/del/' + recordId, {
                                method: 'put'
                            })
                                .then((data) => {
                                    toast.message = 'Success!'
                                    // this.$emit('deleted')
                                    this.fetchGuardian()
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
            this.fetchLatestRecord();
        },
        async child_delete(id: string) {
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

                            const childId = this.childId

                            fetch('http://localhost:5000/child/del/' + childId, {
                                method: 'PUT'
                            })
                                .then((data) => {
                                    toast.message = 'Success!'
                                    this.$emit('deleted')
                                })
                                .catch((error) => {
                                    toast.message = error
                                });

                            await toast.present();
                            this.ionRouter.back()
                        },
                    },
                ],
            });

            await alert.present();
        }
    },
    watch: {
        $route() {
            this.$nextTick(this.fetchGuardian);
            this.$nextTick(this.fetchLatestRecord);
        }
    },
});



</script>
  
<style scoped>
ion-toolbar {
    --background: #168554;
    --color: white;
}

.icon {
    width: 180px;
    height: 180px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    text-align: center;
}

@media only screen and (max-width: 768px) {

    /* phone */
    [class*="icon"] {
        width: 140px;
        height: 140px;
    }
}
</style>