export class Offers {
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
    public coupons: Array<Coupon>;

    constructor() {
        this.action = [];
        this.coupons = [];
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

export class Coupon {
    public type: string;
    public heading: string;
    public description: string;
    public discount: Discount;
    public eligibility: Eligibility;
    public duration: Duration;

    constructor() {
        this.type = '';
        this.heading = '';
        this.description = '';
        this.discount = new Discount();
        this.eligibility = new Eligibility();
        this.duration = new Duration();
    }
}

export class Discount {
    public type: string;
    public code: string;

    constructor() {
        this.type = '';
        this.code = '';
    }
}

export class Eligibility {
    public key: string;
    public amount: number;

    constructor() {
        this.key = '';
        this.amount = 0;
    }
}

export class Duration {
    public key: string;
    public date: string;

    constructor() {
        this.key = '';
        this.date = '';
    }
}
