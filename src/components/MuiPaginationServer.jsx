import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";

const SERVER_OPTIONS = {
  useCursorPagination: false,
};

const col = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "desk",
    headerName: "Desk",
  },
  { field: "commodity", headerName: "Commodity" },

  { field: "traderName", headerName: "Trader Name" },
  { field: "traderEmail", headerName: "Trader Email" },
  { field: "quantity", headerName: "Quantity" },
];

const { useQuery, ...data } = createFakeServer({}, SERVER_OPTIONS);

console.log("data", data);

export default function MuiPaginationServer() {
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  const { isLoading, rows, pageInfo } = useQuery(paginationModel);

  console.log(useQuery(paginationModel));

  // Some API clients return undefined while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = React.useState(
    pageInfo?.totalRowCount || 0
  );
  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      pageInfo?.totalRowCount !== undefined
        ? pageInfo?.totalRowCount
        : prevRowCountState
    );
  }, [pageInfo?.totalRowCount, setRowCountState]);

  return (
    <div style={{ height: 400, flex: 1 }}>
      <DataGrid
        rows={rows}
        columns={col}
        // {...data}
        rowCount={rowCountState}
        loading={isLoading}
        pageSizeOptions={[5, 10, 20]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
}
//must return with following format

// const { isLoading, rows, pageInfo }

// {isLoading: false, rows: Array(5), pageInfo: {…}}
// isLoading
// :
// false
// pageInfo
// :
// nextCursor
// :
// undefined
// pageSize
// :
// 5
// totalRowCount
// :
// 100
// [[Prototype]]
// :
// Object
// rows
// :
// (5) [{…}, {…}, {…}, {…}, {…}]
