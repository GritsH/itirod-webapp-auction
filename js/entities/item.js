export class Item{
    constructor(id, itemName, itemType, ownerId, description){
        this.id = id;
        this.itemName = itemName;
        this.itemType = itemType;
        this.ownerId = ownerId;
        this.description = description;
    }
    toString(){
        return this.id + ', ' + this.itemName +', ' + this.itemType + ', ' + this.ownerId + ', ' + this.description;
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