<template>
  <div>
    <b-form-row class="mb-5">
      <!-- <b-row mt="-5"> -->
      <b-col cols="12" md="6">
        <!-- <p>Codigo de Producto</p> -->
        <label for="text-password">Codigo de Producto</label>
        <b-input-group>
          <b-form-input
            type="text"
            v-model="codigo"
            :state="ValidaCodigo"
            placeholder="Minimo 5 caracteres"
          ></b-form-input>

          <b-button variant="success" @click="buscarProducto()">Buscar</b-button>
        </b-input-group>
      </b-col>
      <b-col cols="12" md="1" offset-md="5">
        <b-button class="mt-7" variant="danger" >Borrar</b-button>
      </b-col>
      <!-- </b-row> -->
    </b-form-row>

    <!-- <b-container>
      <b-row>
        <b-col sm="11"></b-col>
        <b-col sm="1">
          <b-button variant="danger">Borrar</b-button>
        </b-col>
      </b-row>
    </b-container>-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
export default {
  
  data(){

    return{

      codigo:'',
      productos:[],
      producto:{}
    }

  },
  
  computed: {
    ...mapGetters(["getProductoVentaData"]),
    ValidaCodigo(){
        return true;
    }
  },
  methods: {
    buscarProducto() {
      // console.log("DATA", this.getProductoVentaData);
      axios.get('https://localhost:44390/api/productos?', {
          params: {
          codigo:this.codigo 
          }
      }).then(response =>
      {
        this.producto = response.data;
        console.log(producto);
      }).catch(e=>{
        this.ErrorModal(e);
      })
    },
    mounted() {
      console.log("DATA", this.getProductoVentaData);
    },
    ErrorModal(error){
      console.log(error)
    }
      
  }
}
</script>

<style>
</style>