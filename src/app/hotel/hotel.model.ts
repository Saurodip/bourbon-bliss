export class Hotel {
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
    public availability: Array<Availability>;

    constructor() {
        this.action = [];
        this.availability = [];
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

export class Availability {
    public type: string;
    public path: string;
    public icon: string;
    public heading: string;
    public description: string;
    public button: string;

    constructor() {
        this.type = '';
        this.path = '';
        this.icon = '';
        this.heading = '';
        this.description = '';
        this.button = '';
    }
}
