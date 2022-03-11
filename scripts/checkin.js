// let hikeID = localStorage.getItem("email");

// db.collection("users")
//   .where("email", "==", email)
//   .get()
//   .then((queryUsers) => {
//     //see how many results you have got from the query
//     size = queryUsers.size;
//     // get the documents of query
//     Users = queryUsers.docs;

//     // We want to have one document per hike, so if the the result of
//     //the query is more than one, we can check it right now and clean the DB if needed.
//     if ((size == 1)) {
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
