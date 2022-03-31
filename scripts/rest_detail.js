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
      restaurant_name = thisRest.name;
      rate = thisRest.rating;
      console.log(restaurant_name);
      document.getElementById("Rest_Name").innerHTML = restaurant_name;
      document.getElementById("rating").innerHTML = rate;
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

function get_reviews(restaurant_name) {
  let reviewCardTemplate = document.getElementById("reviewCardTemplate");
  let ReviewCardGroup = document.getElementById("ReviewGroup");

  db.collection("Reviews")
    .where("name", "==", restaurant_name)
    // .orderBy("length") //NEW LINE;  what do you want to sort by?
    .limit(3) //NEW LINE:  how many do you want to get?
    .get()
    .then((allReviews) => {
      console.log("hello")
      allReviews.forEach((doc) => {
        var FirstName = doc.data().FirstName; //gets the Firstname field
        var reviewID = doc.data().id;
        var rating = doc.data().rating; //gets the rating ID field
        var review = doc.data().review; //gets the review field
        var timestamp = doc.data().timestamp; // gets the timestamp from review
        let testReviewCard = reviewCardTemplate.content.cloneNode(true);
        testReviewCard.querySelector(".card-title").innerHTML = FirstName;
        // testReviewCard.querySelector(".card-length").innerHTML = hikeLength;
        //NEW LINE: update to display length, duration, last updated
        testReviewCard.querySelector(".card-length").innerHTML =
          "Length: " +
          doc.data().rating +
          " km <br>" +
          "Duration: " +
          doc.data().review +
          "min <br>" +
          "Last updated: " +
          doc.data().timestamp.toDate();
        
        // // testReviewCard.querySelector("img").src = `./images/${reviewID}.jpg`;

        // testReviewCard.querySelector("i").id = "save-" + reviewID;

        // testReviewCard.querySelector("i").onclick = () =>
        //   saveBookmark(reviewID);

        // // testReviewCard.querySelector(".read-more").href =
        // //   "eachHike.html?hikeName=" + hikeName + "&id=" + reviewID;

        ReviewCardGroup.appendChild(testReviewCard);
      });
    });
}

