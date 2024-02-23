import React, { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import CloseIcon from "@mui/icons-material/Close";

import { api } from "../api/api";

const columns = [
  { id: "email", label: "Email", minWidth: 50 },
  { id: "fullName", label: "Full Name", minWidth: 50 },
  { id: "phoneNumber", label: "Phone Number", minWidth: 50 },
  { id: "collegeName", label: "College Name", minWidth: 50 },
  { id: "department", label: "Department", minWidth: 50 },
  { id: "paid", label: "Paid", minWidth: 50 },
];

const StudentList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/getStudents")
      .then((result) => {
        setRows(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <div className={"w-full text-center mt-10"}>Loading...</div>;
  }

  return (
    <div>
      <div className="w-full">
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            padding: "20px",
          }}
        >
          <TableContainer
            sx={{ minHeight: "830px", maxHeight: "950px", overflow: "scroll" }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{ overflow: "scroll" }}>
                {rows.map((row) => {
                  console.log(row);
                  return (
                    <TableRow hover role="checkbox">
                      {columns.map((column) => {
                        if (column.id === "paid") {
                          return (
                            <TableCell>
                              {row[column.id] ? (
                                <FileDownloadDoneIcon />
                              ) : (
                                <CloseIcon />
                              )}
                            </TableCell>
                          );
                        }
                        return <TableCell>{row[column.id]}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default StudentList;
