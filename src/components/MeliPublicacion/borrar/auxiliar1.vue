<template>
  <v-container class="pa-4 text-center">
    <v-row class="fill-height" align="end" justify="end">
      <b-col align="start" justify="start" md="12">
        <b-row>
          <b-col md="6">
            <p>Imagen</p>
            <b-form-file
              v-model="file"
              @change="onChance"
              :state="Boolean(file)"
              id="fileInput"
              accept=".jpg, .png, .gif"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <!-- <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div> -->
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
                    <!-- <p class="mt-4 subheading text-left">{{ item.title }}</p>

                    <div>
                      <p class="ma-0 body-1 font-weight-bold font-italic text-left">{{ item.text }}</p>
                      <p class="caption font-weight-medium font-italic text-left">{{ item.subtext }}</p>
                    </div>

                    <div class="align-self-center">
                      <v-btn
                        v-for="(icon, index) in icons"
                        :key="index"
                        :class="{ 'show-btns': hover }"
                        color="transparent"
                        icon
                      >
                        <v-icon :class="{ 'show-btns': hover }" color="transparent">{{ icon }}</v-icon>
                      </v-btn>
                    </div>-->
                    <v-spacer></v-spacer>
                    <v-btn
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
  data: () => ({
    file: null,
    transparent: "rgba(255, 255, 255, 0)"
  }),
  methods: {
    ...mapGetters("meliPublicacion", ["GET_IMAGENES", "GET_CARGAR"]),
    onChance(e) {
      let files = e.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = this.saveImage;
    },
    saveImage(event) {
      this.$store.dispatch("meliPublicacion/subirImagen", event.target.result);
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