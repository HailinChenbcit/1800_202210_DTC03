// let hikeID = localStorage.getItem("hikeID");

// db.collection("Hikes")
//   .where("id", "==", hikeID)
//   .get()
//   .then((queryHike) => {
//     //see how many results you have got from the query
//     size = queryHike.size;
//     // get the documents of query
//     Hikes = queryHike.docs;

//     // We want to have one document per hike, so if the the result of
//     //the query is more than one, we can check it right now and clean the DB if needed.
//     if ((size = 1)) {
//       var thisHike = Hikes[0].data();
//       hikeName = thisHike.name;
//       console.log(hikeName);
//       document.getElementById("HikeName").innerHTML = hikeName;
//     } else {
//       console.log("Query has more than one data");
//     }
//   })
//   .catch((error) => {
//     console.log("Error getting documents: ", error);
//   });

function writeCheckIn() {
  console.log("in");
  let FirstName = document.getElementById("FirstName").value;
  let LastName = document.getElementById("LastName").value;
  let email = document.getElementById("email").value;
  let Phone = document.getElementById("Phone").value;
  let ArrivalTime = document.getElementById('ArrivalTime').value;
  let PartySize = document.getElementById("PartySize").value;
  console.log(FirstName, LastName, email, Phone, ArrivalTime, PartySize);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        var email = userDoc.data().email;
        db.collection("CheckInRequests")
          .add({
            restaurant: restaurantID,
            userID: userID,
            FirstName: FirstName,
            LastName: LastName,
            email: email,
            Phone: Phone,
            ArrivalTime: ArrivalTime,
            PartySize: PartySize,
          })
          .then(() => {
            window.location.href = "confirmation.html";
          });
      });
    } else {
      // No user is signed in.
    }
  });
}
