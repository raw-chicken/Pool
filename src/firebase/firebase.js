// Import the functions you need from the SDKs you need\n\n
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, remove, get, onValue } from "firebase/database";
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


/* Event Functions */

// Given a description, create an event
export function createEvent(name, desc, date, time) {
  
  // const current = new Date();
  // const curr_time = current.toLocaleTimeString("en-US");

  // const plain_text = curr_time + name + desc + date + time;

  // const hash = crypto.MD5(plain_text).toString()
  let eventID = v1([name, desc, date, time], 7);
  console.log(eventID);

  set(ref(database, 'events/' + eventID), {
    name: name,
    description: desc,
    date: date,
    time: time,
  });

  return eventID;
}

export async function getEvent(eventID, page) {
  let val = "NOTHING TO SEE HERE";
  await get(ref(database, 'events/' + eventID)).then((snapshot) => {
    if (snapshot.exists()) {
      val = snapshot.val();
    }
  }).catch((error) => {
    console.error(error);
  });
  page.setState({
    id: eventID,
    name: val.name,
    description: val.description,
    groups: val.groups,
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

/* Group Functions */

export async function createGroup(driver, capacity, model, plates, desc, eventID) {
  const groupID = v1([driver, capacity, desc, eventID], 7);
  const driverID = v1([driver], 7);

  // A post entry.
  const groupData = {
    driver: driver,
    capacity: capacity,
    model: model,
    plates: plates,
    desc: desc,
  };

  set(ref(database, 'events/' + eventID + '/groups/' + groupID), true);
  set(ref(database, 'groups/' + groupID), groupData);
  set(ref(database, 'groups/' + groupID + '/passengers/' + driverID), driver);

  return groupID;
}

export function editGroup(driver, capacity, model, plates, desc, groupID) {
  const updates = {};
  updates['groups/' + groupID + '/driver'] = driver;
  updates['groups/' + groupID + '/capacity'] = capacity;
  updates['groups/' + groupID + '/model'] = model;
  updates['groups/' + groupID + '/plates'] = plates;
  updates['groups/' + groupID + '/desc'] = desc;

  return update(ref(database), updates)
}

export async function updateGroupInfo(groupID, page) {
  let val = "NOTHING TO SEE HERE";
  await get(ref(database, 'groups/' + groupID)).then((snapshot) => {
    if (snapshot.exists()) {
      val = snapshot.val();
    }
  }).catch((error) => {
    console.error(error);
  });
  page.setState({
    update: true,
    id: groupID,
    driver: val.driver,
    capacity: val.capacity,
    desc: val.desc,
    model: val.model,
    plate: val.plates,
    passengers: val.passengers,
    count: Object.keys(val.passengers).length
  });

  return val;
}

export function deleteGroup(eventID, groupID) {
  remove(ref(database, 'events/' + eventID + '/groups/' + groupID));
  remove(ref(database, 'groups/' + groupID));
  remove(ref(database, 'chats/' + groupID));
}

export function addPassenger(groupID, userName, userId) {
  update(ref(database, 'groups/' + groupID + "/passengers"), {
    [userId]: userName
  });
}


export function removePassenger(memberID, groupID) {
  remove(ref(database, 'groups/' + groupID + '/passengers/' + memberID));
}


/* End Group Functions */

/* Chat Functions */

export function addMessage(name, text, groupId) {
  const time = new Date()
  set(ref(database, 'chats/' + groupId + "/" + time.getTime()), {
    name: name,
    text: text
  })
}

export function mountChat(state) {
  try {
    const messages = ref(database, 'chats/' + state.state.groupID);
    return onValue(messages, (snapshot) => {
      state.state.chats = snapshot.val() === null ? {} : snapshot.val()
    });
  } catch (error) {
    console.log(error)
  }
  return "Mount failed";
}

/* End Chat Functions */

/* Hash Function */
function v1(values, length) {
  let plain_text = "";
  for (const e of values)
    plain_text += e.toString();
  plain_text += new Date().toString();

  return crypto.MD5(plain_text).toString().substring(0, length);
}