<template>
    <v-container px="4">
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="question" label="Question" required outlined shaped disabled
        class="thr0 input custom0-v-label"
        
        ></v-text-field>
        <v-row>
          <v-col cols="6" v-for="(answer, index) in answers" :key="index">
            <v-text-field v-model="answers[index]" :label="'Answer ' + letters[index]" required outlined rounded 
            :readonly="true"
            color="red"
            :disabled="true"
         
            :class="[
              index == 0 ? `thr1 input custom1-v-label` : '',
              index == 1 ? 'thr2 input custom2-v-label' : '',
              index == 2 ? 'thr3 input custom3-v-label' : '',
              index == 3 ? 'thr4 input custom4-v-label' : '',
              ]"
            >
            
            </v-text-field>
            <v-radio-group v-model="yAnswer"  row 
            @change="$emit('value-changed', {yAnswer, id, question, answers})">
              <v-radio :label="letters[index]" :value="letters[index]"
              :color="index == 0 ?'green': 
              index == 1 ? 'blue' :
              index == 2 ? 'purple' : 
              index == 3 ? '#FFD700' : ''
              "
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </template>
  
  <script>
  export default {
    props: {
      question: {
        type: String,
        required: true,
        default: "s"
      },
      id: {
        type: String,
        required: true,
        default: "s"
      },
      correctAnswer: {
        default: "s",
      type: String,
    //   required: true
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
    //     var partcipentAnswer = {
    //     selectedAnswer: yAnswer,
    //     questionId: this.id
    // }
   
      return {
        // correctAnswer: null,
        // mandatory: true,
        // rules: [
        //   (v) => !!v || 'Please select a correct answer'
        // ],
        yAnswer: null,
        // partcipentAnswer,
        letters: ['A', 'B', 'C', 'D']
      }
    },
    
  }
  </script>

<style >
/* .theme--light.v-input--is-disabled input, .theme--light.v-input--is-disabled textarea {
    color:    #000 !important;
    font-size: 2 rem !important;
} */

/* .theme--light.v-input--is-disabled input{
  color:    green !important;
} */
.thr0 input{
  color:    black !important;
  text-align: center
}

.thr1 input{
  color:    green !important;
  text-align: center
}

.thr2 input{
  color:    blue !important;
  text-align: center
}

.thr3 input{
  color:    purple !important;
  text-align: center
}

.thr4 input{
  color:    #FFD700 !important;
  text-align: center
}

.custom0-v-label .v-label{
  color: black !important;
  opacity: 1;
}
.custom1-v-label .v-label{
  color: green !important;
  opacity: 1;
}
.custom2-v-label .v-label{
  color: blue !important;
  opacity: 1;
}
.custom3-v-label .v-label{
  color: purple !important;
  opacity: 1;
}
.custom4-v-label .v-label{
  color: #FFD700 !important;
  opacity: 1;
}

</style>