let restID = localStorage.getItem("restID");

// populate restaurants detail cards
db.collection("Restaurants")
  .where("id", "==", restID)
  .get()
  .then((queryRest) => {
    size = queryRest.size;
    Rests = queryRest.docs;

    if (size == 1) {
      var thisRest = Rests[0].data();
      restaurant_name = thisRest.name;
      rate = thisRest.rating;
      cuisine = thisRest.cuisine;
      price = thisRest.price;
      description = thisRest.description;
      document.getElementById("Rest_Name").innerHTML = restaurant_name;
      document.getElementById("details").innerHTML = "<br>" + "<h5> Rating: </h5>" + rate + "<h5> Cuisine: </h5>" + cuisine + "<br>" + "<h5>Price: </h5>" + price + "<br>" + description + "<br>";
      make_doughnut_chart(restaurant_name);
      get_reviews(restaurant_name);
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
      total_cap = thisRest.capacity;
      current_pop = thisRest.current_population;
      open_seats = total_cap - current_pop;
      make_doughnut_chart(current_pop, open_seats);
    } else {
      console.log("Query has more than one data");
    }
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

// Doughnut chart 
function make_doughnut_chart(current_pop, open_seats) {
  // this function creates the populated doughnut chart
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

// get restaurant reviews
function get_reviews(restaurant_name) {
  let reviewCardTemplate = document.getElementById("reviewCardTemplate");
  let ReviewCardGroup = document.getElementById("ReviewCardGroup");

  db.collection("Reviews")
    .where("name", "==", restaurant_name)
    .limit(5) //limit to 5
    .get()
    .then((allReviews) => {
      allReviews.forEach((doc) => {
        var FirstName = doc.data().FirstName; //gets the Firstname field
        var Rating = doc.data().Rating; //gets the rating ID field
        var Review = doc.data().Review; //gets the review field
        var timestamp = doc.data().timestamp.toDate(); // gets the timestamp from review

        let testReviewCard = reviewCardTemplate.content.cloneNode(true);
        testReviewCard.querySelector(".card-title").innerHTML = FirstName;
        testReviewCard.querySelector(".card-length").innerHTML = "Rating: " + Rating + " / 5 <br>";
        testReviewCard.querySelector(".card-text").innerHTML = Review;
        testReviewCard.querySelector(".text-muted").innerHTML = timestamp

        ReviewCardGroup.appendChild(testReviewCard);
      });
    });
}
