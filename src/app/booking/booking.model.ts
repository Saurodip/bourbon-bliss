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
    public array?: string;
    public group?: string;
    public heading?: Heading;
    public fields: Array<Field>;

    constructor() {
        this.array = '';
        this.group = '';
        this.heading = new Heading();
        this.fields = [];
    }
}

export class Field {
    public icon: string;
    public label: string;
    public id: string;
    public type?: string;
    public control?: string;
    public isMandatory?: boolean;
    public tooltip?: string;
    public value?: number;

    constructor() {
        this.icon = '';
        this.label = '';
        this.id = '';
        this.type = '';
        this.control = '';
        this.isMandatory = false;
        this.tooltip = '';
        this.value = 0;
    }
}

export class CountryList {
    public list: Array<Country>;

    constructor() {
        this.list = [];
    }
}

export class TimeSlot {
    public timeSlots: Array<string>;

    constructor() {
        this.timeSlots = [];
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

export class Month {
    public month: Array<MonthInfo>;

    constructor() {
        this.month = [];
    }
}

export class MonthInfo {
    public index: number;
    public name: string;

    constructor() {
        this.index = 0;
        this.name = '';
    }
}
