export class BillingDetail {
    private _firstname: string = '';
    private _lastname: string = '';
    private _country: string = '';
    private _address: string = '';
    private _city: string = '';
    private _state: string = '';
    private _zipCode: string = '';
    private _phone: string = '';
    private _email: string = '';

    constructor(init?: Partial<BillingDetail>) {
        Object.assign(this, init);
    }

    // Firstname
    public get firstname(): string {
        return this._firstname;
    }
    public set firstname(value: string) {
        this._firstname = value;
    }

    // Lastname
    public get lastname(): string {
        return this._lastname;
    }
    public set lastname(value: string) {
        this._lastname = value;
    }

    // Country
    public get country(): string {
        return this._country;
    }
    public set country(value: string) {
        this._country = value;
    }

    // Address
    public get address(): string {
        return this._address;
    }
    public set address(value: string) {
        this._address = value;
    }

    // City
    public get city(): string {
        return this._city;
    }
    public set city(value: string) {
        this._city = value;
    }

    // State
    public get state(): string {
        return this._state;
    }
    public set state(value: string) {
        this._state = value;
    }

    // ZipCode
    public get zipCode(): string {
        return this._zipCode;
    }
    public set zipCode(value: string) {
        this._zipCode = value;
    }

    // Phone
    public get phone(): string {
        return this._phone;
    }
    public set phone(value: string) {
        this._phone = value;
    }

    // Email
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
}