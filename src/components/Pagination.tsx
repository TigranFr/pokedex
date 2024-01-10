import React from 'react';
import { Button } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, goToPage }) => {
  
  const handlePrevPage = ():void => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleNextPage = ():void => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const renderPageNumbers = ():JSX.Element[] => {
    const MAX_VISIABLE_PAGES = 5; 

    const pageNumbers = [];

    let visiableStartPage = 1;
    let visiablEndPage = totalPages;

    if (totalPages > MAX_VISIABLE_PAGES) {
      if (currentPage > Math.floor(MAX_VISIABLE_PAGES / 2)) {
        visiableStartPage = Math.max(currentPage - Math.floor(MAX_VISIABLE_PAGES / 2), 1);
        visiablEndPage = Math.min(visiableStartPage + MAX_VISIABLE_PAGES - 1, totalPages);
      } else {
        visiablEndPage = MAX_VISIABLE_PAGES;
      }
    }

    if (visiableStartPage !== 1) {
      pageNumbers.push(
        <Button key={1} variant="contained" onClick={() => { goToPage(1); }}>
          1
        </Button>
      );
      if (visiableStartPage > 2) {
        pageNumbers.push(<span key="ellipsisStart" style={{marginLeft:'10px'}}>...</span>);
      }
    }

    for (let i = visiableStartPage; i <= visiablEndPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant="contained"
          style={{ backgroundColor: '#ff8383', color: 'white', marginLeft:'10px' }}
          onClick={() => { goToPage(i); }}
        >
          {i}
        </Button>
      );
    }
  

    if (visiablEndPage !== totalPages) {
      if (visiablEndPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsisEnd"style={{marginRight:'10px' , marginLeft:'10px'}}>...</span>);
      }
      pageNumbers.push(
        <Button key={totalPages} variant="contained" onClick={() => { goToPage(totalPages); }}>
          {totalPages}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <div style={{marginTop:'50px', width:'auto'}}>
      <Button variant="contained" style={{ backgroundColor: '#ff8383', color: 'white', marginRight:'10px'}} disabled={currentPage === 1} onClick={handlePrevPage}>
        Prev
      </Button>
      {renderPageNumbers()}
      <Button variant="contained" style={{ backgroundColor: '#ff8383', color: 'white' , marginLeft:'10px'}} disabled={currentPage === totalPages} onClick={handleNextPage}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
