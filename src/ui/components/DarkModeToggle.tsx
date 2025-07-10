"use client";
import { useEffect, useState } from "react";

export function DarkModeToggle() {
	const [isDark, setIsDark] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Set initial theme on mount
	useEffect(() => {
		setMounted(true);
		const savedTheme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const dark = savedTheme === "dark" || (!savedTheme && prefersDark);
		setIsDark(dark);
	}, []);

	// Update the <html> class and localStorage whenever isDark changes
	useEffect(() => {
		if (!mounted) return;
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		localStorage.setItem("theme", isDark ? "dark" : "light");
	}, [isDark, mounted]);

	const toggleDark = () => setIsDark((prev) => !prev);

	if (!mounted) return null;

	return (
		<button onClick={toggleDark} aria-label="Toggle dark mode" type="button">
			{isDark ? "🌙 Dark" : "☀️ Light"}
		</button>
	);
}
