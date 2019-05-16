import { useState, useEffect } from "react"

const API_BASE = 'http://localhost:8000/'

const HTTP_GET = 'GET'
const HTTP_POST = 'POST'

export {
    HTTP_GET, HTTP_POST
}

export default function (url, defaultData, method=HTTP_GET, body=null) {
    const [data, updateData] = useState(defaultData)

    const options = {method: method}
    if(method === HTTP_POST) {
        options.body = JSON.stringify(body)
    }

    useEffect(() => {
        async function fetchData(url){
            if (!url) {
                updateData(defaultData)
                return
            }
            const resp = await fetch(API_BASE + url, options)
            const json = await resp.json()
            updateData(json)
        }

        fetchData(url)

    }, [url])

    return data
}
