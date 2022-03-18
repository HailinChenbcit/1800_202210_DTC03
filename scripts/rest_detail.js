let restID = localStorage.getItem("restID");

db.collection("Restaurants").where("id", "==", restID)
  .get()
  .then((queryRest) => {
    //see how many results you have got from the query
    size = queryRest.size;
    // get the documents of query
    Rests = queryRest.docs;
    console.log(Rests)

    if ((size == 1)) {
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
