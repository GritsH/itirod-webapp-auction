import {myDB} from "../db/db.js";
import {collection, getDocs, query, where} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import {mainPageLots} from "../general.js";


const lotsRef = collection(myDB.db, "lots");
const q = query(lotsRef);
const querySnapshot = await getDocs(q);

const itemsRef = collection(myDB.db, "items");
// var name = "";
// var description = "";


async function func(doc) {
    const smth = [2];
    const q = query(itemsRef, where("id_", "==", doc.data().itemId));
    const querySnapshot2 = await getDocs(q);
    querySnapshot2.forEach((doc_) => {
        smth[0] = doc_.data().itemName;
        smth[1] = doc_.data().description;
    });
    console.log(smth);
    return smth;
}

querySnapshot.forEach((doc) => {
    const startingPrice = doc.data().startingPrice;
    const step = doc.data().auctionStep;
    const date = doc.data().startDate.replace("T", " ");
    const id__ =  doc.data().itemId;
    const ret = func(doc);
    console.log(ret[0], ret[1]);
    const inDiv = document.createElement('div');
    inDiv.innerHTML = "<div class=\"lot-preview\">" +
        "            <p class=\"item-info\">Name: \"" + ret[0] + "\"</p>" +
        "            <p class=\"item-info\">Description: \"" + ret[1] + "\"</p>" +
        "            <p class=\"item-info\">Starting price: \"" + startingPrice + "\"</p>" +
        "            <p class=\"item-info\">Auction step: \"" + step + "\"</p>" +
        "            <hr style=\"width: 95%;\">" +
        "            <p class=\"lot-info\">Will begin at: \"" + date + "\"</p>" +
        "            <p class=\"lot-info\">Current amount of participants: 2</p>" +
        "            <button class=\"participate\">" +
        "                <i class=\"button-text\">Participate</i>" +
        "            </button>" +
        "        </div>";
    mainPageLots.appendChild(inDiv);
});