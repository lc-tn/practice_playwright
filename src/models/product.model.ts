export class Product{
    private _title: string;
    private _category: string;
    private _price: string;

    constructor(object?: any){
        this._title = object.name ?? "";
        this._category = object.category ?? "";
        this._price = object.price ?? "";
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
}