import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/theme-slice";
import branchSlice from "./slices/barnches-slice";
import userSlice from "./slices/user-slice";
import departmentSlice from "./slices/department-slice";
import employeesSlice from "./slices/employees-slice";
import taskSlice from "./slices/task-slice";
import attendanceSlice from "./slices/attendance-slice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    branches: branchSlice,
    user: userSlice,
    departs: departmentSlice,
    employees: employeesSlice,
    tasks: taskSlice,
    attend: attendanceSlice,
  },
});
