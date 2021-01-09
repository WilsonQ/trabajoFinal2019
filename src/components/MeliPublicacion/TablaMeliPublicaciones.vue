<template>
  <div>
    <v-card>
      <v-card-title>
        Publicaciones
        <div class="flex-grow-1"></div>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Buscar Publicacion"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="GET_PUBLICACIONES()"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        :loading="GET_PUBLICACIONES().length === 0&&true"
        :search="search"
        item-key="id"
        show-expand
        class="elevation-1"
      >
        <template v-slot:expanded-item="{ headers,item }">
          <td :colspan="headers.length">
            <v-list class="transparent">
              <b-row>
                <b-col cols="12" md="4">
                  <v-list-item>
                    <v-list-item-title>Categoria:</v-list-item-title>
                    <v-list-item-subtitle class="text-right">{{item.category_id}}</v-list-item-subtitle>
                  </v-list-item>
                </b-col>
                <b-col cols="12" md="4">
                  <v-list-item>
                    <v-list-item-title>Fecha Creada:</v-list-item-title>
                    <v-list-item-subtitle class="text-right">{{item.date_created}}</v-list-item-subtitle>
                  </v-list-item>
                </b-col>
                <b-col cols="12" md="4">
                  <v-list-item>
                    <v-list-item-title>Stock Inicial</v-list-item-title>
                    <v-list-item-subtitle class="text-right">{{item.initial_quantity}}</v-list-item-subtitle>
                  </v-list-item>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" md="4">
                  <v-list-item>
                    <v-list-item-title>Modo Compra:</v-list-item-title>
                    <v-list-item-subtitle class="text-right">{{item.buying_mode}}</v-list-item-subtitle>
                  </v-list-item>
                </b-col>
                <b-col cols="12" md="8">
                  <b-row>
                    <v-list-item>
                      <b-col md="2" class="pr-0" cols="12" align-self="start">
                        <v-list-item-title>warranty:</v-list-item-title>
                      </b-col>
                      <b-col class="pt-0 pl-12" cols="12" md="10">
                        <v-list-item-content>
                          <p
                            class="text-justify body-2"
                            style="color: rgba(0, 0, 0, 0.54);"
                          >{{item.warranty}}</p>
                        </v-list-item-content>
                      </b-col>
                    </v-list-item>
                  </b-row>
                </b-col>
              </b-row>
            </v-list>
          </td>
        </template>
        <template v-slot:item.cambiarEstado="{ item }">
          <v-checkbox
            v-model="item.cambiarEstado"
            color="orange darken-3"
            class="ma-2"
            hide-details
          ></v-checkbox>
        </template>
        <template v-slot:item.status="{ item }">
          <div v-if="!item.cambiarEstado">{{item.status}}</div>
          <v-autocomplete
            v-else
            v-model="item.selectStatus"
            :items="item.allStatus"
            @change="chanceStatus(item.id,item.selectStatus)"
            class="size"
            solo
            flat
            hide-no-data
            hide-selected
            item-text="name"
            item-value="status"
          ></v-autocomplete>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small @click="modificar(item)" class="mr-2">edit</v-icon>
          <v-icon v-if="item.status === 'closed'" small @click.stop="setDialog(item)">delete</v-icon>
          <v-tooltip right v-else bottom>
            <template v-slot:activator="{ on }">
              <v-icon color="grey darken-5" v-on="on" small>delete</v-icon>
            </template>
            <span>Cambiar Estado a Cerrado, para desbloquear</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <b-alert show class="ma-2" variant="secondary">No hay datos</b-alert>
        </template>
        <template v-slot:no-results>
          <b-alert show class="ma-2" variant="secondary">No se encuentra el orden de trabajo</b-alert>
        </template>
      </v-data-table>
    </v-card>
    <!-- DIALOG -->
    <div class="text-center">
      <v-dialog v-model="dialog" persistent width="500">
        <v-card>
          <v-toolbar class="mb-10" color="dark1" dark>
            <v-toolbar-title>Eliminar Orden de Trabajo</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>

          <v-card-text
            class="title"
          >{{`¿Estas seguro que queres eliminar esta publicacion "${PublicacionEliminar.title}"?`}}</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn text @click="dialog = false">Carcelar</v-btn>
            <v-btn color="red darken-1" text @click="eliminar()">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-snackbar :color="color" vertical multi-line v-model="snackbar" :timeout="timeout">
      {{ text }}
      <v-btn text @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      cambiarEstado: false,
      estado: "",
      status: null,
      textEliminar: "La Publicacion  fue Eliminado",
      textEliminarErrror: "No se pudo eliminar La Publicacion",
      textEstado: "Se Cambio Correctamente el Estado",
      textEstadoError: "No se Cambiar el Estado",
      color1: "success",
      color2: "error",
      timeout: 6000,
      dialog: false,
      status: {},
      search: "",
      expanded: [],
      singleExpand: false,
      PublicacionEliminar: {},
      headers: [
        {
          text: "codigo",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "Titulo", value: "title" },
        { text: "Condicion", value: "condition" },
        { text: "Stock", value: "available_quantity" },
        { text: "Precio", value: "price" },
        { text: "Estado", value: "status" },
        { text: "Cambiar", value: "cambiarEstado" },
        { text: "Actions", value: "action", sortable: false }
      ]
    };
  },
  computed: {
    snackbar: {
      get: function() {
        return this.GET_NOTIFICACION();
      },
      set: function(value) {
        console.log("snackbar", value);
        this.$store.commit("meliPublicacion/SET_NOTIFICACION", value);
      }
    },
    text() {
      if (this.GET_RESPUESTA().status === 200) {
        return this.textSuccess;
      } else {
        return this.textError;
      }
    },
    textSuccess() {
      if (this.GET_RESPUESTA().tipo === "estado") {
        return this.textEstado;
      } else {
        return this.textEliminar;
      }
    },
    textError() {
      if (this.GET_RESPUESTA().tipo === "estado") {
        return this.textEstadoError;
      } else {
        return this.textEliminarErrror;
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
    ...mapGetters("meliPublicacion", [
      "GET_PUBLICACIONES",
      "GET_RESPUESTA",
      "GET_NOTIFICACION"
    ]),
    chanceStatus(id, estado) {
      this.$store.commit("meliPublicacion/SET_RESPUESTA", {
        status: null
      });
      this.status["status"] = estado;
      this.status["id"] = id;
      console.log("cambiando...", this.status);
      this.$store.dispatch("meliPublicacion/cambiarEstado", this.status);
    },
    setDialog(item) {
      this.dialog = true;
      this.PublicacionEliminar = item;
    },
    eliminar() {
      this.$store.dispatch(
        "meliPublicacion/eliminarPublicacion",
        this.PublicacionEliminar.id
      );
      this.dialog = false;
    },
    modificar(item) {
      this.$store.commit("meliPublicacion/PUBLICACION_MODIFICAR", item);
      this.$router.push({
        name: "Modificar Publicacion"
      });
    }
  },
  created() {
    this.$store.dispatch("meliPublicacion/buscarPublicaciones");
  },
  destroyed() {
    this.$store.commit("meliPublicacion/SET_PUBLICACIONES", []);
  }
};
</script>
<style >
.size {
  height: 45px;
}
</style>