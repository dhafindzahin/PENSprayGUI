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
