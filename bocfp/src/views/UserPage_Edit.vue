
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
                        <ion-card-title>User Information</ion-card-title>
                    </ion-card-header>


                    <ion-card-subtitle style="text-align: center;">USERID: {{ userId }}</ion-card-subtitle>

                    <ion-list>
                        <ion-item>
                            <ion-label position="floating">Username</ion-label>
                            <ion-input placeholder="Enter Username" v-model="userDetails.username" required></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">First Name</ion-label>
                            <ion-input placeholder="Enter First Name" v-model="userDetails.fname" required></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Last Name</ion-label>
                            <ion-input placeholder="Enter Last Name" v-model="userDetails.lname" required></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Contact Number:</ion-label>
                            <ion-input type="tel" @keypress="numOnly($event)" placeholder="Enter Contact Number"
                                maxlength="11" v-model="userDetails.contact"></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label>Admin Power:</ion-label>

                            <ion-select placeholder="Yes/No" v-model="userDetails.admin_power">
                                <ion-select-option v-bind:value="1">Yes</ion-select-option>
                                <ion-select-option v-bind:value="0">No</ion-select-option>
                            </ion-select>
                        </ion-item>


                        <!-- Save -->
                        <ion-button expand="block" @click="user_edit">Save</ion-button>

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
    alertController, toastController,
    IonBackButton,
    useIonRouter,
    IonSelectOption, IonSelect

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
        IonSelectOption, IonSelect
    },
    data() {
        return {
            userId: "",
            userDetails: {
                "username": "",
                "fname": "",
                "lname": "",
                "contact": "",
                "admin_power": ""
            },
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
    mounted() {
        this.userId = this.router.params.id + "";

        this.fetchUser()
    },
    methods: {
        fetchUser() {
            this.userId = this.router.params.id + "";
            api('/user/profile/' + this.userId)
                .then((response) => response.data)
                .then((data) => {
                    this.userDetails = data
                })
        },
        async user_edit() {
            const toast = await toastController.create({
                duration: 1500,
                position: 'top'
            })

            // check if empty input
            if (this.userDetails.fname && this.userDetails.lname && this.userDetails.username
                && this.userDetails.contact) {
                const data = this.userDetails;

                api.put('/user/edit/' + this.userId, data)
                    .then(response => response.data)
                    .then((data) => {
                        toast.message = 'Success!'
                        this.userDetails = {
                            fname: "",
                            lname: "",
                            contact: "",
                            username: "",
                            admin_power: "",
                        }
                        this.ionRouter.back();
                    })
                    .catch((error) => {
                        toast.message = error.response.data
                    });
            }
            else {
                toast.message = "User's details are incomplete"
            }

            await toast.present();
        },
        numOnly(evt: KeyboardEvent): void {
            const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            const keyPressed: string = evt.key;

            if (!keysAllowed.includes(keyPressed)) {
                evt.preventDefault()
            }
        }

    }
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