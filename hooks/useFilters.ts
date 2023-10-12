"use client"

import { create } from "zustand";

type FiltersHookStates = {
    activeFilter: string;
    isOpen: boolean;
    isAware: boolean;
}

type FiltersHookActions = {
    setActiveFilter: (filter: string) => void;
    onOpen: () => void;
    onAware: () => void;
    onNotAware: () => void;
    onClose: () => void;
    onToggle: () => void;
}

export const useFilters = create<FiltersHookStates & FiltersHookActions>((set) => ({
    activeFilter: "",
    isOpen: true,
    isAware: false,
    setActiveFilter: (filter) => set(state => ({ activeFilter: filter })),
    onOpen: () => set({ isOpen: true }),
    onAware: () => set({ isAware: true }),
    onNotAware: () => set({ isAware: false }),
    onClose: () => set({ isOpen: false }),
    onToggle: () => set(state => ({ isOpen: state.isOpen ? false : true }))
}));
