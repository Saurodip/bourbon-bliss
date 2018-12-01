export class Booking {
    public heading: string;
    public description: string;
    public fields: Array<Fields>;

    constructor() {
        this.heading = '';
        this.description = '';
        this.fields = [];
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
    public label: string;
    public type: string;
    public tooltip: string;

    constructor() {
        this.label = '';
        this.type = '';
        this.tooltip = '';
    }
}
