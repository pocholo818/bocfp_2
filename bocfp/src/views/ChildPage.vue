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
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div style="max-width: 800px; margin: auto;">

        <ion-searchbar v-model="search"></ion-searchbar>

        <!-- search filter -->
        <ion-item>
          <ion-select @ionChange="searchData" v-model="childFilter" placeholder="Select Filter">
            <ion-select-option value="all">All</ion-select-option>
            <ion-select-option value="male">Male</ion-select-option>
            <ion-select-option value="female">Female</ion-select-option>
            <ion-select-option value="age">Age</ion-select-option>
            <ion-select-option value="deleted">Deleted</ion-select-option>
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
          <TransitionGroup name="fade">
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
                    <div v-if="child.age">
                      <ion-card-subtitle>Age: {{ child.age }}</ion-card-subtitle>
                    </div>
                  </ion-card-header>

                  <div slot="end" style="z-index: 999">
                    <ion-button color="warning" @click.prevent="() => $router.push('/child_edit/' + child.id)">
                      <ion-icon :icon="createOutline"></ion-icon><span class="hide-on-mobile">&nbsp; Edit</span>
                    </ion-button>
                    <ion-button v-if="child.soft_delete === 0" color="danger" @click.prevent="child_delete(child.id)">
                      <ion-icon :icon="trashOutline"></ion-icon><span class="hide-on-mobile">&nbsp;Delete</span>
                    </ion-button>
                    <ion-button v-else color="success" @click.prevent="child_undo(child.id)"><ion-icon :icon="arrowUndoOutline">
                      </ion-icon>&nbsp;
                      Retrieve</ion-button>
                  </div>

                </ion-item>
              </ion-card-content>
            </ion-card>
          </TransitionGroup>
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
  // IonRefresher, IonRefresherContent
} from '@ionic/vue';
// icons
import {
  addOutline, 
  createOutline, 
  trashOutline, 
  arrowUndoOutline
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
    // IonRefresher, IonRefresherContent
  },
  setup() {
    const ionRouter = useIonRouter()

    return {
      ionRouter,
      createOutline,
      trashOutline,
      addOutline,
      arrowUndoOutline
    }
  },
  data() {
    return {
      isOpen: false,
      childList: { "image": "" },
      search: "",
      limit: 10,
      offset: 0,
      isNextEnabled: true,
      childFilter: "all",
      searchTimeout: 0
    };
  },
  methods: {
    searchData() {
      let search = this.search.trim()

      this.limit = 10
      this.offset = 0

      if (search.length) {
        clearTimeout(this.searchTimeout)
        this.searchTimeout = setTimeout(() => {
          fetch(`http://localhost:5000/childs/?limit=${this.limit}&offset=${this.offset}&filter=${this.childFilter}&search=${search}`)
            .then((response) => response.json())
            .then((json) => {
              this.childList = { "image": "" },
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
        }, 500)
      }
      // if empty search
      else {
        this.fetchData()
      }
    },
    setOpen(isOpen: boolean) {
      this.isOpen = isOpen;
    },
    fetchData() {
      fetch(`http://localhost:5000/childs?limit=${this.limit}&offset=${this.offset}&filter=${this.childFilter}&search=${this.search}`)
        .then((response) => response.json())
        .then((json) => {
          this.childList = { "image": "" },
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
    async child_undo(id: string) {
      const alert = await alertController.create({
        header: 'Are you sure you want to retrieve?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'RETRIEVE',
            role: 'confirm',
            handler: async () => {
              const toast = await toastController.create({
                duration: 1500,
                position: 'top'
              })

              const childId = id

              fetch('http://localhost:5000/child/ret/' + childId, {
                method: 'PUT'
              })
                .then((data) => {
                  toast.message = 'Success!'
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
    handleRefresh(event: any) {
      setTimeout(() => {
        // Any calls to load data go here
        this.fetchData()

        event.target.complete();
      }, 1000);
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
