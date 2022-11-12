<template>
  <ion-page>
    <HeaderBar title="Child" />

    <!-- content -->
    <ion-content class="ion-padding">
      <table>
        <th>ID</th>
      </table>
    </ion-content>
  </ion-page>

</template>


<script lang="ts">
  // import {
  //   IonContent,
  //   IonPage,
  // } from '@ionic/vue';
  import { defineComponent } from 'vue';

  import HeaderBar from '@/components/HeaderBar.vue';

  export default defineComponent({
    name: 'ChildPage',
    components: {
      HeaderBar
    }
  });
</script>
