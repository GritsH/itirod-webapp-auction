import {myDB} from "../db/db.js";
import {
    collection, doc,
    getDocs,
    query,
    setDoc,
    where
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import {mainPageLots} from "../general.js";


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
    const nowDate = Date.now();
    const tempStartDate = Date.parse(doc.data().startDate);
    if (tempStartDate > nowDate) {
        getItemNameAndDescription(doc, (returnedInfo) => {
            console.log(returnedInfo[0], returnedInfo[1]);
            inDiv.innerHTML = "<div class=\"lot-preview\">" +
                "            <p class=\"item-info\">Name: \"" + returnedInfo[0] + "\"</p>" +
                "            <p class=\"item-info\">Description: \"" + returnedInfo[1] + "\"</p>" +
                "            <p class=\"item-info\">Starting price: \"" + startingPrice + "\"</p>" +
                "            <p class=\"item-info\">Auction step: \"" + step + "\"</p>" +
                "            <hr style=\"width: 95%;\">" +
                "            <p class=\"lot-info\">Will begin at: \"" + date + "\"</p>" +
                "            <p class=\"lot-info\">Current amount of participants: 2</p>" +
                "            <button id=\"participateBtn" + doc.id + "\" class=\"participate\">" +
                "                <i class=\"button-text\">Participate</i>" +
                "            </button>" +
                "        </div>";
            mainPageLots.appendChild(inDiv);
            const participateBtn = document.getElementById("participateBtn" + doc.id.toString());
            if (returnedInfo[2] === localStorage.getItem("name")) {
                participateBtn.disabled = true;
                for (let i = 0; i < localStorage.length; i++) {
                    if (localStorage.getItem("lot" + i.toString()) != null) {
                        localStorage.setItem("lot" + i.toString(), "empty");
                    }
                }
            }
            participateBtn.addEventListener("click", function () {
                if (returnedInfo[2] === localStorage.getItem("name")) {
                    participateBtn.disabled = true;
                } else {
                    participateBtn.disabled = false;
                    localStorage.setItem("lot" + doc.id.toString(), localStorage.getItem("name"));
                    console.log(localStorage);
                    addL().then(r => console.log(localStorage));
                }
            })
        });
    }
});


const addL = async () => {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem("lot" + i.toString()) != null) {
            if (localStorage.getItem("lot" + i.toString()) === localStorage.getItem("name")) {
                const participantName = localStorage.getItem("name");
                const newDoc = await setDoc(doc(myDB.db, "participatedLots", i.toString()), {
                    lotId: i.toString(),
                    participant: participantName.toString()
                });
            }

        }
    }
}

