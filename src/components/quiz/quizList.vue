<template>
    <div>
      <div style="text-align:center;">
        <h1 style="color: #1976d2;">{{ categoryName }}</h1>
      </div>
      
      <v-row  v-if="isLoading" style="margin: 10%;">
       <v-col cols="12" class="d-flex justify-center">
        <vue-ellipse-progress :progress="0" :loading="true" />
       </v-col>
      </v-row>
      <v-stepper v-model="e1" v-if="isThere && !isEnded"  >
        <v-stepper-header>
          <v-stepper-step v-for="(step, index) in getQuestionsQuiz" :key="index" :step="index + 1">
            السؤال
          </v-stepper-step>
        </v-stepper-header>
  
        <v-stepper-items >
          <v-stepper-content v-for="(q, index) in getQuestionsQuiz" :key="index" :step="(index +1).toString()">
            <quiz-question :question="q.question" :id="q._id" :answers="[q.aA, q.aB, q.aC, q.aD]" @value-changed="handleValueChanged"></quiz-question>
            <v-col cols="12" class="d-flex justify-center">
              <v-btn color="primary" @click="nextQ(e1)" :disabled="!answerArrForEnabled.includes(q._id)">
                {{ e1 == myArr.length ? 'النتيجة':'التالي' }}
              </v-btn>
            </v-col>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <div v-if="isEnded">
        <quizResultVue :correct="cor" :incorrect.sync="incor" />
      </div>
    </div>
  </template>
  
  <script>
  import quizQuestion from './quizQuestion.vue';
  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import quizResultVue from './quizResult.vue';
  
  export default {
    data() {
      return {
        isThere: false,
        myArr: [],
        e1: 1,
        currentStep: 0,
        qId: null,
        qA: null,
        isEnded: false,
        cor: 0,
        incor: 0,

        answerArrForEnabled: [],

        isLoading: false,

        answersLocally: [],
        qestionLocally: null
      };
    },
    computed: {
      ...mapGetters({
        'getQuestionsQuiz': 'getQuestionsQuiz',
        getPartecepentAnswers: 'getPartecepentAnswers',
      }),
      isNextButtonDisabledComputed() {
        return this.isNextButtonDisabled(this.e1 - 1);
      },
      categoryId() {
      return this.$route.params.id;
    },
    categoryName() {
      return this.$route.query.name;
    }
    },
    components: {
      'quiz-question': quizQuestion,
      quizResultVue,
    },
    methods: {
      ...mapActions({
        getAllQuestions: 'getAllQuestions',
        actGetQizResult: 'actGetQizResult',
        
      }),
      ...mapMutations({
        setPartecepentAnswers: 'setPartecepentAnswers',
        setResetQuiz: 'setResetQuiz',
        setParticipantAnswersLocally: 'setParticipantAnswersLocally'
      }),
      handleValueChanged(value) {
        // console.log('changed', value.yAnswer)
        console.log('changed', value)
        this.qId = value.id;
        this.qA = value.yAnswer;

        this.qestionLocally = value.question,
        this.answersLocally = value.answers
        this.answerArrForEnabled.push(value.id)
      },
      nextQ(qStep) {
        this.e1 = this.e1 + 1;
        this.setPartecepentAnswers({ id: this.qId, answer: this.qA });
        this.setParticipantAnswersLocally({
          id: this.qId,
          participantanswer: this.qA,
          question: this.qestionLocally,
          answers: this.answersLocally 
        })
        console.log('hhhhhhh', this.getPartecepentAnswers);
        console.log('this.e1', this.e1, 'arr', this.myArr.length);
  
        if (qStep == this.myArr.length) {
          this.isEnded = true;
          this.actGetQizResult().then(quizRresult => {
            console.log('coooooo', quizRresult);
            this.cor = quizRresult.correct;
            this.incor = quizRresult.incorrect;
          });
        }
      },
      isNextButtonDisabled(index) {
        console.log('innn', index);
        const currentQuestion = this.getQuestionsQuiz[index];
        const participantAnswer = this.getPartecepentAnswers.find(answer => answer.id === currentQuestion._id);
        const isDisabled = !participantAnswer;
        console.log('isNextButtonDisabled called with index:', index, 'and returned:', isDisabled);
        return isDisabled;
      },
    },
    async mounted() {

      this.isLoading = true;
      var reslt = await this.getAllQuestions({categoryId: this.categoryId});
      this.isLoading = false;
      if (reslt.data.questions.length > 0) {
        this.isThere = true;
        this.myArr = reslt.data.questions;
        console.log('the result xx', this.myArr);
      } else {
        this.$alert('', 'لا يوجد نتائج', 'error');
      }
    },
    destroyed() {
      this.cor = 0;
      this.incor = 0;
      this.setResetQuiz();
    },
  };
  </script>
  <style>
  /* .v-stepper_header {
    overflow: auto !important;
    display: flex !important;
    flex-wrap:no-wrap !important;
    justify-content: left !important;
    
} */

/* .v-stepper__content {
    top: 0 !important;
    padding: 24px 24px 16px !important;
    flex: 1 0 auto !important;
    width: 100% !important;
    z-index: 10 !important;
    background-color: #8133D9 !important;
    
} */

.v-stepper__header {
    height: auto !important;
    align-items: stretch !important;
    display: flex !important;
    flex-wrap: inherit;
    justify-content: space-between !important;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    overflow-x: scroll !important;
}
</style>