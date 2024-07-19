import { useEffect, useState } from "react";


function useDebounce<T>(value: T, delay?: number): T {
    const [debounceValue, SetDebounceValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            SetDebounceValue(value);
        }, delay || 500);

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay]);

    return debounceValue;
}

export default useDebounce;