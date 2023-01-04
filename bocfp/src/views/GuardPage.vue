<template>
    <ion-page>
        <HeaderBar title="Guardian" />

        <!-- content -->
        <ion-content>

            <ion-item>
                <ion-searchbar></ion-searchbar>
            </ion-item>

            <ion-card v-for="guard in guardianList" :key="guard.guardian_id">
                <ion-card-header>
                    <ion-card-title>{{ guard.fname }} {{ guard.lname }}</ion-card-title>
                    <ion-card-subtitle>GRDN: {{ guard.guardian_id }}</ion-card-subtitle>

                    <ion-card-content>
                        <p>Contact Number: {{ guard.contact }}</p>
                        <p>Address: {{ guard.address }}</p><br>
                        <!-- <p>{{ guard.soft_delete }}</p> -->

                        <ion-button color="success" :router-link="('/guardian_profile/' + guard.guardian_id)" style="width: 32%;"><ion-icon
                                :icon="eyeOutline" ></ion-icon>&nbsp; View</ion-button>
                        <ion-button color="warning" :router-link="('/guardian_edit/' + guard.guardian_id)" style="width: 32%;"><ion-icon
                                :icon="createOutline"></ion-icon>&nbsp; Modify</ion-button>
                        <ion-button color="danger" @click="guardian_delete(guard.guardian_id)"
                            style="width: 32%;"><ion-icon :icon="trashOutline"></ion-icon>&nbsp; Delete</ion-button>
                    </ion-card-content>
                </ion-card-header>
            </ion-card>


        </ion-content>

        <!-- Add child button -->
        <ion-fab slot="fixed" vertical="bottom" horizontal="end" router-link="/guardian_add">
            <ion-fab-button @click="setOpen(true)" class="theme">
                <ion-icon :icon="addOutline"></ion-icon>
            </ion-fab-button>
        </ion-fab>

    </ion-page>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
// ionic stuff
import {
    IonFab,
    IonFabButton,
    IonIcon,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCardContent,
    IonSearchbar,
    toastController,
    alertController
} from '@ionic/vue';
// icons
import {
    eyeOutline,
    createOutline,
    trashOutline,
    addOutline
} from 'ionicons/icons';
import HeaderBar from '@/components/HeaderBar.vue';
// import {
//   IonContent,
//   IonPage,
// } from '@ionic/vue';

export default defineComponent({
    name: 'ChildPage',
    components: {
        HeaderBar,
        IonFab,
        IonFabButton,
        IonIcon,
        IonCard,
        IonCardTitle,
        IonCardSubtitle,
        IonCardHeader,
        IonCardContent,
        IonSearchbar
        //   ChildCard
    },
    setup() {
        return {
            eyeOutline,
            createOutline,
            trashOutline,
            addOutline
        }
    },
    data() {
        return {
            isOpen: false,
            guardianList: [],
            guardianDel: ""
        };
    },
    methods: {
        setOpen(isOpen: boolean) {
            this.isOpen = isOpen;
        },
        fetchData() {
            fetch('http://localhost:5000/guardians')
                .then((response) => response.json())
                .then((json) => {
                    this.guardianList = json
                })
        },
        async guardian_delete(guardian_id: string) {
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
                            const guard_id = guardian_id;
                            // console.log(guardian_id);

                            fetch('http://localhost:5000/guardianDel/' + guard_id, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            })
                                .then((data) => {
                                    toast.message = 'Success!'
                                    this.guardianDel = "";
                                    this.fetchData();
                                })
                                .catch((error) => {
                                    toast.message = error
                                });

                            await toast.present();


                            await toast.present();
                        },
                    },
                ],
            });

            await alert.present();
        }
    },
    // get data
    mounted() {
        this.fetchData()
    },
    watch: {
        $route() {
            this.$nextTick(this.fetchData);
        }
    }
});
</script>
  
<style scoped>
ion-button {
    --border-width: 100%;
}
</style>
  