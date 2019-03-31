/**
 * @overview: This component is the table frame for orders.
 * 
 * @link - https://stackoverflow.com/questions/44707656/react-mapping-multiple-arrays (a much cleaner way to map arrays and objects to the DOM element)
 */

import React, { Component } from 'react';

// Import custom components
import TableHeader from './header/TableHeader';
import TableRow from './row/TableRow';

// Semantic UI
import { Table, Form, Button } from 'semantic-ui-react';

export default class TableFrame extends Component {
    state = {
        table: this.props.table
    }
    token;

    // Handle form submit
    handleFormSubmit = e => {
        e.preventDefault();
        this.props.handleSubmit();
    }

    render() {
        const { table } = this.state;

        // return table to render with form wrapped or no form wrapped
        const returnTable = () => {
            if (this.props.editItems) {
                return (
                    <Form id={this.props.id} onSubmit={this.handleFormSubmit}>
                        <Table singleLine celled inverted style={{ border: '1px rgba(255, 255, 255, 0.3) solid' }}>
                            <Table.Header>
                                <Table.Row>
                                    <TableHeader headers={table.headers} />
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <TableRow orders={table.orders} editItems={this.props.editItems} />
                            </Table.Body>
                        </Table>
                        <Button type='submit' size='small' color='green' style={{ marginBottom: '1rem' }}>{this.props.submitBtnName}</Button>
                    </Form>
                );
            } else {
                return (
                    <Table id={this.props.id} singleLine celled inverted style={{ border: '1px rgba(255, 255, 255, 0.3) solid' }}>
                        <Table.Header>
                            <Table.Row>
                                <TableHeader headers={table.headers} />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <TableRow orders={table.orders} editItems={this.props.editItems} />
                        </Table.Body>
                    </Table>
                );
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
