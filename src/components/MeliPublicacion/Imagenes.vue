<template>
  <v-container class="pa-4 text-center">
    <v-row class="fill-height" align="end" justify="end">
      <b-col align="start" justify="start" md="12">
        <b-row>
          <b-col md="6">
            <b-row>
              <b-col class="px-0" md="11">
                <p>Imagen</p>
                <b-form-file
                  v-if="!cambiarEstado"
                  v-model="file"
                  @change="onChance"
                  :disabled="GET_PUBLICACION_MODIFICAR().id === undefined && !crearProducto"
                  :state="Boolean(file)"
                  id="fileInput"
                  accept=".jpg, .png, .gif"
                  placeholder="seleccione un archivo..."
                  drop-placeholder="Drop file here..."
                ></b-form-file>
                <b-form-input
                  v-else
                  type="text"
                  v-on:keydown.enter.prevent="agregarImagen()"
                  v-model="enlace"
                  placeholder="Ingrese el enlace"
                ></b-form-input>
              </b-col>
              <b-col class="px-0" md="1">
                <v-tooltip right bottom>
                  <template v-slot:activator="{ on }">
                    <v-checkbox
                      v-model="cambiarEstado"
                      color="orange darken-3 "
                      class="ml-5 my-10"
                      v-on="on"
                      hide-details
                    ></v-checkbox>
                  </template>
                  <span>Seleccione para {{cambiarEstado ? "Subir una Imagen" : "Agregar el link de Imagen"}}</span>
                </v-tooltip>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <template v-if="GET_CARGAR()">
        <v-col align="center" class="pa-12 ma-12" justify="center" cols="12" md="12">
          <v-progress-circular :size="90" :width="7" color="purple" indeterminate></v-progress-circular>
        </v-col>
      </template>
      <template v-else v-for="(item, i) in GET_IMAGENES()">
        <v-col :key="i" cols="12" md="4">
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 20 : 5" :class="{ 'on-hover': hover }">
              <v-img :src="item.source" height="200px">
                <v-card-title class="pt-1 mr-1 title white--text">
                  <v-row>
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="eliminarImagen(item)"
                      :disabled="GET_IMAGENES().length === 1"
                      align="center"
                      justify="center"
                      :class="{ 'show-btns': hover }"
                      color="transparent"
                      icon
                    >
                      <v-icon :class="{'show-btns': hover }" medium color="transparent">close</v-icon>
                    </v-btn>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
//email:wilsonquispe792@gmail.com
//password:CRD!b2$z$SUGm6u
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: {
    crearProducto: { type: Boolean, default: false }
  },
  data: () => ({
    file: null,
    transparent: "rgba(255, 255, 255, 0)",
    cambiarEstado: false,
    enlace: ""
  }),
  methods: {
    ...mapGetters("meliPublicacion", [
      "GET_IMAGENES",
      "GET_CARGAR",
      "GET_PUBLICACION_MODIFICAR"
    ]),
    onChance(e) {
      let files = e.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = this.saveImage;
    },
    eliminarImagen(imagen) {
      this.$store.commit("meliPublicacion/BORRAR_IMAGEN", imagen);
    },
    saveImage(event) {
      this.$store.dispatch("meliPublicacion/subirImagen", event.target.result);
    },
    agregarImagen() {
      console.log(this.enlace);
      this.$store.commit("meliPublicacion/AGREGAR_IMAGEN", this.enlace);
      this.enlace = "";
    }
  }
};
</script>
<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgb(40, 40, 48) !important;
  /* color: rgba(255, 255, 255, 1) !important; */
}
</style>