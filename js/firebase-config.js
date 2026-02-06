/**
 * Firebase Configuration
 *
 * IMPORTANT SECURITY NOTE:
 * Firebase client-side API keys are designed to be public - this is expected.
 * Your database security comes from Firebase Security Rules, NOT from hiding these keys.
 *
 * Make sure you have set up proper Security Rules in your Firebase Console:
 * https://console.firebase.google.com/project/cruz-6d1a8/database/rules
 *
 * Recommended Security Rules for your database:
 * {
 *   "rules": {
 *     "communitySubmissions": {
 *       ".read": false,
 *       ".write": true,
 *       "$submission": {
 *         ".validate": "newData.hasChildren(['email', 'timestamp']) &&
 *                       newData.child('email').isString() &&
 *                       newData.child('email').val().matches(/^[^@]+@[^@]+\\.[^@]+$/) &&
 *                       newData.child('timestamp').isNumber()"
 *       }
 *     }
 *   }
 * }
 *
 * This ensures:
 * - Only valid email submissions can be written
 * - No one can read the submissions (only you via Firebase Console)
 * - Data must have proper structure
 */

const firebaseConfig = {
    apiKey: "AIzaSyCvbd9rlcWdb7h9cdbUCqBu78Z2JFRyvfc",
    authDomain: "cruz-6d1a8.firebaseapp.com",
    databaseURL: "https://cruz-6d1a8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cruz-6d1a8",
    storageBucket: "cruz-6d1a8.firebasestorage.app",
    messagingSenderId: "962412863879",
    appId: "1:962412863879:web:09fb7d1c24b94bc7c03322"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();
