let restID = localStorage.getItem("restID");

db.collection("Restaurants").where("id", "==", restID)
  .get()
  .then((queryRest) => {
    //see how many results you have got from the query
    size = queryRest.size;
    console.log(size)
    // get the documents of query
    Rests = queryRest.docs;

    if ((size == 1)) {
      var thisRest = Rests[0].data();
      name = thisRest.name;
      console.log(name);
      document.getElementById("RestName").innerHTML = name;
    } else {
      console.log("Query has more than one data");
    }
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });


// Write Check-in form
function writeCheckIn() {
  let FirstName = document.getElementById("FirstName").value;
  let LastName = document.getElementById("LastName").value;
  let Email = document.getElementById("Email").value;
  let Phone = document.getElementById("Phone").value;
  let ArrivalTime = document.getElementById('ArrivalTime').value;
  let PartySize = document.getElementById("PartySize").value;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        // Start a new collection and add all data in it.
        db.collection("CheckInRequests")
          .add({
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Phone: Phone,
            ArrivalTime: ArrivalTime,
            PartySize: PartySize,
            UID: userID,
          })
          .then(() => {
            // console.log("successful write data")
            window.location.href = "confirmation.html";
          });
      });
    } else {
      // No user is signed in.
      console.log("no user signed in");
    }
  });
}