import { ServerApp } from "./presentation/server-app";

describe('Test App.ts', () => {

    test('should call Server with values', async() => {
       
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        process.argv = ['node', 'app.ts', '-b', '10'];
        await import('./app');

        expect(ServerApp.run).toHaveBeenCalledWith({
            "base": 10, 
            "destination": "output", 
            "limit": 10, 
            "name": "multiplication-table", 
            "showTable": false
        })

    });

    // test('Should run the server', async () => {
    //     const { run } = require('./presentation/server-app');
    //     await run({ base: 5, limit: 10, showTable: true, name: 'table', destination: 'output' });
    //     expect(true).toBe(true);
    // });
});