export class Booking {
    public heading: Heading;
    public description: string;
    public fields: Array<Fields>;

    constructor() {
        this.heading = new Heading;
        this.description = '';
        this.fields = [];
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

export class Fields {
    public heading: string;
    public options: Array<Option>;

    constructor() {
        this.heading = '';
        this.options = [];
    }
}

export class Option {
    public icon: string;
    public label: string;
    public required: boolean;
    public type: string;
    public tooltip: string;

    constructor() {
        this.icon = '';
        this.label = '';
        this.required = false;
        this.type = '';
        this.tooltip = '';
    }
}
