export class Item {
    constructor(itemName, itemType, ownerId, description, isLot) {
        let tempId = parseInt(localStorage.getItem("latestItemId")) + 1;
        this.id = tempId;
        this.itemName = itemName;
        this.itemType = itemType;
        this.ownerId = ownerId;
        this.description = description;
        this.isLot = isLot;

        localStorage.setItem("latestItemId", tempId.toString());
    }
}

const ItemConverter = {
    toFirestore: (item) => {
        return {
            id: item.id,
            description: item.description,
            itemName: item.itemName,
            itemType: item.itemType,
            ownerId: item.ownerId
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Item(data.id, data.itemName, data.itemType, data.ownerId, data.description);
    }
};