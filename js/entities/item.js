export class Item{
    constructor(itemName, itemType, ownerId, description){
        this.id = 6;
        this.itemName = itemName;
        this.itemType = itemType;
        this.ownerId = ownerId;
        this.description = description;
    }
}

const ItemConverter = {
    toFirestore: (item) =>{
        return{
            id: item.id,
            description: item.description,
            itemName: item.itemName,
            itemType: item.itemType,
            ownerId: item.ownerId
        };
    },
    fromFirestore: (snapshot, options) =>{
        const data = snapshot.data(options);
        return new Item(data.id, data.itemName, data.itemType, data.ownerId, data.description);
    }
};