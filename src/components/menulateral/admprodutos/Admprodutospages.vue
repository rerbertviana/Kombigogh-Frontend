<template>
  <div class="produtospages">
    <v-tabs
      slider-color="#F4CB68"
      slider-size="3"
      v-model="tab"
      class="radiusitems"
      height="80"
    >
      <div class="menutable">
        <v-tab>
          <i class="fas fa-box fa-fw espaco"></i>
          <span class="letras"> Produtos </span>
        </v-tab>
        <v-tab>
          <i class="fas fa-book fa-fw espaco"></i>
          <span class="letras"> Categorias </span>
        </v-tab>
      </div>
    </v-tabs>
    <v-tabs-items class="radiusitems" v-model="tab">
      <v-tab-item>
        <Produtos />
      </v-tab-item>
      <v-tab-item>
        <Categorias/>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Produtos from "./Produtos.vue";
import Categorias from "./Categorias.vue"

import { mapState } from 'vuex'

export default {
  name: "Produtospages",
  components: { Produtos, Categorias },
  computed: mapState(['perfilVisible']),

  data() {
    return {
      tab: null,
    };
  },

  methods: {
    visible() {
      if (this.perfilVisible == true)
      this.$store.commit('togglePerfil')
    },
  },

  mounted() {
    this.visible();
  }

};
</script>

<style scoped>

.produtospages {
  margin: 15px;
  background-color: white;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}

.radiusitems {
  border-radius: 5px;
}

.espaco {
  margin-right: 7px;
}

.menutable {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 40px;
  width: 100%;
}

.letras {
  font-size: 1rem;
}
</style>