import {initializeApp} from 'firebase'

const app = initializeApp({
        apiKey: "AIzaSyDsL5PSlKEg01TD74h_jexha0EUjGUSAHs",
        authDomain: "fullmanager-1bd4a.firebaseapp.com",
        databaseURL: "https://fullmanager-1bd4a.firebaseio.com",
        projectId: "fullmanager-1bd4a",
        storageBucket: "fullmanager-1bd4a.appspot.com",
        messagingSenderId: "165805010940",
        appId: "1:165805010940:web:0b0964ac527447d8b84c79",
        measurementId: "G-DSL9SSYFHH"
});

export const db = app.database();
export const namesRef = db.ref('names');
export const auth = app.auth();