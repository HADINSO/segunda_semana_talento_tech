// Tomamos el último año para algunos gráficos
const latestData = energyData[energyData.length - 1];

// Gráfico de barras: Producción por fuente renovable (último año)
const ctxBar = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(ctxBar, {
  type: 'bar',
  data: {
    labels: ['Eólica', 'Solar', 'Hidroeléctrica', 'Biofuel', 'Geotérmica'],
    datasets: [{
      label: 'Producción (GWh)',
      data: [
        latestData.wind_generation,
        latestData.solar_energy_consumption,
        latestData.hydropower_consumption,
        latestData.biofuel_production,
        latestData.installed_geothermal_capacity
      ],
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 99, 132, 0.7)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Gráfico de torta: Participación renovable en consumo eléctrico (último año)
const ctxPie = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(ctxPie, {
  type: 'pie',
  data: {
    labels: ['Renovables', 'Eólica', 'Solar', 'Hidro'],
    datasets: [{
      label: 'Participación (%)',
      data: [
        100, // Para que pie sume, pondremos sólo renovables y las 3 fuentes principales
        latestData.wind_generation / latestData.total_electricity_consumption * 100,
        latestData.solar_energy_consumption / latestData.total_electricity_consumption * 100,
        latestData.hydropower_consumption / latestData.total_electricity_consumption * 100
      ],
      backgroundColor: [
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true
  }
});

// Gráfico de líneas: Tendencia capacidad instalada (últimos años)
const ctxLine = document.getElementById('lineChart').getContext('2d');
const years = energyData.map(d => d.year);
const windCap = energyData.map(d => d.wind_generation);
const solarCap = energyData.map(d => d.solar_energy_consumption);
const geoCap = energyData.map(d => d.installed_geothermal_capacity);

const lineChart = new Chart(ctxLine, {
  type: 'line',
  data: {
    labels: years,
    datasets: [
      {
        label: 'Eólica (GWh)',
        data: windCap,
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
        tension: 0.1
      },
      {
        label: 'Solar (GWh)',
        data: solarCap,
        borderColor: 'rgba(255, 206, 86, 1)',
        fill: false,
        tension: 0.1
      },
      {
        label: 'Geotérmica (GWh)',
        data: geoCap,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        tension: 0.1
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Gráfico de área: Consumo renovable vs convencional
// Para consumo convencional simulamos algunos datos (puedes ajustar)
const renewableConsumption = energyData.map(d => 
  d.wind_generation + d.solar_energy_consumption + d.hydropower_consumption + d.biofuel_production + d.installed_geothermal_capacity
);

const conventionalConsumption = energyData.map(d => d.total_electricity_consumption - renewableConsumption[energyData.indexOf(d)]);

const ctxArea = document.getElementById('areaChart').getContext('2d');
const areaChart = new Chart(ctxArea, {
  type: 'line',
  data: {
    labels: years,
    datasets: [
      {
        label: 'Consumo Renovable (GWh)',
        data: renewableConsumption,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        fill: true,
        tension: 0.2
      },
      {
        label: 'Consumo Convencional (GWh)',
        data: conventionalConsumption,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
        fill: true,
        tension: 0.2
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});