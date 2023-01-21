<template>
  <ion-page>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>

          <!-- image -->
          <img src="@/assets/images/logo.png" alt="Barangay Old Cabalan Logo"
            style="width: 55%; height: auto; margin-left: auto; margin-right: auto; display: block;">

          <ion-list id="inbox-list">
            <ion-list-header>Barangay Old Cabalan</ion-list-header>
            <!-- <ion-note>bofcp@gmail.com</ion-note> -->
            <ion-note>Hello {{ user_fname }}!</ion-note>

            <ion-menu-toggle auto-hide="false" v-for="(pages, i) in appPages" :key="i">
              <router-link :to="pages.url" activeClass="selected">
                <ion-item
                  lines="none" detail="false" class="hydrated"
                  :class="{'selected': $route.name === pages.url}"
                >
                  <ion-icon slot="start" :ios="pages.iosIcon" :md="pages.mdIcon"></ion-icon>
                  <ion-label>{{ pages.title }}</ion-label>
                </ion-item>
              </router-link>

            </ion-menu-toggle>
          </ion-list>

        </ion-content>
        <ion-button color="danger" @click="logout()" router-link="/login"><ion-icon :icon="logOutOutline"></ion-icon>Logout</ion-button>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-page>
</template>

<script lang="ts">
// ionic stuff
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
  onIonViewDidEnter,
} from '@ionic/vue';
// icons
import {
  logOutOutline,
  eyeOutline
} from 'ionicons/icons';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { personOutline, personSharp } from 'ionicons/icons';
import router from '@/router';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonRouterOutlet,
    IonSplitPane,
    IonIcon
  },
  ionViewWillEnter() {
    this.user_fname = localStorage.getItem('fname') || ''
    this.admin_power = localStorage.getItem('admin_power') || ''

    if(this.admin_power && this.admin_power === '1') {
      this.appPages = [
        {
          title: 'Dashboard',
          url: '/dashboard',
          iosIcon: personOutline,
          mdIcon: personSharp
        },
        {
          title: 'Announcement',
          url: '/announcement',
          iosIcon: personOutline,
          mdIcon: personSharp
        },
        {
          title: 'Children',
          url: '/child',
          iosIcon: personOutline,
          mdIcon: personSharp
        },
        {
          title: 'Guardian',
          url: '/guardian',
          iosIcon: personOutline,
          mdIcon: personSharp
        },
        {
          title: 'Accounts',
          url: '/user',
          iosIcon: personOutline,
          mdIcon: personSharp
        }
      ]    
    }
    else {
      this.appPages = [
        {
          title: 'Dashboard',
          url: '/dashboard',
          iosIcon: personOutline,
          mdIcon: personSharp
        },
        {
          title: 'Announcement',
          url: '/announcement',
          iosIcon: personOutline,
          mdIcon: personSharp
        },
        {
          title: 'Child',
          url: '/child',
          iosIcon: personOutline,
          mdIcon: personSharp
        },
        {
          title: 'Guardian',
          url: '/guardian',
          iosIcon: personOutline,
          mdIcon: personSharp
        }
      ]
    }
  },
  setup() {
    // sidebar pages

    const route = useRoute();

    return {
      personOutline,
      personSharp,
      logOutOutline,
      eyeOutline,
      isSelected: (url: string) => url === route.path ? 'selected' : ''
    }
  },
  data() {
    return {
      appPages: [{
        title: 'Dashboard',
        url: '/dashboard',
        iosIcon: personOutline,
        mdIcon: personSharp
      },
      {
        title: 'Child',
        url: '/child',
        iosIcon: personOutline,
        mdIcon: personSharp
      },
      {
        title: 'Guardian',
        url: '/guardian',
        iosIcon: personOutline,
        mdIcon: personSharp
      }],
      user_fname: '',
      admin_power: ''
    }
  },
  methods:{
    logout(){
      localStorage.removeItem('user_id')
      localStorage.removeItem('fname')
      localStorage.removeItem('admin_power')
    }
  }
});
</script>

<style scoped>
a {
  text-decoration: none;
}

ion-menu {
  --background: #168554;
  --color: white;
}

ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #168554));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
  background: #168554;
  --color: white;
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;
  color: white;
  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
  background: transparent;
}

ion-menu.md a.selected ion-item {
  --background: white;
}

ion-menu.md a.selected ion-item ion-icon {
  color: #168554; 
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md a.selected ion-item ion-label {
  color: #168554;
  font-weight: bold;
  text-decoration: underline;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
  color: #616e7e;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: white;
}

ion-item{
  padding-bottom: 10px;
}
</style>