export class Booking {
    public heading: string;
    public description: string;
    public content: Array<Content>;

    constructor() {
        this.heading = '';
        this.description = '';
        this.content = [];
    }
}

export class Content {
    public heading: Heading;
    public options: Array<Option>;

    constructor() {
        this.heading = new Heading();
        this.options = [];
    }
}

export class Heading {
    public icon: string;
    public text: string;

    constructor() {
        this.icon = '';
        this.text = '';
    }
}

export class Option {
    public heading?: Heading;
    public fields: Array<Field>;

    constructor() {
        this.heading = new Heading();
        this.fields = [];
    }
}

export class Field {
    public icon: string;
    public label: string;
    public id: string;
    public type: string;
    public tooltip?: string;

    constructor() {
        this.icon = '';
        this.label = '';
        this.id = '';
        this.type = '';
        this.tooltip = '';
    }
}
