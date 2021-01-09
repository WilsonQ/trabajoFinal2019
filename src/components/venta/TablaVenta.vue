<template>
  <v-data-table :headers="headers" :items="itemsComputed" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Nueva Venta</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <div class="flex-grow-1"></div>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">{{codigo}}</v-btn>
        </template>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small @click="BORRAR_ITEM(item)">delete</v-icon>
    </template>

    <template v-slot:item.precio="{ item }">
      <v-text-field
        class="size"
        v-if="item.especial"
        type="number"
        v-model="item.seleccion"
        @change="calcular(item)"
        label="cantidad"
        flat
        solo
        hide-details
        min="1"
      ></v-text-field>
      <v-select
        class="size"
        @change="calcular(item)"
        v-else
        v-model="item.seleccion"
        :items="item.precios"
        label="Categoria"
        hide-details
        flat
        solo
        return-object
      ></v-select>
    </template>
    <template v-slot:item.cantidad="{ item }">
      <v-text-field
        class="size"
        type="number"
        @change="calcular(item)"
        v-model="item.cantidad"
        label="cantidad"
        flat
        solo
        hide-details
        min="1"
      ></v-text-field>
    </template>
    <template v-slot:item.especial="{ item }">
      <v-checkbox
        v-model="item.especial"
        color="orange darken-3"
        value="orange darken-3"
        class="ma-2"
        hide-details
      ></v-checkbox>
    </template>
    <template v-slot:no-data>
      <b-alert show class="ma-2" variant="secondary">Por favor ingrese productos</b-alert>
    </template>
  </v-data-table>
</template>


<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Codigo de Producto",
        align: "left",
        sortable: false,
        value: "codigo"
      },
      { text: "Nombre", value: "nombre" },
      { text: "Precios", value: "precio", sortable: false },
      { text: "Especial", value: "especial", sortable: false },
      { text: "Cantidad", value: "cantidad", sortable: false },
      { text: "SubTotal", value: "subtotal" },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),

  computed: {
    ...mapState("venta", ["codigo", "itemsVenta"]),
    itemsComputed() {
      // console.log("que tiene esto", this.itemsVenta);
      return this.itemsVenta;
    }
  },

  methods: {
    ...mapMutations("venta", ["CALCULAR_SUBTOTAL", "BORRAR_ITEM"]),
    calcular(item) {
      // console.log("CALCULAR_SUBTOTAL...", item);
      const { seleccion, cantidad } = item;
      item.subtotal = seleccion * cantidad;
    }
  }
};
</script>

<style >
.size {
  height: 45px;
}
</style>