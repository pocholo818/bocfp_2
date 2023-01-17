<template>
    <ion-page>

        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>Guardian</ion-title>
            </ion-toolbar>
        </ion-header>

        <!-- content -->
        <ion-content class="ion-padding">

            <div style="max-width: 800px; margin: auto;">

                <ion-searchbar @input="searchData($event.target.value)" v-model="search"></ion-searchbar>

                <template v-if="guardianList.message">
                    <ion-card>
                        <ion-card-header>
                            <ion-card-subtitle style="text-align: center;">{{
                                guardianList.message
                            }}</ion-card-subtitle>
                        </ion-card-header>
                    </ion-card>
                </template>

                <template v-else>
                    <ion-card v-for="guard in guardianList" class="ion-margin-bottom" :key="guard.guardian_id"
                        :router-link="('/guardian_profile/' + guard.guardian_id)" style="cursor: pointer">
                        <ion-card-content class="ion-no-padding">
                            <ion-item lines="none">
                                <ion-card-header>
                                    <ion-card-title>{{ guard.fname }} {{ guard.lname }}</ion-card-title>
                                    <ion-card-subtitle>ID: {{ guard.guardian_id }}</ion-card-subtitle>
                                </ion-card-header>
                            </ion-item>
                        </ion-card-content>
                    </ion-card>
                </template>

            </div>

        </ion-content>

        <PageButtons :prev="prevData" :next="nextData" />

        <!-- Add child button -->
        <ion-fab slot="fixed" vertical="bottom" horizontal="end" router-link="/guardian_add">
            <ion-fab-button @click="setOpen(true)">
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
    IonToolbar,
    IonHeader, IonMenuButton,
    IonButtons,
    IonTitle
} from '@ionic/vue';
// icons
import {
    eyeOutline,
    createOutline,
    trashOutline,
    addOutline
} from 'ionicons/icons';
import PageButtons from '@/components/PageButtons.vue';

export default defineComponent({
    name: 'ChildPage',
    components: {
        PageButtons,
        IonFab,
        IonFabButton,
        IonIcon,
        IonCard,
        IonCardTitle,
        IonCardSubtitle,
        IonCardHeader,
        IonCardContent,
        IonSearchbar,
        IonToolbar,
        IonHeader, IonMenuButton,
        IonButtons,
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
            offset: 0,
            isNextEnabled: true
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

                    if (json.message) {
                        this.isNextEnabled = false
                        return
                    }
                    else {
                        this.isNextEnabled = true
                    }
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
            if (this.isNextEnabled) {
                this.offset += this.limit
                this.fetchData()
            }
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
