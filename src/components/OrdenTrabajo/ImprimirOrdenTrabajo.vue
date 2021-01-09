<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <b-button
        v-if="esNuevo"
        :block="esNuevo"
        variant="outline-info"
        class="mr-5"
        v-on="on"
      >Imprimir</b-button>
      <v-icon v-else-if="!esNuevo" small v-on="on" class="ml-2">print</v-icon>
    </template>
    <v-card>
      <v-toolbar dark>
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Orden de Trabajo</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <!-- <input type="button" onclick="WinPrint('printableArea')" value="print a div!" /> -->
          <!-- <v-btn dark text @click="printDiv('printableArea')">Imprimir</v-btn> -->
          <v-btn dark text @click="telaimprimotoda()">Imprimir</v-btn>
        </v-toolbar-items>
      </v-toolbar>
<div id="imprimiteEsta" allowTaint="true" style="padding: 10px;">
      <div id="printableArea" class="container">
        <div ref="content" id="page">
          <b-row>
            <b-col cols="3">
              <b-img align="left" src="https://i.imgur.com/3LeaF8Y.png" height="222" width="432" allowTaint="true"></b-img>
            </b-col>
            <b-col cols="2"></b-col>
            <b-col cols="4">
              <h3><p align="justify"><b>Orden de trabajo #</b> {{this.ordenTrabajo.id}} <br /></p> </h3>
              <h4><p align="justify"><b>Fecha de Ingreso: </b> {{this.ordenTrabajo.fecha}}</p></h4>
            </b-col>
            <b-col cols="3"></b-col>
          </b-row>
          <b-row>
            <b-col>
              <h3><p align="left"><b>Cliente:</b> {{this.ordenTrabajo.cliente}}<br /></p></h3>
              <h3><p align="left"><b>Contacto:</b> {{this.ordenTrabajo.contacto}} <br /></p></h3>
              <h3><p align="left"><b>Equipo/Marca/Modelo:</b> {{this.ordenTrabajo.equipo}} {{this.ordenTrabajo.marca}} {{this.ordenTrabajo.modelo}}<br /></p></h3>
              <h3><p align="left"><b>Accesorios/Cargador:</b> <br /></p></h3>
              <h3><p align="left"><b>Descripcion de la falla/Tarea a realizar:</b> {{this.ordenTrabajo.descripcion}}<br /></p></h3>
              <h3><p align="left"><b>Contraseña:</b> {{this.ordenTrabajo.password}}<br /></p></h3>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h3><p align="left"><b>Precio estimado:</b> ${{this.ordenTrabajo.costoEstimado}}<br /></p></h3>
            </b-col>
            <b-col>
              <h3><p align="left"><b>Fecha prevista:</b> {{this.ordenTrabajo.fechaEntrega}}<br /></p></h3>
            </b-col>
          </b-row>
          <b-row>
            <div align="justify" id="avisoLegal">
            <h5><p>
              ** Presupuesto valido por 10 dias, sujeto a variacion de stock y cotizacion del dia. **
              </p></h5>
            <h6><p>
              Todo aparato dejado en el laboratorio a efectos de ser reparado y/o confeccionar presupuesto, debera
              ser retirado dentro de los 90 dias a partir de la fecha, reparado o no, caso contrario se considera
              abandonado por su dueño.
              Art. 2525 y 2526 del Codigo Civil, por lo que BG Computacion dispondra del aparato como crea
              conveniente inclusive venderlo, renunciando el propietario a exigir sumna alguna en concepto de
              indemnizacion. Toda suma que hubiese sido entregada a cuenta de reparacion  sera destinada a cubrir
              gastos ocasionados y deposito. </p></h6>
            <h5><p>
              Suc. Pinamar: Totoras 174 - Local 3     Tel:(02254)516484 - Whatsapp: 2254 594 530<br/>
              Lunes a Sabados de 10 a 13 y de 17 a 20:30      BGComputacionPinamar@gmail.com
              </p></h5>
            <h3><p align="center">
              <b-img align="center" src="https://i.imgur.com/7O9tBOo.png" height="42" width="314" allowTaint="true"></b-img>
            </p></h3>
            </div>
          </b-row>
          </div>
      </div>
      <!-- =========================================================================================== -->
      <p align="center">==================================================================================================================================</p>
      <p align="center">==================================================================================================================================</p>
      <!-- =========================================================================================== -->
      <div id="printableArea_2nd" class="container">
        <div ref="content" id="page">
          <b-row>
            <b-col cols="3">
              <b-img align="left" src="https://i.imgur.com/3LeaF8Y.png" height="222" width="432" allowTaint="true"></b-img>
            </b-col>
            <b-col cols="2"></b-col>
            <b-col cols="4">
              <h3><p align="justify"><b>Orden de trabajo #</b>{{this.ordenTrabajo.id}} <br /></p> </h3>
              <h4><p align="justify"><b>Fecha de Ingreso: </b>{{this.ordenTrabajo.fecha}}</p></h4>
            </b-col>
            <b-col cols="3"></b-col>
          </b-row>
          <b-row>
            <b-col>
              <h3><p align="left"><b>Cliente:</b>{{this.ordenTrabajo.cliente}}<br /></p></h3>
              <h3><p align="left"><b>Contacto:</b>{{this.ordenTrabajo.contacto}} <br /></p></h3>
              <h3><p align="left"><b>Equipo/Marca/Modelo:</b> {{this.ordenTrabajo.equipo}} {{this.ordenTrabajo.marca}} {{this.ordenTrabajo.modelo}}<br /></p></h3>
              <h3><p align="left"><b>Accesorios/Cargador:</b> <br /></p></h3>
              <h3><p align="left"><b>Descripcion de la falla/Tarea a realizar:</b> {{this.ordenTrabajo.descripcion}}<br /></p></h3>
              <h3><p align="left"><b>Contraseña:</b> {{this.ordenTrabajo.Password}}<br /></p></h3>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h3><p align="left"><b>Precio estimado:</b>${{this.ordenTrabajo.costoEstimado}}<br /></p></h3>
            </b-col>
            <b-col>
              <h3><p align="left"><b>Fecha prevista:</b> {{this.ordenTrabajo.FechaEntrega}}<br /></p></h3>
            </b-col>
          </b-row>
          <b-row>
            <div align="justify" id="avisoLegal">
            <h5><p>
              ** Presupuesto valido por 10 dias, sujeto a variacion de stock y cotizacion del dia. **
              </p></h5>
            <h6><p>
              Todo aparato dejado en el laboratorio a efectos de ser reparado y/o confeccionar presupuesto, debera
              ser retirado dentro de los 90 dias a partir de la fecha, reparado o no, caso contrario se considera
              abandonado por su dueño.
              Art. 2525 y 2526 del Codigo Civil, por lo que BG Computacion dispondra del aparato como crea
              conveniente inclusive venderlo, renunciando el propietario a exigir suma alguna en concepto de
              indemnizacion. Toda suma que hubiese sido entregada a cuenta de reparacion  sera destinada a cubrir
              gastos ocasionados y deposito. </p></h6>
            <h5><p>
              Suc. Pinamar: Totoras 174 - Local 3     Tel:(02254)516484 - Whatsapp: 2254 594 530<br/>
              Lunes a Sabados de 10 a 13 y de 17 a 20:30      BGComputacionPinamar@gmail.com
              </p></h5>
            <h3><p align="center">
              <b-img align="center" src="https://i.imgur.com/7O9tBOo.png" height="42" width="314" allowTaint="true"></b-img>
            </p></h3>
            </div>
          </b-row>
          </div>
      </div>
</div>
    </v-card>
  </v-dialog>
</template>

<script>
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: {
    esModificar: { type: Boolean, default: false },
    esNuevo: { type: Boolean, default: false },
    esListado: { type: Boolean, default: false },
    orden: { type: Object, default: null }
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    };
  },
  methods: {
    ...mapGetters("ordenTrabajo", ["GET_ORDEN_TRABAJO_IMPRIMIR"]),
        saveImage(e) {
      const filename = "orden.pdf";
      console.log("QUE TRAE ESTO", document.querySelector("#imprimiteEsta"));
      html2canvas(document.querySelector("#imprimiteEsta")).then(canvas => {
        // let pdf = new jsPDF("p", "mm", "a4");
        let pdf = new jsPDF("portrait", "mm", "a4");
        // pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 211, 298);
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 1, 1, 220, 248);
        pdf.save(filename);
        // this.dialog = false;
      });
    },
    
    // saveImage(e) {
    //   const filename = "orden.pdf";
    //   console.log("QUE TRAE ESTO", document.querySelector("#page"));
    //   html2canvas(document.querySelector("#page")).then(canvas => {
    //     // let pdf = new jsPDF("p", "mm", "a4");
    //     let pdf = new jsPDF("portrait", "mm", "a4");
    //     // pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 211, 298);
    //     pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 211, 298);
    //     pdf.save(filename);
    //     // this.dialog = false;
    //   });
    // },

    async telaimprimotodaNOUSAR() {
      html2canvas(document.querySelector("#imprimiteEsta")).then(canvas => {
      document.body.appendChild(canvas)
});


    },

    async telaimprimotoda() {
      let pdf = new jsPDF("portrait", "mm", "a4");
      let canvasElement = document.querySelector("#imprimiteEsta");
      // let canvasElement = this.$resfs.content;
      let width = canvasElement.style.width;
      let height = canvasElement.style.height;

      const canvas = await html2canvas((canvasElement),{allowTaint : true, useCORS: true});
      let image = await canvas.toDataURL("image/png");
      pdf.addImage(image, "JPEG", 1, 1, 220, 248);
      pdf.save("ordenTrabajo.pdf");
    }

    // async htmltopdf() {
    //   let pdf = new jsPDF("portrait", "mm", "a4");
    //   let canvasElement = document.querySelector("#page");
    //   // let canvasElement = this.$resfs.content;
    //   let width = canvasElement.style.width;
    //   let height = canvasElement.style.height;

    //   const canvas = await html2canvas(canvasElement);
    //   let image = await canvas.toDataURL("image/png");
    //   pdf.addImage(image, "JPEG", 14, 20, width, height);
    //   pdf.save("ordenTrabajo.pdf");
    // }
  },
  computed: {
    ordenTrabajo() {
      if (this.esListado) {
        return this.orden;
      } else {
        return this.GET_ORDEN_TRABAJO_IMPRIMIR();
      }
    }
  }
};
</script>
<style >
.imprimir {
  width: 160;
  height: 180;
  /* width: 1000px;
  height: 1190.55px; */
  display: inline-block;
}
.container {
  text-align: center;
}
</style>
