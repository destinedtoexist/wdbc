import { useState, useEffect } from "react";
import useSubmitForm from "./useSubmitForm";

export default (algo, vars) => {
    const [data, setData] = useState(null)

    const formSubmitResponse = useSubmitForm('classifier/classify/', {algo, vars})

    useEffect((formSubmitResponse) => {
        console.log(formSubmitResponse);
    }, [formSubmitResponse])

    return data

}