import { useSearchParams } from "next/navigation";

export function useQueryString() {
    const searchParams = useSearchParams();
    const searchParamsObject = Object.fromEntries(searchParams);
    return searchParamsObject
}