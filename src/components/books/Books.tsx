import React, {useCallback, useEffect, useState} from "react";
import {BookType, getAllBooks} from "./BooksService";
import {
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
import {Column, useSortBy, useTable} from "react-table";
import {PERSONAS} from "../../constants";
import {useAppSelector} from "../../app/hooks";
import {authenticatedPersona} from "../auth/loginSlice";

const Books = () => {
  const [bookData, setBookData] = useState<BookType[]>([])
  const persona = useAppSelector(authenticatedPersona)

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
        ...item,
        deleteButton: ''
      }))
    },
    [bookData]
  )

  const editableField = useCallback(
    ({value: initialValue}: any) => {
      // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // }

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
    [persona]
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
        Header: 'Title',
        accessor: 'title',
        Cell: editableField,
      },
      {
        Header: 'Description',
        accessor: 'description',
        Cell: editableField,
      },
      {
        Header: 'Author',
        accessor: 'author',
        Cell: editableField,
      },
      {
        Header: 'Genre',
        accessor: 'genre',
        Cell: editableField,
      },
      {
        Header: '',
        accessor: 'deleteButton',
        Cell: deleteButton,
      },
    ],
    [deleteButton, editableField]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({columns, data}, useSortBy)

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
            {rows.map(row => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()}>
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
    </Container>
  )
}

export default Books
