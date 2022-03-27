function writeRestList() {
    //define a variable for the collection you want to create in Firestore to populate data
    var listRef = db.collection("Restaurants");

    listRef.add({
        id: "DT01",
        name: "Peaceful Restaurant",
        cuisine: "Chinese",
        description: "some description here",
        rating: "3.4/5",
        price: "$$",
        coordinates: [-123.11535188078236, 49.28274402264293],
        url: "https://www.peacefulrestaurant.com/",
        capacity: 50,
        current_population: 30
    });
    listRef.add({
        id: "DT02",
        name: "Hawksworth Restaurant",
        cuisine: "Steakhouse",
        description: "some description here",
        rating: "4.4/5",
        price: "$$$$",
        coordinates: [-123.11934112777243, 49.28341752492466],
        url: "https://hawksworthrestaurant.com/",
        capacity: 30,
        current_population: 10

    });
    listRef.add({
        id: "DT03",
        name: "Gyoza Bar",
        cuisine: "Japanese",
        description: "some description here",
        rating: "4.2/5",
        price: "$$",
        coordinates: [-123.1143726547167, 49.284259162539655],
        url: "https://gyozabar.ca/",
        capacity: 50,
        current_population: 50

    });
    listRef.add({
        id: "DT04",
        name: "Kim House",
        cuisine: "Korean",
        description: "some description here",
        rating: "3.7/5",
        price: "$",
        coordinates: [-123.11430484944383, 49.28352322905107],
        url: "https://en.wikipedia.org/wiki/Main_Page",
        capacity: 50,
        current_population: 45

    });
}

// Display Cards
function populateCardsDynamically() {
    let restListTemplate = document.getElementById("restListTemplate");
    let restCardGroup = document.getElementById("restCardGroup");

    db.collection("Restaurants").get() // get all docs in 'Restaurants'
        .then(allRestaurants => {
            allRestaurants.forEach(doc => {
                var restName = doc.data().name;
                var restID = doc.data().id;
                // var restDesc = doc.data().description

                let restCard = restListTemplate.content.cloneNode(true);
                restCard.querySelector('.card-title').innerHTML = restName;
                restCard.querySelector('#check_in').onclick = () => setRestData(restID);
                restCard.querySelector('#detail').onclick = () => setRestData(restID);
                restCard.querySelector('#review').onclick = () => setRestData(restID);
                restCard.querySelector('img').src = `../images/${restID}.jpg`;
                restCardGroup.appendChild(restCard);
            })

        })
}
populateCardsDynamically();

// LocalStorage RestaurantName
function setRestData(id) {
    localStorage.setItem("restID", id);
}
