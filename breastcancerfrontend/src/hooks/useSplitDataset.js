import { useState, useEffect } from "react"

const API_ENDPOINT = 'http://localhost:8000/classifier/split/'

export default function (testSize) {
    const [data, updateData] = useState(null)

    useEffect(() => {
        async function fetchData(url){
            if (!testSize) {
                updateData(null)
                return
            }
            const resp = await fetch(url, {
                method: "POST", 
                body: JSON.stringify({testSize: testSize}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await resp.json()
            updateData(json)
        }

        fetchData(API_ENDPOINT)

    }, [testSize])

    return data
}
