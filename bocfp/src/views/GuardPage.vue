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

                <ion-searchbar v-model="search"></ion-searchbar>

                <!-- search filter -->
                <ion-item>
                    <ion-select @ionChange="searchData" v-model="guardFilter" placeholder="Select Filter">
                        <ion-select-option value="all">All</ion-select-option>
                        <ion-select-option value="deleted">Deleted</ion-select-option>
                    </ion-select>
                </ion-item>

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
                    <TransitionGroup name="fade">
                        <ion-card v-for="guard in guardianList" class="ion-margin-bottom" :key="guard.guardian_id"
                            :router-link="('/guardian_profile/' + guard.guardian_id)" style="cursor: pointer">
                            <ion-card-content class="ion-no-padding">
                                <ion-item lines="none">
                                    <ion-card-header>
                                        <ion-card-title>{{ guard.fname }} {{ guard.lname }}</ion-card-title>
                                        <ion-card-subtitle>Household ID: {{ guard.household_id }}</ion-card-subtitle>
                                    </ion-card-header>
                                </ion-item>
                            </ion-card-content>
                        </ion-card>
                    </TransitionGroup>
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
    IonTitle,
    IonSelect, IonSelectOption,
} from '@ionic/vue';
// icons
import {
    eyeOutline,
    createOutline,
    trashOutline,
    addOutline
} from 'ionicons/icons';
import PageButtons from '@/components/PageButtons.vue';
import { instance as api } from "@/network/Network";

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
        IonTitle,
        IonSelect, IonSelectOption,
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
            guardFilter: "all",
            isNextEnabled: true,
            searchTimeout: 0
        };
    },
    methods: {
        setOpen(isOpen: boolean) {
            this.isOpen = isOpen;
        },
        searchData() {
            const search = this.search.trim()

            this.limit = 5
            this.offset = 0

            if (search.length) {
                clearTimeout(this.searchTimeout)
                this.searchTimeout = setTimeout(() => {
                    api(`/guardians?limit=${this.limit}&offset=${this.offset}&search=${search}&filter=${this.guardFilter}`)
                        .then((response) => response.data)
                        .then((data) => {
                            this.guardianList = data
                        })
                }, 500)
            }
            else {
                this.fetchData()
            }
        },
        fetchData() {
            api(`/guardians?limit=${this.limit}&offset=${this.offset}&search=${this.search}&filter=${this.guardFilter}`)
                .then((response) => response.data)
                .then((data) => {
                    this.guardianList = data

                    if (data.message) {
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
        },
        search() {
            this.searchData()
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
