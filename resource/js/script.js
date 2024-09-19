// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, onValue, set, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBIdcK1pDKAVWIM0lVGyIoDSEZEWGCM-Ko",
	authDomain: "penspray-e2a7e.firebaseapp.com",
	projectId: "penspray-e2a7e",
	storageBucket: "penspray-e2a7e.appspot.com",
	messagingSenderId: "336872626858",
	appId: "1:336872626858:web:bf7af616118290f28dced3",
	databaseURL: "https://penspray-e2a7e-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize output element
const speedOutput = document.getElementById("speedOutput");
const heightOutput = document.getElementById("heightOutput");
const lintasSelatanOutput = document.getElementById("lintasSelatanOutput");
const lintasUtaraOutput = document.getElementById("lintasUtaraOutput");
const rotationInput = document.getElementById("rotationInput");
const heightInput = document.getElementById("heightInput");

// Initialize Realtime Database and get a reference to the service
const db = getDatabase();
const speedOutputRef = ref(db, "output/speed");
const heightOutputRef = ref(db, "output/height");
const lintasUtaraOutputRef = ref(db, "output/lintasUtara");
const lintasSelatanOutputRef = ref(db, "output/lintasSelatan");
const latOutputRef = ref(db, "output/lat");
const lngOutputRef = ref(db, "output/lng");
const rotationInputRef = ref(db, "input/rotation");
const heightInputRef = ref(db, "input/height");

// Initialize input value
get(rotationInputRef).then((snapshot) => {
	rotationInput.value = snapshot.val();
});
get(heightInputRef).then((snapshot) => {
	heightInput.value = snapshot.val();
});

// Read realtime data
onValue(
	speedOutputRef,
	(snapshot) => {
		if (snapshot.exists()) {
			speedOutput.innerText = snapshot.val(); // Output the real-time updated data
		} else {
			console.log("N/A");
		}
	},
	(error) => {
		console.error("Error listening to data:", error);
	}
);

onValue(
	heightOutputRef,
	(snapshot) => {
		if (snapshot.exists()) {
			heightOutput.innerText = snapshot.val(); // Output the real-time updated data
		} else {
			console.log("N/A");
		}
	},
	(error) => {
		console.error("Error listening to data:", error);
	}
);

onValue(
	lintasUtaraOutputRef,
	(snapshot) => {
		if (snapshot.exists()) {
			lintasUtaraOutput.innerText = snapshot.val(); // Output the real-time updated data
		} else {
			console.log("N/A");
		}
	},
	(error) => {
		console.error("Error listening to data:", error);
	}
);

onValue(
	lintasSelatanOutputRef,
	(snapshot) => {
		if (snapshot.exists()) {
			lintasSelatanOutput.innerText = snapshot.val(); // Output the real-time updated data
		} else {
			console.log("N/A");
		}
	},
	(error) => {
		console.error("Error listening to data:", error);
	}
);

onValue(
	rotationInputRef,
	(snapshot) => {
		if (snapshot.exists()) {
			rotationInput.value = snapshot.val(); // Output the real-time updated data
		} else {
			console.log("N/A");
		}
	},
	(error) => {
		console.error("Error listening to data:", error);
	}
);

onValue(
	heightInputRef,
	(snapshot) => {
		if (snapshot.exists()) {
			heightInput.value = snapshot.val(); // Output the real-time updated data
		} else {
			console.log("N/A");
		}
	},
	(error) => {
		console.error("Error listening to data:", error);
	}
);

// Set realtime data
rotationInput.addEventListener("change", (e) => {
	set(rotationInputRef, Number(e.target.value))
		.then(() => {
			console.log("data updated");
		})
		.catch((error) => {
			console.error("error: ", error);
		});
});

heightInput.addEventListener("change", (e) => {
	set(heightInputRef, Number(e.target.value))
		.then(() => {
			console.log("data updated");
		})
		.catch((error) => {
			console.error("error: ", error);
		});
});

// Setup map

var droneIcon = L.icon({
    iconUrl: 'resource/image/drone.png',

    iconSize:     [20, 20], // size of the icon
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var cordinate, map, droneMarker;
async function getCordinate() {
	let lat, lng;
	await get(latOutputRef).then((snapshot) => {
		lat = snapshot.val();
	});
	await get(lngOutputRef).then((snapshot) => {
		lng = snapshot.val();
	});
	cordinate = [lat, lng];
}

function generateMap() {
	map = L.map("map").setView(cordinate, 16);
	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);
	droneMarker = L.marker(cordinate, { icon: droneIcon }).addTo(map);
}

function updateMap() {
	map.setView(cordinate, 16)
	droneMarker.setLatLng(cordinate); 
}

await getCordinate();
generateMap()

// Map follow drone

onValue(latOutputRef, (snapshot) => {
	cordinate[0] = snapshot.val();
	updateMap()
});

onValue(lngOutputRef, (snapshot) => {
	cordinate[1] = snapshot.val();
	updateMap()
});
