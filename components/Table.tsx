"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIndexedDb } from "@/lib/hooks/useIndexedDb";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const Dropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(payment.id)}
        >
          Copy payment ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const AudioFileTable = () => {
  const { allItems } = useIndexedDb();
  return (
    <div className="max-h-[30vh] overflow-auto border-white">
      <Table>
        <TableCaption>A list of your recent audio recordings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>File Uploaded</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>''</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allItems
            ?.sort((a, b) => b.id - a.id)
            .map((item) => {
              const uploadedText = item.isUploaded
                ? "Uploaded"
                : "Not Uploaded";
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">ID{item.id}</TableCell>
                  <TableCell>{uploadedText}</TableCell>
                  <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell className="flex float-end">
                    <Dropdown />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};
