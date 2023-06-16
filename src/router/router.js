import Vue from 'vue';
import VueRouter from 'vue-router';

//  import store from '../store/store';

Vue.use(VueRouter);


const routes = [
  {
    path: '*',
   redirect: '/'
  },

  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/Home.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
     meta: { requiresAuth: true },
    component: () => import('../components/admin/adminPage.vue'),
    //  beforeEnter: async() =>
    //  {
    //    console.log('esesee', store.getters.isAdmin)    
    //  }
  },

  {
    path: '/add-question',
    name: 'add-question',
    component: () => import('../components/admin/adminPage.vue'),
  },

  {
    path: '/explore-questions',
    name: 'ExploreQuestions',
    component: () => import('../components/question/explore/questionsList.vue'),
  },
 {
    path: '/new-question',
    name: 'NewQuestion',
    component: () => import('../components/question/addQuestion.vue'),
  },
  {
    path: '/new-quiz/:id',
    name: 'NewQuiz',
    component: () => import('../components/quiz/quizList.vue'),
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('../components/category/category'),
  },
  {
    path: '/quiz-category-carousel',
    name: 'QuizCategoryCarouse',
    component: () => import('../components/quiz/quizCategory.vue'),
  },
  {
    path: '/',
    redirect: "home",
  },


]

const router = new VueRouter(
  {
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes,
  }
);



export default router;


  





