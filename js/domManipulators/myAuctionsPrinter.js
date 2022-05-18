import {myDB} from "../db/db.js";
import {
    collection,
    getDocs,
    query,
    setDoc,
    where
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import {myAuctions} from "../general.js";


const itemsRef = collection(myDB.db, "items");
const participatedLotsRef = collection(myDB.db, "participatedLots");

const lotsQuery = query(participatedLotsRef, where("participant", "==", localStorage.getItem("name")));
const lotsQuerySnapshot = await getDocs(lotsQuery);


function getItemNameAndDescription(itemId, callback) {
    const itemInfo = [3];
    const q = query(itemsRef, where("id", "==", itemId.toString()));
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

function getLotInformation(lotId, callback) {
    const lotInfo = [7];
    const lotsRef = collection(myDB.db, "lots");
    const q = query(lotsRef);
    getDocs(q).then(querySnapshot => {
        querySnapshot.forEach((lotDoc) => {
            if(lotDoc.id.toString() === lotId.toString()){
                lotInfo[0] = lotDoc.id.toString();
                lotInfo[1] = lotDoc.data().itemId.toString();
                lotInfo[2] = lotDoc.data().startingPrice;
                lotInfo[3] = lotDoc.data().auctionStep;
                lotInfo[4] = lotDoc.data().currentPrice;
                lotInfo[5] = lotDoc.data().leaderId;
                lotInfo[6] = lotDoc.data().startDate;
            }
        });
        callback(lotInfo);
    });
}


lotsQuerySnapshot.forEach((partDoc) => {
    const lotId = partDoc.data().lotId;
    const participant = partDoc.data().participant;
    if(participant === localStorage.getItem("name")){
        getLotInformation(lotId, (returnedLotInfo) => {
            getItemNameAndDescription(returnedLotInfo[1], (returnedItemInfo) => {
                const inDiv = document.createElement('div');
                inDiv.innerHTML = "        <div class=\"lot-preview\">" +
                    "            <p class=\"item-info\">Name: \""+returnedItemInfo[0]+"\"</p>" +
                    "            <p class=\"item-info\">Description:  \""+returnedItemInfo[1]+"\"</p>" +
                    "            <p class=\"item-info\">Starting price:  \""+returnedLotInfo[2]+"\"</p>" +
                    "            <p class=\"item-info\">Auction step: \""+returnedLotInfo[3]+"\"</p>" +
                    "            <hr style=\"width: 95%\">" +
                    "" +
                    "            <p class=\"lot-info\">Will begin at: \""+returnedLotInfo[6]+"\"</p>" +
                    "            <p class=\"lot-info\">Current amount of participants: 3</p>" +
                    "" +
                    "            <button class=\"leave\">" +
                    "                <i class=\"button-text\">Leave</i>" +
                    "            </button>" +
                    "            <br><br>" +
                    "            <button class=\"enter-room\" onclick=\"window.location.href='auctionRoom.html'\">" +
                    "                <i class=\"button-text\">Enter room</i>" +
                    "            </button>\n" +
                    "" +
                    "        </div>";
                myAuctions.appendChild(inDiv);
            })
        })
    }
});
