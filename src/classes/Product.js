import { nanoid } from 'nanoid';

export class Product {
    constructor({title, description, code, price, status = true, stock, category, thumbnails = [], id}) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
        this.id = id;
        // const this.id = nanoid(4);
    }
}