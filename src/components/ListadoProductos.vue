<template>
  <div>
    <b-table striped hover :items="productos" :fields="fields"></b-table>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "ListadoProductos",
  data() {
    return {
      productos: null,
      fields: ["codigo", "nombre", "marca", "precio", "costoUSD"]
    };
  },
  methods: {},
  computed: {
    //Provisorio
    ...mapGetters(["getProductoVentaData"])
  },
  mounted() {
    axios
      .get("https://localhost:44390/api/productos")
      .then(response => (this.productos = response.data));
  }
};
</script>