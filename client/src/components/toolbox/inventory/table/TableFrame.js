/**
 * @overview: This component is a shared table frame for the application. It can be placed in any other component that needs
 * a table. It is able to display a basic table or a table with a from wrapped around it for submission.
 * 
 * @link - https://stackoverflow.com/questions/44707656/react-mapping-multiple-arrays (a much cleaner way to map arrays and objects to the DOM element)
 * @link - https://www.codeproject.com/Articles/1233423/Pure-Component-In-React (delete this when done optimizing)
 */

import React, { Component } from 'react'

// Import custom components
import TableHeader from './header/TableHeader'
import TableRow from './row/TableRow'
// import { fetchInventory } from '../../../shared/services/httpService'
import { loadToken } from '../../../auth/services/authService'

// Semantic UI
import { Table, Form, Button } from 'semantic-ui-react'

export default class TableFrame extends Component {
    state = {
        table: this.props.table
    }
    token

    // Handle form submit
    handleFormSubmit = async e => {
        e.preventDefault()
        this.token = loadToken()

        // make http call to /createProducts in chunks
        const products = this.state.table.inventory

        console.log(products)
        // const length = products.length
        // const batch = 200
        // for (let i = 0; i < length; i += batch) {
        //     const chunk = products.slice(i, i + batch)

        //     const res = await fetchInventory('createProducts', 'post', {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization': this.token
        //     }, { products: chunk })

        //     // if res.success is false handle error
        //     if (!res.success) {
        //         // console error
        //         console.error(res.error)
        //     } else {
        //         // actions when http call is successful
        //         console.warn('http call to /inventory/createProducts was successful')

        //         // console your message
        //         console.log(res)

        //         // redirect to inventory section
        //         this.props.handleSubmit()
        //     }
        // }

        // set token to null when done
        this.token = null
        return
    }

    render() {
        const { table } = this.state

        // return table to render with form wrapped or no form wrapped
        const returnTable = () => {
            if (this.props.editItems) {
                return (
                    <Form onSubmit={this.handleFormSubmit}>
                        <Table singleLine celled inverted style={{ border: '1px rgba(255, 255, 255, 0.3) solid' }}>
                            <Table.Header>
                                <Table.Row>
                                    <TableHeader headers={table.headers} />
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <TableRow inventory={table.inventory} editItems={this.props.editItems} />
                            </Table.Body>
                        </Table>
                        <Button type='submit' size='small' color='green' style={{ marginBottom: '1rem' }}>Submit</Button>
                    </Form>
                )
            } else {
                return (
                    <Table singleLine celled inverted style={{ border: '1px rgba(255, 255, 255, 0.3) solid' }}>
                        <Table.Header>
                            <Table.Row>
                                <TableHeader headers={table.headers} />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <TableRow inventory={table.inventory} editItems={this.props.editItems} />
                        </Table.Body>
                    </Table>
                )
            }
        }

        // Return the component to render
        return (
            <div style={{ overflowX: 'scroll' }}>
                {returnTable()}
            </div>
        )
    }
}