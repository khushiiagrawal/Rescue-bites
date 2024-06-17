const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
    apiKey: "AIzaSyBggSg6ikV-ZylwW6BECo029o1FFwzwXPI",
    authDomain: "playground-1b1cc.firebaseapp.com",
    databaseURL: "https://playground-1b1cc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "playground-1b1cc",
    storageBucket: "playground-1b1cc.appspot.com",
    messagingSenderId: "840255669560",
    appId: "1:840255669560:web:05724e33d1c06144f76dcd"
  };

  const app = initializeApp(firebaseConfig);
const database=getDatabase(app)
const shoppingListInDb= ref(database,"shoppingList")
const inputj = document.getElementById("input");
const buttonj = document.getElementById("button");

// Add an event listener to the button
buttonj.addEventListener("click", function() {
    let inputvalue = inputj.value;
   
    push(shoppingListInDb,inputvalue)
    
    console.log(inputvalue);
    

});
