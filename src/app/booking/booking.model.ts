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
    public group: string;
    public heading?: Heading;
    public fields: Array<Field>;

    constructor() {
        this.group = '';
        this.heading = new Heading();
        this.fields = [];
    }
}

export class Field {
    public icon: string;
    public label: string;
    public id: string;
    public type: string;
    public control?: string;
    public attributes: Attributes;
    public tooltip?: string;

    constructor() {
        this.icon = '';
        this.label = '';
        this.id = '';
        this.type = '';
        this.control = '';
        this.attributes = new Attributes();
        this.tooltip = '';
    }
}

export class Attributes {
    public max: boolean;
    public min: boolean;
    public maxLength: boolean;
    public minLength: boolean;
    public checked: boolean;
    public required: boolean;

    constructor() {
        this.max = false;
        this.min = false;
        this.maxLength = false;
        this.minLength = false;
        this.checked = false;
        this.required = false;
    }
}

export class CountryList {
    public list: Array<Country>;

    constructor() {
        this.list = [];
    }
}

export class Country {
    public name: string;
    public code: string;

    constructor() {
        this.name = '';
        this.code = '';
    }
}
