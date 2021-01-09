<template>
  <b-container>
    <form ref="form">
      <b-row mt="-5">
        <b-col md="4" cols="12">
          <p align="left">Fecha</p>
          <b-form-input v-model="fecha" type="date" :min="fecha" max="2100-01-01"></b-form-input>
        </b-col>
        <b-col md="4" cols="12">
          <p align="left">Cliente</p>
          <b-form-input
            type="text"
            v-model="ordenTrabajo.cliente"
            :state="ValidaCliente"
            placeholder="Minimo 5 caracteres"
          ></b-form-input>
        </b-col>
        <b-col md="4" cols="12">
          <p align="left">Contacto</p>
          <b-form-input type="text" v-model="ordenTrabajo.contacto" :state="ValidaContacto"></b-form-input>
        </b-col>
        <b-col md="4" cols="12">
          <p align="left">Equipo</p>
          <b-form-input
            type="text"
            v-model="ordenTrabajo.equipo"
            :state="ValidaEquipo"
            placeholder="Minimo 5 caracteres"
          ></b-form-input>
        </b-col>
        <b-col md="4" cols="12">
          <p align="left">Marca</p>
          <b-form-input
            type="text"
            v-model="ordenTrabajo.marca"
            :state="ValidaMarca"
            placeholder="Minimo 5 caracteres"
          ></b-form-input>
        </b-col>
        <b-col md="4" cols="12">
          <p align="left">Modelo</p>
          <b-form-input
            type="text"
            v-model="ordenTrabajo.modelo"
            :state="ValidaModelo"
            placeholder="Minimo 5 caracteres"
          ></b-form-input>
        </b-col>
        <b-col md="4" cols="12">
          <p align="left">Contraseña</p>
          <b-form-input
            size="md"
            v-model="ordenTrabajo.Password"
            :state="ValidaPassword"
            type="text"
          ></b-form-input>
        </b-col>
        <b-col md="4" cols="12">
          <p align="left">Costo Estimado</p>
          <b-form-input
            v-model="ordenTrabajo.costoEstimado"
            :state="ValidaCostoEstimado"
            type="number"
          ></b-form-input>
        </b-col>
        <b-col md="4" cols="12">
          <p align="left">Fecha prevista de Entrega</p>
          <b-form-input
            type="date"
            v-model="GET_ORDEN_TRABAJO().FechaEntrega"
            :min="fecha"
            max="2100-01-01"
          ></b-form-input>
        </b-col>
        <b-col md="4" cols="12">
          <p align="left">Cargador</p>
          <b-form-input
            type="text"
            v-model="ordenTrabajo.cargador"
          ></b-form-input>
        </b-col>
        <b-col md="4" cols="12">
          <p align="left">Accesorios</p>
          <b-form-input
            type="text"
            v-model="ordenTrabajo.accesorios"
          ></b-form-input>
        </b-col>
        <b-col md="8" cols="12">
          <p align="left">Descripcion</p>
          <b-form-textarea
            rows="6"
            :state="ValidaDescripcion"
            v-model="ordenTrabajo.descripcion"
            placeholder="Descripcion..."
          ></b-form-textarea>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="2">
          <b-button v-if="esModificar" block id="show-btn" @click="$router.go(-1)">Volver Atras</b-button>
        </b-col>
        <b-col offset-md="7" cols="12" md="3">
          <b-button
            block
            @click="formSubmit(ordenTrabajo)"
            id="show-btn"
          >{{esModificar?"Modificar":"Guardar"}}</b-button>
        </b-col>
      </b-row>
    </form>
    <b-container mt="5">
      <b-row>
        <b-col sm="11"></b-col>
        <b-col sm="1">
          <div>
            <b-modal ref="my-modal" hide-footer title="Actualizacion de Producto">
              <div>
                <div
                  v-if="GET_RESPUESTA().status === undefined"
                  class="d-flex justify-content-center align-items-center mb-3"
                >
                  <strong class="ml-3">Cargando...</strong>
                </div>
                <div v-else>
                  <div class="d-block text-center">
                    <h5 class="my-5">{{GET_RESPUESTA().status===500?text2:text1}}</h5>
                  </div>
                  <Print :producto="GET_ORDEN_TRABAJO_IMPRIMIR()" :esNuevo="true" />
                  <b-button
                    class="mt-3"
                    :variant="GET_RESPUESTA().status===500?variant1:variant2"
                    block
                    @click="hideModal()"
                  >Aceptar</b-button>
                </div>
              </div>
            </b-modal>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Print from "@/components/OrdenTrabajo/ImprimirOrdenTrabajo.vue";
export default {
  components: {
    Print
  },
  data: function() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      text: "Registro El Orden de Trabajo Correctamente",
      textModificar: "Modifico El Orden de Trabajo Correctamente",
      textError: "Error al Registrar la Orden de Trabajo",
      textError2: "Error al Modificar la Orden de Trabajo",
      variant1: "outline-danger",
      variant2: "outline-warning"
    };
  },
  props: {
    esModificar: {
      //Validar si el formulario es para modificar
      type: Boolean,
      default: false
    }
  },
  computed: {
    text1() {
      if (this.esModificar) {
        return this.textModificar;
      } else {
        return this.text;
      }
    },
    text2() {
      if (this.esModificar) {
        return this.textError2;
      } else {
        return this.textError;
      }
    },
    fecha: {
      get: function() {
        if (!this.esModificar) {
          let date = new Date();

          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();

          if (month < 10) month = "0" + month;
          if (day < 10) day = "0" + day;
          let today = year + "-" + month + "-" + day;
          console.log("today", today);

          this.ordenTrabajo.fecha = today;
          return this.ordenTrabajo.fecha;
        } else {
          return this.ordenTrabajo.fecha;
        }
      }
    },
    imprimirProducto() {
      console.log("guardando...", this.ordenTrabajo);
    },
    ValidaCliente() {
      let { cliente } = this.ordenTrabajo;
      console.log("cliente", this.ordenTrabajo);
      if (cliente.length > 4) {
        return true;
      } else if (cliente.length == 0) {
        return null;
      } else {
        return false;
      }
    },
    ValidaModelo() {
      let { modelo } = this.ordenTrabajo;
      if (modelo.length > 2) {
        return true;
      } else if (modelo.length == 0) {
        return null;
      } else {
        return false;
      }
    },
    ValidaContacto() {
      let { contacto } = this.ordenTrabajo;
      if (contacto.length > 4) {
        return true;
      } else if (contacto.length == 0) {
        return null;
      } else {
        return false;
      }
    },
    ValidaEquipo() {
      let { equipo } = this.ordenTrabajo;
      if (equipo.length > 3) {
        return true;
      } else if (equipo.length == 0) {
        return null;
      } else {
        return false;
      }
    },
    ValidaMarca() {
      let { marca } = this.ordenTrabajo;
      if (marca.length > 1) {
        return true;
      } else if (marca.length == 0) {
        return null;
      } else {
        return false;
      }
    },
    ValidaPassword() {
      let { Password } = this.ordenTrabajo;
      if (Password.length > 4) {
        return true;
      } else if (Password.length == 0) {
        return null;
      } else {
        return false;
      }
    },
    ValidaCostoEstimado() {
      let { costoEstimado } = this.ordenTrabajo;
      if (costoEstimado > 0) {
        return true;
      } else if (costoEstimado === null) {
        return null;
      } else {
        return false;
      }
    },
    ValidaDescripcion() {
      let { descripcion } = this.ordenTrabajo;
      if (descripcion.length > 25) {
        return true;
      } else if (descripcion.length == 0) {
        return null;
      } else {
        return false;
      }
    },
    ordenTrabajo() {
      if (this.esModificar) {
        console.log("esModificar", this.GET_ORDEN_TRABAJO_MODIFICAR());
        return this.GET_ORDEN_TRABAJO_MODIFICAR();
      }
      return this.GET_ORDEN_TRABAJO();
    }
  },
  methods: {
    ...mapGetters("ordenTrabajo", [
      "GET_ORDEN_TRABAJO",
      "GET_ORDEN_TRABAJO_MODIFICAR",
      "GET_RESPUESTA",
      "GET_ORDEN_TRABAJO_IMPRIMIR"
    ]),
    ...mapMutations("ordenTrabajo", ["LIMPIAR_FORMULARIO"]),
    formSubmit(ordenTrabajo) {
      if (this.esModificar) {
        this.$store.dispatch(
          "ordenTrabajo/modificarOrdenTrabajo",
          ordenTrabajo
        );
      } else {
        this.$store.dispatch("ordenTrabajo/nuevoOrdenTrabajo", ordenTrabajo);
      }
      this.showModal();
    },
    showModal() {
      this.$refs["my-modal"].show();
      this.$store.commit("ordenTrabajo/SET_RESPUESTA", { status: undefined });
    },
    hideModal() {
      this.$refs["my-modal"].hide();
      // if (this.GET_RESPUESTA().status === 204) {
      //   this.$store.commit("producto/INICIALIZAR_PRODUCTO");
      //   this.$store.dispatch("producto/buscarProductos");
      // }
    }
  }
};
</script>

<style>
</style>