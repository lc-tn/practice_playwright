export class ProductHelper {
    formatPrice(price: string){
        return Number(price.match(/\d+/)?.[0])
    }
}