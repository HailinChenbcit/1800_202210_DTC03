function writeRestList() {
    //define a variable for the collection you want to create in Firestore to populate data
    var listRef = db.collection("Restaurants");

    listRef.add({
        id: "DT01",
        name: "Peaceful Restaurant",
        description: "some description here",
        coordinates: [-123.11535188078236, 49.28274402264293],
        url: "https://en.wikipedia.org/wiki/Main_Page",
        capacity: 50,
    });
    listRef.add({
        id: "DT02",
        name: "Hawksworth Restaurant",
        description: "some description here",
        coordinates: [-123.11934112777243, 49.28341752492466],
        url: "https://en.wikipedia.org/wiki/Main_Page",
        capacity: 50,

    });
    listRef.add({
        id: "DT03",
        name: "Gyoza Bar",
        description: "some description here",
        coordinates: [-123.1143726547167, 49.284259162539655],
        url: "https://en.wikipedia.org/wiki/Main_Page",
        capacity: 50,

    });
    listRef.add({
        id: "DT04",
        name: "Kim House",
        description: "some description here",
        coordinates: [-123.11430484944383, 49.28352322905107],
        url: "https://en.wikipedia.org/wiki/Main_Page",
        capacity: 50,

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
                // var restDescrip = doc.data().description

                let restCard = restListTemplate.content.cloneNode(true);
                restCard.querySelector('.card-title').innerHTML = restName;
                restCard.querySelector('.card-length').innerHTML = restID;
                restCard.querySelector('a').onclick = () => setRestData(hikeID);
                restCardGroup.appendChild(restCard);
            })

        })
}
populateCardsDynamically();

function setRestData(id) {
    localStorage.setItem('restID', id);
}
