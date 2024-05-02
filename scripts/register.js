
  const firebaseConfig = {
    apiKey: "AIzaSyD-OQhOq2MPKU-UupmyRjfwmzhKZliBTAY",
    authDomain: "sict2024.firebaseapp.com",
    projectId: "sict2024",
    storageBucket: "sict2024.appspot.com",
    messagingSenderId: "870936567140",
    appId: "1:870936567140:web:fe270adb64b06119586e71",
    measurementId: "G-M1B3FYWKDF"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const regNo = document.getElementById("regNo");
  const department = document.getElementById("department");
  const level = document.getElementById("level");

  // Function to push data to Firestore
  function pushData() {
    const data = {
      name: fullName.value,
      email:email.value,
      reg: regNo.value,
      dept: department.value,
      lvl: level.value,
      confirmed: false,
      // Add more fields as needed
    };

    // Add a new document with a generated ID
    db.collection("reqs").add(data)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        window.location.href = "success_redirect.html"
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        alert("Error adding data. Please try again later.");
      });
  }

  const notify = document.querySelector('.notify');

//   add data to Fire store 

const joinbtn = document.getElementById("joinbtn");
joinbtn.onclick = () => {
 validateForm()
}



function validateForm() {
   pushData()

  if (fullName.value === "") {
    alert("Please enter your full name.");
    return false;
  }

  if (email.value === "" || !isValidEmail(email.value)) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (regNo.value === "") {
    alert("Please enter your registration number.");
    return false;
  }

  if (department.value === "") {
    alert("Please enter your department.");
    return false;
  }

  if (level.value === "" || isNaN(level.value) || parseInt(level.value) < 0 || parseInt(level.value) > 999) {
    alert("Please enter a valid level.");
    return false;
  }

  console.log("Form is valid");
  return true;
}

function isValidEmail(email) {
  // Basic email validation
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}