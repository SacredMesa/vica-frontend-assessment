import {Button, Input, Select} from "@chakra-ui/react";
import React from "react";

interface PaginationFunctions {
  gotoPage: Function
  canPreviousPage: boolean
  previousPage: Function
  nextPage: Function
  canNextPage: boolean
  pageCount: number
  pageIndex: number
  pageOptions: number[]
  pageSize: number
  setPageSize: Function
}

const Pagination = ({
                      gotoPage,
                      canPreviousPage,
                      previousPage,
                      nextPage,
                      canNextPage,
                      pageCount,
                      pageIndex,
                      pageOptions,
                      pageSize,
                      setPageSize
                    }: PaginationFunctions) => {
  return (
    <div className="pagination">
      <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {'<<'}
      </Button>{' '}
      <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </Button>{' '}
      <Button onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </Button>{' '}
      <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
      </Button>{' '}
      <span>
          Page{' '}
        <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      <span>
          | Go to page:{' '}
        <Input
          type="number"
          size='xs'
          width="100px"
          defaultValue={pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
        />
        </span>
      <Select
        size='xs'
        width="100px"
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </Select>
    </div>
  )
}

export default Pagination
