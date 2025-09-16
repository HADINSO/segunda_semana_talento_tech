let energyData = []; // Lista de datos actual

const tbody = document.querySelector('#energyTable tbody');
const form = document.getElementById('energyForm');
const resultDiv = document.getElementById('result');

// Función para mostrar la tabla con los datos
function displayTable(data) {
  tbody.innerHTML = '';
  data.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.year}</td>
      <td>${row.wind_generation}</td>
      <td>${row.solar_energy_consumption}</td>
      <td>${row.hydropower_consumption}</td>
      <td>${row.biofuel_production}</td>
      <td>${row.installed_geothermal_capacity}</td>
      <td>${row.total_electricity_consumption}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Cargar datos simulados inicialmente
function loadDefaultData() {
  energyData = [
    {
      year: 2020,
      wind_generation: 1200,
      solar_energy_consumption: 900,
      hydropower_consumption: 1500,
      biofuel_production: 600,
      installed_geothermal_capacity: 200,
      total_electricity_consumption: 6000
    },
    {
      year: 2021,
      wind_generation: 1300,
      solar_energy_consumption: 1000,
      hydropower_consumption: 1600,
      biofuel_production: 650,
      installed_geothermal_capacity: 250,
      total_electricity_consumption: 6500
    },
    {
      year: 2022,
      wind_generation: 1400,
      solar_energy_consumption: 1100,
      hydropower_consumption: 1700,
      biofuel_production: 700,
      installed_geothermal_capacity: 300,
      total_electricity_consumption: 7000
    }
  ];

  displayTable(energyData);
}

// Leer archivo CSV cuando el usuario lo sube
document.getElementById('csvFile').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: function(results) {
      // Validar que tenga los campos necesarios
      const requiredFields = [
        'year',
        'wind_generation',
        'solar_energy_consumption',
        'hydropower_consumption',
        'biofuel_production',
        'installed_geothermal_capacity',
        'total_electricity_consumption'
      ];

      const firstRow = results.data[0];
      const missingFields = requiredFields.filter(field => !(field in firstRow));

      if (missingFields.length > 0) {
        alert('Faltan columnas en el CSV: ' + missingFields.join(', '));
        return;
      }

      energyData = results.data;
      displayTable(energyData);
      alert('¡Datos cargados correctamente desde el archivo CSV!');
    },
    error: function(err) {
      alert('Error al leer el archivo CSV: ' + err.message);
    }
  });
});

// Formulario para calcular el porcentaje de energía renovable
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const userConsumption = parseFloat(document.getElementById('userConsumption').value);
  if (isNaN(userConsumption) || userConsumption <= 0) {
    alert('Por favor ingrese un valor válido mayor que 0.');
    return;
  }

  if (energyData.length === 0) {
    alert('No hay datos cargados para realizar el cálculo.');
    return;
  }

  const latestData = energyData[energyData.length - 1];

  const totalRenewableProduction = latestData.wind_generation +
                                   latestData.solar_energy_consumption +
                                   latestData.hydropower_consumption +
                                   latestData.biofuel_production +
                                   latestData.installed_geothermal_capacity;

  const proportionRenewable = totalRenewableProduction / latestData.total_electricity_consumption;

  const userRenewableEnergy = userConsumption * proportionRenewable;
  const percentageRenewable = (userRenewableEnergy / userConsumption) * 100;

  resultDiv.style.display = 'block';
  resultDiv.textContent = `Se estima que aproximadamente el ${percentageRenewable.toFixed(2)}% de su consumo eléctrico puede provenir de fuentes renovables.`;
});

// Cargar datos simulados al iniciar
loadDefaultData();