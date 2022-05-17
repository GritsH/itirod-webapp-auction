import {myDB} from "../db/db.js";
import {myItemsScroll} from "../general.js";

import {
    collection,
    where,
    query,
    getDocs,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// async function deleteItem(itemId) {
//     await myDB.deleteItem(itemId);
// }

const itemsRef = collection(myDB.db, "items");
const q = query(itemsRef, where("ownerId", "==", localStorage.getItem("name")));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    if (doc.data().isLot === false) {
        const name = doc.data().itemName;
        const description = doc.data().description;
        const inDiv = document.createElement('div');
        inDiv.innerHTML = "        <div id=\"divItem" + doc.id + "\" class=\"lot-preview\">" +
            "            <label class=\"item-info\">Name: \"" + name + "\"</label><br>" +
            "            <label class=\"item-info\">Description: \"" + description + "\" </label><br>" +
            "            <hr style=\"width: 95%\">" +
            "            <button id=\"delItemBtn" + doc.id + "\" class=\"delete\">" +
            "                <i class=\"button-text\">delete</i>" +
            "            </button>" +
            "        </div>";
        myItemsScroll.appendChild(inDiv);
        document.getElementById("delItemBtn" + doc.id.toString()).addEventListener("click", function () {
                document.getElementById("divItem" + doc.id.toString()).remove()
            }
        );
    }
});



