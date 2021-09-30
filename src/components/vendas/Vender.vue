<template>
    <div class="bottom">

        <!-- <v-row align="center">
              <v-col class="d-flex" cols="12" sm="6" xs="6">
                    <v-select dense :items="items" label="Artista"></v-select>
              </v-col>
        </v-row> -->

         <v-select
          :items="items"
          label="Standard"
        ></v-select>
        <!-- <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1">

        </v-data-table> -->
    </div>
    
</template>

<script>
export default {
    name: 'Vender',
    data () {
      return {

        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],

        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          }
        ],
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      }
    },

}
</script>

<style>
    .bottom {
        margin-top: 40px;
    }

    .m {
        margin-left: 20px;
    }
</style>