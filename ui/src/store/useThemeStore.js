import { create } from "zustand";


export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("konvo-theme") || "coffee",    // default theme
    setTheme: (theme) => {
        set({ theme });
        localStorage.setItem("konvo-theme", theme); // save the theme to local storage
    } // function to update the theme
})) 
