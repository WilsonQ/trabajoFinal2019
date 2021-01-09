<template>
  <div>
    <v-card>
      <v-card-title>
        Ordenes de Trabajo
        <div class="flex-grow-1"></div>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Buscar orden de Trabajo"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="GET_ORDEN_TRABAJOS()"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        :loading="GET_ORDEN_TRABAJOS().length === 0&&true"
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
                    <v-list-item-title>Contraseña:</v-list-item-title>
                    <v-list-item-subtitle class="text-right">{{item.password}}</v-list-item-subtitle>
                  </v-list-item>
                </b-col>
                <b-col cols="12" md="4">
                  <v-list-item>
                    <v-list-item-title>Modelo:</v-list-item-title>
                    <v-list-item-subtitle class="text-right">{{item.modelo}}</v-list-item-subtitle>
                  </v-list-item>
                </b-col>
                <b-col cols="12" md="4">
                  <v-list-item>
                    <v-list-item-title>Marca:</v-list-item-title>
                    <v-list-item-subtitle class="text-right">{{item.marca}}</v-list-item-subtitle>
                  </v-list-item>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" md="4">
                  <v-list-item>
                    <v-list-item-title>Fecha:</v-list-item-title>
                    <v-list-item-subtitle class="text-right">{{item.fecha}}</v-list-item-subtitle>
                  </v-list-item>
                </b-col>
                <b-col cols="12" md="8">
                  <b-row>
                    <v-list-item>
                      <b-col md="2" class="pr-0" cols="12" align-self="start">
                        <v-list-item-title>Descripcion:</v-list-item-title>
                      </b-col>
                      <b-col class="pt-0 pl-12" cols="12" md="10">
                        <v-list-item-content>
                          <p
                            class="text-justify body-2"
                            style="color: rgba(0, 0, 0, 0.54);"
                          >{{item.descripcion}}</p>
                        </v-list-item-content>
                      </b-col>
                    </v-list-item>
                  </b-row>
                </b-col>
              </b-row>
            </v-list>
          </td>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small @click="modificar(item)" class="mr-2">edit</v-icon>
          <v-icon small @click.stop="setDialog(item)">delete</v-icon>
          <!-- <v-icon small class="ml-2">print</v-icon> -->
          <Print :esListado="true" :orden="item" />
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
          <!-- <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title> -->
          <v-toolbar class="mb-10" color="dark1" dark>
            <v-toolbar-title>Eliminar Orden de Trabajo</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>

          <v-card-text
            class="title"
          >{{`¿Estas seguro que queres eliminar el orden de trabajo de "${OrdenEliminar.cliente}"?`}}</v-card-text>

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
import Print from "@/components/OrdenTrabajo/ImprimirOrdenTrabajo.vue";
export default {
  components: {
    Print
  },
  data() {
    return {
      text2: "La Orden de Trabajo fue Eliminado",
      text1: "No se pudo eliminar la Orden de Trabajo",
      color1: "success",
      color2: "error",
      timeout: 6000,
      dialog: false,
      search: "",
      expanded: [],
      singleExpand: false,
      OrdenEliminar: {},
      headers: [
        {
          text: "codigo",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "Cliente", value: "cliente" },
        { text: "Contacto", value: "contacto" },
        { text: "Equipo", value: "equipo" },
        { text: "Costo Estimado", value: "costoEstimado" },
        { text: "Fecha Prevista ", value: "fechaEntrega" },
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
        console.log("SET_NOTIFICACION", value);
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
    ...mapMutations("ordenTrabajo", [
      "SET_ORDEN_TRABAJO_MODIFICAR",
      "SET_NOTIFICACION"
    ]),
    setDialog(item) {
      this.dialog = true;
      this.OrdenEliminar = item;
      console.log("item", this.OrdenEliminar);
    },
    eliminar() {
      console.log("Eliminando...", this.OrdenEliminar.id);
      this.$store.dispatch(
        "ordenTrabajo/eliminarOrdenTrabajo",
        this.OrdenEliminar.id
      );
      this.dialog = false;
    },
    modificar(item) {
      console.log("llego el item", item);
      this.SET_ORDEN_TRABAJO_MODIFICAR(item);
      this.$router.push({
        name: "Modificar Orden de Trabajo"
      });
    }
  },
  created() {
    console.log("Realizando la Peticion");
    this.$store.dispatch("ordenTrabajo/ordenTrabajoTodos");
  }
};
</script>
