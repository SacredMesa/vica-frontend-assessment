import React, {useCallback, useEffect, useState} from 'react';
import {Column, useSortBy, useTable} from 'react-table'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container, EditableInput, Editable, EditablePreview,
} from '@chakra-ui/react'

import {DeleteIcon} from '@chakra-ui/icons'
import {getAllUsers, UserDetails} from "./UserManagementServices";
import {useAppSelector} from "../../app/hooks";
import {authenticatedPersona} from "../auth/loginSlice";
import {PERSONAS} from "../../constants";


const UserManagement = () => {
  const [userData, setUserData] = useState<UserDetails[]>([])
  const persona = useAppSelector(authenticatedPersona)

  useEffect(() => {
    const fetchUsers = async () => {
      const loadedUsers = await getAllUsers()
      setUserData(loadedUsers)
    }
    fetchUsers()
  }, [])

  const data = React.useMemo(
    () => {
      return userData.map(item => ({
        ...item,
        deleteButton: ''
      }))
    },
    [userData]
  )

  const deleteButton = useCallback(
    ({row: {index}}: any) => {
      const deleteUser = (index: number) => {
        const values = [...data]
        values.splice(index, 1)

        setUserData(values)
      }

      return (
        <>
          {(
            <DeleteIcon
              onClick={() => deleteUser(index)}
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
        Header: 'Username',
        accessor: 'username',
        Cell:     ({value: initialValue}: any) => {
          return (
            <Editable defaultValue={initialValue} isDisabled={persona !== PERSONAS.ADMIN}>
              <EditablePreview/>
              <EditableInput/>
            </Editable>
          )
        },
      },
      {
        Header: 'Persona',
        accessor: 'persona',
        Cell:     ({value: initialValue}: any) => {
          return (
            <Editable defaultValue={initialValue} isDisabled={persona !== PERSONAS.ADMIN}>
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
    [deleteButton, persona]
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
                  <Th {...column.getHeaderProps()} onClick={() => {}}>
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

export default UserManagement
