import React, { useState } from 'react'
import styles from "./pagination.module.scss"

const Pagination = ({ currentPage, setCurrentPage, productsPerPage, totalProducts }) => {

    const pageNumbers = []
    const totalPages = totalProducts / productsPerPage;
    // Limit the Page num shown
    const [pageNumLimit, setPageNumLimit] = useState(5);
    const [maxPageNumLimit, setMaxPageNumLimit] = useState(5);
    const [minPageNumLimit, setMinPageNumLimit] = useState(0);

    //Paginate
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    //Go to nextPage
    const paginateNext = () => {
        setCurrentPage(currentPage + 1);
        //show next set number
        if (currentPage + 1 > maxPageNumLimit) {
            setMaxPageNumLimit(maxPageNumLimit + pageNumLimit);
            setMinPageNumLimit(minPageNumLimit + pageNumLimit);
        }
    };

    //Go to prev Page
    const paginatePrev = () => {
        setCurrentPage(currentPage - 1);
        //show next set number
        if ((currentPage - 1) % pageNumLimit === 0) {
            setMaxPageNumLimit(maxPageNumLimit - pageNumLimit);
            setMinPageNumLimit(minPageNumLimit - pageNumLimit);
        }
    };


    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <ul className={styles.pagination}>
            <li onClick={paginatePrev}
                className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}>
                Prev
            </li>

            {pageNumbers.map((number) => {
                if (number < maxPageNumLimit + 1 && number > minPageNumLimit) {


                    return (
                        <li key={number} onClick={() => paginate(number)}
                            className={currentPage === number ? `${styles.active}` : null}>
                            {number}
                        </li>
                    )
                }
            })}
            <li onClick={paginateNext}
                className={currentPage == pageNumbers[pageNumbers.length - 1] ? `${styles.hidden}` : null}
            >
                Next
            </li>
            <p>
                <b className={styles.page}>{`page ${currentPage}`}</b>
                <span>{` of `}</span>
                <b>{`${Math.ceil(totalPages)}`}</b>
            </p>
        </ul>
    );
};

export default Pagination
