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
    public resorts: Array<WeddingResort>;

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

export class WeddingResort {
    public type: string;
    public path: string;
    public icon: string;
    public heading: string;
    public description: string;
    public currency: string;
    public price: number;

    constructor() {
        this.type = '';
        this.path = '';
        this.icon = '';
        this.heading = '';
        this.description = '';
        this.currency = '';
        this.price = 0;
    }
}
