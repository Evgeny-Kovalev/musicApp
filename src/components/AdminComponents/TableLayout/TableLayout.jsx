import React from 'react'
import { Table } from 'react-bootstrap'
import './TableLayout.scss'

const TableLayout = ({content, onRemove, onEdit, onDetails, data}) => {

    return (
        <Table responsive striped bordered hover size="sm" style={{textAlign: 'center'}}>
            <thead>
                <tr>
                    { Object.values(data).map(val => <th key={val} >{val}</th>) }
                    <th key="Options">Options</th>
                </tr>
            </thead>
            <tbody>
                {
                    content.map(item =>
                        <tr key={item._id}>
                            {
                                Object.keys(data).map(key => {
                                    if (key === 'img'){
                                        return <td key={key}><img
                                            className="rounded"
                                            width={40}
                                            height={40} 
                                            src={item[key]}
                                        /></td>
                                    }
                                    if (data[key] && key !== '_id' && !Array.isArray(item[key])) 
                                        return <td key={key} >{ item[key] }</td>
                                })
                            }
                            <td>
                                <ul className="list-inline m-0">
                                    {/* <li className="list-inline-item">
                                        <i className="fas fa-eye"></i>
                                    </li> */}
                                    <li className="list-inline-item">
                                        <i className="fas fa-edit"></i>
                                    </li>
                                    <li className="list-inline-item" onClick={() => onRemove(item)}>
                                        <i className="fas fa-minus-circle"></i>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    )
                } 
            </tbody>
        </Table>
    )
}

export default TableLayout
