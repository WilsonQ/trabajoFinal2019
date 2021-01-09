<template>
  <div>
    <Bienvenido v-if="GET_RESPUESTA().status!== undefined" />
    <div v-else class="ma-12 pa-12 text-center">
      <v-progress-circular :size="200" :width="15" color="primary" indeterminate></v-progress-circular>
    </div>
  </div>
</template>

<script>
import Bienvenido from "@/components/Home";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "home",
  components: {
    Bienvenido
  },
  methods: {
    ...mapGetters("home", ["GET_RESPUESTA"])
  }
};
</script>
