export class Hotel {
    public heading: string;
    public description: string;
    public action: Array<UserAction>;
    public categories: Categories;

    constructor() {
        this.heading = '';
        this.description = '';
        this.action = [];
        this.categories = new Categories();
    }
}

export class UserAction {
    private key: string;
    private operations: Array<string>;

    constructor() {
        this.key = '';
        this.operations = [];
    }
}

export class Categories {
    private rooms: Array<Category>;
    private suites: Array<Category>;
    private fountainView: Array<Category>;

    constructor() {
        this.rooms = [];
        this.suites = [];
        this.fountainView = [];
    }
}

export class Category {
    private icon: string;
    private heading: string;
    private description: string;
    private button: string;

    constructor() {
        this.icon = '';
        this.heading = '';
        this.description = '';
        this.button = '';
    }
}
