import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { deleteTodo } from "../../api/todo.api";

const deleteTodoModal = ({
  open,
  handleClose,
  todoData,
}: // handleClickDelete,
{
  open: any;
  handleClose: any;
  todoData: any;
  // handleClickDelete?: any;
}) => {
  const handleClickDelete = async (todo: any) => {
    try {
      await deleteTodo(todo.todoCode);
    } catch (error) {
      console.log("Error occurred:", error);
    }
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {todoData.todoCode} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClickDelete(todoData);
            }}
            autoFocus
          >
            Agree
          </Button>
          <Button onClick={handleClose}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default deleteTodoModal;
