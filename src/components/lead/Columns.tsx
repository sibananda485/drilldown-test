import { Column } from "react-table";

interface Account {
  id: number;
  account_name: string;
  account_group: string;
}

export const COLUMNS: Column<Account>[] = [
  { Header: "ID", accessor: "id" },
  {
    Header: "Account Name",
    accessor: "account_name",
  },
  {
    Header: "Account Group",
    accessor: "account_group",
  },
];
