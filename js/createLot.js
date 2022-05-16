import {myDB} from "./db/db.js";
import {Lot} from "./entities/lot.js";
import {collection, where, query, getDocs} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import {
    priceInput,
    stepInput,
    dateInput,
    createLotBtn,
    itemSelect
} from "./general.js";

const itemsRef = collection(myDB.db, "items");
const q = query(itemsRef, where("ownerId", "==", localStorage.getItem("name")));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc)=>{
    const opt = document.createElement('option');
    opt.value = doc.id;
    opt.innerHTML = doc.data().itemName;
    itemSelect.appendChild(opt);

});

const CreateLot = async () => {
    await myDB.addLot(new Lot(4, priceInput.value, stepInput.value, priceInput.value, itemSelect.value, null, dateInput.value));
    window.location.href = 'myItems.html';
}
createLotBtn.addEventListener("click", CreateLot)