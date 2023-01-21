<template>
  <ion-page>
    <HeaderBar title="Announcement" />

    <ion-content class="ion-padding">

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
          <!-- <ion-list-header>
            <ion-label>Today</ion-label>
          </ion-list-header> -->

          <AnnouncementCard title="title" content="
            contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
            contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
            contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
            contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
            contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
            contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
            " date="01-17-23" />

          <!-- <ion-list-header>
            <ion-label>IDK DATE</ion-label>
          </ion-list-header> -->
        </ion-list>
      <!-- </template> -->

    </ion-content>

    <PageButtons :prev="prevData" :next="nextData" />

    <!-- Add announcement button// only shows if user has admin_power -->
    <template v-if='user_id == "1"'>
      <ion-fab
        id="open-post-announcement-modal" 
        slot="fixed" vertical="bottom" horizontal="end"
      >
        <ion-fab-button>
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>

    <!-- post announcement modal -->
    <ion-modal ref="postAnnouncementModal" trigger="open-post-announcement-modal" @didDismiss="clearInputs()">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>

          <ion-title>Post Announcement</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" color="primary" @click="postAnnouncement()">Post</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <ion-item :counter="96">
          <ion-label position="floating">Enter title</ion-label>
          <ion-input type="text" maxLength="96" v-model="newAnnou.title"></ion-input>
        </ion-item>

        <ion-item :counter="512">
          <ion-textarea v-model="newAnnou.content" placeholder="Type in announcement content" :autoGrow="true" maxLength="512">
          </ion-textarea>
        </ion-item>

        <div style="display: flex; justify-content: end;">
          <ion-button @click="addAnnou">Post</ion-button>
        </div>

      </ion-content>
    </ion-modal>
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
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonInput,
  IonTextarea,
  IonList,
  // IonListHeader,
  IonLabel,
  alertController,
  toastController,
  useIonRouter
} from '@ionic/vue';
import HeaderBar from '@/components/HeaderBar.vue';
import AnnouncementCard from '@/components/AnnouncementCard.vue'
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
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonInput,
    IonTextarea,
    IonList,
    // IonListHeader,
    IonLabel
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
      search: "",
      limit: 1,
      offset: 0,
      isNextEnabled: true,
      annou: "",
      newAnnou: {
        title: "",
        content: ""
      },
      user_id: ''
    };
  },
  mounted(){
    // test data
    // console.log("id: ",localStorage.getItem('admin_power'))
    // console.log("id: ",localStorage.getItem('user_id'))
  },
  ionViewWillEnter(){
    this.user_id = localStorage.getItem('user_id') || ''
  },
  methods: {
    async addAnnou() {  
      const toast = await toastController.create({
        duration: 1500,
        position: 'top'
      })
      
      const data = this.newAnnou;

      // checks if empty post details
      if (this.newAnnou.title && this.newAnnou.content) {
          // console.log(this.newAnnou)
          this.clearInputs()
          toast.message = "Announcement Posted!"
          this.cancel()
        }
      else {
        toast.message = "Announcement content are incomplete"
      }

      await toast.present();
    },
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
    cancel() {
      (this.$refs.postAnnouncementModal as any).$el.dismiss(null, 'cancel');
    },
    postAnnouncement() {
      console.log('tae');
    },
    clearInputs() {
      this.newAnnou = {"title": "", "content": ""}
    },
    fetchData() {
      // fetch(`http://localhost:5000/announcement`)
      //   .then((response) => response.json())
      //   .then((json) => {

      //   })
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
  }
})
</script>

<style scoped>

</style>