import fs from 'fs';

export interface SaveFileInterface {
    execute: (options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export class SaveFile implements SaveFileInterface {

    constructor(
        /*
            repository: StoragesRepository 
        */
    ) {}

    execute({fileContent, fileDestination = 'output', fileName = 'table'}: SaveFileOptions): boolean {
        try {
            fs.mkdirSync(fileDestination, {recursive: true});
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
            return true;
        } catch (error) {
            if(error instanceof Error) {
                console.error(error);
            }
            return false;
        }

        
    };

}