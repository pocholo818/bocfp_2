<template>
  <ion-page>

    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Children</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- content -->
    <ion-content class="ion-padding">

      <ion-refresher slot="fixed" @ionRefresh="refresh()">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div style="max-width: 800px; margin: auto;">

        <ion-searchbar @input="searchData($event.target.value)" v-model="search"></ion-searchbar>

        <!-- search filter -->
        <ion-item>
          <ion-select @ion-change="filterChild()" v-model="childFilter" placeholder="Select Filter">
            <ion-select-option value="all">All</ion-select-option>
            <ion-select-option value="m">Male</ion-select-option>
            <ion-select-option value="f">Female</ion-select-option>
          </ion-select>
        </ion-item>

        <template v-if="childList.message">
          <ion-card>
            <ion-card-header>
              <ion-card-subtitle style="text-align: center;">{{ childList.message }}</ion-card-subtitle>
            </ion-card-header>
          </ion-card>
        </template>

        <template v-else>
          <ion-card v-for="child in childList" style="cursor: pointer" class="ion-margin-bottom" :key="child.id"
            :router-link="('/child_view/' + child.id)">
            <ion-card-content class="ion-no-padding">
              <ion-item lines="none">
                <ion-thumbnail slot="start">
                  <img alt="picture" class="icon" :src="child.image">
                </ion-thumbnail>

                <ion-card-header>
                  <ion-card-title>{{ child.fname }} {{ child.lname }}</ion-card-title>
                  <ion-card-subtitle>ID: {{ child.id }}</ion-card-subtitle>
                </ion-card-header>

                <div slot="end" style="z-index: 999">
                  <ion-button color="warning" @click.prevent="() => $router.push('/child_edit/' + child.id)">
                    <ion-icon :icon="createOutline"></ion-icon><span class="hide-on-mobile">&nbsp; Edit</span>
                  </ion-button>
                  <ion-button color="danger" @click.prevent="child_delete(child.id)">
                    <ion-icon :icon="trashOutline"></ion-icon><span class="hide-on-mobile">&nbsp;Delete</span>
                  </ion-button>
                </div>

              </ion-item>
            </ion-card-content>
          </ion-card>
        </template>

      </div>

    </ion-content>

    <PageButtons :prev="prevData" :next="nextData" />

    <!-- Add child button -->
    <ion-fab slot="fixed" vertical="bottom" horizontal="end" router-link="/child_add">
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
  IonSearchbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardSubtitle,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonThumbnail,
  IonToolbar,
  IonHeader, IonMenuButton,
  IonButtons,
  alertController,
  toastController,
  IonTitle,
  useIonRouter,
  IonSelect, IonSelectOption,
  IonRefresher, IonRefresherContent
} from '@ionic/vue';
// icons
import {
  addOutline, createOutline, trashOutline
} from 'ionicons/icons';
import PageButtons from '@/components/PageButtons.vue';

export default defineComponent({
  name: 'ChildPage',
  components: {
    IonSearchbar,
    PageButtons,
    IonFab,
    IonFabButton,
    IonIcon,
    IonCard,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonThumbnail,
    IonToolbar,
    IonHeader, IonMenuButton,
    IonButtons,
    IonTitle,
    IonSelect, IonSelectOption,
    IonRefresher, IonRefresherContent
  },
  setup() {
    const ionRouter = useIonRouter()

    return {
      ionRouter,
      createOutline,
      trashOutline,
      addOutline
    }
  },
  data() {
    return {
      isOpen: false,
      childList: { "image": "" },
      search: "",
      limit: 20,
      offset: 0,
      isNextEnabled: true,
      childFilter: ""
    };
  },
  methods: {
    searchData(search: string) {
      search = search.trim()
      if (search.length) {
        setTimeout(() => {
          // search for male child
          if (this.childFilter == 'm') {
            fetch('http://localhost:5000/child/search/male/' + search)
              .then((response) => response.json())
              .then((json) => {
                this.childList = { "image": "" },
                  this.childList = json
              })
          }
          // search for female child
          else if (this.childFilter == 'f') {
            fetch('http://localhost:5000/child/search/female/' + search)
              .then((response) => response.json())
              .then((json) => {
                this.childList = { "image": "" },
                  this.childList = json
              })
          }
          // search for all child
          else if (this.childFilter == 'a') {
            fetch('http://localhost:5000/child/search/' + search)
              .then((response) => response.json())
              .then((json) => {
                this.childList = { "image": "" },
                this.childList = json
              })
          }
        }, 1000)
      }
      // if empty search
      else {
        if(this.childFilter == 'm'){
          this.fetchMale()
        }
        else if(this.childFilter == 'f'){
          this.fetchFemale()
        }
        else if(this.childFilter == 'a'){
          this.fetchData()
        }
      }
    },
    setOpen(isOpen: boolean) {
      this.isOpen = isOpen;
    },
    fetchData() {
      fetch(`http://localhost:5000/childs?limit=${this.limit}&offset=${this.offset}`)
        .then((response) => response.json())
        .then((json) => {
          this.childList = json

          if (json.message) {
            this.isNextEnabled = false
            return
          }
          else {
            this.isNextEnabled = true
          }

          if (this.childList.image) {
            this.childList.image = `data:image/jpeg;base64,${json.image}`
          }
          else {
            this.childList.image = require("@/assets/images/noPic.png")
          }
        })
    },
    fetchMale() {
      fetch(`http://localhost:5000/childs/male?limit=${this.limit}&offset=${this.offset}`)
        .then((response) => response.json())
        .then((json) => {
          this.childList = json

          if (json.message) {
            this.isNextEnabled = false
            return
          }
          else {
            this.isNextEnabled = true
          }

          if (this.childList.image) {
            this.childList.image = `data:image/jpeg;base64,${json.image}`
          }
          else {
            this.childList.image = require("@/assets/images/noPic.png")
          }
        })
    },
    fetchFemale() {
      fetch(`http://localhost:5000/childs/female?limit=${this.limit}&offset=${this.offset}`)
        .then((response) => response.json())
        .then((json) => {
          this.childList = json

          if (json.message) {
            this.isNextEnabled = false
            return
          }
          else {
            this.isNextEnabled = true
          }

          if (this.childList.image) {
            this.childList.image = `data:image/jpeg;base64,${json.image}`
          }
          else {
            this.childList.image = require("@/assets/images/noPic.png")
          }
        })
    },
    prevData() {
      const offset = this.offset -= this.limit

      // disable negative offset
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
    async child_delete(id: string) {
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

              const childId = id

              fetch('http://localhost:5000/child/del/' + childId, {
                method: 'PUT'
              })
                .then((data) => {
                  toast.message = 'Success!'
                  this.$emit('deleted')
                })
                .catch((error) => {
                  toast.message = error
                });

              await toast.present();
              this.fetchData()
            },
          },
        ],
      });

      await alert.present();
    },
    filterChild() {
      if (this.childFilter == 'all') {
        this.childList = { "image": "" },
          this.fetchData()
      }
      else if (this.childFilter == 'm') {
        this.childList = { "image": "" },
          this.fetchMale()
      }
      else if (this.childFilter == 'f') {
        this.childList = { "image": "" },
          this.fetchFemale()
      }
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

.icon {
  width: 60px;
  height: 60px;
}

img[src=""] {
  content: url('~@/assets/images/noPic.png');
}

@media only screen and (max-width: 768px) {
  span {
    display: none;
  }

  .hide-on-mobile {
    display: none;
  }
}
</style>
