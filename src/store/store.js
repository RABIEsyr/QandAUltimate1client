import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import config from '../config/config';

const url = config.apiUrl;

Vue.use(Vuex);

const store = new Vuex.Store(

    {
        state: {
            i: '2',
            questionsS: [],
            partecepentAnswers: [],

            isAdmin: false,

            questionsLength: null,
            quizSize: null,

            allQuestions: [],

            participantAnswersLocally: [],

            categories: []
        },
        getters: {
            getQuestionsQuiz: state => state.questionsS,
            getPartecepentAnswers: state => state.partecepentAnswers,

            getIsAdmin: state => state.isAdmin,

            getQuestionsLength: state => state.questionsLength,
            getQuizSize: state => state.quizSize,

            getAllQuestionsWithNoQuiz: state => state.allQuestions,

            getParticipantAnswersLocally: state => state.participantAnswersLocally,

            getCategories: (state) => state.categories

        },
        mutations: {
            questionsQuiz(state, payload) {
                state.questionsS = payload;
                console.log('stat.questions', state.questionsS)
            },
            setPartecepentAnswers(state, answer) {
                state.partecepentAnswers.push(answer)
            },
            setResetQuiz(state) {
                state.participantAnswersLocally = []
                state.partecepentAnswers = []
            },

            setAdmin(state, payload) {
                state.isAdmin = payload;
            },

            setQuestionsLength(state, payload) {
                state.questionsLength = payload;
            },

            setGetQuizSize(state, payload) {
                state.quizSize = payload
            },

            setAllQuestion(state, payload) {
                state.allQuestions = payload
            },

            setDeleteQuestionFromList() {

            },

            setParticipantAnswersLocally(state, payload) {
                state.participantAnswersLocally.push(payload)
                console.log('locally store', payload)
            },


            // categories
            setCategories(state, payload) {
                state.categories = payload
            }
        },
        actions: {
            async addNewQuestion(_, {question, aA, aB, aC, aD, correct, categoryid}) {
                const result = await axios.post(url + '/add-question/addQ',
                {
                    question,
                    aA,
                    aB,
                    aC,
                    aD,
                    correct,
                    categoryid
                }
                );
                console.log('result for add', result.data);
                console.log('userr', _);
                return result
            },

            async getAllQuestions({commit}, {categoryId}) {
                const result = await axios.post(url + '/add-question/get-questions-list',{ categoryId });
                // console.log('result for get questions', result.data);
                commit('questionsQuiz', result.data.questions);
                return result
            },
            async actGetAllQuestionsWithNoQuiz({commit}, {categId}) {
                commit('setAllQuestion', null);
                const result = await axios.post(url + '/add-question/get-questions-list-all', {categId});
                 console.log('result for get questions all', result.data);
                commit('setAllQuestion', result.data.questions);
                return result
            },
            async actGetQizResult({commit, state}) {
                    console.log(commit, 'dd', state);
                const result = await axios.post(url + '/add-question/get-quiz-result', { quiz: state.partecepentAnswers });
                return result.data
            },
            async actGetQuestionsLength({commit}) {
            const result = await axios.get(url + '/add-question/questions-list-size');
            if (result.data.success) {
                commit('setQuestionsLength', result.data.length)
            }
            console.log(commit, 'actGetQuestionsLength', result.data);
            return result.data
        },


        async actGetQuizSize({commit}) {
            const result = await axios.get(url + '/add-question/get-quiz-size');
            if (result.data.success) {
                commit('setGetQuizSize', parseInt(result.data.size.size))
            }
            console.log(commit, 'actGetQuestionsLength', result.data);
            return result.data
        },
        async actSetQuizSize({commit}, {quizSize}) {
            const result = await axios.post(url + '/add-question/set-quiz-size', {
                quizSize
            });
            if (result.data.success) {
                commit('setGetQuizSize', result.data.size)
            }
            console.log(commit, 'actGetQuestionsLength', result.data);
            return result.data
        },


        async actdeleteQuestion({commit}, {id}) {
            const result = await axios.post(url + '/add-question/delete-question', {
                id
            });
            if (result.data.success) {
                commit('setDeleteQuestionFromList', result.data)
            }
            console.log(commit, 'actGetQuestionsLength', result.data);
            return result.data
        },


        // category
        async actFetchCategories({commit}) {
            const result = await axios.get(url + '/add-question/get-categories');
            if (result.data.success) {
                commit('setCategories', result.data.categories)
            }
            console.log('setCategories', result.data);
            return result.data
        },
        async actAddCategories({dispatch}, {categoryName}) {
            const result = await axios.post(url + '/add-question/new-category', {
                categoryName
            });
            if (result.data.success) {
                dispatch('actFetchCategories');
            }
            console.log('setCategories', result.data);
            return result.data
        },

        // delete category
        async actDeleteCategory({dispatch}, {categoryId}) {
            const result = await axios.post(url + '/add-question/delete-category', {
                catID: categoryId
            });
            if (result.data.success) {
                dispatch('actFetchCategories');
            }
            console.log('setCategories', result.data);
            return result.data
        },
        }
    }
)

export default store;