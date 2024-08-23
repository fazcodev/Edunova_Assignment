import { useState, useMemo } from "react";
import {
  trash_icon,
  edit_icon,
  arrowUp_icon,
  arrowLeft_icon,
} from "../assets/assets";
import { Pagination } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  FilterFn,
} from "@tanstack/react-table";

import { fetchData, User } from "./users_data";
import UserCard from "./UserCard";
import EditProfileModal from "./EditProfileModal";
import DeleteModal from "./DeleteModal";

function UsersTable({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}) {
  const [openEditModal, setOpenEditModal] = useState<{
    user: User | null;
    open: boolean;
  }>({ user: null, open: false });

  const closeEditModal = () => setOpenEditModal({ user: null, open: false });
  const [openDeleteModal, setOpenDeleteModal] = useState<{
    user: User | null;
    open: boolean;
  }>({ user: null, open: false });
  const closeDeleteModal = () => setOpenDeleteModal({user: null, open: false});

  const globalFilterFn: FilterFn<User> = (row, columnId, filterValue) => {
    if (columnId === "name") {
      return (
        row.original.name.firstName
          .toLowerCase()
          .includes(filterValue.toLowerCase()) ||
        row.original.name.lastName
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
    return row.original[columnId as keyof User]
      .toString()
      .toLowerCase()
      .includes(filterValue.toLowerCase());

    return false; // Default case for other data types
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: "name",
        header: () => (
          <div className="flex items-center">
            Name
            <div className="flex flex-col ml-3">
              <button
                onClick={() =>
                  setSorting((prev) => {
                    if (prev.length == 0 || prev[0].id != "name") {
                      return [{ id: "name", desc: false }];
                    }
                    return [{ id: "name", desc: false }];
                  })
                }
              >
                <img src={arrowUp_icon} alt="Sort" />
              </button>
              <button
                onClick={() =>
                  setSorting((prev) => {
                    if (prev.length == 0 || prev[0].id != "name") {
                      return [{ id: "name", desc: true }];
                    }
                    return [{ id: "name", desc: true }];
                  })
                }
              >
                <img src={arrowUp_icon} alt="Sort" className="rotate-180" />
              </button>
            </div>
          </div>
        ),
        sortingFn: (rowA, rowB) => {
          return rowA.original.name.firstName.localeCompare(
            rowB.original.name.firstName
          );
        },
        accessorFn: (row) => `${row.name.firstName} ${row.name.lastName}`, // Custom accessor function
        cell: (props) => {
          const name = props.row.original.name;
          return (
            <div className="flex justify-start gap-2">
              <img
                src={name.avatarURL}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover object-center"
              />
              <div>
                <div className="text-black text-sm font-medium">
                  {name.firstName + " " + name.lastName}
                </div>
                <div className="text-gray-500 text-sm font-normal">
                  @{name.username}
                </div>
              </div>
            </div>
          );
        },
        size: 279,
        footer: (props) => props.column.id,
      },
      {
        id: "status",
        header: () => (
          <div className="flex justify-start items-center">
            Status
            <div className="flex flex-col ml-2">
              <button
                onClick={() =>
                  setSorting((prev) => {
                    if (prev.length == 0 || prev[0].id != "status") {
                      return [{ id: "status", desc: false }];
                    }
                    return [{ id: "status", desc: false }];
                  })
                }
              >
                <img src={arrowUp_icon} alt="Sort" className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setSorting((prev) => {
                    if (prev.length == 0 || prev[0].id != "status") {
                      return [{ id: "status", desc: true }];
                    }
                    return [{ id: "status", desc: true }];
                  })
                }
              >
                <img src={arrowUp_icon} alt="Sort" className="rotate-180" />
              </button>
            </div>
          </div>
        ),
        accessorKey: "status",
        cell: (props) => {
          const status = props.row.original.status;
          return (
            <div className="flex items-center py-0.5 px-1.5 justify-center border border-gray-300 text-gray-700 rounded-lg">
              <span
                className={`w-2 h-2 inline-block rounded-full mr-1 ${
                  status == "Active" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="text-xs font-medium">{status}</span>
            </div>
          );
        },
        size: 109,
        footer: (props) => props.column.id,
      },
      {
        id: "role",
        header: "Role",
        accessorKey: "role",
        cell: (props) => {
          const role = props.row.original.role;
          return <span className="text-sm font-normal">{role}</span>;
        },
        size: 179,
        footer: (props) => props.column.id,
      },
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
        cell: (props) => {
          const email = props.row.original.email;
          return <span className="text-sm font-normal">{email}</span>;
        },
        size: 208,
        footer: (props) => props.column.id,
      },
      {
        id: "teams",
        header: "Teams",
        accessorKey: "teams", // Custom accessor function
        filterFn: globalFilterFn,
        cell: (props) => {
          const teamsArr = props.row.original.teams.split(",");
          return (
            <div className="flex justify-start gap-1">
              {/* map only starting min(3, teamsArr.length()) teams as div */}
              {teamsArr
                .slice(0, Math.min(3, teamsArr.length))
                .map((team, idx) => (
                  <div
                    key={team}
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      idx == 0
                        ? "bg-brand-50 border border-brand-200 text-dark_violet"
                        : idx == 1
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                    }`}
                  >
                    {team}
                  </div>
                ))}
              {/* if teamsArr.length > 3, show a div with remaining count */}
              {teamsArr.length > 3 ? (
                <div className="text-xs px-2 py-0.5 rounded-full bg-gray-50 border border-gray-200 text-gray-700">
                  +{teamsArr.length - 3}
                </div>
              ) : null}
            </div>
          );
        },
        size: 208,
        footer: (props) => props.column.id,
      },
      {
        // New column for buttons
        header: "",
        id: "actions",
        cell: (props) => (
          <div className="flex justify-center gap-1 text-gray-600">
            <button
              onClick={(e) => {
                setOpenDeleteModal({user: props.row.original, open: true});
                e.stopPropagation();
              }}
            >
              <img src={trash_icon} alt="Delete" className="m-2.5" />
            </button>
            <button
              onClick={(e) => {
                setOpenEditModal({ user: props.row.original, open: true });
                e.stopPropagation();
              }}
            >
              <img src={edit_icon} alt="Edit" className="m-2.5" />
            </button>
          </div>
        ),
        size: 116, // Set size for button column
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  interface UserDataResponse {
    rows: User[];
    rowCount: number;
  }

  const { data } = useQuery({
    queryKey: ["data", pagination],
    queryFn: () => fetchData(pagination),
    placeholderData: keepPreviousData,
  }) as { data: UserDataResponse; isFetching: boolean };

  const defaultData = useMemo(() => [], []);

  const table = useReactTable<User>({
    data: data?.rows ?? defaultData,
    columns,
    rowCount: data?.rowCount,
    state: {
      pagination,
      sorting,
      globalFilter,
    },
    filterFns: {
      fuzzy: globalFilterFn,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: globalFilterFn,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    debugTable: true,
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <>
      <EditProfileModal
        open={openEditModal.open}
        user={openEditModal.user}
        handleClose={closeEditModal}
      />
      <DeleteModal open={openDeleteModal.open} handleClose = {closeDeleteModal} user={openDeleteModal.user}/>
      {selectedUser && (
        <UserCard user={selectedUser} setSelectedUser={setSelectedUser} />
      )}
      <table className="text-gray-600">
        <thead>
          <tr>
            {table.getFlatHeaders().map((header) => {
              const size = header.column.columnDef.size || 100; // Fallback size
              return (
                <th
                  key={header.id}
                  style={{ width: `${size}px` }}
                  className="border-b px-4 text-left font-medium text-xs h-11"
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="odd:bg-gray-50">
                {row.getVisibleCells().map((cell) => {
                  const size = cell.column.columnDef.size || 100; // Fallback size
                  return (
                    <td
                      key={cell.id}
                      style={{ width: `${size}px` }}
                      className="border-b px-4 h-[4.5rem] cursor-pointer"
                      onClick={() => setSelectedUser(cell.row.original)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between h-[4.3rem] px-6 pt-3 pb-4 gap-2 z-[-1] relative">
        <button
          className="border px-3 py-2 flex items-center gap-1 rounded-lg"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <img src={arrowLeft_icon} alt="Previous" className="w-5 h-5" />
          Previous
        </button>
        <Pagination
          count={table.getPageCount()}
          page={table.getState().pagination.pageIndex + 1}
          boundaryCount={3}
          siblingCount={0}
          size="large"
          shape="rounded"
          hideNextButton
          hidePrevButton
          onChange={(_, page) => table.setPageIndex(page - 1)}
          //   style={{zIndex: 1, position: "relative"}}
        />
        <button
          className="border px-3 py-2 flex items-center gap-1 rounded-lg"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <img src={arrowLeft_icon} alt="Next" className="w-5 h-5 rotate-180" />
        </button>
      </div>
    </>
  );
}

export default UsersTable;
