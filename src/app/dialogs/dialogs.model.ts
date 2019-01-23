export class SignIn {
    public customerReview: Array<CustomerReview>;

    constructor() {
        this.customerReview = [];
    }
}

export class CustomerReview {
    public path: string;
    public heading: string;
    public description: string;

    constructor() {
        this.path = '';
        this.heading = '';
        this.description = '';
    }
}
