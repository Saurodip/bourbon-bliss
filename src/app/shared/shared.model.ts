export class AdditionalInfo {
    public heading: string;
    public map: Map;
    public content: Array<Content>;
    public links: Array<Link>;
    public ads: Array<string>;
    public copyright: string;

    constructor() {
        this.heading = '';
        this.map = new Map();
        this.content = [];
        this.links = [];
        this.ads = [];
        this.copyright = '';
    }
}

export class Map {
    public latitude: number;
    public longitude: number;

    constructor() {
        this.latitude = 0;
        this.longitude = 0;
    }
}

export class Content {
    public icon: string;
    public key: string;
    public links: Array<string>;

    constructor() {
        this.icon = '';
        this.key = '';
        this.links = [];
    }
}

export class Link {
    public key: string;
    public values: Array<string>;

    constructor() {
        this.key = '';
        this.values = [];
    }
}
