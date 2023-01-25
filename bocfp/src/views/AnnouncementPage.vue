<template>
  <ion-page>
    <HeaderBar title="Announcement" />

    <ion-content class="ion-padding">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-searchbar @input="searchData($event.target.value)" v-model="search"></ion-searchbar>

      <template>
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle style="text-align: center;"></ion-card-subtitle>
          </ion-card-header>
        </ion-card>
      </template>

      <!-- <template> -->
      <ion-list>
        <template v-if="annou.message">
          <ion-card>
            <ion-card-header>
              <ion-card-subtitle style="text-align: center;">{{ annou.message }}</ion-card-subtitle>
            </ion-card-header>
          </ion-card>
        </template>

        <template v-else>
          <TransitionGroup name="fade">
            <AnnouncementCard v-for="annous in annou" :title="annous.title" :content="annous.content"
              :date="format_date(annous.date)" :user_id="user_id" :annou_id="annous.annou_id" :key="annous.annou_id"
              @update-announcement-list="fetchData()" />
          </TransitionGroup>
        </template>


        <!--  -->
      </ion-list>

      <!-- <ion-button @click="fetchData()">refresh</ion-button> -->

    </ion-content>

    <PageButtons :prev="prevData" :next="nextData" />

    <!-- Add announcement button// only shows if user has admin_power -->
    <template v-if='user_id === "1"'>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="openModal">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </template>

  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonSearchbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardSubtitle,
  IonCardHeader,
  IonList,
  // IonListHeader,
  IonLabel,
  modalController,
  useIonRouter
} from '@ionic/vue';
import HeaderBar from '@/components/HeaderBar.vue';
import AnnouncementCard from '@/components/announcement/AnnouncementCard.vue'
import PostEditAnnouncementModal from '@/components/announcement/PostEditAnnouncementModal.vue'
import moment from 'moment'
// icons
import {
  addOutline, createOutline, trashOutline
} from 'ionicons/icons';
import PageButtons from '@/components/PageButtons.vue';

export default defineComponent({
  name: 'AnnouncementPage',
  components: {
    HeaderBar,
    AnnouncementCard,
    PageButtons,
    IonSearchbar,
    IonFab,
    IonFabButton,
    IonIcon,
    IonCard,
    IonCardSubtitle,
    IonCardHeader,
    IonList,
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
    const user_id = localStorage.getItem('user_id')

    return {
      search: "",
      limit: 3,
      offset: 0,
      isNextEnabled: true,
      annou: "",
      newAnnou: {
        title: "",
        content: "",
        user_id: user_id,
      },
      user_id: '',
    };
  },
  mounted() {
    this.fetchData()
  },
  ionViewWillEnter() {
    this.user_id = localStorage.getItem('user_id') || ''
  },
  methods: {
    searchData(search: string) {
      search = search.trim()
      if (search.length) {
        setTimeout(() => {
          // fetch('http://localhost:5000/child/search/' + search)
          //   .then((response) => response.json())
          //   .then((json) => {

          //   })
        }, 1000)
      }
      else {
        this.fetchData()
      }
    },
    async openModal() {
      const modal = await modalController.create({
        component: PostEditAnnouncementModal,
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
        this.fetchData()
      }
    },
    fetchData() {
      fetch(`http://localhost:5000/announcements?limit=${this.limit}&offset=${this.offset}`)
        .then((response) => response.json())
        .then((json) => {
          this.annou = json

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
    format_date(value: string) {
      if (value) {
        return moment(String(value)).format('MMM DD, YYYY hh:mm A')
      }
    },
    handleRefresh(event: any) {
      setTimeout(() => {
        // Any calls to load data go here
        this.fetchData()

        event.target.complete();
      }, 1000);
    }
  }
})
</script>

<style scoped>
.hide-on-mobile {
  display: none;
}
</style>