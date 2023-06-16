<template>
    <div class="circle-menu" v-if="getCategories.length <= 10">
         <!-- {{getCategories[0]}}  -->
      <div class="circle-menu__item" v-for="(n, i) in 10" :key="i">
        <span class="circle-menu__link  circle-menu__text" @click="navToQuiz(getCategories[i])">
            {{getCategories.length >= n ? getCategories[i].name : ''}}
        </span>
      </div>
       
    </div>
    <div v-else>
  <v-row class="center-container" >
    <v-menu offset-y transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" class="custom-button">{{ selectedOption.name }}</v-btn>
      </template>
      <v-list class="custom-list">
        <v-list-item v-for="categ in getCategories" :key="categ._id" @click="selectOption(categ)">
          <v-list-item-title>{{ categ.name }}</v-list-item-title>
        </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
        <v-row style="display: flex;justify-content: center;
        align-items: center;">
            <v-btn  
            v-if="selectedOption._id"
            class="custom-btn" color="primary"
            @click="navToQuizFromList()" style="z-index: 1;">متابعة</v-btn>
          </v-row>
  
    </div>
  </template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
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
        actFetchCategories: 'actFetchCategories'
    }),
    navToQuiz(cat) {
        // this.$router.push('/new-quiz')
        this.$router
        .push(
          { name: 'NewQuiz', 
           params: { id: cat._id },
           query: { name: cat.name } }
          );
    },
    selectOption(option) {
      console.log(option)
      this.selectedOption = option;
    },
    navToQuizFromList() {
      this.$router.push({ name: 'NewQuiz', params: { id: this.selectedOption._id }, query: { name: this.selectedOption.name } });
      // this.$router.push('/new-quiz')
    }
},
created() {
    this.actFetchCategories()
    console.log('caca', this.getCategories)
    
},
// mounted() {
//   console.log('pppp', this.getCategories[0].name)
// this.selectedOption = this.getCategories[0]
// }
}
</script>

  <style scoped>
  .circle-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .circle-menu__item {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #0074D9; /* لون الدائرة */
  border: 2px solid #FFFFFF; /* لون الحدود */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}
.circle-menu__text {
  white-space: nowrap; /* إزالة القيود على الطول الأفقي للنص */
  text-align: center; /* توسيط النص */
}

.circle-menu__item:hover .circle-menu__text {
  white-space: normal; /* عرض النص بشكل كامل عند تحويم المؤشر فوق الدائرة */
  font-size: 16px; /* تحديد حجم الخط الصغير عند عرض النص بشكل كامل */
}

.circle-menu__item:hover {
  transform: scale(1.2);
  background-color: magenta;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.circle-menu__item span {
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF; /* لون النص */
}
  
  .circle-menu__item:nth-child(1) {
    transform: rotate(0deg) translate(125px) rotate(0deg);
  }
  
  .circle-menu__item:nth-child(2) {
    transform: rotate(36deg) translate(125px) rotate(-36deg);
  }
  
  .circle-menu__item:nth-child(3) {
    transform: rotate(72deg) translate(125px) rotate(-72deg);
  }
  
  .circle-menu__item:nth-child(4) {
    transform: rotate(108deg) translate(125px) rotate(-108deg);
  }
  
  .circle-menu__item:nth-child(5) {
    transform: rotate(144deg) translate(125px) rotate(-144deg);
  }
  
  .circle-menu__item:nth-child(6) {
    transform: rotate(180deg) translate(125px) rotate(-180deg);
  }
  
  .circle-menu__item:nth-child(7) {
    transform: rotate(216deg) translate(125px) rotate(-216deg);
  }
  
  .circle-menu__item:nth-child(8) {
    transform: rotate(252deg) translate(125px) rotate(-252deg);
  }
  
  .circle-menu__item:nth-child(9) {
    transform: rotate(288deg) translate(125px) rotate(-288deg);
  }
  
  .circle-menu__item:nth-child(10) {
    transform: rotate(324deg) translate(125px) rotate(-324deg);
  }
  
  .circle-menu__link {
    color: #000000;
    font-size: 20px;
    cursor: pointer;
  }
 
  .center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
}

.custom-btn-col {
  width: auto;
  margin-left: 8px;
}

.custom-btn {
  text-transform: uppercase;
  font-weight: bold;
}

  </style>