
///head

  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>

  </head>
///trying to make this cleaner somehow, for now just copy and paste wherever you want the capacity tracker
<canvas id="capChart" style="width:100%;max-width:700px;display: block;margin: auto;">
  <script>
    var xValues = ["Filled", "Empty"];
    var yValues = [25, 10];
    var barColors = ["#ffd349"];
    
    new Chart("capChart", {
        type: "doughnut",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          title: {
            display: true,
            text: "Current Capacity"
          }
        }
      });
    
    </script>
</canvas>