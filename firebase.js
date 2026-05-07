import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBN43Acg9XtLtgI2-H-J8iiKUK4Fgj_Tkw",
  authDomain: "patel-oil-cake.firebaseapp.com",
  projectId: "patel-oil-cake",
  storageBucket: "patel-oil-cake.firebasestorage.app",
  messagingSenderId: "528770292318",
  appId: "1:528770292318:web:d715b1ed8f84bd95d632cf",
  measurementId: "G-XGHPB72KJS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("enquiryForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = e.target.querySelector("button[type=submit]");
  btn.textContent = "Submitting...";
  btn.disabled = true;

  const data = {
    name:      document.getElementById("name").value.trim(),
    phone:     document.getElementById("phone").value.trim(),
    email:     document.getElementById("email").value.trim(),
    product:   document.getElementById("product").value,
    quantity:  document.getElementById("quantity").value.trim(),
    message:   document.getElementById("message").value.trim(),
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, "enquiries"), data);
    document.getElementById("successModal").classList.add("show");
    e.target.reset();
  } catch (err) {
    alert("Something went wrong. Please try again.\n" + err.message);
  } finally {
    btn.textContent = "Submit Enquiry";
    btn.disabled = false;
  }
});
