import React, { useState, useEffect, useRef } from 'react'
import './List.scss'

export default function List({ pageNum }) {

    const [isLoading, setIsLoading] = useState(true)
    const [listData, setListData] = useState([])
    const [selectedRow, setSelectedRow] = useState({})
    const [errorMsg, setErrorMsg] = useState("")
    const centerImage = useRef(null)


    useEffect(() => {
        //setLoading between pages
        setIsLoading(true)
        //scroll to the top off the page when page changes
        window.scrollTo(0, 0)
        fetch(`https://api.github.com/gists/public?per_page=30&page=${pageNum}&since=2021-04-18T07:35:13Z`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    // error if API rate limit exceeded
                    throw new Error("Something went wrong")
                }
            })
            .then(data => {
                setListData(data)
                setIsLoading(false)
            },
                (error) => {
                    setIsLoading(false)
                    setErrorMsg(error)
                }
            )

    }, [pageNum])

    const changeSelectedRow = (id, image) => {
        setSelectedRow({ id, image })
        //shows animation and removes element after 1 s
        const img = centerImage.current
        img.style.display = "block"
        img.className = img.className + " animateFade"
        setTimeout(() => {
            img.className = "fadeImage"
            img.style.display = "none"
        }, 1000)

    }

    const displayGists = () => {
        if (!isLoading) {
            return listData.map(gist => {
                //using only first file in files object name
                const fileNames = Object.keys(gist.files)[0]
                return <li
                    key={gist.id}
                    className={selectedRow.id === gist.id ? "selected" : undefined}
                    onClick={() => changeSelectedRow(gist.id, gist.owner.avatar_url)} >
                    <img
                        src={gist.owner.avatar_url}
                        alt="avatar_img"
                    >
                    </img>
                    <span>{fileNames}</span>
                </li>
            })
        }
    }

    if (errorMsg) {
        return <p>{errorMsg.message}</p>
    }

    return (
        <main>
            {isLoading ?
                <p className="loading">Loading...</p> :
                <ul>
                    {displayGists()}
                </ul>}
            <img
                ref={centerImage}
                src={selectedRow.image}
                alt="avatar_img"
                className={"fadeImage"}
            >
            </img>
        </main>
    )
}
