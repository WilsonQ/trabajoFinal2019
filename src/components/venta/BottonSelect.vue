<template>
  <div>
    <b-row>
      <b-col cols="12" md="4">
        <b-form-select v-model="MetodoPago" class="mb-3">
          <option :value="null">Seleccione el metodo de pago</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta Credito">Tarjeta Credito</option>
          <option value="Tarjeta de Debito">Tarjeta de Debito</option>
        </b-form-select>
      </b-col>
      <b-col cols="5" offset-md="3" md="2">
        <label for="type-text">TOTAL:</label>
      </b-col>
      <b-col cols="7" md="3">
        <b-input-group prepend="$">
          <b-form-input disabled type="text" v-model="total"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col offset-md="10" cols="12" md="2">
        <b-button :disabled="habilitar" block @click="guardar()" id="show-btn">Guardar</b-button>
      </b-col>
    </b-row>
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
                    <h5>{{GET_RESPUESTA().status===500?text2:text1}}</h5>
                  </div>
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
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    text1: "Registro Actualizado Correctamente",
    text2: "Error al Actualizar Registro",
    variant1: "outline-danger",
    variant2: "outline-warning",
    
  }),
  methods: {
    ...mapMutations("venta", [
      "CALCULAR_TOTAL",
      "SET_METODO_PAGO",
      "SET_TOTAL"
    ]),
    // ...mapState("venta", ["total"]),
    ...mapActions("venta", ["guardarVenta"]),
    ...mapGetters("venta", [
      "GET_TOTAL",
      "GET_METODO_PAGO",
      "GET_ITEMS",
      "GET_RESPUESTA"
    ]),
    guardar() {
      this.guardarVenta();
      this.showModal();
    },
    showModal() {
      this.$store.commit("venta/SET_RESPUESTA", { status: undefined });
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();

      if (this.GET_RESPUESTA().status === 204) {
        this.$store.commit("producto/INICIALIZAR_PRODUCTO");
        // this.$store.dispatch("producto/buscarProductos");
      }
    }
  },
  computed: {
    // Total() {
    //   console.log("total:", this.total);
    //   this.CALCULAR_TOTAL();
    //   return this.total;
    // },
    total: {
      get: function() {
        this.CALCULAR_TOTAL();
        return this.GET_TOTAL();
      },
      set: function(total) {
        this.SET_TOTAL(total);
      }
    },
    MetodoPago: {
      get: function() {
        console.log("this.GET_METODO_PAGO()", this.GET_METODO_PAGO());
        return this.GET_METODO_PAGO();
      },
      set: function(value) {
        this.SET_METODO_PAGO(value);
      }
    },
    habilitar: function() {
      if (this.MetodoPago === null || this.GET_ITEMS().length === 0) {
        console.log("agregaste producto y eligiste un medio pago");
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>