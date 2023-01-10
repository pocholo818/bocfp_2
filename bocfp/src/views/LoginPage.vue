<template>
    <ion-page>
        <ion-content>

            <div class="loginCard">
                <ion-card style="width: 420px;">
                    <ion-card-content>
                        <ion-card-title style="text-align:center;">Login</ion-card-title><br>

                        <img src="@/assets/images/logo.png">

                        <ion-item>
                            <ion-label position="floating">Username</ion-label>
                            <!-- <ion-icon slot="start" :name="personOutline"></ion-icon> -->
                            <ion-input placeholder="Username" @keyup.enter="login()"
                                v-model="loginDetails.username"></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Password</ion-label>
                            <ion-input type="password" @keyup.enter="login()" placeholder="Password"
                                v-model="loginDetails.password"></ion-input>
                        </ion-item><br>

                        <ion-button class="theme" @click="login()" expand="block">Login</ion-button>
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
import SHA256 from 'crypto-js/sha256';
import { useProfileStore } from '@/store/profile';

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
        const store = useProfileStore()

        return {
            personOutline,
            store
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

            let data = Object.assign({}, this.loginDetails) // clone this.loginDetails, not reference
            data.password = SHA256(this.loginDetails.password).toString()

            fetch('http://localhost:5000/user/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then(data => {
                    // console.log(data)
                    if (data.message == "Success!") {
                        // store data
                        sessionStorage.setItem('user_id', data.id)
                        sessionStorage.setItem('fname', data.fname)
                        sessionStorage.setItem('admin_power', data.admin_power)

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
        // createApp(){

        // }
    },
    mounted() {
        // if(!sessionStorage.getItem('fname')){
        //     router.push('/dashboard')
        // }
        
    }
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

img {
    width: 150px;
    height: 150px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

/* .loginCard ion-card{
    background-color: #168554;
} */
</style>
