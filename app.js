//Obtenemos los componentes del HMTL
const canvas = document.getElementById("grafica");
const ctx = canvas.getContext("2d");
const btnDibujar = document.querySelector("#dibujar");
const frequencyInput = document.getElementById("frequency");
const amplitudeInput = document.getElementById("amplitude");
const phaseInput = document.getElementById("phase");
const componente = document.getElementById("componente");


//Opciones de Chart.js
const grafico = new Chart(ctx, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Grafica",
        borderColor: "#381DFF",
        borderWidth: 1,
        fill: false,
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "linear",
        min: 0,
        max: 3,
      },
      y: {
        type: "linear",
        min: -amplitude,
        max: amplitude,
      },
    },
    datasets: {
      line: {
        pointRadius: 0, 
      },
    },
    elements: {
      point: {
        radius: 0, 
      },
    },
  },
});

function graficar() {

  //obtenemos parametros para realizar la grafica
  const frequency = Number(frequencyInput.value);
  const amplitude = Number(amplitudeInput.value);
  const phase = Number(phaseInput.value);

  let data = [];
  let k = componente.value * 2;
  for (let i = 0; i < canvas.width; i++) {
    let x = (i / canvas.width) * Math.PI;
    let y = 0;
    for (let j = 0; j <= k; j++) {
      if (j % 2 != 0) {
        y += (amplitude * (1 / j) * Math.sin(2 * Math.PI * frequency * j * x + phase) );
      }
    }
    data.push({ x, y });
  }

  grafico.data.datasets[0]['data'] = data;
  grafico.options.scales.y = {
    type: "linear",
    min: -amplitude,
    max: amplitude,
  }
  grafico.update();
}



btnDibujar.addEventListener('click', (e)=>{
    e.preventDefault(); //prevenioms el comportamiento del submit para evitar recargar la pagina
    canvas.innerHTML = "";
    graficar();
});
