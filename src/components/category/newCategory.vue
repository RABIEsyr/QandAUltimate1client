<template>
   <v-container style="width: 50%;">
    <v-text-field v-model="text" label="الفئة" label-align="center"></v-text-field>
    <v-btn color="primary" @click="submit()" block>اضافة</v-btn>
  </v-container>
</template> 

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            text: null
        }
    },
    methods: {
        ...mapActions({
            actAddCategories: 'actAddCategories'
        }),

        async submit() {
            if (this.text) {
               const result = await this.actAddCategories({categoryName: this.text})
               if (result.success) {
                this.$alert("", 'تمت الاضافة بنجاح', 'success', );
               } else if (result.message == "Category exists"){
                this.$alert("", "الفئة موجودة", 'error', );
               }
            } else {
                this.$alert("", "اسم الفئة فارغ", 'error', );
            }
        }
    }
}
</script>

<style>

</style>