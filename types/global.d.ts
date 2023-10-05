import { LucideIcon } from "lucide-react";

export declare global {
    type Algorithm = "Bubble Sort" | "Insertion Sort" | "Merge Sort" | "Quick Sort"
    
    type Filter = {
        id: string;
        name: Algorithm;
        icon: LucideIcon;
    }
}