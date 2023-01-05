<template>
  <ion-page>
    <HeaderBar title="Child" />

    <!-- content -->
    <ion-content>

      <ion-item>
        <ion-searchbar></ion-searchbar>
      </ion-item>
      
      
            <ChildCard 
        v-for="child in childList" 
        :key="child.id" 
        :data="child"
        @deleted="fetchData"
      />

    </ion-content>

    <!-- Add child button -->
    <ion-fab slot="fixed" vertical="bottom" horizontal="end" router-link="/child_add">
      <ion-fab-button @click="setOpen(true)" class="theme">
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
  IonIcon
} from '@ionic/vue';
// icons
import {
  addOutline
} from 'ionicons/icons';
import HeaderBar from '@/components/HeaderBar.vue';
import ChildCard from '@/components/ChildCard.vue'
// import {
//   IonContent,
//   IonPage,
// } from '@ionic/vue';

export default defineComponent({
  name: 'ChildPage',
  components: {
    IonSearchbar,
    HeaderBar,
    IonFab,
    IonFabButton,
    IonIcon,
    ChildCard
  },
  setup() {
    return {
      addOutline
    }
  },
  data() {
    return {
      isOpen: false,
      childList: []
    };
  },
  methods: {
    setOpen(isOpen: boolean) {
      this.isOpen = isOpen;
    },
    fetchData() {
      fetch('http://localhost:5000/childs')
        .then((response) => response.json())
        .then((json) => {
          this.childList = json
        })
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
</style>
