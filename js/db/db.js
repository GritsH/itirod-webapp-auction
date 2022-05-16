import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import{ getFirestore} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import {collection, addDoc, doc, setDoc} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCxkqdo5AvSUt154BEK0ugZDE4aWuKHUME",
    authDomain: "auction-ee0c0.firebaseapp.com",
    projectId: "auction-ee0c0",
    storageBucket: "auction-ee0c0.appspot.com",
    messagingSenderId: "245231428131",
    appId: "1:245231428131:web:2772487fdb97d2b0a74796",
    measurementId: "G-FG6XBTHYJP"
};

const initTime = Date.now();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class MyDB{
    constructor() {
        this.app = app;
        this.db = db;
    }

    async addUser(user) {
        try {
            const docRef = await setDoc(doc(this.db, "users", user.email.toString()), {
                email: user.email,
                role: user.role
            });
            console.log("Document is written with ID => ", docRef.id);
        } catch (error) {
            console.log("Error adding document => ", error);
        }

    }

    async addItem(item) {
        try {
            const docRef = await setDoc(doc(this.db, "items", item.id.toString()), {
                description: item.description,
                itemName: item.itemName,
                itemType: item.itemType,
                ownerId: item.ownerId
            });
            console.log("Document is written with ID => ", docRef.id);
        } catch (error) {
            console.log("Error adding document => ", error);
        }
    }

    async addLot(lot){
        try {
            const docRef = await setDoc(doc(this.db, "lots", lot.id.toString()), {
                auctionStep: lot.auctionStep,
                currentPrice: lot.currentPrice,
                itemId: lot.itemId,
                leaderId: lot.leaderId,
                startingPrice: lot.startingPrice
            });
            console.log("Document is written with ID => ", docRef.id);
        } catch (error) {
            console.log("Error adding document => ", error);
        }
    }

    getUser(id){

    }

    getItem(id){

    }

    getLot(id){

    }

    updateLot(id, price, lotLeader){

    }
}

export var myDB = new MyDB();
