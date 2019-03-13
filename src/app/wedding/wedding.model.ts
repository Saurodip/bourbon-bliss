export class Wedding {
    public heading: string;
    public description: string;
    public content: Content;

    constructor() {
        this.heading = '';
        this.description = '';
        this.content = new Content();
    }
}

export class Content {
    public action: Array<UserAction>;
    public resorts: Array<MarriageHall>;

    constructor() {
        this.action = [];
        this.resorts = [];
    }
}

export class UserAction {
    public key: string;
    public operations: Array<string>;

    constructor() {
        this.key = '';
        this.operations = [];
    }
}

export class MarriageHall {
    public path: string;
    public icon: string;
    public heading: string;
    public description: string;
    public currency: string;
    public price: number;
    public venue: Venue;

    constructor() {
        this.path = '';
        this.icon = '';
        this.heading = '';
        this.description = '';
        this.currency = '';
        this.price = 0;
        this.venue = new Venue();
    }
}

export class Venue {
    public area: string;
    public accomodation: string;
    public amenities: string;
    public contact: number;

    constructor() {
        this.area = '';
        this.accomodation = '';
        this.amenities = '';
        this.contact = 0;
    }
}
