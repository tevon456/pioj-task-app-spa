import { get, set } from "idb-keyval";

import TinyDansk from "./tinyDansk";
import { isPast, parse } from "date-fns";
import { nanoid } from "nanoid";
import { toast } from "sonner";

const checkedStatus = (status, dueDate) => {
  if (status === "completed") {
    return status;
  } else {
    return isPast(parse(dueDate, "yyyy-MM-dd", new Date()))
      ? "past due"
      : status;
  }
};

const db = {
  task: {
    create: async (data) => {
      try {
        let existingTask = await get("task");

        if (!existingTask) {
          await set("task", [{ id: nanoid(12), ...data }]);
        } else {
          let task = await get("task");
          let clonedTask = [...task];

          clonedTask.push({ id: nanoid(12), ...data });

          await set("task", [...clonedTask]);
        }
      } catch (error) {
        console.log(error);
        toast.error(`unable to create task`);
      }
    },
    read: async (id) => {
      try {
        let task = await get("task");

        if (!task) {
          throw new Error();
        }

        let singleTask = TinyDansk.selectObjectFromArray(task, "id", id)[0];

        if (!singleTask) {
          return null;
        }

        let employee = TinyDansk.selectObjectFromArray(
          await get("employee"),
          "id",
          singleTask?.employeeId
        )[0];

        return {
          ...singleTask,
          status: checkedStatus(singleTask?.status, singleTask?.dueDate),
          employee,
        };
      } catch (error) {
        console.log(error);
        toast.error(`unable to read task ${id}`);
      }
    },
    readAll: async () => {
      try {
        let task = await get("task");

        if (!task) {
          throw new Error();
        }
        let employeeList = await get("employee");

        let tasksWithEmployees = task.map((singleTask) => {
          let employee = TinyDansk.selectObjectFromArray(
            employeeList,
            "id",
            singleTask?.employeeId
          )[0];

          return {
            ...singleTask,
            status: checkedStatus(singleTask?.status, singleTask?.dueDate),
            employee,
          };
        });

        return tasksWithEmployees;
      } catch (error) {
        console.log(error);
        toast.error(`unable to read task(s)`);
      }
    },
    update: async (id, data) => {
      try {
        let task = await get("task");

        if (!task) {
          throw new Error();
        }

        let updateTask = TinyDansk.updateObjectFromArray(task, "id", id, data);

        await set("task", [...updateTask]);
      } catch (error) {
        console.log(error);
        toast.error(`unable to update task with id ${id}`);
      }
    },
    destroy: async (id) => {
      try {
        let task = await get("task");

        if (!task) {
          throw new Error();
        }

        let updateTask = TinyDansk.deleteObjectFromArray(task, "id", id);

        await set("task", [...updateTask]);
      } catch (error) {
        console.log(error);
        toast.error(`unable to update task with id ${id}`);
      }
    },
  },
  employee: {
    create: async (data) => {
      try {
        let existingEmployee = await get("employee");

        if (!existingEmployee) {
          await set("employee", [{ id: nanoid(12), ...data }]);
        } else {
          let employee = await get("employee");
          let clonedEmployee = [...employee];

          clonedEmployee.push({ id: nanoid(12), ...data });

          await set("employee", [...clonedEmployee]);
        }
      } catch (error) {
        console.log(error);
        toast.error(`unable to create employee`);
      }
    },
    read: async (id) => {
      try {
        let employee = await get("employee");

        if (!employee) {
          throw new Error();
        }

        let individual = TinyDansk.selectObjectFromArray(employee, "id", id)[0];

        let tasks = TinyDansk.selectObjectFromArray(
          (await get("task")) || [],
          "employeeId",
          individual?.id
        );

        return { ...individual, tasks };
      } catch (error) {
        console.log(error);
        toast.error(`unable to read employee ${id}`);
      }
    },
    readAll: async () => {
      try {
        let employee = await get("employee");

        if (!employee) {
          throw new Error();
        }

        let employeesWithTasks = await Promise.all(
          employee.map(async (single) => {
            let tasks = TinyDansk.selectObjectFromArray(
              (await get("task")) || [],
              "employeeId",
              single?.id
            );

            return { ...single, tasks };
          })
        );

        return employeesWithTasks;
      } catch (error) {
        console.log(error);
        toast.error(`unable to read employee(s)`);
      }
    },
    update: async (id, data) => {
      try {
        let employee = await get("employee");

        if (!employee) {
          throw new Error();
        }

        let updateEmployee = TinyDansk.updateObjectFromArray(
          employee,
          "id",
          id,
          data
        );

        await set("employee", [...updateEmployee]);
      } catch (error) {
        console.log(error);
        toast.error(`unable to update employee with id ${id}`);
      }
    },
    destroy: async (id) => {
      try {
        let employee = await get("employee");

        if (!employee) {
          throw new Error();
        }

        let updateEmployee = TinyDansk.deleteObjectFromArray(
          employee,
          "id",
          id
        );

        await set("employee", [...updateEmployee]);
      } catch (error) {
        console.log(error);
        toast.error(`unable to update employee with id ${id}`);
      }
    },
  },
};

export default db;
