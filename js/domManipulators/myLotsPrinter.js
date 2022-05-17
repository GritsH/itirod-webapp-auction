import {myDB} from "../db/db.js";
import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import {myLots} from "../general.js";


const lotsRef = collection(myDB.db, "lots");
const q = query(lotsRef);
const querySnapshot = await getDocs(q);

const itemsRef = collection(myDB.db, "items");

function getItemNameAndDescription(doc, callback) {
    const itemInfo = [3];
    const q = query(itemsRef, where("id", "==", doc.data().itemId));
    getDocs(q).then(querySnapshot2 => {
        querySnapshot2.forEach((doc_) => {
            itemInfo[0] = doc_.data().itemName;
            itemInfo[1] = doc_.data().description;
            itemInfo[2] = doc_.data().ownerId;
        });
        console.log(itemInfo);
        callback(itemInfo);
    });
}


querySnapshot.forEach((doc) => {
    const startingPrice = doc.data().startingPrice;
    const step = doc.data().auctionStep;
    const date = doc.data().startDate.replace("T", " ");
    const inDiv = document.createElement('div');
    getItemNameAndDescription(doc, (returnedInfo) => {
        console.log(returnedInfo[0], returnedInfo[1]);
        if (returnedInfo[2] === localStorage.getItem("name")) {
            inDiv.innerHTML = " <div class=\"lot-preview\">" +
                "            <label class=\"item-info\">Name:  \"" + returnedInfo[0] + "\"</label><br>" +
                "            <label class=\"item-info\">Description: \"" + returnedInfo[1] + "\" </label><br>" +
                "            <label class=\"item-info\">Starting price: \"" + startingPrice + "\"</label><br>" +
                "            <label class=\"item-info\">Auction step: \"" + step + "\" </label><br>" +
                "            <hr style=\"width: 95%\">" +
                "" +
                "            <label class=\"lot-info\">Will begin at: \"" + date + "\"</label><br>" +
                "            <label class=\"lot-info\">Current amount of participants: 3</label><br>" +
                "" +
                "            <button class=\"watch\" onclick=\"window.location.href='auctionRoom.html'\">" +
                "                <i class=\"button-text\">Watch</i>" +
                "            </button>" +
                "" +
                "        </div>";
            myLots.appendChild(inDiv);
        }
    });
});

