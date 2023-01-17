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
      <ion-card class="ion-margin-bottom">
        <ion-item>
          <ion-card-header>
            <ion-card-title></ion-card-title>
            <ion-card-subtitle></ion-card-subtitle>
          </ion-card-header>
        </ion-item>
      </ion-card>
      <!-- </template> -->

    </ion-content>

    <PageButtons :prev="prevData" :next="nextData" />

    <!-- Add child button -->
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
          <ion-input type="text" maxLength="96"></ion-input>
          <ion-note slot="error">Invalid email</ion-note>
        </ion-item>

        <ion-item :counter="512">
          <ion-textarea placeholder="Type in announcement details" :autoGrow="true" maxLength="512">
          </ion-textarea>
        </ion-item>
      </ion-content>
    </ion-modal>
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
  IonCardTitle,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonInput,
  IonTextarea,
  IonNote,
  alertController,
  toastController,
  useIonRouter
} from '@ionic/vue';
import HeaderBar from '@/components/HeaderBar.vue';
// icons
import {
  addOutline, createOutline, trashOutline
} from 'ionicons/icons';
import PageButtons from '@/components/PageButtons.vue';

export default defineComponent({
  name: 'AnnouncementPage',
  components: {
    HeaderBar,
    PageButtons,
    IonSearchbar,
    IonFab,
    IonFabButton,
    IonIcon,
    IonCard,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonInput,
    IonTextarea,
    IonNote
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
      limit: 20,
      offset: 0,
      isNextEnabled: true
    };
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
    cancel() {
      (this.$refs.postAnnouncementModal as any).$el.dismiss(null, 'cancel');
    },
    postAnnouncement() {
      console.log('tae');
    },
    clearInputs() {
      console.log('clear inputs')
    },
    fetchData() {
      // fetch(`http://localhost:5000/`)
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