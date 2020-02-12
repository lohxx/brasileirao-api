import * as fs from 'fs';
import * as path from 'path';

import { createObjectCsvWriter } from 'csv-writer';


interface Export {
    save(directory: string, data: any, year: number): Promise<void>
}

export class ExportJson implements Export {
    constructor() {}

    async save(directory: string, data: any, year: number): Promise<void> {
        const dir = path.parse(directory).dir;
        const path2 = `${dir}/brasileirao-${year}.json`;

        try {
            fs.writeFile(path2, JSON.stringify(data), () => {});
            console.log(`As classificações foram exportadas para o arquivo: ${path2}`);
        } catch (error) {
            console.error(error);
        }
    }
}

export class ExportCsv implements Export {
    constructor() {}

    async save(directory: string, data: any, year: number): Promise<void> {
        const dir = path.parse(directory).dir;
        const path2 = `${dir}/brasileirao-${year}.csv`;

        const csvWriter = createObjectCsvWriter({
            path: path2,
            header: [
                {id: 'time', title: 'time'},
                {id: 'gp',title: 'gp'},
                {id: 'gc', title: 'gc'},
                {id: 'ca', title: 'ca'},
                {id: 'sg', title: 'sg'},
                {id: 'cv', title: 'cv'},
                {id: 'jogos', title: 'jogos'},
                {id: 'empates', title: 'empates'},
                {id: 'vitorias', title: 'vitorias'},
                {id: 'derrotas', title: 'derrotas'}
            ]
        });
    
        try {
            await csvWriter.writeRecords(data);
            console.log(`As classificações foram exportadas para o arquivo: ${path2}`);
        } catch (error) {
            console.error(error);
        }
    }
}