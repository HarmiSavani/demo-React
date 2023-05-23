import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "../../../src/App.css";
const detailModal = ({
  open,
  handleClose,
  todoData,
}: {
  open: any;
  handleClose: any;
  todoData: any;
}) => {
  //   const theme = useTheme();
  //   const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Todo Details</DialogTitle>
      <DialogContent>
        <table>
          <tbody>
            <tr id="t-detail">
              <th>Title</th>
              <th>Description</th>
            </tr>

            <tr>
              <td>{todoData.title}</td>
              <td>{todoData.description}</td>
            </tr>

            <tr id="t-detail">
              <th>Todo Code</th>
              <th>Status</th>
            </tr>

            <tr>
              <td>{todoData.todoCode}</td>
              <td>{todoData.status}</td>
            </tr>
          </tbody>
        </table>
        {/* <TextField
          id="title"
          fullWidth
          disabled
          autoFocus
          label="Title"
          variant="standard"
          value={todoData.title}
        />
        <TextField
          fullWidth
          autoFocus
          disabled
          id="description"
          label="Description"
          multiline
          maxRows={4}
          value={todoData.description}
          variant="standard"
        />
        <TextField
          id="todocode"
          fullWidth
          disabled
          autoFocus
          label="Todo-Code"
          value={todoData.todoCode}
          variant="standard"
        />
        <TextField
          id="status"
          fullWidth
          disabled
          autoFocus
          label="Status"
          value={todoData.status}
          variant="standard"
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default detailModal;
