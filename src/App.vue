<template>
  <div id="app">
    <v-app id="inspire">
      <Navbar />
      <v-content>
        <v-container fluid grid-list-lg>
          <b-container class="mt-5 mr-5 ml-5">
            <router-view />
            <v-snackbar :color="color" vertical multi-line v-model="snackbar" :timeout="timeout">
              {{ text }}
              <v-btn text @click="snackbar = false">Cerrar</v-btn>
            </v-snackbar>
          </b-container>
        </v-container>
      </v-content>
      <Footer />
    </v-app>
  </div>
</template>
<script>
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    color1: "success",
    color2: "error",
    timeout: 6000
  }),
  computed: {
    snackbar: {
      get: function() {
        return this.GET_NOTIFICACION();
      },
      set: function(value) {
        this.SET_NOTIFICACION(value);
        // this.buscar = false;
      }
    },
    text() {
      if (this.GET_RESPUESTA().status === 200) {
        return this.text2;
      } else {
        return this.text1;
      }
    },
    color() {
      if (this.GET_RESPUESTA().status === 200) {
        return this.color1;
      } else {
        return this.color2;
      }
    }
  },
  methods: {
    ...mapGetters("ordenTrabajo", [
      "GET_ORDEN_TRABAJOS",
      "GET_NOTIFICACION",
      "GET_RESPUESTA"
    ]),
    ...mapGetters("meliPublicacion", ["GET_PUBLICACIONES"]),
    ...mapMutations("ordenTrabajo", [
      "SET_ORDEN_TRABAJO_MODIFICAR",
      "SET_NOTIFICACION"
    ]),
    logout(){
        auth.signOut().then(()=>{
          this.$router.push('./login');
        })
      },
    estaLogueado(){
      if(auth.currentUser){ 
        return true;
      }else{
        return false
      }
    }
  },
  created() {
    this.$store.dispatch("home/obtenerHomeData");
    this.$store.dispatch("estadisticas/obtenerEstadisticasData");
  }
};
</script>
