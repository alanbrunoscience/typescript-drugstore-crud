import readlineSync = require("readline-sync");
import { colors } from './src/util/Colors';
import { Medicine } from "./src/model/Medicine";
import { Cosmetic } from "./src/model/Cosmetic";
import { ProductController } from "./src/controller/ProductController";

export function main() {

    // The instance of the Product Controller class
    let product: ProductController = new ProductController();

    // Auxiliary Variables
    let option, productType, quantity, price: number;
    let prodName, prodCategory, genericName, fragranceName: string;
    const productTypes = ['Medicine', 'Cosmetic'];

    do {

        option = menu();

        switch(option) {

            case 1:
                
                console.log(colors.fg.whitestrong, "\nRegister product:\n", colors.reset);

                prodName = readlineSync.question("\n1) Enter the product comercial name: ");
                let formattedProdName = product.toTitleCase(prodName);

                console.log("\n2) Select the product type:");
                productType = readlineSync.keyInSelect(productTypes, "> ", {cancel: false}) + 1;

                quantity = readlineSync.questionInt("\n3) Enter the total quantity of products: ", {limitMessage: "\n-> Invalid data type entered!"});
                while(quantity < 1) {
                    quantity = readlineSync.questionInt("\n-> Invalid data! Enter a quantity greater than 0: ");
                }

                price = readlineSync.questionFloat("\n4) Enter the individual product price: R$ ");
                while(price < 0.01) {
                    price = readlineSync.questionFloat("\n-> Invalid data! Enter a price greater than R$ 0.00: R$ ");
                }

                switch(productType) {
                    
                    case 1:

                        prodCategory = getMedCategories();
                        if(prodCategory === "Other") {
                            prodCategory = readlineSync.question("\n-> Specify the category of the medicine: ");
                            let formattedMedCat = product.toTitleCase(prodCategory);
                            prodCategory = formattedMedCat;
                        }

                        genericName = readlineSync.question("\n6) Enter the generic name of the medicine: ");
                        let formattedGenName = product.toTitleCase(genericName);

                        product.registerProduct(new Medicine(product.generateId(), formattedProdName, productType, quantity, price, prodCategory, formattedGenName));

                        break;

                    case 2:

                        prodCategory = getCosmCategories();
                        if(prodCategory === "Other") {
                            prodCategory = readlineSync.question("\n-> Specify the category of the cosmetic: ");
                            let formattedCosmCat = product.toTitleCase(prodCategory);
                            prodCategory = formattedCosmCat;
                        }

                        let checkFrag = readlineSync.keyInYNStrict("\n6) Does the product have a fragrance? ");

                        if(checkFrag) {
                            fragranceName = readlineSync.question("\n-> Enter the fragrance of the cosmetic: ");
                            let formattedFragName = product.toTitleCase(fragranceName);
                            fragranceName = formattedFragName;
                        } else {
                            fragranceName = "N/A";
                        }   
                        
                        
                        product.registerProduct(new Cosmetic(product.generateId(), formattedProdName, productType, quantity, price, prodCategory, fragranceName));

                        break;

                }

                keyPress();
                break;

            case 2:

                if(!product.isEmpty()) {
                    console.log(colors.fg.whitestrong, "\nList all products:\n", colors.reset);
                    
                    product.listAllProducts();

                } else {
                    console.log(colors.fg.red, "\nThere is no data registered yet! \n", colors.reset);
                }

                keyPress();
                break;

            case 3:

                if(!product.isEmpty()) {
                    console.log(colors.fg.whitestrong, "\nSearch product by ID:\n", colors.reset);
                } else {
                    console.log(colors.fg.red, "\nThere is no data registered yet! \n", colors.reset);
                }

                keyPress();
                break;
                
            case 4:
                if(!product.isEmpty()) {
                    console.log(colors.fg.whitestrong, "\nUpdate a product:\n", colors.reset);
                } else {
                    console.log(colors.fg.red, "\nThere is no data registered yet! \n", colors.reset);
                }

                keyPress();
                break;
            case 5:
                if(!product.isEmpty()) {
                    console.log(colors.fg.whitestrong, "\nDelete a product:\n", colors.reset);
                } else {
                    console.log(colors.fg.red, "\nThere is no data registered yet! \n", colors.reset);
                }

                keyPress();
                break;
            case 6:
                if(!product.isEmpty()) {
                    console.log(colors.fg.whitestrong, "\nSearch product by name:\n", colors.reset);
                } else {
                    console.log(colors.fg.red, "\nThere is no data registered yet! \n", colors.reset);
                }

                keyPress();
                break;
            case 7:
                console.log(colors.fg.greenstrong);
                console.log("\nPharmaGen Drugstore - Taking care of you is our priority!");
                about();
                console.log(colors.reset, "");
                break;
            default:
                console.log(colors.fg.whitestrong, "\n-> Invalid option! Choose an option between 0 and 9.", colors.reset);

        }

    } while(option !== 7);

}

export function menu(): number {

    console.log(colors.bg.black, colors.fg.yellow);
    console.log("\n*********************************************************");
    console.log("\n                   PharmaGen Drugstore                   \n");
    console.log("*********************************************************");
    console.log("\n 1 - Register product;" +
        "\n 2 - List all products;" +
        "\n 3 - Search product by ID;" +
        "\n 4 - Update a product;" +
        "\n 5 - Delete a product;" +
        "\n 6 - Search product by name;" +
        "\n 7 - Exit."
    );
    let option: number = readlineSync.questionInt("\n-> Choose an option above: ", {limitMessage: "\n-> Invalid data type entered!"});
    console.log("\n********************************************************");
    console.log(colors.reset);

    return option;

}

export function getMedCategories(): string {

    const medicineCategories = [
        'Analgesics',
        'Anti-inflammatory drugs',
        'Antibiotics',
        'Antivirals',
        'Antifungals',
        'Antiparasitics',
        'Antihypertensives',
        'Antidepressants',
        'Anxiolytics',
        'Antidiabetics',
        'Antacids',
        'Laxatives',
        'Bronchodilators',
        'Anticoagulants',
        'Immunosuppressants',
        'Other'
    ];

    console.log("\n5) Select the medicine category:");
    let medicineCat = readlineSync.keyInSelect(medicineCategories, "> ", {cancel: false}) + 1;

    return medicineCategories[medicineCat - 1];

}

export function getCosmCategories(): string {

    const cosmeticCategories = [
        'Skin Care',
        'Makeup',
        'Hair Care',
        'Body Care',
        'Fragrances',
        'Personal Hygiene',
        'Nail Care',
        'Sun Care',
        'Other'
    ];

    console.log("\n5) Select the cosmetic category:");
    let cosmeticCategory = readlineSync.keyInSelect(cosmeticCategories, "> ", {cancel: false}) + 1;

    return cosmeticCategories[cosmeticCategory - 1];

}

export function about(): void {
    console.log("\nProject Developed by:\n");
    console.log("-> Alan Bruno - alanengem@gmail.com");
    console.log("-> https://github.com/alanbrunoscience/typescript-bank-account");
}

export function keyPress(): void {
    console.log(colors.reset, "");
    process.stdout.write(colors.reset + "-> Press 'Enter' to continue... "); // Display everything on the same line
    readlineSync.question("");
}

main();