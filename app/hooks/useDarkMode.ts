import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export const useDarkMode = () => {
	const { resolvedTheme } = useTheme();
	const [isDark, setIsDark] = useState<boolean | null>(null);

	useEffect(() => {
		if (resolvedTheme) {
			setIsDark(resolvedTheme === "dark");
		}
	}, [resolvedTheme]);

	return isDark;
};
