import axiosInstance from "../utils/request";

export const fetchTodoList = async () => {
  return await axiosInstance.get("/todo/list");
  //   return data;
};

export const addTodo = async (todoData: any) => {
  return await axiosInstance.post("/todo/create", todoData);
};

export const getTodo = async (todoCode: any) => {
  return await axiosInstance.get(`/todo/listById?todoCode=${todoCode}`);
};
export const updateTodo = async (todoCode: any, updateTodoData: any) => {
  return await axiosInstance.put(
    `/todo/update?todoCode=${todoCode}`,
    updateTodoData
  );
};

export const deleteTodo = async (todoCode: any) => {
  return await axiosInstance.put(`/todo/delete?todoCode=${todoCode}`);
};
