<template>
    <v-container px="4">
      <v-form @submit.prevent="submitForm">
        <v-text-field 
        class="thrc"
        v-model="question" label="Question" required outlined shaped></v-text-field>
        <v-row>
          <v-col cols="6" v-for="(answer, index) in answers" :key="index">
            <v-text-field class="thrc" v-model="answers[index]" :label="'Answer ' + letters[index]" required outlined rounded></v-text-field>
            <v-radio-group v-model="correctAnswer" :mandatory="mandatory" :rules="rules" row :disabled="true">
              <v-radio :label="letters[index]" :value="letters[index]"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-btn 
          color="error" 
          style="margin: auto;"
          @click="deleteQuestion(id)">
            حذف
          </v-btn>
        </v-row>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import store from '@/store/store'
import { mapActions } from 'vuex'
  export default {
    props: {
      question: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true,
      },
      correctAnswer: {
      type: String,
      required: true
    },
      answers: {
        type: Array,
        // required: true,
        // validator: (value) => {
        //   return value.length === 4 && value.every(answer => typeof answer.text === 'string')
        // }
      }
    },
    data() {
      return {
        // correctAnswer: null,
        // mandatory: true,
        // rules: [
        //   (v) => !!v || 'Please select a correct answer'
        // ],
        letters: ['A', 'B', 'C', 'D']
      }
    },
    methods: {
      ...mapActions({
        actdeleteQuestion: 'actdeleteQuestion'
      }),
      deleteQuestion(id) {
        if(confirm('تاكيد حذف السؤال')) {
          console.log('confirm', id)
          this.actdeleteQuestion({id}).then(() => {
            this.$alert("", 'تم حذف السؤال', 'success', );
          }).catch(e => {
        this.$alert('', e, 'error');
          })
        } else {
          console.log('nconfirm')
        }
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
.thrc input{
  text-align: center !important
}
  </style>