import { Product } from "../model/Product";
import { ProductRepository } from "../repository/ProductRepository";
import { colors } from "../util/Colors";

export class ProductController implements ProductRepository {

    // Array Collection to store Product objects
    private products: Array<Product> = new Array<Product>();

    // Product ID - Auto Incremental primary key
    productId: number = 0;

    registerProduct(product: Product): void {
        this.products.push(product);
        console.log(colors.fg.green, `\n\n-> Product number '${product.getId()}' has been successfully registered!\n`, colors.reset);
    }

    listAllProducts(): void {
        for(let product of this.products) {
            product.display();
        }
    }

    searchById(id: number): void {

        let searchedProduct = this.searchInArray(id);

        if (searchedProduct != null) {
            searchedProduct.display();
        } else {
            console.log(colors.fg.red, `\n-> The Product number ${id} was not found!\n`, colors.reset);
        }

    }

    updateProduct(product: Product): void {
        
    }

    deleteProduct(id: number): void {
        
    }

    searchByName(prodName: string): boolean {

        // Data filtering
        let searchByProdName = this.products.filter(product => product.getProdName().toUpperCase().includes(prodName.toUpperCase()));
    
        if (searchByProdName.length > 0) {
            // Data Listing
            console.log("");
            searchByProdName.forEach(product => product.display());
            return true;
        } else {
            return false;
        }

    }

    manageStock(quantity: number): void {
        
    }

    // Complementary Methods
    public toTitleCase(originalName: string) {
        return originalName
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    // Generate Product ID Automatically
    public generateId(): number {
        return ++this.productId;
    }

    // Check if a product exists
    public searchInArray(productId: number): Product | null {
        for(let product of this.products) {
            if(product.getId() === productId)
                return product;
        }
        return null;
    }

    public isEmpty(): boolean {
        let result = this.products.length <= 0;
        return result;
    }

}