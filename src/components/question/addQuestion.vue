<template>
  
   <v-container px="4">
    <v-form @submit.prevent="submitForm">
      <v-container>
        <v-select v-model="selectedCategoryId" :items="categoriesList"
         label="حدد الفئة" item-text="name" item-value="_id" full-width>
        </v-select>
  </v-container>
      <v-text-field v-model="question" label="Question" required outlined shaped
      :class="['thrr']"></v-text-field>
      <v-row>
        <v-col cols="6" v-for="(answer, index) in answers" :key="index">
          <v-text-field class="thrr" v-model="answer.text" :label="'Answer ' + letters[index]" required outlined rounded></v-text-field>
          <v-radio-group v-model="correctAnswer"  :rules="rules" row>
            <v-radio :label="letters[index]" :value="letters[index]"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn type="submit" color="primary" :elevated="true" :rounded="true" class="submit-btn">اضافة</v-btn>

        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';
import store from '@/store/store'

export default {
  data() {
    return {
      question: '',
      answers: [
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' }
      ],
      correctAnswer: null,
      // mandatory: true,
      rules: [
        (v) => !!v || 'Please select a correct answer'
      ],
      letters: ['A', 'B', 'C', 'D'],

      selectedCategoryId: null
    }
  },
  computed: {
    ...mapGetters({
      categoriesList: 'getCategories'
    })
  },
  created() {
    this.actFetchCategories();
    console.log('selectedCategoryId', this.selectedCategoryId)
  },
  updated() {
    console.log('selectedCategoryId0: ', this.selectedCategoryId)
  },
  methods: {
    ...mapActions({
      'addQuestion': 'addNewQuestion',
      actFetchCategories: 'actFetchCategories'
    }),
   async submitForm() {
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i].text == '') {
          this.$alert("", `(${this.letters[i]}) ادخل حقل الجواب`, 'error', );
         return;
        }
      }
      if (this.correctAnswer == null) {
        this.$alert("", 'يرجى اختيار الجواب الصحيح', 'error', );
        return;
      }
      if (this.question == '') {
        this.$alert("", 'يرجى ادخال حقل السؤال', 'error', );
        return;
      }
     const result = await this.addQuestion({
        question: this.question,
        aA: this.answers[0],
        aB: this.answers[1],
        aC: this.answers[2],
        aD: this.answers[3],
        correct: this.correctAnswer,
        categoryid: this.selectedCategoryId
      });
      if (result.data.success) {
        this.$alert("", 'تمت الاضافة بنجاح', 'success', );
      } else {
        console.log(' the error', result.data)
        this.$alert("", 'حدث خطأ يرجى مراجعة المطور', 'error', );
      }
      // Handle form submission
      console.log('Question:', this.question);
      console.log('Answers:', this.answers);
      console.log('Correct answer:', this.correctAnswer);
    }
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
<style >
.center-row {
  justify-content: center;
}
.submit-btn {
  font-weight: bold;
  font-size: 18px;
  padding: 12px 24px;
  text-transform: uppercase;
}

.thrr input{
  text-align: center !important
}
</style>