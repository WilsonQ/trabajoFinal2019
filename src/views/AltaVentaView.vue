<template>
  <b-container>
    <h1>Nueva Venta</h1>
    <Formulario />
    <Tabla />
  </b-container>
</template>

<script>
// @ is an alias to /src
import Formulario from "@/components/FormularioVenta";
import Tabla from "@/components/TablaVenta";

export default {
  name: "AltaProductoView",
  components: {
    Formulario,
    Tabla
  }
};
</script>