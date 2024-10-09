// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// Handle form submission
const form = document.getElementById('waitlistForm');
const emailInput = document.getElementById('email');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value;
  
  // Add email to Firebase
  const newEmailRef = database.ref('waitlist').push();
  newEmailRef.set({
    email: email,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  })
  .then(() => {
    alert('Thank you for joining our waitlist!');
    emailInput.value = '';
  })
  .catch((error) => {
    console.error('Error adding email to waitlist: ', error);
    alert('Oops! Something went wrong. Please try again later.');
  });
});
