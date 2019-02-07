/**
 * @overview: This component is a shared table frame for the application. It can be placed in any other component that needs
 * a table.
 * 
 * @link - https://stackoverflow.com/questions/44707656/react-mapping-multiple-arrays (a much cleaner way to map arrays and objects to the DOM element)
 */

import React, { Component } from 'react'

// Semantic UI
import { Table, Image, Input } from 'semantic-ui-react'

export default class TableFrame extends Component {
    state = {
        table: this.props.table
    }

    // Update the state on form changes
    handleChange = (e, i) => {
        const { name, value } = e.target
        this.setState(prevState => {
            prevState.table.inventory[i][name] = value
            return {
                table: prevState.table
            }
        })
    }

    // Truncate string
    truncateString = string => string = string.substring(0, 80)

    render() {
        const { table } = this.state
        const inventory = table.inventory

        const generateHeader = table.headers.map((item, i) => <Table.HeaderCell key={i} width={item[1]}>{item[0]}</Table.HeaderCell>)

        const generateInventory = Object.keys(inventory).map(propKey => {
            if (this.props.editItems) {
                return (
                    <Table.Row key={propKey}>
                        <Table.Cell style={{ opacity: '0.5' }}>{parseInt(propKey) + 1}</Table.Cell>
                        {Object.keys(inventory[propKey]).map(childKey => {
                            return (
                                <Table.Cell key={childKey}><Input
                                    value={inventory[propKey][childKey]}
                                    name={childKey}
                                    onChange={e => this.handleChange(e, propKey)}
                                /></Table.Cell>
                            )
                        })}
                    </Table.Row>
                )
            } else {
                return (
                    <Table.Row key={propKey}>
                        <Table.Cell style={{ opacity: '0.5' }}>{parseInt(propKey) + 1}</Table.Cell>
                        {Object.keys(inventory[propKey]).map(childKey => {
                            return (
                                childKey === 'image'
                                    ? <Table.Cell key={childKey}><Image src={inventory[propKey][childKey]} centered size='mini' /></Table.Cell>
                                    : <Table.Cell key={childKey}>{
                                        typeof inventory[propKey][childKey] === 'string'
                                            ? this.truncateString(inventory[propKey][childKey])
                                            : inventory[propKey][childKey]
                                    }</Table.Cell>
                            )
                        })}
                    </Table.Row>
                )
            }
        })

        return (
            <div style={{ overflowX: 'scroll' }}>
                <Table singleLine celled inverted style={{ border: '1px rgba(255, 255, 255, 0.3) solid' }}>
                    <Table.Header>
                        <Table.Row>
                            {generateHeader}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {generateInventory}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}