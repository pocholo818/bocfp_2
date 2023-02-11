<template>
  <ion-page>
    <ion-header>
      <ion-toolbar style="">
        <ion-buttons slot="start">
          <ion-back-button text="Back"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- content -->
    <ion-content>
      <ion-content class="ion-padding">
        <ion-card>
          <ion-card-content>
            <ion-card-header>
              <ion-card-title>Add New Child</ion-card-title>
            </ion-card-header>

            <ion-list>
              <ion-item>
                <ion-label position="floating">First Name:</ion-label>
                <ion-input placeholder="Enter First Name" v-model="childDetails.fname"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Last Name:</ion-label>
                <ion-input placeholder="Enter Last Name" v-model="childDetails.lname"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label>Sex:</ion-label>

                <ion-select placeholder="Male/Female" v-model="childDetails.sex">
                  <ion-select-option value="M">Male</ion-select-option>
                  <ion-select-option value="F">Female</ion-select-option>
                </ion-select>
              </ion-item>

              <ion-item>
                <ion-label>Birth Date:</ion-label>
                <!-- <ion-datetime-button datetime="dateOfBirth"></ion-datetime-button> -->

                <input type="date" v-model="childDetails.bdate" style="color: white;" max="2099-12-31" />

                <!-- <ion-modal :keep-contents-mounted="true" class="datetime-modal">
                  <ion-datetime id="dateOfBirth" displayFormat="YYYY.MM.DD" class="dateStyle" presentation="date"
                    v-model="childDetails.bdate"></ion-datetime>
                </ion-modal> -->
              </ion-item>

              <ion-item>
                <ion-button @click="selectPic()">Upload image</ion-button>
              </ion-item>

            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Save -->
        <ion-button expand="block" @click="child_add()">Save</ion-button><br><br><br>
      </ion-content>

    </ion-content>
  </ion-page>

</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
// icons
import {
  eyeOutline,
  createOutline,
  trashOutline
} from 'ionicons/icons';
// ionic stuff
import {
  IonInput,
  IonList,
  IonCard,
  IonCardContent,
  IonBackButton,
  IonButtons, IonHeader, IonToolbar,
  IonDatetime, IonDatetimeButton, IonModal,
  IonItem, IonSelect, IonSelectOption, toastController,
  useIonRouter,
  IonCardHeader,
  IonCardTitle,
  modalController

} from '@ionic/vue';
import CropModal from '@/components/CropModal.vue'
import { FilePicker } from '@capawesome/capacitor-file-picker';
// import HeaderBar from '@/components/HeaderBar.vue';
// import {
//   IonContent,
//   IonPage,
// } from '@ionic/vue';

export default defineComponent({
  name: 'ChildPage2',
  components: {
    // HeaderBar,
    IonInput,
    IonList,
    IonCard,
    IonCardContent,
    IonBackButton,
    IonButtons, IonHeader, IonToolbar,
    // IonDatetime, IonDatetimeButton, IonModal,
    IonItem, IonSelect, IonSelectOption,
    IonCardHeader,
    IonCardTitle
  },
  data() {
    return {
      childDetails: {
        fname: "",
        lname: "",
        sex: "",
        bdate: "",
        image: ""
      },
    }
  },
  setup() {
    const router = useIonRouter();
    return {
      eyeOutline,
      createOutline,
      trashOutline,
      router
    }
  },
  methods: {
    async child_add() {
      const toast = await toastController.create({
        duration: 1500,
        position: 'top'
      })

      const currentDate = new Date()

      const bdate = new Date(this.childDetails.bdate)
      const dateDifference = currentDate.getFullYear() - bdate.getFullYear()
      const data = this.childDetails;

      // checks if empty child details
      if (this.childDetails.fname && this.childDetails.lname && this.childDetails.sex && this.childDetails.bdate) {
        // checks child bdate
        if (bdate.toISOString().split("T")[0] == currentDate.toISOString().split("T")[0] || dateDifference <= 0) {
          toast.message = "Invalid Child Birthdate"
        }
        else {
          // rejects if greater than 12 yrs old
          if (dateDifference > 12) {
            toast.message = 'Child is too old!'
            await toast.present();
            return
          }
          else {
            toast.message = "Success!"
            fetch('http://localhost:5000/child', {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
              .then((data) => {
                toast.message = 'Success!'
                this.childDetails = {
                  fname: "",
                  lname: "",
                  sex: "",
                  bdate: "",
                  image: "",
                }
                this.router.push("/child");
              })
              .catch((error) => {
                toast.message = error
              });
          }

        }
      } else {
        toast.message = "Child's details are incomplete"
      }


      // if(dateDifference > 12) { // no child greater than 12 years old 
      //   toast.message = 'too old!'
      //   await toast.present();
      //   return
      // }

      // const data = this.childDetails;
      // fetch('http://localhost:5000/child', {
      //   method: 'POST', // or 'PUT'
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then((data) => {
      //     toast.message = 'Success!'
      //     this.childDetails = {
      //       fname: "",
      //       lname: "",
      //       bdate: "",
      //       image: ""
      //     }
      //     this.router.push("/child");
      //   })
      //   .catch((error) => {
      //     toast.message = error
      //   });

      await toast.present();
    },
    async image() {
      const result = await FilePicker.pickFiles({
        types: ['image/png', 'image/jpeg'],
        readData: true
      });
      const file = result.files[0]
      console.log(file)
      this.childDetails.image = `data:image/jpeg;base64,${file.data}`
    },

    async selectPic() {
      const result = await FilePicker.pickFiles({
        types: ['image/png', 'image/jpeg'],
        readData: true
      });
      const file = result.files[0]

      if (file.size > 3000000) { // 3mb 
        const toast = await toastController.create({
          duration: 3000,
          position: 'top',
          cssClass: 'error',
          message: 'Please upload image less than 3mb'
        });
        await toast.present();
      }
      else
        this.openCropModal(file.data as string)
    },
    async openCropModal(img: string) {
      const modal = await modalController.create({
        component: CropModal,
        componentProps: { img: `data:image/jpeg;base64,${img}` }
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
        this.childDetails.image = data
      }
    }
  }
}
);



</script>
  

<style scoped>
ion-toolbar {
  --background: #168554;
  --color: white;
}
</style>