// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, child, remove, get } from "firebase/database";
import crypto from "crypto-js";

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


/* Actions */

// Given a description, create an event
export function createEvent(name, desc, date, time) {
  const current = new Date();
  const curr_time = current.toLocaleTimeString("en-US");

  const plain_text = curr_time + name + desc + date + time;

  const hash = crypto.MD5(plain_text).toString()
  let eventID = hash.substring(0, 7);

  set(ref(database, 'events/' + eventID), {
    name: name,
    description: desc,
    date: date,
    time: time,
  });

  return eventID;
}

export function getEvent(eventID) {
  console.log("GetEVENT");
  let val = "NOTHING TO SEE HERE";
  get(ref(database, 'events/' + eventID)).then((snapshot) => {
    console.log("OwO");
    if (snapshot.exists()) {
      console.log("exists")
      val = snapshot.val();
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  return val;
}

// Edit event
export function editEvent(eventID, name, desc, date, time) {
  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/events/' + eventID + '/name'] = name;
  updates['/events/' + eventID + '/description'] = desc;
  updates['/events/' + eventID + '/date'] = date;
  updates['/events/' + eventID + '/time'] = time;

  return update(ref(database), updates);
}

export function createGroup(driver, maxCapacity, desc, eventID) {
  const current = new Date();
  const curr_time = current.toLocaleTimeString("en-US");

  const plain_text = curr_time + driver + maxCapacity + desc + eventID;

  const hash = crypto.MD5(plain_text).toString()
  const groupID = hash.substring(0, 7);

  // A post entry.
  const groupData = {
    driver: driver,
    maxCapacity: maxCapacity,
    desc: desc,
  };

  set(ref(database, 'events/groups/' + groupID), true);
  set(ref(database, 'groups/' + groupID), groupData);

  return groupID;
}

export function editGroupMetadata(driver, maxCapacity, description, groupID) {
  const groupData = {
    driver: driver,
    maxCapacity: maxCapacity,
    desc: description
  };

  set(ref(database, 'groups/' + groupID), groupData);
}

export function deleteGroup(eventID, groupID) {
  remove(ref(database, 'events/' + eventID + '/groups/' + groupID));
  remove(ref(database, 'groups/' + groupID));
  remove(ref(database, 'chats/' + groupID));
}

export function addMember(name, groupID) {
  const current = new Date();
  const curr_time = current.toLocaleTimeString("en-US");

  const plain_text = curr_time + name + groupID;

  const hash = crypto.MD5(plain_text).toString()
  const memberID = hash.substring(0, 7);

  set(ref(database, 'groups/' + groupID + '/passengers/' + memberID), name);

  return memberID;
}

export function removeMember(memberID, groupID) {
  remove(ref(database, 'groups/' + groupID + '/passengers/' + memberID));
}

/* End Actions */

/* Listeners */

// Actively listen for database changes on new groups and such
// groups gets info from firebase
// updateGroups updates state which in turn adds component to page
// const groups = ref(database, 'event/' + eventID + '/groups');
// onValue(groups, (snapshot) => {
//   const data = snapshot.val();
//   updateGroups(data);
// });


// Message listeners
// const messages = ref(database, 'chat/' + groupID);
// onValue(groups, (snapshot) => {
//   const data = snapshot.val();
//   updateMessages(data);
// });



/* End Listeners */