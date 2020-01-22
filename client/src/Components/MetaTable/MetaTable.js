import React from 'react';
import './MetaTable.css';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { 
    TextField,
    Button
} from '@material-ui/core';

export default function MetaTable(props)  {

    return <TableContainer 
        component={Paper} 
        className='metaTable'
    >
        <Table>
            <TableHead>
                {props.editMode !== props.sheetId ? (
                    <TableRow>
                        <TableCell>Line</TableCell>
                        <TableCell align='right'>Number</TableCell>
                </TableRow>
                ) : (
                    <TableRow>
                        <TableCell>Line</TableCell>
                        <TableCell align='right'>Line</TableCell>
                        <TableCell 
                            colSpan={2}
                            align='right'
                        >Actions</TableCell>
                    </TableRow>
                )}
            </TableHead>
            <TableBody>
                {props.metaData ? (props.metaData.map((row, i) => {
                    return <TableRow key={`tbr-${i}`}>
                        {props.editMeta !== i ? (
                            <>
                                <TableCell>{row.line}</TableCell>
                                <TableCell align='right'>{row.number}</TableCell>
                                {props.editMode === props.sheetId ? (
                                    <>
                                        <TableCell align='right'>
                                            <Button
                                                onClick={() => props.editMetaRow(i, row.line, row.number)}
                                            >Edit</Button>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Button
                                                onClick={() => props.removeMetaRow(i, row.id)}
                                            >Delete</Button>
                                        </TableCell>
                                    </>
                                ) : null }
                            </>
                        ) : (
                            <>
                                <TableCell>
                                    <TextField
                                        value={props.editLine}
                                        onChange={event => props.handleEditLine(event.target.value)}
                                        label={'Line'}
                                    />
                                </TableCell>
                                <TableCell align='right'>
                                    <TextField
                                        value={props.editNumber}
                                        onChange={event => props.handleEditNumber(event.target.value)}
                                        label={'Number'}
                                    />
                                </TableCell>
                                <TableCell align='right'>
                                    <Button
                                        onClick={() => {
                                            if (props.editLine.trim() === '' && props.editNumber.trim() === '') return props.returnMetaRow();
                                            props.replaceMetaRow(i, row.id);
                                        }}
                                    >Replace</Button>
                                </TableCell>
                                <TableCell align='right'>
                                    <Button
                                        onClick={() => props.returnMetaRow()}
                                    >Return</Button>
                                </TableCell>
                            </>
                        )}
                    </TableRow>
                })) : (
                    <TableRow>
                        <TableCell>No Information</TableCell>
                    </TableRow>
                )}
                {props.editMode === props.sheetId ? (
                    <TableRow>
                        <TableCell>
                            <TextField
                                value={props.newLine}
                                onChange={event => props.handleNewLine(event.target.value)}
                                label={'Line'}
                            />
                        </TableCell>
                        <TableCell align='right'>
                            <TextField
                                value={props.newNumber}
                                onChange={event => props.handleNewNumber(event.target.value)}
                                label={'Number'}
                            />
                        </TableCell>
                        <TableCell align='right'>
                            <Button
                                onClick={() => {
                                    if (props.newLine.trim() === '' && props.newNumber.trim() === '') return
                                    props.addMetaRow()
                                }}
                            >Add</Button>
                        </TableCell>
                        <TableCell align='right'>
                            <Button
                                onClick={() => props.clearMetaRow()}
                            >Clear</Button>
                        </TableCell>
                    </TableRow>
                ) : null }
            </TableBody>
        </Table>
    </TableContainer>
}