<template>
    <ion-page>
        <ion-content>

            <div class="loginCard">
                <ion-card>
                    <ion-card-content>
                        <ion-card-title style="text-align:center;">Login</ion-card-title>

                        <ion-item>
                            <ion-label position="floating">Username</ion-label>
                            <!-- <ion-icon slot="start" :name="personOutline"></ion-icon> -->
                            <ion-input placeholder="Username" v-model="loginDetails.username"></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Password</ion-label>
                            <ion-input type="password" placeholder="Password"
                                v-model="loginDetails.password"></ion-input>
                        </ion-item><br>

                        <ion-button class="theme" @click="login()" @keyup.enter="login()"
                            expand="block">Login</ion-button>
                    </ion-card-content>
                </ion-card>
            </div>

        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// ionic stuff
import {
    IonContent,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonItem,
    IonInput,
    IonLabel,
    IonPage,
    toastController
} from '@ionic/vue';
import { personOutline } from 'ionicons/icons';
import router from '@/router';

export default defineComponent({
    name: 'ChildPage',
    components: {
        IonContent,
        IonCard,
        IonCardContent,
        IonCardTitle,
        // IonHeader,
        IonItem,
        IonInput,
        IonLabel,
        IonPage,
    },
    setup() {
        return {
            personOutline
        }
    },
    data() {
        return {
            isOpen: false,
            loginDetails: {
                "username": "",
                "password": ""
            }
        };
    },
    methods: {
        setOpen(isOpen: boolean) {
            this.isOpen = isOpen;
        },
        async login() {
            const toast = await toastController.create({
                duration: 1500,
                position: 'top'
            })

            const data = this.loginDetails

            fetch('http://localhost:5000/user/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then(data => {
                    if (data.message == "Success!") {
                        toast.message = data.message
                        this.loginDetails = {
                            username: "",
                            password: ""
                        }
                        router.push('/dashboard')
                    }
                    else {
                        toast.message = data.message

                    }
                })
            await toast.present();
        },
    },
});
</script>

<style scoped>
ion-content {
    --background: #168554;
}

.loginCard {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* .loginCard ion-card{
    background-color: #168554;
} */
</style>
