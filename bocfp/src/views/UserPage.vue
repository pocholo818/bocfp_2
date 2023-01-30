<template>
  <ion-page>

    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Accounts</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- content -->
    <ion-content class="ion-padding">

      <div style="max-width: 800px; margin: auto;">

        <ion-searchbar v-model="search"></ion-searchbar>

        <template v-if="userList.message">
          <ion-card>
            <ion-card-header>
              <ion-card-subtitle style="text-align: center;">{{ userList.message }}</ion-card-subtitle>
            </ion-card-header>
          </ion-card>
        </template>

        <template v-else>
          <TransitionGroup name="fade">
            <ion-card v-for="user in userList" style="cursor: pointer" class="ion-margin-bottom" :key="user.user_id"
              :router-link="('/user/profile/' + user.user_id)">
              <ion-card-content class="ion-no-padding">
                <ion-item lines="none">

                  <ion-card-header>
                    <ion-card-title>{{ user.fname }} {{ user.lname }}</ion-card-title>
                    <!-- <ion-card-subtitle>ID: {{ user.user_id }}</ion-card-subtitle> -->
                  </ion-card-header>

                </ion-item>
              </ion-card-content>
            </ion-card>
          </TransitionGroup>
        </template>

      </div>

    </ion-content>

    <PageButtons :prev="prevData" :next="nextData" />

    <!-- Add user button -->
    <ion-fab slot="fixed" vertical="bottom" horizontal="end" router-link="/user/add">
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
  IonToolbar,
  IonHeader, IonMenuButton,
  IonButtons,
  IonTitle
} from '@ionic/vue';
// icons
import {
  addOutline
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
    IonToolbar,
    IonHeader, IonMenuButton,
    IonButtons,
    IonTitle
  },
  setup() {
    return {
      addOutline
    }
  },
  data() {
    return {
      isOpen: false,
      userList: "",
      search: "",
      limit: 20,
      offset: 0,
      isNextEnabled: true
    };
  },
  methods: {
    searchData() {
      const search = this.search.trim()

      if (search.length) {
        setTimeout(() => {
          fetch(`http://localhost:5000/users?limit=${this.limit}&offset=${this.offset}&search=${search}`)
            .then((response) => response.json())
            .then((json) => {
              this.userList = json
            })
        }, 500)
      }
      else {
        this.fetchData()
      }
    },
    setOpen(isOpen: boolean) {
      this.isOpen = isOpen;
    },
    fetchData() {
      fetch(`http://localhost:5000/users?limit=${this.limit}&offset=${this.offset}&search=${this.search}`)
        .then((response) => response.json())
        .then((json) => {
          this.userList = json

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
}
</style>
