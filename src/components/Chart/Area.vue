<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    diagramaArea: {
      type: Object,
      default: {
        titulo: "Ventas del Mes",
        etiquetas: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        data: [60, 55, 32, 10, 2, 12, 53]
      }
    }
  },
  data() {
    return {
      gradient2: null
    };
  },
  mounted() {
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

    this.renderChart(
      {
        labels: this.diagramaArea.etiquetas,
        datasets: [
          {
            label: this.diagramaArea.titulo,
            borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
            data: this.diagramaArea.data
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>
