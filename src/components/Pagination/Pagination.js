import React from 'react'
import './Pagination.scss'

export default function Pagination({ setPageNum }) {

    const nextPage = () => {
        //For 30 rows per page, max number of pages are 100
        setPageNum(currNum => currNum === 100 ? 100 : currNum + 1)
    }
    const prevPage = () => {
        //Page number can't be 0 or negative number
        setPageNum(currNum => currNum === 1 ? 1 : currNum - 1)
    }
    return (
        <div className="pagination">
            <button type="button" onClick={prevPage}>&#8249;</button>
            <button type="button" onClick={nextPage}>&#8250;</button>
        </div>
    )
}

