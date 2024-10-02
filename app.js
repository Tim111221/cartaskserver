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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Add a new note
const addNoteBtn = document.getElementById('addNoteBtn');
addNoteBtn.addEventListener('click', () => {
    const noteInput = document.getElementById('noteInput').value;

    if (noteInput) {
        db.collection("notes").add({
            note: noteInput,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            document.getElementById('noteInput').value = ''; // Clear the input
            loadNotes(); // Reload notes
        })
        .catch((error) => {
            console.error("Error adding note: ", error);
        });
    }
});

// Load and display notes
function loadNotes() {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = ''; // Clear container

    db.collection("notes").orderBy("timestamp", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const noteData = doc.data();
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.textContent = noteData.note;
            notesContainer.appendChild(noteElement);
        });
    });
}

// Load notes on page load
loadNotes();
