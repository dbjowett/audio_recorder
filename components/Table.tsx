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
import { AudioFile, useIndexedDb } from "@/lib/hooks/useIndexedDb";
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
import { FC } from "react";

const Dropdown: FC<{ file: AudioFile }> = ({ file }) => {
  const { deleteById, updateFile } = useIndexedDb();

  const handleDelete = () => deleteById(file.id);
  const handleUpload = () => updateFile({ ...file, isUploaded: true });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Rename</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Download </DropdownMenuItem>
        <DropdownMenuItem onClick={handleUpload}>Upload </DropdownMenuItem>
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
                    <Dropdown file={item} />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};
