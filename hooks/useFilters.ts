"use client"

import { create } from "zustand";

type FiltersHookStates = {
    active: string;
    isOpen: boolean;
}

type FiltersHookActions = {
    setActive: (name: string) => void;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
}

export const useFilters = create<FiltersHookStates & FiltersHookActions>((set) => ({
    active: "",
    isOpen: true,
    setActive: (name) => set({ active: name }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onToggle: () => set(state => ({ isOpen: state.isOpen ? false : true }))
}));
