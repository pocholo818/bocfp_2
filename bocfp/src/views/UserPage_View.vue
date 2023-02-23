
<template>
    <ion-page>
        <ion-header>
            <ion-toolbar style="">
                <ion-buttons slot="start">
                    <ion-back-button text="Back" defaultHref="/user"></ion-back-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <!-- content -->
        <ion-content>
            <ion-card>
                <ion-card-content>
                    <ion-card-header>
                        <ion-card-title>User Information</ion-card-title>
                    </ion-card-header>


                    <ion-card-subtitle style="text-align: center;">USERID: {{ userId }}</ion-card-subtitle>

                    <ion-list>
                        <ion-item>
                            <ion-label position="floating">Username</ion-label>
                            <ion-input placeholder="Enter Username" v-model="userDetails.username" readonly></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">First Name</ion-label>
                            <ion-input placeholder="Enter First Name" v-model="userDetails.fname" readonly></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Last Name</ion-label>
                            <ion-input placeholder="Enter Last Name" v-model="userDetails.lname" readonly></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Contact Number:</ion-label>
                            <ion-input type="tel" placeholder="Enter Contact Number" maxlength="11"
                                v-model="userDetails.contact" readonly></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Admin Power</ion-label>
                            <ion-input placeholder="Enter Power" v-model="userDetails.result" readonly></ion-input>
                        </ion-item>


                        <!-- options -->
                        <ion-card-content style="display: flex; justify-content: end;">
                            <ion-button color="warning" :router-link="('/user/edit/' + userId)"><ion-icon
                                    :icon="createOutline"></ion-icon>&nbsp; Edit</ion-button>
                            <ion-button color="warning" :router-link="('/user/edit/password/' + userId)"><ion-icon
                                    :icon="createOutline"></ion-icon>&nbsp; Password</ion-button>
                            <!-- delete stuff -->
                            <template v-if="userDetails.soft_delete === 0">
                                <template v-if="userDetails.user_id != '1'">
                                    <ion-button color="danger"
                                    @click="user_delete(userId)"><ion-icon :icon="trashOutline">
                                    </ion-icon>&nbsp;
                                    Del<span>ete</span></ion-button>
                                </template>
                            </template>
                            <ion-button v-else color="success" @click="user_undo()"><ion-icon :icon="arrowUndoOutline">
                                </ion-icon>&nbsp;
                                Retrieve</ion-button>
                        </ion-card-content>

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
    arrowBack,
    arrowUndoOutline
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
    alertController, toastController,
    IonBackButton,
    useIonRouter,

} from '@ionic/vue';
import { useRoute } from 'vue-router';
import { instance as api } from "@/network/Network";

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
        IonBackButton,
    },
    data() {
        return {
            userId: "",
            userDetails: "",
            local_userId: "",
            local_admin_power: ""
        }
    },
    ionViewWillEnter() {
        this.local_userId = localStorage.getItem('user_id') || ''
        this.local_admin_power = localStorage.getItem('admin_power') || ''
    },
    setup() {
        const router = useRoute();
        const ionRouter = useIonRouter()

        return {
            router,
            eyeOutline,
            createOutline,
            trashOutline,
            arrowUndoOutline,
            arrowBack,
            ionRouter
        }
    },
    mounted() {
        this.userId = this.router.params.id + "";

        this.fetchUser()
    },
    methods: {
        fetchUser() {
            api('/user/profile/' + this.userId)
                .then((response) => response.data)
                .then((data) => {
                    this.userDetails = data
                })
        },
        async user_delete(userId: string) {
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
                            const user_id = this.userId

                            api.put('/user/del/' + user_id)
                                .then((data) => {
                                    toast.message = 'Success!'
                                    this.ionRouter.push('/user')
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
        },
        async user_undo() {
            const alert = await alertController.create({
                header: 'Are you sure you want to retrieve?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    },
                    {
                        text: 'RETRIEVE',
                        role: 'confirm',
                        handler: async () => {
                            const toast = await toastController.create({
                                duration: 1500,
                                position: 'top'
                            })

                            const user_id = this.userId

                            api.put('/user/ret/' + user_id)
                                .then((data) => {
                                    toast.message = 'Success!'
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
            this.$nextTick(this.fetchUser);
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