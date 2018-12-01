export class Navigation {
    public navMenuItems: Array<NavigationMenu>;
    public guestServices: Array<GuestServices>;

    constructor() {
        this.navMenuItems = [];
        this.guestServices = [];
    }
}

export class NavigationMenu {
    public icon: string;
    public name: string;

    constructor() {
        this.icon = '';
        this.name = '';
    }
}

export class GuestServices {
    public services: Array<string>;

    constructor() {
        this.services = [];
    }
}
