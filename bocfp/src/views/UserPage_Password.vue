
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
                            <ion-label position="floating">Password</ion-label>
                            <ion-input type="password" placeholder="Password" v-model="userNewPass"
                                required></ion-input>
                        </ion-item><br>

                        <ion-item>
                            <ion-label position="floating">Confirm Password</ion-label>
                            <ion-input type="password" placeholder="Password" v-model="confirmPassword"
                                required></ion-input>
                        </ion-item><br>


                        <!-- Save -->
                        <ion-button expand="block" class="theme" @click="user_edit">Save</ion-button>

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

} from '@ionic/vue';
import { useRoute } from 'vue-router';
import SHA256 from 'crypto-js/sha256';

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
            userNewPass: "",
            confirmPassword: ""
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
    },
    methods: {
        async user_edit() {
            const toast = await toastController.create({
                duration: 1500,
                position: 'top'
            })

            if (this.userNewPass == this.confirmPassword) {
                const data = {
                    password: SHA256(this.userNewPass).toString()
                }

                fetch(`http://localhost:5000/user/edit/password/${this.userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then((data) => {
                        toast.message = 'Success!'
                        this.userNewPass = ""
                        this.confirmPassword = ""
                        this.ionRouter.push("/user");
                    })
                    .catch((error) => {
                        toast.message = error
                    });
            }
            else{
                toast.message = "Password and Confirm Password does not match"
            }

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