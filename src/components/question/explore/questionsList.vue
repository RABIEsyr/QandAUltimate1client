<template>
  <!-- <div>
    <div v-for="q in this.myArr" :key="q._id">
      
      <question-form :question="q.question" :answers="[q.aA, q.aB, q.aC, q.aD]" :correct-answer="q.correct" :id="q._id"></question-form>
    </div>
  </div> -->

  <div>
    <div style="width: 100%;">
      <v-row class="center-container" >
    <v-menu offset-y transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
        style="    width: 100%; margin-top: 15px; margin-bottom: 20px"
        v-bind="attrs" v-on="on" class="custom-button">{{ selectedOption.name }}</v-btn>
      </template>
      <v-list class="custom-list">
        <v-list-item v-for="categ in getCategories" :key="categ._id" @click="selectOption(categ)">
          <v-list-item-title>{{ categ.name }}</v-list-item-title>
        </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
    </div>

   <div v-for="q in this.myArr" :key="q._id">
    <v-expansion-panels style="margin-bottom: 40px;">
        <v-expansion-panel>
            <v-expansion-panel-header color="#543152">
                <span style="color: white; margin-left: 45%;">{{ q.question }}</span>
                <template v-slot:actions>
            <v-icon color="white">
              $expand
            </v-icon>
          </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content style="z-index: 10">
              <question-form :question="q.question" :answers="[q.aA, q.aB, q.aC, q.aD]" :correct-answer="q.correct" :id="q._id"></question-form>

            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
   </div>
  </div>

</template>

<script>
import QuestionForm from './question.vue'
import { mapActions, mapGetters } from 'vuex';
import store from '@/store/store'
export default {
  components: {
    QuestionForm
  },
  data() {
    return {
      question: 'What is the capital of France?',
      answers: [
        { text: 'Paris' },
        { text: 'Madrid' },
        { text: 'Berlin' },
        { text: 'London' },
      ],
      correctAnswer: 'A',
      myArr: [],
      selectedOption: {name: 'اختر فئة'},
    }
    },
    computed: {
    ...mapGetters({
        getCategories: 'getCategories'
    })
},
    methods: {
      ...mapActions({
        getAllQuestions: 'actGetAllQuestionsWithNoQuiz',
        actFetchCategories: 'actFetchCategories'
      }),
   async   selectOption(option) {
    this.myArr = []
      console.log(option)
      var reslt = await this.getAllQuestions({categId: option._id});
      
      if (reslt.data.questions.length > 0) {
      this.myArr = reslt.data.questions
      // console.log('the result', this.myArr)
      } else {
        this.$alert("", 'لا يوجد نتائج', 'error', );
      }
      this.selectedOption = option;
    },
    },
     async created() {
     await this.actFetchCategories()
      // var reslt = await this.getAllQuestions({categId: ''});
      
      // if (reslt.data.questions.length > 0) {
      // this.myArr = reslt.data.questions
      // console.log('the result', this.myArr)
      // } else {
      //   this.$alert("", 'لا يوجد نتائج', 'error', );
      // }
    },
    beforeRouteEnter(to, from, next) {
        console.log(to, from)
    console.log('getIsAdmin', )
    if (store.state.isAdmin) {
     next() 
    } else {
        next('/')
    }
  },
}
</script>