import { useEffect, useState } from "react";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import _ from "lodash";
import "../../../src/App.css";
import {
  fetchTodoList,
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../../api/todo.api";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DetailModal from "./detailModal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DeleteTodoModal from "./deleteModal";

function App() {
  const [rows, setRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);
  const [showPopUp, setShowPopUp] = useState<any>(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [todoCode, setTodoCode] = useState("");
  const [todoData, setTodoData] = useState<any>("");
  const [showDetailPopup, setShowDetailPopup] = useState<any>(false);
  const [editTodo, setEditTodo] = useState(null);
  const [deleteModal, setdeleteModal] = useState<any>(false);
  const [listTodo, setListTodo] = useState<any>([]);

  const fetchTodos = async () => {
    const data = await fetchTodoList();
    const todoList: any = _.get(data, "listTodos");
    setListTodo(todoList);

    const rows = todoList?.map((el: any, index: any) => ({
      id: index + 1,
      todoCode: el.todoCode,
      title: el.title,
      description: el.description,
      status: el.status,
    }));

    const columns = [
      { field: "id", headerName: "Id", width: 80 },
      { field: "title", headerName: "Title", width: 200 },
      { field: "description", headerName: "Description", width: 200 },
      { field: "status", headerName: "Status", width: 90 },
      {
        field: "todoCode",
        headerName: "Todo-Code",
        type: "number",
        width: 100,
      },
      {
        field: "action",
        headerName: "Action",
        width: 250,
        renderCell: (params: GridCellParams) => (
          <>
            <div>
              <IconButton
                onClick={() => {
                  handleDetail(params.row);
                }}
              >
                <RemoveRedEyeIcon />
              </IconButton>
            </div>
            <div>
              <IconButton
                onClick={() => {
                  handleClickOpen(params.row);
                }}
              >
                <EditIcon />
              </IconButton>
            </div>
            <div>
              <IconButton
                onClick={() => {
                  handleClickOpendelete(params.row);
                }}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </div>
          </>
        ),
      },
    ];

    setRows(rows);
    setColumns(columns);
  };

  const handleClose = () => {
    handleClear();
    setShowPopUp(false);
    setEditTodo(null);
  };

  const handleClear = () => {
    setTitle(""), setDescription(""), setStatus(""), setTodoCode("");
  };

  const handleClickOpen = (todo: any = null) => {
    setEditTodo(todo);
    setTitle(todo ? todo.title : "");
    setDescription(todo ? todo.description : "");
    setStatus(todo ? todo.status : "");
    setTodoCode(todo ? todo.todoCode : "");
    setShowPopUp(true);
  };

  const handleAddTodo = async () => {
    const handleData = {
      title,
      description,
      status,
      todoCode,
    };
    await addTodo(handleData);
    handleClose();
  };

  const handleDetail = async (rowData: any) => {
    try {
      const response = await getTodo(rowData.todoCode);
      const listOfTodo: any = _.get(response, "listTodos");
      setTodoData(listOfTodo);
      setShowDetailPopup(true);
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };
  const handleEdit = async (rowData: any) => {
    try {
      const handleData = {
        title: title,
        description: description,
        status: status,
        todoCode: todoCode,
      };
      await updateTodo(rowData.todoCode, { ...handleData });

      // setShowPopUp(false);
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const handleCloseDetailPopup = () => {
    setShowDetailPopup(false);
  };
  const handleClickOpendelete = async (todo: any) => {
    setdeleteModal(true);
    setTodoData(todo);
  };

  const handleCloseDelete = () => {
    setdeleteModal(false);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => {
          handleClickOpen();
        }}
      >
        Add Todo
      </Button>
      <Dialog open={showPopUp}>
        <DialogTitle>{editTodo ? "Edit Todo" : "Add Todo"}</DialogTitle>
        <DialogContent>
          <TextField
            id="title"
            fullWidth
            autoFocus
            label="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            variant="standard"
          />
          <TextField
            fullWidth
            autoFocus
            id="description"
            label="Description"
            multiline
            maxRows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            variant="standard"
          />
          <TextField
            id="todocode"
            fullWidth
            autoFocus
            label="Todo-Code"
            value={todoCode}
            onChange={(e) => {
              setTodoCode(e.target.value);
            }}
            variant="standard"
          />
          <TextField
            id="status"
            fullWidth
            autoFocus
            label="Status"
            placeholder="(open,ongoing,on hold,close)"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={editTodo ? () => handleEdit(editTodo) : handleAddTodo}
          >
            {editTodo ? "Save" : "Add"}
          </Button>
          <Button
            onClick={() => {
              setShowPopUp(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={{ page: 0, pageSize: 10 }}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
      <DetailModal
        open={showDetailPopup}
        handleClose={handleCloseDetailPopup}
        todoData={todoData}
      />
      <DeleteTodoModal
        open={deleteModal}
        handleClose={handleCloseDelete}
        todoData={todoData}
        // handleClickDelete={handleClickDelete}
      />
    </div>
  );
}

export default App;
