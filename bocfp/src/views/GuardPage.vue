<template>
    <ion-page>
        <HeaderBar title="Guardian" />

        <!-- content -->
        <ion-content>

            <ion-item>
                <ion-searchbar @input="searchData($event.target.value)" v-model="search"></ion-searchbar>
            </ion-item>

            <div v-if="guardianList.message">
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle style="text-align: center;">{{ guardianList.message }}</ion-card-subtitle>
                    </ion-card-header>
                </ion-card>
            </div>

            <div v-else>
                <ion-card v-for="guard in guardianList" :key="guard.guardian_id" :router-link="('/guardian_profile/' + guard.guardian_id)">
                    <ion-item>
                        <ion-card-header>
                            <ion-card-title>{{ guard.fname }} {{ guard.lname }}</ion-card-title>
                            <ion-card-subtitle>GRDNID: {{ guard.guardian_id }}</ion-card-subtitle>
                        </ion-card-header>
                    </ion-item>
<!-- 
                    <ion-card-content>
                        <ion-button color="success" :router-link="('/guardian_profile/' + guard.guardian_id)"
                            style="width: 32%;"><ion-icon :icon="eyeOutline"></ion-icon>&nbsp; View</ion-button>
                        <ion-button color="warning" :router-link="('/guardian_edit/' + guard.guardian_id)"
                            style="width: 32%;"><ion-icon :icon="createOutline"></ion-icon>&nbsp; Edit</ion-button>
                        <ion-button color="danger" @click="guardian_delete(guard.guardian_id)"
                            style="width: 32%;"><ion-icon :icon="trashOutline"></ion-icon>&nbsp;
                            Del<span>ete</span></ion-button>
                    </ion-card-content> -->

                </ion-card>
            </div>


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
    // IonCardContent,
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
        // IonCardContent,
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
            guardianDel: "",
            search: ""
        };
    },
    methods: {
        setOpen(isOpen: boolean) {
            this.isOpen = isOpen;
        },
        searchData(search: string) {
            search = search.trim()
            if (search.length) {
                setTimeout(() => {
                    fetch('http://localhost:5000/guardian/search/' + search)
                        .then((response) => response.json())
                        .then((json) => {
                            this.guardianList = json
                        })
                }, 1000)
            }
            else {
                this.fetchData()
            }

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

@media only screen and (max-width: 768px) {
    span {
        display: none;
    }
}
</style>
