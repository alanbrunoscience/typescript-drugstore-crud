import readlineSync = require("readline-sync");
import { colors } from './src/util/Colors';
import { Medicine } from "./src/model/Medicine";
import { Cosmetic } from "./src/model/Cosmetic";
import { ProductController } from "./src/controller/ProductController";

export function main() {

    // The instance of the Product Controller class
    let product: ProductController = new ProductController();

    // Auxiliary Variables
    let option, productType, quantity, price, productId: number;
    let prodName, prodCategory, genericName, fragranceName: string;
    const productTypes = ['Medicine', 'Cosmetic'];

    // New Instances of the "Medicine" Class (Objects)
    product.registerProduct(new Medicine(product.generateId(), "Tylenol", 1, 100, 25.50, "Analgesic", "Paracetamol"));
    product.registerProduct(new Medicine(product.generateId(), "Advil", 1, 50, 19.90, "Analgesic", "Ibuprofen"));

    // New Instances of the "Cosmetic" Class (Objects)
    product.registerProduct(new Cosmetic(product.generateId(), "Nivea Soft", 2, 50, 29.90, "Skin Care", "Citrus"));
    product.registerProduct(new Cosmetic(product.generateId(), "Pantene Pro-V", 2, 200, 18.50, "Hair Care", "Floral"));

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

                        console.log();
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
                        
                        console.log();
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

                    productId = readlineSync.questionInt("\nEnter the product number: ", {limitMessage: "\n-> Invalid data type entered!"});
                    while(productId < 1) {
                        productId = readlineSync.questionInt("\n-> Invalid number! Enter a value greater than 0: ");
                    }
                    
                    console.log();
                    product.searchById(productId);

                } else {
                    console.log(colors.fg.red, "\nThere is no data registered yet! \n", colors.reset);
                }

                keyPress();
                break;
                
            case 4:

                if(!product.isEmpty()) {
                    console.log(colors.fg.whitestrong, "\nUpdate a product:\n", colors.reset);

                    productId = readlineSync.questionInt("\n- Enter the product ID: ", {limitMessage: "\n-> Invalid data type entered!"});
                    while(productId < 1) {
                        productId = readlineSync.questionInt("\n-> Invalid ID! Enter a value greater than 0: ");
                    }

                    let searchedProduct = product.searchInArray(productId);

                    if(searchedProduct != null) {
                        prodName = readlineSync.question("\n1) Enter the new product comercial name: ");
                        let formattedProdName = product.toTitleCase(prodName);

                        console.log("\n2) Select the new product type:");
                        productType = readlineSync.keyInSelect(productTypes, "> ", {cancel: false}) + 1;

                        quantity = readlineSync.questionInt("\n3) Enter the new total quantity of products: ", {limitMessage: "\n-> Invalid data type entered!"});
                        while(quantity < 1) {
                            quantity = readlineSync.questionInt("\n-> Invalid data! Enter a quantity greater than 0: ");
                        }

                        price = readlineSync.questionFloat("\n4) Enter the new individual product price: R$ ");
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

                                console.log();
                                product.updateProduct(new Medicine(productId, formattedProdName, productType, quantity, price, prodCategory, formattedGenName));

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
                                
                                console.log();
                                product.updateProduct(new Cosmetic(productId, formattedProdName, productType, quantity, price, prodCategory, fragranceName));

                                break;
                            
                        }
                    } else {
                        console.log(colors.fg.red, `\n\n-> Product number '${productId}' was not found!\n`, colors.reset);
                    }

                } else {
                    console.log(colors.fg.red, "\nThere is no data registered yet! \n", colors.reset);
                }

                keyPress();
                break;

            case 5:

                if(!product.isEmpty()) {
                    console.log(colors.fg.whitestrong, "\nDelete a product:\n", colors.reset);

                    productId = readlineSync.questionInt("\n- Enter the product ID: ", {limitMessage: "\n-> Invalid data type entered!"});
                    while(productId < 1) {
                        productId = readlineSync.questionInt("\n-> Invalid ID! Enter a value greater than 0: ");
                    }

                    let searchedProduct = product.searchInArray(productId);

                    if(searchedProduct != null) {

                        let confirmation: boolean;

                        product.searchById(productId);

                        console.log(colors.fg.red, `\n-> This product has ${product.getCurrentQuantities(productId)} unit(s) in stock. Do you want to remove all or just some units (y - all / n - some)?\n`, colors.reset);
                        confirmation = readlineSync.keyInYNStrict('-> ');

                        if(confirmation) {
                            product.deleteProduct(productId);
                        } else {
                            let quantityForRemoval = readlineSync.questionInt("\n- Enter the quantity you want to remove: ", {limitMessage: "\n-> Invalid data type entered!"});
                            while(quantityForRemoval < 1) {
                                quantityForRemoval = readlineSync.questionInt("\n-> Invalid data! Enter a quantity greater than 0: ");
                            }

                            if(quantityForRemoval === product.getCurrentQuantities(productId)) {
                                product.deleteProduct(productId);
                            } else {
                                product.updateQuantity(productId, quantityForRemoval);
                            }
                        }
                    } else {
                        console.log(colors.fg.red, `\n\n-> Product number '${productId}' was not found!\n`, colors.reset);
                    }

                } else {
                    console.log(colors.fg.red, "\nThere is no data registered yet! \n", colors.reset);
                }

                keyPress();
                break;

            case 6:

                if(!product.isEmpty()) {
                    console.log(colors.fg.whitestrong, "\nSearch product by name:\n", colors.reset);

                    prodName = readlineSync.question("\nEnter the product comercial name: ");
                    let formattedProdName = product.toTitleCase(prodName);

                    if(!product.searchByName(formattedProdName)) {
                        console.log(colors.fg.red, `\n\n-> There is no product whose name is '${formattedProdName}'.\n`, colors.reset);
                    }

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