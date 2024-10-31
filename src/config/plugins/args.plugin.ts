import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'; 


export const yarg = yargs(hideBin(process.argv))
    .option('b', {
        alias: 'base',
        type: 'number',
        description: 'Base de la tabla de multiplicar',
        demandOption: true,
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        description: 'Límite de la tabla de multiplicar',
        default: 10,
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        description: 'Mostrar tabla en pantalla',
        default: false,
    })
    .option('n', {
        alias: 'name',
        type: 'string',
        description: 'File name',
        default: 'multiplication-table',
    })
    .option('d', {
        alias: 'destination',
        type: 'string',
        description: 'File destination',
        default: 'output',
    })
    .check( (argv, options) => {

        if(argv.b < 1) throw 'Error: Base must be greater than 0';
        
        return true;
    })
    .parseSync();