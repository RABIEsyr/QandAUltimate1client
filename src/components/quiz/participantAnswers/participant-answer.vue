<template>
  <v-container px="4">
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="question" label="Question" required outlined shaped disabled
        class="thr0 input custom0-v-label"
        
        ></v-text-field>
        <v-row>
          <v-col cols="6" v-for="(answer, index) in answers" :key="index">
            <v-text-field :value="answers[index]" :label="'Answer ' + letters[index]" required outlined rounded 
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
            <v-radio-group 
            
            v-model="participantanswer"  row 
            >
              <v-radio 
              :disabled="true"
              
              :label="letters[index]" :value="letters[index]"
              
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: [
    'participantanswer',
    'id',
    'question',
    'answers'
    ],
    data() {
        return {
            letters: ['A', 'B', 'C', 'D']
        }
    },
    computed: {
        ...mapGetters({
            'getParticipantAnswersLocally': 'getParticipantAnswersLocally'
        })
    },
    mounted() {
        console.log('getParticipantAnswersLocally xxx:', this.getParticipantAnswersLocally)
        // for (let i = 0; i< this.getParticipantAnswersLocally.length; i++) {

        // }
    }
}
</script>

<style>

</style>