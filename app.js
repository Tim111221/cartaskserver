// Firebase configuration (replace with your Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyAb6YyOLjk8pB63fginZzoxuFBQcygRqg8",
  authDomain: "cartasker-ce66a.firebaseapp.com",
  projectId: "cartasker-ce66a",
  storageBucket: "cartasker-ce66a.appspot.com",
  messagingSenderId: "137314238220",
  appId: "1:137314238220:web:ed87596fb975c0df1f1329"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Enable offline persistence for Firestore
db.enablePersistence()
    .catch(function (err) {
        if (err.code == 'failed-precondition') {
            console.log("Multiple tabs open, persistence can only be enabled in one tab at a time.");
        } else if (err.code == 'unimplemented') {
            console.log("The current browser does not support all of the features required to enable persistence.");
        }
    });

// Function to add a new note
function addNote() {
    const noteInput = document.getElementById('noteInput').value;
    if (noteInput) {
        const timestamp = new Date(); // Local timestamp to avoid server-side delay
        db.collection("notes").add({
            note: noteInput,
            timestamp: timestamp
        }).then(() => {
            document.getElementById('noteInput').value = ''; // Clear the input field after successful add
        }).catch((error) => {
            console.error("Error adding note: ", error);
        });
    } else {
        alert("Please enter a note before adding!");
    }
}

// Real-time listener to load and display notes
function loadNotes() {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = ''; // Clear the notes container before updating

    db.collection("notes").orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
        notesContainer.innerHTML = ''; // Clear the container for fresh updates
        querySnapshot.forEach((doc) => {
            const noteData = doc.data();
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.textContent = noteData.note;
            notesContainer.appendChild(noteElement);
        });
    });
}

// Event listener for the "Add Note" button
document.getElementById('addNoteBtn').addEventListener('click', addNote);

// Load notes on app startup
loadNotes();

// Load notes on page load
loadNotes();
