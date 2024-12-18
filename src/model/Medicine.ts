import { Product } from "./Product";

export class Medicine extends Product {

    private _genericName: string;

    // Personalized Methods
    public display(): void {
        super.display();
        console.log(`7) Generic Name: ${this.getGenericName()}.\n`);
    }

    // Special Methods
    constructor(id: number, prodName: string, prodType: number, quantity: number, price: number, prodCategory: string, genericName: string) {
        super(id, prodName, prodType, quantity, price, prodCategory);
        this._genericName = genericName;
    }

    public getGenericName(): string {
        return this._genericName;
    }

    public setGenericName(genericName: string): void {
        this._genericName = genericName;
    }

}