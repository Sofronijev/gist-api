import React, { useState } from 'react'
import './Pagination.scss'

export default function Pagination({ pageNum, setPageNum }) {

    const [pageInput, setPageInput] = useState("")
    const [showPageInput, setShowPageInput] = useState("")


    //first and last page in pagination, maximum number of fetched gists can be 3000   
    const firstPage = 1
    const lastPage = 100
    //other pages in pagination
    const currentPage = pageNum > lastPage - 2 ? lastPage - 2 : pageNum === 1 ? 2 : pageNum
    const nextToLastPage = lastPage - 1
    
    const changePageNum = (page) => {
        setPageNum(page)
        window.history.pushState({ page_num: page }, '', page)
    }

    const handlePageInput = (e) => {
        const { value } = e.target;
        const numRegex = /^\d+$/
        if (numRegex.test(value) || value === "") {
            if (parseInt(value) <= 0 || parseInt(value) > 100) {
                return
            }
            setPageInput(value)
        }
    }

    const handleSearch = () => {
        if (pageInput.trim() !== "") {
            const number = parseInt(pageInput)
            if (!isNaN(number)) {
                changePageNum(number)
                setShowPageInput(false)
            }
        }
    }

    const showInput = () => {
        setShowPageInput(currState => !currState)
        setPageInput("")
    }

    //Page change is pushed in history so user can use back button in browser
    const nextPage = () => {
        //For 30 rows per page, max number of pages are 100
        setPageNum(currNum => currNum === 100 ? 100 : currNum + 1)
        window.history.pushState({ page_num: pageNum === 100 ? 100 : pageNum + 1 }, '', pageNum === 100 ? 100 : pageNum + 1)
    }
    const prevPage = () => {
        //Page number can't be 0 or negative number
        setPageNum(currNum => currNum === 1 ? 1 : currNum - 1)
        window.history.pushState({ page_num: pageNum === 1 ? 1 : pageNum - 1 }, '', pageNum === 1 ? 1 : pageNum - 1)
    }
    return (
        <div className="pagination">
            <div className="paginationNumbers">
                <span onClick={() => changePageNum(firstPage)} className={pageNum === firstPage ? "currentPage" : undefined}>{firstPage} </span>
                <span onClick={() => changePageNum(currentPage)} className={pageNum === currentPage ? "currentPage" : undefined}>{currentPage} </span>
                <div className="dropdown">
                    <div className="dropdown-content" style={{ display: showPageInput ? "inline-block" : "none" }}>
                        <label htmlFor="pageNumber">Page:</label>
                        <input id="pageNumber" name="pageNumber" type="text" value={pageInput} onChange={handlePageInput}></input>
                        <button type="button" onClick={handleSearch}>go</button>
                    </div>
                    <span onClick={showInput} >... </span>
                </div>
                <span onClick={() => changePageNum(nextToLastPage)} className={pageNum === nextToLastPage ? "currentPage" : undefined}> {nextToLastPage} </span>
                <span onClick={() => changePageNum(lastPage)} className={pageNum === lastPage ? "currentPage" : undefined}>{lastPage} </span>
            </div>
            <button type="button" onClick={prevPage}>&#8249;</button>
            <button type="button" onClick={nextPage}>&#8250;</button>
        </div>
    )
}

