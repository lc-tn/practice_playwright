export class Product{
    private _title: string = "";
    private _category: string = "";
    private _price: string = "";

    constructor(init?: Partial<Product>) {
        Object.assign(this, init);
    }

    public set title(value: string){
        this._title = value;
    }

    public get title(){
        return this._title;
    }

    public get price(){
        return this._price;
    }

    public set price(value: string){
        this._price = value;
    }
}