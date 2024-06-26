"use client";

import {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {Input} from "@/components/ui/input";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import React from "react";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    columnsValue: string
}

export function DataTable<TData, TValue, columnsValue>({
                                                           columns,
                                                           data,
                                                           columnsValue
                                                       }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            columnFilters,
        },
    });

    return (
        <div>
            <div className="flex items-center py-4">
                {columnsValue === "Quarters" && (
                    <Input
                        placeholder="Filter Quaters..."
                        value={table.getColumn("en_qv_tract")?.getFilterValue() as string ?? ""}
                        onChange={(event: any) =>
                            table.getColumn("en_qv_tract")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                )}
                {columnsValue === "Township" && (
                    <Input
                        placeholder="Filter Township..."
                        value={table.getColumn("en_town_township")?.getFilterValue() as string ?? ""}
                        onChange={(event: any) =>
                            table.getColumn("en_town_township")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                )}
                {columnsValue === "PostalCode" && (
                    <Input
                        placeholder="Filter PostalCode..."
                        value={table.getColumn("postal_code")?.getFilterValue() as string ?? ""}
                        onChange={(event: any) =>
                            table.getColumn("postal_code")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                )}
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
