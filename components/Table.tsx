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
import {
  Download,
  EllipsisVertical,
  Pencil,
  Save,
  Trash,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { FC, useState } from "react";
import { downloadBlob } from "@/lib/utils";
import { Input } from "./ui/input";

const Dropdown: FC<{ file: AudioFile; handleStartRename: () => void }> = ({
  file,
  handleStartRename,
}) => {
  const { deleteById } = useIndexedDb();

  const handleDelete = () => deleteById(file.id);
  const handleDownload = () => downloadBlob(file.blob);
  const handleEdit = () => handleStartRename();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleDelete} className="gap-4">
          <Trash className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEdit} className="gap-4">
          <Pencil className="h-4 w-4" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownload} className="gap-4">
          <Download className="h-4 w-4" />
          Download
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const AudioFileTable = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");

  const { allAudioFiles, updateFile } = useIndexedDb();

  const handleStartRename = (item: AudioFile) => {
    setEditingId(item.id);
    setEditingTitle(item.title);
  };

  const handleSave = (item: AudioFile) => {
    updateFile({ ...item, title: editingTitle });
    handleCancel();
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  return (
    <div className="max-h-[30vh] overflow-auto border-white">
      <Table>
        <TableCaption>A list of your recent audio recordings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>File Uploaded</TableHead>
            <TableHead>Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAudioFiles
            ?.sort((a, b) => b.id - a.id)
            .map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">ID{item.id}</TableCell>
                  {editingId === item.id ? (
                    <TableCell>
                      <div className="flex gap-2">
                        <Input
                          defaultValue={item.title}
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-[40px]"
                          onClick={() => handleSave(item)}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-[40px]"
                          onClick={handleCancel}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  ) : (
                    <TableCell onDoubleClick={() => handleStartRename(item)}>
                      {item.title}
                    </TableCell>
                  )}
                  <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell className="flex float-end">
                    <Dropdown
                      file={item}
                      handleStartRename={() => handleStartRename(item)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};
