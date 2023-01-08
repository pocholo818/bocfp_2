<template>
    <ion-page>

        <ion-header>
            <ion-toolbar class="theme">
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>Guardian</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="prevData()">Prev</ion-button>
                    <ion-button @click="nextData()">Next</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

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
                <ion-card v-for="guard in guardianList" :key="guard.guardian_id"
                    :router-link="('/guardian_profile/' + guard.guardian_id)" style="cursor: pointer">
                    <ion-item>
                        <ion-card-header>
                            <ion-card-title>{{ guard.fname }} {{ guard.lname }}</ion-card-title>
                            <ion-card-subtitle>GRDNID: {{ guard.guardian_id }}</ion-card-subtitle>
                        </ion-card-header>
                    </ion-item>

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
    IonSearchbar,
    toastController,
    alertController,
    IonToolbar,
    IonHeader, IonMenuButton,
    IonButtons, IonButton,
    IonTitle
} from '@ionic/vue';
// icons
import {
    eyeOutline,
    createOutline,
    trashOutline,
    addOutline
} from 'ionicons/icons';

export default defineComponent({
    name: 'ChildPage',
    components: {
        IonFab,
        IonFabButton,
        IonIcon,
        IonCard,
        IonCardTitle,
        IonCardSubtitle,
        IonCardHeader,
        IonSearchbar,
        IonToolbar,
        IonHeader, IonMenuButton,
        IonButtons, IonButton,
        IonTitle
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
            search: "",
            limit: 20,
            offset: 0
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
            fetch(`http://localhost:5000/guardians?limit=${this.limit}&offset=${this.offset}`)
                .then((response) => response.json())
                .then((json) => {
                    this.guardianList = json
                })
        },
        prevData() {
            const offset = this.offset -= this.limit
            if (offset <= 0) {
                this.offset = 0
            }
            else {
                this.offset = offset
            }

            this.fetchData()
        },
        nextData() {
            this.offset += this.limit

            this.fetchData()
        },
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
