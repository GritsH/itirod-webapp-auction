export class Lot {
    constructor(id, startingPrice, auctionStep, currentPrice, itemId, leaderId, date) {
        this.id = id;
        this.startingPrice = startingPrice;
        this.auctionStep = auctionStep;
        this.currentPrice = currentPrice;
        this.itemId = itemId;
        this.leaderId = leaderId;
        this.date = date;
    }

    toString() {
        return this.id + ', ' + this.startingPrice + ', ' + this.auctionStep + ', ' + this.currentPrice + ', ' + this.itemId + ', ' + this.leaderId;
    }
}

const LotConverter = {
    toFirestore: (lot) => {
        return {
            auctionStep: lot.auctionStep,
            currentPrice: lot.currentPrice,
            id: lot.id,
            itemId: lot.itemId,
            leaderId: lot.leaderId,
            startingPrice: lot.startingPrice
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Lot(data.id, data.startingPrice, data.auctionStep, data.currentPrice, data.itemId, data.leaderId);
    }
};