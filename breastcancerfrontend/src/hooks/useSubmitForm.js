import { useState, useEffect } from "react"

const API_BASE= 'http://localhost:8000/'

export default function (action, body=null) {
    const [data, updateData] = useState(null)

    useEffect(() => {
        async function fetchData(url){
            if (!body) {
                updateData(null)
                return
            }
            const resp = await fetch(url, {
                method: "POST", 
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await resp.json()
            
            updateData(json)
        }

        fetchData(API_BASE + action)

    }, [action, body])

    return data
}
