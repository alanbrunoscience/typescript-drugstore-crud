import readlineSync = require("readline-sync");
import { colors } from './src/util/Colors';

export function main() {

    // Auxiliary Variables
    let option;

    do {

        option = menu();

        switch(option) {

            case 1:
                keyPress();
                break;
            case 2:
                keyPress();
                break;
            case 3:
                keyPress();
                break;
            case 4:
                keyPress();
                break;
            case 5:
                keyPress();
                break;
            case 6:
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