import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUser, deleteUser, editUser, fetchUsers } from "../../misc/user";
import { IUser } from "../../types";

type InitialState = {
  users: IUser[];
  filteredUsers: IUser[];
  loading: boolean;
  error: string;
};
const initialState: InitialState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFilteredUsers(state, action) {
      state.filteredUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch movies
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.filteredUsers = [];
      state.error = action.error.message || "Something went wrong";
    });

    // Add a user
    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      addUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.users = state.users.concat(action.payload);
        state.filteredUsers = state.filteredUsers.concat(action.payload);
        state.error = "";
      }
    );
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    // Edit a user
    builder.addCase(editUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      editUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        const newUsers: IUser[] = [...state.users];
        //finding index of the user
        const index: number = newUsers.findIndex(
          (m) => m.id === action.payload.id
        );

        newUsers[index] = action.payload;
        state.users = newUsers;
        state.filteredUsers = newUsers;
        state.error = "";
      }
    );
    builder.addCase(editUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    // Delete a user
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteUser.fulfilled,
      (state, action: PayloadAction<string>) => {
        const newUsers = state.users.filter(
          (user: IUser) => user.id !== action.payload
        );
        state.loading = false;
        state.users = newUsers;
        state.filteredUsers = newUsers;
        state.error = "";
      }
    );
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const { setFilteredUsers } = userSlice.actions;
export default userSlice.reducer;
