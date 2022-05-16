import {myDB} from "./db/db.js";
import {Item} from "./entities/item.js";
import {
    itemNameField,
    itemDescription,
    itemType,
    saveItem
} from "./general.js";

const AddItem = async () => {
    await myDB.addItem(new Item( itemNameField.value, itemType.value, localStorage.getItem("name"), itemDescription.value));
    window.location.href = 'myItems.html';
}
saveItem.addEventListener("click", AddItem);