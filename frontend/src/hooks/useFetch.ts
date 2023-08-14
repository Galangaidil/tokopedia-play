import {useState, useEffect} from 'react';

interface FetchResult<T> {
    data: T | null;
    loading: boolean;
    error: any; // You can replace 'any' with a specific error type if needed
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function useFetch<T>(endpoint: string, method: HttpMethod, body?: any): FetchResult<T> {
    const BASE_URL = 'http://localhost:3000/api/';

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(BASE_URL + endpoint, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });

                if (!response.ok) {
                    throw new Error('Something went wrong');
                }

                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [endpoint, method, body]);

    return {data, loading, error};
}

export default useFetch;