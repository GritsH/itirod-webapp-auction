import {myDB} from "./db.js";
import {Lot} from "../entities/lot.js";
import {
    collection,
    where,
    query,
    getDocs,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import {
    priceInput,
    stepInput,
    dateInput,
    createLotBtn,
    itemSelect
} from "../general.js";

const itemsRef = collection(myDB.db, "items");
const q = query(itemsRef, where("ownerId", "==", localStorage.getItem("name")));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc)=>{
    if(doc.data().isLot === false){
        const opt = document.createElement('option');
        opt.value = doc.id;
        opt.innerHTML = doc.data().itemName;
        itemSelect.appendChild(opt);
    }
});

const itemUpdateRef = doc(myDB.db, "items", itemSelect.value);


const CreateLot = async () => {
    // console.log(localStorage);
    const lotid = parseInt(localStorage.getItem("latestLotId")) + 1;
    await myDB.addLot(new Lot(lotid, priceInput.value, stepInput.value, priceInput.value, itemSelect.value, null, dateInput.value));
    localStorage.setItem("latestLotId", lotid.toString());
    // console.log(localStorage);
    await updateDoc(itemUpdateRef, {
        isLot: true
    });
    window.location.href = 'myItems.html';
}
createLotBtn.addEventListener("click", CreateLot)