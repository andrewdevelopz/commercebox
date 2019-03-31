/**
 * @overview: This component is for the table headers.
 */

import React, { Component } from 'react';

// Semantic UI
import { Table } from 'semantic-ui-react';

export default class TableHeader extends Component {
    state = {
        headers: this.props.headers
    }

    render() {
        const { headers } = this.state;

        const generateHeader = headers.map((item, i) => <Table.HeaderCell key={i} width={item[1]}>{item[0]}</Table.HeaderCell>);

        return (
            <React.Fragment>
                {generateHeader}
            </React.Fragment>
        )
    }
}
