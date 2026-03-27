"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Role = "parent" | "teacher" | "student" | null;
type Tier = "free" | "individual" | "group";

interface UserState {
  isLoggedIn: boolean;
  isSubscriber: boolean;
  subscriptionTier: Tier;
  role: Role;
  sessionLookupCount: number;
  hasSeenSupportCTA: boolean;
  hasDismissedStickyFooter: boolean;
  hasDismissedDonationWidget: boolean;
  name: string;
  email: string;
}

interface UserContextType extends UserState {
  login: (email: string, name: string, role: Role) => void;
  logout: () => void;
  subscribe: (tier: "individual" | "group") => void;
  incrementLookup: () => void;
  dismissSupportCTA: () => void;
  dismissStickyFooter: () => void;
  dismissDonationWidget: () => void;
  setRole: (role: Role) => void;
}

const defaultState: UserState = {
  isLoggedIn: false,
  isSubscriber: false,
  subscriptionTier: "free",
  role: null,
  sessionLookupCount: 0,
  hasSeenSupportCTA: false,
  hasDismissedStickyFooter: false,
  hasDismissedDonationWidget: false,
  name: "",
  email: "",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UserState>(defaultState);

  const login = useCallback((email: string, name: string, role: Role) => {
    setState((s) => ({ ...s, isLoggedIn: true, email, name, role }));
  }, []);

  const logout = useCallback(() => {
    setState(defaultState);
  }, []);

  const subscribe = useCallback((tier: "individual" | "group") => {
    setState((s) => ({ ...s, isSubscriber: true, subscriptionTier: tier }));
  }, []);

  const incrementLookup = useCallback(() => {
    setState((s) => ({ ...s, sessionLookupCount: s.sessionLookupCount + 1 }));
  }, []);

  const dismissSupportCTA = useCallback(() => {
    setState((s) => ({ ...s, hasSeenSupportCTA: true }));
  }, []);

  const dismissStickyFooter = useCallback(() => {
    setState((s) => ({ ...s, hasDismissedStickyFooter: true }));
  }, []);

  const dismissDonationWidget = useCallback(() => {
    setState((s) => ({ ...s, hasDismissedDonationWidget: true }));
  }, []);

  const setRole = useCallback((role: Role) => {
    setState((s) => ({ ...s, role }));
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        logout,
        subscribe,
        incrementLookup,
        dismissSupportCTA,
        dismissStickyFooter,
        dismissDonationWidget,
        setRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
