'use client';

import useDebounce from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import Input from "./Input";

const SearchInput = () => {
    const router = useRouter();
    const [value, SetValue] = useState<string>("");
    const debounceValue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            title: debounceValue
        };

        const url = qs.stringifyUrl({
            url: "/search",
            query: query
        });

        router.push(url);
    }, [debounceValue, router])

    return (
        <Input placeholder="What would you like to listen today?"
        value={value}
        onChange={(e) => SetValue(e.target.value)}/>
    )
}

export default SearchInput;