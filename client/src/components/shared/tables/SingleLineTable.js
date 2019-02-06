/**
 * @overview: This component is a shared single line table for the application. It can be placed in any other component that needs
 * a single line table.
 */

import React, { Component } from 'react'

// Semantic UI
import { Table, Image } from 'semantic-ui-react'

export default class SingleLineTable extends Component {
    state = {}

    render() {
        const { table } = this.props

        const generateHeader = table.headers.map((item, i) => <Table.HeaderCell key={i} width={item[1]}>{item[0]}</Table.HeaderCell>)

        const generateInventory = table.inventory.map((item, i) => {
            return (
                <Table.Row key={i}>
                    <Table.Cell><Image src={item.image} centered size='mini' /></Table.Cell>
                    <Table.Cell>{item.sku}</Table.Cell>
                    <Table.Cell>{item.title}</Table.Cell>
                    <Table.Cell>{item.quantity}</Table.Cell>
                    <Table.Cell>{item.available}</Table.Cell>
                    <Table.Cell>{item.alert}</Table.Cell>
                    <Table.Cell>{item.orders}</Table.Cell>
                    <Table.Cell>{item.description}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                </Table.Row>
            )
        })

        return (
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
        )
    }
}