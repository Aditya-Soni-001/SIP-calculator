let chart;

function calculateSIP() {
  const amount = parseFloat(document.getElementById("amount").value);
  const duration = parseInt(document.getElementById("duration").value);
  const roi = parseFloat(document.getElementById("roi").value);
  const resultDiv = document.getElementById("result");

  if (
    isNaN(amount) ||
    isNaN(duration) ||
    isNaN(roi) ||
    amount <= 0 ||
    duration <= 0 ||
    roi < 0
  ) {
    resultDiv.innerHTML =
      "<strong>Please enter valid positive values.</strong>";
    return;
  }

  const monthlyRate = roi / 12 / 100;
  let futureValue = 0;
  let dataPoints = [];
  let invested = 0;

  for (let i = 1; i <= duration; i++) {
    futureValue =
      amount *
      ((Math.pow(1 + monthlyRate, i) - 1) / monthlyRate) *
      (1 + monthlyRate);
    invested = amount * i;
    dataPoints.push({
      month: `Month ${i}`,
      value: futureValue.toFixed(2),
    });
  }

  const totalInvested = amount * duration;
  const totalGain = futureValue - totalInvested;

  resultDiv.innerHTML = `
        <strong>Future Value:</strong> ₹${futureValue.toFixed(2)}<br/>
        <strong>Total Invested:</strong> ₹${totalInvested.toFixed(2)}<br/>
        <strong>Estimated Returns:</strong> ₹${totalGain.toFixed(2)}
      `;

  // Show chart
  document.getElementById("chartSection").style.display = "block";
  const ctx = document.getElementById("sipChart").getContext("2d");

  // Destroy previous chart instance if exists
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dataPoints.map((dp) => dp.month),
      datasets: [
        {
          label: "SIP Growth (₹)",
          data: dataPoints.map((dp) => dp.value),
          borderColor: "#00c6ff",
          backgroundColor: "rgba(0, 198, 255, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#333",
          },
        },
        x: {
          ticks: {
            color: "#333",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#333",
          },
        },
      },
    },
  });
}
