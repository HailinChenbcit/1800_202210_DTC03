let restID = localStorage.getItem("restID");

db.collection("Restaurants")
  .where("id", "==", restID)
  .get()
  .then((queryRest) => {
    //see how many results you have got from the query
    size = queryRest.size;
    // get the documents of query
    Rests = queryRest.docs;
    console.log(Rests);

    if (size == 1) {
      var thisRest = Rests[0].data();
      name = thisRest.name;
      rate = thisRest.rating;
      console.log(name);
      document.getElementById("Rest_Name").innerHTML = name;
      document.getElementById("rating").innerHTML = rate;
    } else {
      console.log("Query has more than one data");
    }
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });



var ctx = document.getElementById("capChart").getContext("doughnut");
total_cap = null;
current_pop = null;
open_seats = null;
db.collection("Restaurants")
  .where("id", "==", restID)
  .get()
  .then((queryRest) => {
    //see how many results you have got from the query
    size = queryRest.size;
    // get the documents of query
    Rests = queryRest.docs;
    console.log(Rests);

    if (size == 1) {
      var thisRest = Rests[0].data();
      total_cap = thisRest.capacity
      current_pop = thisRest.current_population
      open_seats = total_cap - current_pop
      make_doughnut_chart(current_pop, open_seats)
    } else {
      console.log("Query has more than one data");
    }
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });


function make_doughnut_chart(current_pop, open_seats){

  var xValues = ["Filled", "Empty"];
  var yValues = [current_pop, open_seats];
  var barColors = ["#ffd349"];

  new Chart("capChart", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Current Capacity",
      },
    },
  });
}