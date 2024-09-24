import { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { COLUMNS } from "./Columns";
import GlobalFiltering from "@/table/GlobalFiltering";
import ColumnFiltering from "@/table/ColumnFiltering";
import Checkbox from "@/table/Checkbox.tsx";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxMixerHorizontal,
} from "react-icons/rx";
import { exportToExcel } from "@/table/xlsx.ts";
import { FaFileExcel } from "react-icons/fa6";
import { accountData } from "@/accountData";

const LeadTable = () => {
  // const [loading, setLoading] = useState(true);
  // const [leadData, setLeadData] = useState([]);
  const columns: any = useMemo(() => COLUMNS, []);
  const data = useMemo(() => accountData, [accountData]);
  const defaultColumn: any = useMemo(() => {
    return {
      Filter: ColumnFiltering,
    };
  }, []);

  const {
    rows,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,

    allColumns,
    visibleColumns,
    getToggleHideAllColumnsProps,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 } as any,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  ) as any;

  const { globalFilter } = state;

  const { pageIndex } = state;

  return (
    <>
      <div className="bg-white p-1.5 md:p-4 rounded-md shadow-lg">
        <div className="space-y-3 sm:space-y-0 sm:flex justify-between items-center">
          <div>
            <h2 className="text-base sm:text-xl font-semibold tracking-tight">
              Lead
            </h2>
            <p className="text-xs text-muted-foreground">
              Here&apos;s a list of accounts.
            </p>
          </div>

          <div className="sm:flex justify-between items-center gap-2">
            <FaFileExcel
              className="hidden sm:block text-[1.5rem] text-[#00b400] cursor-pointer  transition duration-75 ease-in hover:text-[#4bbd4b]"
              onClick={() =>
                exportToExcel(
                  visibleColumns.map((a: any) => {
                    return { label: a.Header, value: a.id };
                  }),
                  rows.map((row: any) => row.original),
                  "Hiring Managers"
                )
              }
            />
            <div className="hidden lg:block">
              <Popover>
                <PopoverTrigger>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto hidden h-8 lg:flex"
                  >
                    <RxMixerHorizontal className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-white py-2 px-3 text-[0.8rem] shadow-lg rounded-md">
                  <div className=" bg-gray-50 font-semibold py-1 flex items-center gap-2">
                    <Checkbox {...getToggleHideAllColumnsProps()} />
                    Toggle All
                  </div>
                  <hr className="mb-2" />
                  {allColumns.map((column: any) => (
                    <div key={column.id}>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          {...column.getToggleHiddenProps()}
                        />{" "}
                        {column.Header}
                      </label>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center justify-between">
              <GlobalFiltering
                filter={globalFilter}
                setFilter={setGlobalFilter}
              />
              <FaFileExcel
                className="sm:hidden text-[1.5rem] text-[#00b400] cursor-pointer  transition duration-75 ease-in hover:text-[#4bbd4b]"
                onClick={() =>
                  exportToExcel(
                    visibleColumns.map((a: any) => {
                      return { label: a.Header, value: a.id };
                    }),
                    rows.map((row: any) => row.original),
                    "Collges"
                  )
                }
              />
            </div>
          </div>
        </div>

        {/* ------------------------------------Table-------------------------------------- */}
        <div className="overflow-auto">
          {/* {loading ? (
            <div className="w-full flex items-center justify-center h-[65vh]">
              <img src={spinner} className="w-[5rem]" alt="Loading..." />
            </div>
          ) : ( */}
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup: any) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
                    <th
                      className="text-nowrap"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div className="flex flex-row items-center justify-between">
                        <div>
                          {column.render("Header")}{" "}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? "⬇️"
                                : "⬆️"
                              : ""}
                          </span>
                        </div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.length === 0 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <span className="flex items-center justify-center">
                      {/* <img src="" alt="No Data" className="w-[10rem]" /> */}
                      No data available.
                    </span>
                  </td>
                </tr>
              ) : (
                page.map((row: any) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell: any) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {/* )} */}
        </div>

        {/*-------------------------------Pagination--------------------------- */}
        <div className="text-sm sm:text-base sm:flex justify-between items-center my-2">
          <div className="text-sm sm:text-base flex justify-between items-center gap-5">
            <span>
              Page
              <strong className="text-sm">
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <span>
              Go to page:
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
                className="w-[50px] border-gray-400 border-[1px] border-solid rounded-sm p-[0.2rem_0.4rem] text-[0.8rem]"
              />
            </span>
          </div>
          <div className="flex justify-around my-3 sm:block sm:m-0">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <RxDoubleArrowLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <RxChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <RxChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <RxDoubleArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadTable;
