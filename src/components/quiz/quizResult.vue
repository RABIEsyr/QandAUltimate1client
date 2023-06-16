<template>
    <div class="text-center">
      <h2 style="margin: auto; margin-bottom: 100px; margin-top: 100px;">النتيجة</h2>
      <v-row>
        <v-col md="6">
          <v-card>
            <v-card-title class="text-center">
              <span style="margin: auto;">الاجوبة الصيحية  <v-icon color="green" dark>mdi-check</v-icon></span>
            </v-card-title>
            <v-card-text class="text-center">
              {{ correct }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="6">
          <v-card>
            <v-card-title>
                <span style="margin: auto;">
                    الاجوبة الخاطئة
                    <v-icon color="red" dark>mdi-close</v-icon>
                </span>
              
             
            </v-card-title>
            <v-card-text>
                {{ incorrect }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <!-- <v-btn>
          استعراض الاسئلة
        </v-btn> -->
        <div class="text-center"  style="margin: auto;">
        <v-btn 
        style="margin: auto;"
        @click="showPopup = true" color="primary">
          الأجوبة
        </v-btn>
      </div>
        <!-- 
          answers
: 
(...)
id
: 
(...)
participantanswer
: 
(...)
question
: 
(...
         -->
    <div class="popup-container" v-if="showPopup">
      <div class="popup" >
        <!-- <h2>Popup Content</h2>
        <p>This is the content of the popup.</p> -->
        <v-card
        style="margin-bottom: 10px;"
        v-for="det in getParticipantAnswersLocally" :key="det._id" 
        class="custom-popup">
          <div 
        >
        <div
        style="height: 10px;
        background-color: purple;">

        </div>
          <participant-answers-component
          :id="det._id"
          :participantanswer="det.participantanswer"
          :question="det.question"
          :answers="det.answers"
          >
          
          </participant-answers-component>
        </div>
        <div
        style=
        "height: 10px;
        margin-bottom: 30px;
        background-color: purple;"
        >

        </div>
        </v-card>
        <div class="popup-footer">
        <button 
        class="close-button"
        @click="showPopup = false">اغلاق</button>
      </div>
      </div>
    </div>
      </v-row>
    </div>
  </template>
  
  <script>
import participantAnswerVue from './participantAnswers/participant-answer.vue';
import { mapGetters } from 'vuex';

  export default {
    props: {
      correct: {
        type: Number,
        required: true,
        default: 0
      },
       incorrect: {
        type: Number,
        required: true,
        default: 0
      },
    },
    data() {
    return {
      showPopup: false
    }
  },
  computed: {
    ...mapGetters({
      getParticipantAnswersLocally: 'getParticipantAnswersLocally'
    })
  },
  components: {
    'participant-answers-component': participantAnswerVue
  }
  };
  </script>

  <style scoped>
  .popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  max-height: 100%;
  overflow-y: scroll;
}

.popup-footer {
  position: sticky;
  bottom: 0;
  background-color: #fff;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.close-button {
  background-color: purple;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}


  </style>