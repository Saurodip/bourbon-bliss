export class Restaurants {
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
    public restaurants: Array<Restaurant>;

    constructor() {
        this.action = [];
        this.restaurants = [];
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

export class Restaurant {
    public path: string;
    public icon: string;
    public name: string;
    public description: string;
    public currency: string;
    public cost: number;
    public unit: string;
    public info: Array<AdditionalInfo>;

    constructor() {
        this.path = '';
        this.icon = '';
        this.name = '';
        this.description = '';
        this.currency = '';
        this.cost = 0;
        this.unit = '';
        this.info = [];
    }
}

export class AdditionalInfo {
    public key: string;
    public value: string;

    constructor() {
        this.key = '';
        this.value = '';
    }
}
