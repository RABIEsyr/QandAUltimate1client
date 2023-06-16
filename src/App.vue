<template>
  <v-app>
    <v-btn  color="primary" class="mt-4" to="/" v-if="$route.path != '/home'">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <router-view></router-view>
</v-app>
</template>

<script>


// import { mapActions } from 'vuex';
export default {
  name: 'app',
  data() {
    return {
      
    }
  },
   components: {
  
   },
  computed: {
    
  },
  methods: {
        // ...mapActions({
        //   getAllQuestions: 'getAllQuestions'
        // })
      },
      
      created() {
        // this.getAllQuestions()
  },
 
}
</script>

<style >
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    /* margin-top: 1px; */
  }
</style>
