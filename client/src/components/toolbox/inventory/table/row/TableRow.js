/**
 * @overview: This component is for the table rows.
 */

import React, { Component } from 'react';

// Import custom components
import TableCell from './cell/TableCell';

// Semantic UI
import { Table } from 'semantic-ui-react';

export default class TableRow extends Component {
    state = {
        inventory: this.props.inventory
    }

    render() {
        const { inventory } = this.state;

        // generate the table based on conditions
        const generateRows = Object.keys(inventory).map(propKey => {
            // if editable form table
            if (this.props.editItems) {
                return (
                    <Table.Row key={propKey}>
                        <TableCell editItems={this.props.editItems} item={inventory[propKey]} propKey={propKey} />
                    </Table.Row>
                );
            } else {
                return (
                    <Table.Row key={propKey}>
                        <TableCell editItems={this.props.editItems} item={inventory[propKey]} propKey={propKey} />
                    </Table.Row>
                );
            }
        })

        return (
            <React.Fragment>
                {generateRows}
            </React.Fragment>
        )
    }
}