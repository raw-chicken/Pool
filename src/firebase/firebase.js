// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, child, push, update } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4Omc4TL9_yt6qyhNZO5HQcn7v6B1vyFc",
  authDomain: "pool-ff59e.firebaseapp.com",
  databaseURL: "https://pool-ff59e-default-rtdb.firebaseio.com",
  projectId: "pool-ff59e",
  storageBucket: "pool-ff59e.appspot.com",
  messagingSenderId: "72939662900",
  appId: "1:72939662900:web:676e14f785890802de6461"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);


// Actively listen for database changes on new groups and such
// groups gets info from firebase
// updateGroups updates state which in turn adds component to page
// const groups = ref(database, 'event/' + eventID + '/groups');
// onValue(groups, (snapshot) => {
//   const data = snapshot.val();
//   updateGroups(data);
// });

// Given a description, create an event
export function createEvent(desc) {
  const eventID = -1; // some hashing algorithm
  set(ref(database, 'event/' + eventID), {
    description: desc,
    groups: {},
  });
}

export function createGroup(driver, maxCapacity, description, eventID) {
  const groupID = -1; // some hashing algorithm
  // A post entry.
  const groupData = {
    driver: driver,
    maxCapacity: maxCapacity,
    desc: description
  };

  // Get a key for a new Post.
  const res1 = push(child(ref(database), 'groups'), groupID);
  const res2 = push(child(ref(database), 'events/' + eventID + '/groups'), groupID);
  const res3 = push(child(ref(database), 'chat'), groupID);

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/groups/' + groupID] = groupData;

  return update(ref(database), updates);
}