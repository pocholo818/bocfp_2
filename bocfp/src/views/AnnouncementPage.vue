<template>
  <ion-page>
    <HeaderBar title="Announcement" />

    <ion-content class="ion-padding">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-searchbar v-model="search"></ion-searchbar>

      <!-- search filter -->
      <ion-item v-if="admin_power === '1'">
        <ion-select @ionChange="searchData" v-model="annouFilter" placeholder="Select Filter">
          <ion-select-option value="all">All</ion-select-option>
          <ion-select-option value="deleted">Deleted</ion-select-option>
        </ion-select>
      </ion-item>

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
              :soft_delete="annous.soft_delete"
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
  IonLabel,
  modalController,
  useIonRouter,
  IonSelect, IonSelectOption,
  IonRefresher, IonRefresherContent,
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
    IonSelect, IonSelectOption,
    IonRefresher, IonRefresherContent,
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
      limit: 5,
      offset: 0,
      isNextEnabled: true,
      annou: "",
      newAnnou: {
        title: "",
        content: "",
        user_id: user_id,
      },
      user_id: '',
      searchTimeout: 0,
      annouFilter: "all",
      admin_power: ""
    };
  },
  mounted() {
    this.fetchData()
  },
  ionViewWillEnter() {
    this.user_id = localStorage.getItem('user_id') || ''
    this.admin_power = localStorage.getItem('admin_power') || ''
  },
  methods: {
    searchData() {
      let search = this.search.trim()

      this.limit = 5
      this.offset = 0

      if (search.length) {
        clearTimeout(this.searchTimeout)
        this.searchTimeout = setTimeout(() => {
          fetch(`http://localhost:5000/announcements?limit=${this.limit}&offset=${this.offset}&search=${this.search}&filter=${this.annouFilter}`)
            .then((response) => response.json())
            .then((json) => {
              this.annou = json
            })
        }, 500)
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
      fetch(`http://localhost:5000/announcements?limit=${this.limit}&offset=${this.offset}&search=${this.search}&filter=${this.annouFilter}`)
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
  },
  watch: {
    $route() {
      this.$nextTick(this.fetchData);
    },
    search() {
      this.searchData()
    }
  }
})
</script>

<style scoped>
.hide-on-mobile {
  display: none;
}
</style>