var currentUser;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = db.collection("users").doc(user.uid); //global
    // the following functions are always called when someone is logged in
    insertName();
  } else {
    // No user is signed in.
    console.log("No user is signed in");
    window.location.href = "login.html";
  }
});

// show user name in main page
function insertName() {
    // to check if the user is logged in:
    currentUser.get().then((userDoc) => {
      //get the user name
      var user_Name = userDoc.data().name;
      $("#name-goes-here").text(user_Name); //jquery
    });
  }

insertName()