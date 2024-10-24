import * as ExcelJs from 'exceljs';

export class ExcelUtils {
    private sheetName: string;
    private path: string;

    constructor(sheetName: string, path: string) {
        this.sheetName = sheetName;
        this.path = path;
    }

    async readExcel() {
        const workbook = new ExcelJs.Workbook();
        
        try {
            await workbook.xlsx.readFile(this.path);
        } catch (error) {
            throw error; // Throw the caught error to propagate it
        }

        const worksheet = workbook.getWorksheet(this.sheetName);
        if (!worksheet) {
            throw new Error(`Worksheet '${this.sheetName}' not found`);
        }

        return worksheet;
    }

    async readValue(searchText: string): Promise<string> {
        const worksheet = await this.readExcel();
        let output = { row: -1, column: -1 };

        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if (cell.value === searchText) {
                    output.row = rowNumber;
                    output.column = colNumber + 1; // Adjusted column number to get value
                }
            });
        });

        if (output.row === -1 || output.column === -1) {
            throw new Error(`Value "${searchText}" not found in the worksheet`);
        }

        // Return the value found at the specified cell
        const vallue = worksheet.getCell(output.row, output.column).value;
        return (vallue !== null && vallue !== undefined ? vallue.toString() : 'not found');
        
    }

    async readAssertionValue(searchText: string): Promise<string> {
        const worksheet = await this.readExcel();
        let output = { row: -1, column: -1 };

        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if (cell.value === searchText) {
                    output.row = rowNumber;
                    output.column = colNumber + 2; // Adjusted column number to get value
                }
            });
        });

        if (output.row === -1 || output.column === -1) {
            throw new Error(`Value "${searchText}" not found in the worksheet`);
        }

        // Return the value found at the specified cell
        const value = worksheet.getCell(output.row, output.column).value;
        return (value !== null && value !== undefined ? value.toString() : 'not found');
    }

    static async readExcelAndReturnMap(keyword: string, filePath: string){
        const arr = keyword.split('@');
        const sheetName = arr[0];
        const scenarioId = arr[1];
   
        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile(filePath);
        let requiredSheet: any;
        const sheets = workbook.worksheets;
        let noOfSheets = sheets.length;
       
        for(let i =0;i<noOfSheets;i++)
        {
            if(sheets[i].name === sheetName)
            {
                requiredSheet = workbook.getWorksheet(sheets[i].name);
                break;
            }
        }
   
        let map = new Map();
       
        let keyArray: string[]=[];
        let valArray: string[]=[];
   
        let rows = requiredSheet.getRow(1);
   
        rows.eachCell((cell: any,cellNum:number)=>{
            keyArray.push(cell.value)
        });
   
        let requiredRow:number =0 ;
       
        requiredSheet.eachRow((row:any,rowNum:number)=>{
            row.eachCell((cell:any,cellNum:number)=>{
                if(rowNum!==0)
                {
                    if(cell.value === scenarioId)
                    {
                        requiredRow = rowNum;
                    }
                }
            })
        });
   
        let some = requiredSheet.getRow(requiredRow);
        some.eachCell((cell: any,cellNum:number)=>{
            valArray.push(cell.value)
        });

        for(let i=0;i<keyArray.length;i++)
        {
            map.set(keyArray[i],valArray[i])
        }
        return map;
    }


}