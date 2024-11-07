import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    name: string;
    destination: string;
}

export class ServerApp {


    static run({base, limit, showTable, name, destination}: RunOptions) {
        console.log('Server running...');
        
        const table = new CreateTable().execute({base, limit});
        const wasCreated = new SaveFile().execute({fileContent: table, fileDestination: `${destination}/table-${base}`, fileName: name});

        if (showTable) {
            console.log(table);
        }

        (wasCreated)
            ? console.log("The File was created")
            : console.error("The File was not created")

    }

}