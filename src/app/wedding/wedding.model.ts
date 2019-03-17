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
    public marriageHalls: Array<MarriageHall>;

    constructor() {
        this.action = [];
        this.marriageHalls = [];
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
    public specification: Array<Specification>;

    constructor() {
        this.path = '';
        this.icon = '';
        this.heading = '';
        this.description = '';
        this.currency = '';
        this.price = 0;
        this.specification = [];
    }
}

export class Specification {
    public key: string;
    public value: string;

    constructor() {
        this.key = '';
        this.value = '';
    }
}
