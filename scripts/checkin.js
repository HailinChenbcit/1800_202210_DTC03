let restID = localStorage.getItem("restID");

// Display dynamic restaurant name
db.collection("Restaurants").where("id", "==", restID)
  .get()
  .then((queryRest) => {
    //see how many results you have got from the query
    size = queryRest.size;
    // console.log(size)
    // get the documents of query
    Rests = queryRest.docs;

    if ((size == 1)) {
      var thisRest = Rests[0].data();
      name = thisRest.name;
      // console.log(name);
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
      db.collection("Restaurants").where("id", "==", restID)
        .get()
        .then(allChecks => {
          allChecks.forEach(doc => {
            var currentCapacity = doc.data().current_population;
            var maxCapacity = doc.data().capacity;
            // console.log(currentCapacity, maxCapacity)
            if (currentCapacity < maxCapacity) {
              db.collection("Restaurants").where("id", "==", restID)
                .get()
                .then(queryCheck => {
                  size = queryCheck.size;
                  Checks = queryCheck.docs;
                  if (size == 1) {
                    id = Checks[0].id;
                    db.collection("Restaurants").doc(id).update({
                      current_population: firebase.firestore.FieldValue.increment(PartySize)
                    })
                  }
                })
            }
            else {
              alert("You can't check in now due to full capacity, please try again later.")
              window.location.replace("checkin.html");
            }
          })
        })
      var currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      //get the document for current user.
      currentUser.get().then(() => {
        db.collection("CheckInRequests")
          .add({
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Phone: Phone,
            ArrivalTime: ArrivalTime,
            PartySize: PartySize,
            UID: userID,
            id: restID,
          })
          .then(() => {
            window.location.href = "confirmation.html";
          })
      });
    }
    else {
      console.log("no user signed in");
    }
  });
}


// Clear data every 3 Hour
function clearCapacity() {
  db.collection("CheckInRequests")
    .get()
    .then((allReviews) => {
      allReviews.forEach((doc) => {
        var curCapacity = doc.data().ArrivalTime;
        var uid = doc.data().UID
        var PartySize = parseInt(doc.data().PartySize)

        int_time = parseInt(curCapacity)
        currentTime = new Date().getHours()
        
        if (curCapacity >= PartySize && currentTime > int_time && Math.abs(int_time - currentTime) > 3) {
          console.log(uid + " will be delete")
          // update Capacity 
          db.collection("Restaurants").where("id", "==", restID)
            .get()
            .then(queryCheck => {
              size = queryCheck.size;
              if (size == 1) {
                id = Checks[0].id;
                db.collection("Restaurants").doc(id).update({
                  current_population: firebase.firestore.FieldValue.increment(-PartySize)
                })
              }
            })
        }
      })
    });
}

clearCapacity()