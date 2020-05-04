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
    lastChecked = null;

    // Enable group selection for checkboxes
    enableGroupSelection = (e) => {
        // gather each checkbox in view
        const checkboxes = Array.from(document.querySelectorAll('.checkboxCell'));

        // set `data-index` attribute to ID each checkbox
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].querySelector('input').setAttribute('data-index', i);
        }

        // if shift key is pressed and a checkmark was checked before
        if (this.lastChecked && e.shiftKey) {
            const start = parseInt(this.lastChecked) + 1;
            const end = parseInt(e.currentTarget.querySelector('input').getAttribute('data-index'));

            if (start < end) {
                for (let i = start; i < end; i++) {
                    // if input is checked then uncheck otherwise check it
                    const checked = checkboxes[i].querySelector('input').checked;
                    checked === true ?
                        checkboxes[i].querySelector('input').checked = false :
                        checkboxes[i].querySelector('input').checked = true;
                }
            } else {
                for (let i = end; i < start; i++) {
                    // if input is checked then uncheck otherwise check it
                    const checked = checkboxes[i].querySelector('input').checked;
                    checked === true ?
                        checkboxes[i].querySelector('input').checked = false :
                        checkboxes[i].querySelector('input').checked = true;
                }
            }
        }
        this.lastChecked = e.currentTarget.querySelector('input').getAttribute('data-index');
    }

    render() {
        const { inventory } = this.state;

        // generate the table based on conditions
        const generateRows = Object.keys(inventory).map(propKey => {
            // if editable form table
            if (this.props.editItems) {
                return (
                    <Table.Row key={propKey}>
                        <TableCell
                            editItems={this.props.editItems}
                            item={inventory[propKey]} propKey={propKey}
                            groupSelect={this.enableGroupSelection}
                        />
                    </Table.Row>
                );
            } else {
                return (
                    <Table.Row key={propKey}>
                        <TableCell editItems={this.props.editItems} item={inventory[propKey]} propKey={propKey} />
                    </Table.Row>
                );
            }
        });

        return (
            <React.Fragment>
                {generateRows}
            </React.Fragment>
        );
    }
}
