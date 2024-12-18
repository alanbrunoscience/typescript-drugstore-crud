import { Product } from "./Product";

export class Cosmetic extends Product {

    private _fragrance: string;

    // Personalized Methods
    public display(): void {
        super.display();
        console.log(`7) Fragrance: ${this.getFragrance()}.\n`);
    }

    // Special Methods
    constructor(id: number, prodName: string, prodType: number, quantity: number, price: number, prodCategory: string, fragrance: string) {
        super(id, prodName, prodType, quantity, price, prodCategory);
        this._fragrance = fragrance;
    }

	public getFragrance(): string {
		return this._fragrance;
	}

	public setFragrance(fragrance: string): void {
		this._fragrance = fragrance;
	}

}