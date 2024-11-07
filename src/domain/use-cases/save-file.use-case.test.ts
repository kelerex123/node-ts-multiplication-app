import fs from 'fs';
import {SaveFile} from './save-file.use-case';

describe('SaveFileUseCase', ()=> {

    const customOptions = {
        fileContent: 'custom contents',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name',
    };

    beforeEach(()=> {
        //Clean up
        fs.rmSync('output/table.txt', { recursive: true, force: true });
        fs.rmSync('custom-outputs/file-destination/custom-table-name.txt', { recursive: true, force: true });
    });

    afterEach(()=> {
        //Clean up
        fs.rmSync('output/table.txt', { recursive: true, force: true });
        fs.rmSync('custom-outputs/file-destination/custom-table-name.txt', { recursive: true, force: true });
    });

    test('should save a file with default values', () => {
        
        //Arrange
        const saveFile = new SaveFile();
        const filePath = 'output/table.txt'
        const options = {
            fileContent: 'Hello, World!',
        };

        //Act
        const result = saveFile.execute(options);
        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
        
        //Assert
        expect(saveFile).toBeInstanceOf(SaveFile);
        expect(result).toBe(true);
        expect(checkFile).toBe(true);
        expect(fileContent).toBe(options.fileContent);

    });

    test('should save a file with custom values', () => {
        
        //Arrange
        const saveFile = new SaveFile();

        const filePath = customOptions.fileDestination + "/" + customOptions.fileName + '.txt';

        //Act
        const result = saveFile.execute(customOptions);
        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
        
        //Assert
        expect(saveFile).toBeInstanceOf(SaveFile);
        expect(result).toBe(true);
        expect(checkFile).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent);

    });

    test('should return false if directory could not be created', () => {
        
        //Arrange
        const saveFile = new SaveFile();

        const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing');}
        );

        

        //Act
        const result = saveFile.execute(customOptions);
        
        //Assert
        expect(result).toBe(false);

        mkdirMock.mockRestore();

    });

    test('should return false if file could not be created', () => {
        
        //Arrange
        const saveFile = new SaveFile();

        const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom writing error message');}
        );

        

        //Act
        const result = saveFile.execute({fileContent: 'hola'});
        
        //Assert
        expect(result).toBe(false);

        writeFileSyncMock.mockRestore();

    });

});