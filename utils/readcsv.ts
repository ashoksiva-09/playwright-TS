import fs from 'fs';
import { parse } from 'csv-parse/sync';
import path from 'path';

export function csvReader(filePath: string) {
    const fullpath = path.resolve(filePath);
    const fileContent = fs.readFileSync(fullpath, 'utf-8');

    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    });

    return records;
}