import { useCallback, useReducer } from "react";
import toast from 'react-hot-toast';

type useFetchProps = {
    fetching: (url: string, newMethod: string, type: string, data?: any) => any,
}

export const UseFetch = (): useFetchProps => {
    const fetching = useCallback( async (url: string, newMethod: string, type: string, data?: any) => {
        switch(newMethod){
            case "POST":
            case "PUT":
            case "DELETE":
                try {
                    const response = await fetch(url, 
                        {
                            method: newMethod,
                            headers: {
                                "content-type": type,
                            },
                            body: JSON.stringify(data),
                        }
                    );
                    const resJson = await response.json();
                    if(resJson.error) {
                        toast.error(resJson.error);
                        return;
                    }else {
                        toast.success(resJson.success);
                        return;
                    }
                } catch (error: any) {
                    console.log('error: ', error);
                    return 'Something Went Wrong!';
                }
            case "GET":
                try {
                    const response = await fetch(url,
                        {
                            method: newMethod,
                            headers: {
                                "content-type": type
                            },
                        }
                    );
                    const resJson = await response.json();
                    return resJson.data;
                } catch (error: any) {
                    console.log('error: ', error);
                }
                break;
        }
    }, []);

    return { fetching }
}