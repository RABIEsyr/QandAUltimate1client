<template>
    <!-- <v-container>
        <v-row align="center" justify="center">
      <v-card v-for="panel in getCategories" :key="panel.name" class="mb-3" width="300">
        <v-card-title>{{ panel.name }}</v-card-title>
        <v-card-text>
        </v-card-text>
        <v-card-actions>
          <div class="text-center">{{ panel.number }}</div>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container> -->
  <v-container>
    <v-row align="center" justify="center">
      <v-card v-for="(panel, index) in getCategories" :key="panel.name" class="mb-3" width="300" @mouseenter="showDeleteIcon(index)" @mouseleave="hideDeleteIcon(index)">
        <v-card-title>{{ panel.name }}</v-card-title>
        <v-card-text>
          <!-- محتوى البطاقة هنا -->
          {{ panel.questionCount }}
        </v-card-text>
        <v-card-actions>
          <div class="text-center">{{ panel.number }}</div>
          <v-btn icon class="ml-auto" v-if="panel.showDeleteIcon" @click="deleteCategory(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters
 } from 'vuex';
export default {
    data() {
        return {
            catList: [],
            panels: [
        { name: 'Panel 1', number: 1 },
        { name: 'Panel 2', number: 2 },
        { name: 'Panel 3', number: 3 }
      ]
        }
    },
    computed: {
        ...mapGetters({
            'getCategories': 'getCategories'
        })
    },
    methods: {
        ...mapActions({
            'actFetchCategories': 'actFetchCategories',
            actDeleteCategory: 'actDeleteCategory'
        }),
        showDeleteIcon(index) {
      this.$set(this.getCategories[index], 'showDeleteIcon', true);
    },
    hideDeleteIcon(index) {
      this.$set(this.getCategories[index], 'showDeleteIcon', false);
    },
    deleteCategory(index) {
      console.log('this.getCategories[index]', this.getCategories[index])
      const category = this.getCategories[index];
      this.actDeleteCategory({categoryId: category._id});
    }
  },
   async created() {
     const categories =  await  this.actFetchCategories();
     console.log('categories23: ', categories)
    }
}
</script>

<style>

</style>