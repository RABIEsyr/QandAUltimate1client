<template>
  <transition name="fade">
   <!-- <section style="z-index: 1000; position: absolute; width: 100%; height: 100%;" > -->
        <v-parallax dark :src="require('@/assets/images/e.jpg')" style="height: 100%" height="100%">
          <v-layout column align-center justify-center class="white--text">
           
           <input type="text" v-model="pass">
            <div>
              <v-btn :disabled="!isAdmin" class=" lighten-2 mt-5" dark large @click="adminPage()" style="background-color: #3d15b0;">
              اضافة
            </v-btn>
            <v-btn class=" lighten-2 mt-5" dark large @click="participent()" style="margin-left: 20px; background-color: #1c0452;">
              بدأ
            </v-btn>
            </div>
          </v-layout>
        </v-parallax>
      <!-- </section> -->
    </transition>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    return {
      pass: null
    }
  },
  computed: {
    ...mapGetters({
      getIsAdmin: 'getIsAdmin'
    }),
    isAdmin() {
      return this.pass == '1111' || this.getIsAdmin;
    }
  },
  methods: {
    ...mapMutations({
      setAdmin: 'setAdmin'
    }),
    adminPage() {
      this.setAdmin(true);
      console.log('storexxxxxx', this.getIsAdmin)
      this.$router.push('/admin');
    },
    participent() {
      // this.$router.push('/new-quiz');
      this.$router.push('/quiz-category-carousel');
    }
  },
  destroyed() {

  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
  max-height: 100%;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  max-height: 0px;
  scale: 0;
}
</style>