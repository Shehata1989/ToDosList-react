
import { v4 as uuidv4 } from "uuid";
export const todosReducer = (todos, action) => {

  const { taskName, task, updateInput } = action.payload;

  switch (action.type) {
    case "ADD_TASK": {
      const newTask = {
        id: uuidv4(),
        taskName: taskName,
        details: "",
        isCompleted: false,
      };
      return [...todos, newTask];
    }

    case "REMOVE_TASK": {
      const newTodos = todos.filter((todo) => todo.id !== action.payload);
      return newTodos;
    }

    case "UPDATE_TASK": {
      if (
        task &&
        (updateInput.newTaskName?.trim() !== task.taskName ||
          updateInput.newDetails?.trim() !== task.details)
      ) {
        const newTodos = todos.map((todo) => {
          if (todo.id === task.id) {
            return {
              ...todo,
              taskName: updateInput.newTaskName,
              details: updateInput.newDetails,
            };
          }
          return todo;
        });
        return newTodos;
      }
      return todos;
    }

    case "COMPLETE_TASK": {
      const updatedTasks = todos.map((task) =>
        task.id === action.payload
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      );
      return updatedTasks;
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
