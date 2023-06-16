<template>
    <v-container>
        <v-row>
            <v-col>
                
                <v-text-field 
            hide-details
            type="number"
            :max="getQuestionsLength" 
            min="0"
            filled 
           style="width: 100px;"
            dense 
            single-line
            v-model="quizO" 
             >
          </v-text-field>
          <v-btn color="success" 
          style="margin-top: 3px;"
          @click="setNewQuizSize()"
          >
                        ضبط
                    </v-btn>
                </v-col>
                <v-col>
               
                    <v-text-field 
                hide-details 
                :label="getQuestionsLength + '           : عدد الاسئلة الكلي            '" 
            filled 
            disabled
            dense 
            single-line 
             >
      </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-card height="600" color="#ab61c1">

                    <v-hover v-slot="{ hover }">
                        <v-btn color="#3d15b0" class="v-btn white--text" elevation="2" rounded
                        @click="navTo('addQuestion')"
                            :style="{ 'margin-left': '30%', 'margin-top': '30%', 'width': '40%', 'height': '40%', 'background-color': hover ? 'black' : '#BB86FC' }">
                            <h1>
                                اضافة سؤال
                            </h1>
                        </v-btn>
                    </v-hover>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card height="600" color="#8e57b5">
                    <v-hover v-slot="{ hover }">
                        <v-btn color="#3d15b0" class="v-btn white--text" elevation="2" rounded
                        @click="navTo('explore')"
                            :style="{ 'margin-left': '30%', 'margin-top': '30%', 'width': '40%', 'height': '40%', 'background-color': hover ? 'black' : '#BB86FC' }">
                            <h1>
                                استعراض الاسئلة
                            </h1>
                        </v-btn>
                    </v-hover>
                </v-card>
                
            </v-col>
            <div style="position: absolute;">
                    <v-btn class="pink lighten-2" fab @click="navToCategory()">
    <v-icon color="white">mdi-plus</v-icon>
  </v-btn>
                </div>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import store from '@/store/store'
export default {
    data() {
        return {
            q: null
        }
    },
    computed: {
        ...mapGetters({
            getIsAdmin: 'getIsAdmin',
            getQuestionsLength: 'getQuestionsLength',
            getQuizSize: 'getQuizSize'
        }),

        quizO: {
            get() {
                return  this.getQuizSize
            },
            set(val) {
                this.q = val
            }
        }
    },
    methods: {
        ...mapActions({
            actGetQuestionsLength: 'actGetQuestionsLength',
            actGetQuizSize: 'actGetQuizSize',
            actAsSetQuizSize: 'actSetQuizSize'
        }),
        navTo(s) {
            if (s == 'addQuestion') {
                this.$router.push('/new-question');
            } else {
                this.$router.push('/explore-questions');
            }
        },
        setNewQuizSize() {
            if (this.q)
            this.actAsSetQuizSize({quizSize: this.q});
            console.log('new Size of quiz', this.q)
        },
        navToCategory() {
            this.$router.push('/category');
        }
    },
    created() {
        this.actGetQuestionsLength();
        this.actGetQuizSize(),
        this.q = this.getQuizSize();
    },
    beforeRouteEnter(to, from, next) {
        console.log(to, from)
    if (store.state.isAdmin) {
     next() 
    } else {
        next('/')
    }
  },
}
</script>

<style></style>