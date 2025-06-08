import { useState, useEffect } from "react";
import { User } from "@/types/landing-page";
import {
  getUsers,
  saveUsers,
  getCurrentUser,
  setCurrentUser,
  generateId,
} from "@/lib/storage";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = () => {
      const storedUsers = getUsers();
      const current = getCurrentUser();
      setUsers(storedUsers);
      setCurrentUserState(current);
      setLoading(false);
    };
    loadUsers();
  }, []);

  const createUser = (userData: Omit<User, "id" | "createdAt">): User => {
    const newUser: User = {
      ...userData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveUsers(updatedUsers);

    return newUser;
  };

  const updateUser = (userId: string, updates: Partial<User>): void => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, ...updates } : user,
    );
    setUsers(updatedUsers);
    saveUsers(updatedUsers);

    // Update current user if it's being modified
    if (currentUser?.id === userId) {
      const updatedCurrentUser = { ...currentUser, ...updates };
      setCurrentUserState(updatedCurrentUser);
      setCurrentUser(updatedCurrentUser);
    }
  };

  const deleteUser = (userId: string): void => {
    // Don't allow deleting the last admin user
    const adminUsers = users.filter((user) => user.role === "admin");
    if (adminUsers.length === 1 && adminUsers[0].id === userId) {
      throw new Error("Sie können den letzten Administrator nicht löschen.");
    }

    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    saveUsers(updatedUsers);

    // If the deleted user is the current user, logout
    if (currentUser?.id === userId) {
      setCurrentUserState(null);
      setCurrentUser(null);
    }
  };

  const login = (email: string): User | null => {
    const user = users.find((u) => u.email === email);
    if (user) {
      setCurrentUserState(user);
      setCurrentUser(user);
      return user;
    }
    return null;
  };

  const logout = (): void => {
    setCurrentUserState(null);
    setCurrentUser(null);
  };

  const isAdmin = (): boolean => {
    return currentUser?.role === "admin";
  };

  const canEdit = (): boolean => {
    return currentUser?.role === "admin" || currentUser?.role === "editor";
  };

  return {
    users,
    currentUser,
    loading,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout,
    isAdmin,
    canEdit,
  };
};
