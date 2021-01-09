<template>
  <b-container>
    <h1>Nueva Venta</h1>
    <Formulario />
    <Tabla />
    <BottonSelect />

    <!-- <b-row>
      <b-col cols="12" md="4">
        <b-form-select v-model="MetodoPago" class="mb-3">
          <option :value="null">Seleccione el medio de pago</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta Credito">Tarjeta Credito</option>
          <option value="Tarjeta de Debito">Tarjeta de Debito</option>
        </b-form-select>
      </b-col>
      <b-col cols="5" offset-md="3" md="2">
        <label for="type-text">TOTAL:</label>
      </b-col>
      <b-col cols="7" md="3">
        <b-input-group>
          <b-form-input disabled type="text" v-model="total"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col offset-md="10" cols="12" md="2">
        <b-button :disabled="habilitar" block @click="guardarVenta()" id="show-btn">Guardar</b-button>
      </b-col>
    </b-row>-->
  </b-container>
</template>

<script>
// @ is an alias to /src
import Formulario from "@/components/venta/FormularioVenta";
import Tabla from "@/components/venta/TablaVenta";
import BottonSelect from "@/components/venta/BottonSelect";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "AltaProductoView",
  data() {
    return {
      seleccion: null
    };
  },
  components: {
    Formulario,
    Tabla,
    BottonSelect
  },
  computed: {
    Total() {
      console.log("total:", this.total);
      this.CALCULAR_TOTAL();
      return this.total;
    },
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
  },
  methods: {
    ...mapMutations("venta", ["CALCULAR_TOTAL", "SET_METODO_PAGO", "SET_TOTAL"]),
    ...mapState("venta", ["total"]),
    ...mapActions("venta", ["guardarVenta"]),
    ...mapGetters("venta", ["GET_TOTAL", "GET_METODO_PAGO", "GET_ITEMS"]),

    submit() {
      this.$store.dispatch("guardarVenta");
    }
  }
};
</script>