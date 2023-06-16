<template>
    <v-container>
        <v-row>
        <v-col cols="6">
            <new-category></new-category>
        </v-col>
        <v-col cols="6">
            <delete-category></delete-category>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>
import deleteCategory from './deleteCategory.vue';
import newCategory from './newCategory.vue';
import store from '@/store/store'

export default {

    components: {
        'new-category': newCategory,
        'delete-category': deleteCategory
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

<style>

</style>