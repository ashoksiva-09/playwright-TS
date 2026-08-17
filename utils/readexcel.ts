import * as XLSX from 'xlsx';

export type Record={
  username: string;
  password: string;
  validation: string;
  run: string;
}

export function readExcel(
  filePath: string,
  sheetName: string
): Record[] {

  const workbook = XLSX.readFile(filePath);

  const worksheet = workbook.Sheets[sheetName];

  return XLSX.utils.sheet_to_json(worksheet);
}