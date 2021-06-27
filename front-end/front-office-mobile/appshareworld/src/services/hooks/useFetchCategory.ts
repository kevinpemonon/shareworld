/* import NsCategory from '../../models/NsCategory';
import useSWR from 'swr';


export function useFetchCategories<Data = NsCategory.ICategory[], Error = any>() {


    const url = `http://localhost:3333/categories`;


    const { data, error } = useSWR<Data, Error>(url, async (url) => {

        const fetchResult = await fetch(url);
        const jsonResult = await fetchResult.json();
        return jsonResult;
    });

    return { data, error };
} */