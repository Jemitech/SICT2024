// Firebase configuration
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
  

// Function to display loading animation
function showLoading() {
    document.getElementById("loading").style.display = "block";
  }
  
  // Function to hide loading animation
  function hideLoading() {
    document.getElementById("loading").style.display = "none";
  }
  
  // Function to retrieve data from Firestore
  async function retrieveData() {
    showLoading(); // Show loading animation
    var table = document.getElementById("table");
    table.innerHTML = ""; // Clear previous data
  
    const thead = `
      <tr class="head">
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Reg No</th>
        <th>Department</th>
        <th>Level</th>
        <th>Status</th>
      </tr>
    `;
  
    try {
      // Add the table head
      table.innerHTML += thead;
  
      let count = 0; // Counter for numbering rows
  
      // Get data from Firestore and set up real-time listener
      db.collection("reqs").onSnapshot(function(snapshot) {
        snapshot.forEach(function(doc) {
          const obj = doc.data();
          const uid = doc.id;
  
          var userRow;
          if (obj.confirmed) {
            userRow = `
              <tr id="${uid}">
                <td>${++count}</td>
                <td>${obj.name}</td>
                <td>${obj.email}</td>
                <td>${obj.reg}</td>
                <td>${obj.dept}</td>
                <td>${obj.lvl}</td>
                <td><label class="stat">Confirmed</label></td>
              </tr>
            `;
          } else {
            userRow = `
              <tr id="${uid}">
                <td>${++count}</td>
                <td>${obj.name}</td>
                <td>${obj.email}</td>
                <td>${obj.reg}</td>
                <td>${obj.dept}</td>
                <td>${obj.lvl}</td>
                <td><button onclick="ConfirmUser('${uid}')">Confirm</button></td>
              </tr>
            `;
          }
  
          // Check if a row with the same ID already exists
          const existingRow = document.getElementById(uid);
          if (!existingRow) {
            table.innerHTML += userRow;
          } else {
            existingRow.innerHTML = userRow; // Update existing row
          }
        });
  
        // Update row numbers
        updateRowNumbers();
        countTotalUsers();
        countConfirmedUsers();
        countUnconfirmedUsers();
        hideLoading(); // Hide loading animation after data is loaded
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
      hideLoading(); // Hide loading animation if there's an error
    }
  }
  
  
  // Function to update row numbers
  function updateRowNumbers() {
    const table = document.getElementById("table");
    const rows = table.querySelectorAll("tr:not(.head)");
    rows.forEach((row, index) => {
      row.querySelector("td:first-child").textContent = index + 1;
    });
  }
  
  
  // Listen for changes in the database and call retrieveData function
  db.collection("reqs").onSnapshot(() => retrieveData());
  
  // Function to check if confirmed is false
  async function checkConfirmed(userId) {
    try {
      const doc = await db.collection("reqs").doc(userId).get();
  
      if (doc.exists) {
        const confirmed = doc.data().confirmed;
        console.log("Confirmed is", confirmed, "for user:", userId);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  }
  
  // Function to update confirmed to true
  async function ConfirmUser(userId) {
    try {
      await db.collection("reqs").doc(userId).update({
        confirmed: true
      });
      console.log("User confirmed successfully!");
    } catch (error) {
      console.error("Error confirming user: ", error);
    }
  }
  
  // Function to count total users in the database
  async function countTotalUsers() {
    try {
      const querySnapshot = await db.collection("reqs").get();
      total.textContent = querySnapshot.size; // Return the size of the query snapshot (total documents)
    } catch (error) {
      console.error("Error counting total users: ", error);
    }
  }
  
  // Function to count confirmed users in the database
  async function countConfirmedUsers() {
    try {
      const querySnapshot = await db.collection("reqs").where("confirmed", "==", true).get();
      con.textContent = querySnapshot.size; // Return the size of the query snapshot (total documents)
    } catch (error) {
      console.error("Error counting confirmed users: ", error);
    }
  }
  
  // Function to count unconfirmed users in the database
  async function countUnconfirmedUsers() {
    try {
      const querySnapshot = await db.collection("reqs").where("confirmed", "==", false).get();
      un.textContent = querySnapshot.size; // Return the size of the query snapshot (total documents)
    } catch (error) {
      console.error("Error counting unconfirmed users: ", error);
    }
  }
  
  // Call functions when window is loaded
  window.onload = () => {
    retrieveData();
    countTotalUsers();
    countConfirmedUsers();
    countUnconfirmedUsers();
  };
  