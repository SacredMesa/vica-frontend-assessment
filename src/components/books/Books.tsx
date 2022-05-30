import React, {useCallback, useEffect, useState} from "react";
import {BookType, getAllBooks} from "./BooksService";
import {
  Button,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Table,
  TableContainer, Tbody, Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import {Column, usePagination, useSortBy, useTable} from "react-table";
import {PERSONAS} from "../../constants";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {authenticatedPersona} from "../auth/loginSlice";
import Pagination from "../common/pagination";
import {borrowBook, borrowedBooks, returnBook} from "./bookSlice";

const Books = () => {
  const [bookData, setBookData] = useState<BookType[]>([])
  const dispatch = useAppDispatch();
  const persona = useAppSelector(authenticatedPersona)
  const userBorrowedBooks = useAppSelector(borrowedBooks)

  useEffect(() => {
    const fetchBooks = async () => {
      const loadedBooks = await getAllBooks()
      setBookData(loadedBooks)
    }
    fetchBooks()
  }, [])

  const data = React.useMemo(
    () => {
      return bookData.map(item => ({
        toBorrow: '',
        ...item,
        deleteButton: ''
      }))
    },
    [bookData]
  )

  const deleteButton = useCallback(
    ({row: {index}}: any) => {
      const deleteBook = (index: number) => {
        const values = [...data]
        values.splice(index, 1)

        setBookData(values)
      }

      return (
        <>
          {(
            <DeleteIcon
              onClick={() => deleteBook(index)}
            />
          )}
        </>
      )
    },
    [data]
  )

  const columns: Column<any>[] = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'toBorrow',
        Cell: ({row: {index}}: any) => {
          const selectedBook = data[index].id
          return !userBorrowedBooks.includes(selectedBook)
            ? (
              <Button
                colorScheme='messenger'
                onClick={() => {
                  dispatch(borrowBook(selectedBook))
                }}
              >
                Borrow
              </Button>
            )
            : (
              <Button
                colorScheme='red'
                onClick={() => {
                  dispatch(returnBook(selectedBook))
                }}
              >
                Return
              </Button>
            )
        }
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({value: initialValue}: any) => {
          return (
            <Editable
              defaultValue={initialValue}
              isDisabled={![PERSONAS.ADMIN, PERSONAS.EDITOR].includes(persona)}
            >
              <EditablePreview/>
              <EditableInput/>
            </Editable>
          )
        },
      },
      {
        Header: 'Description',
        accessor: 'description',
        Cell: ({value: initialValue}: any) => {
          return (
            <Editable
              defaultValue={initialValue}
              isDisabled={![PERSONAS.ADMIN, PERSONAS.EDITOR].includes(persona)}
            >
              <EditablePreview/>
              <EditableInput/>
            </Editable>
          )
        },
      },
      {
        Header: 'Author',
        accessor: 'author',
        Cell: ({value: initialValue}: any) => {
          return (
            <Editable
              defaultValue={initialValue}
              isDisabled={![PERSONAS.ADMIN, PERSONAS.EDITOR].includes(persona)}
            >
              <EditablePreview/>
              <EditableInput/>
            </Editable>
          )
        },
      },
      {
        Header: 'Genre',
        accessor: 'genre',
        Cell: ({value: initialValue}: any) => {
          return (
            <Editable
              defaultValue={initialValue}
              isDisabled={![PERSONAS.ADMIN, PERSONAS.EDITOR].includes(persona)}
            >
              <EditablePreview/>
              <EditableInput/>
            </Editable>
          )
        },
      },
      {
        Header: '',
        accessor: 'deleteButton',
        Cell: deleteButton,
      },
    ],
    [deleteButton, persona, userBorrowedBooks, data, dispatch]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {pageIndex, pageSize},
  } = useTable({columns, data}, useSortBy, usePagination)

  return (
    <Container maxW="100%">
      <TableContainer>
        <Table variant='striped' colorScheme='messenger' {...getTableProps()}>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <Th {...column.getHeaderProps()}>
                    <div
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </div>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()} >
                  {row.cells.map(cell => {
                    return (
                      <Td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <Pagination
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Container>
  )
}

export default Books
