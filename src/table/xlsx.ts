import xlsx, { IJsonSheet } from "json-as-xlsx";


export function exportToExcel(cols: any, data: any,name:string) {
  let columns: IJsonSheet[] = [
    {
      sheet: name,
      columns: cols,
      content: data,
    },
  ];

  let settings = {
    fileName: name,
  };

  xlsx(columns, settings);
}