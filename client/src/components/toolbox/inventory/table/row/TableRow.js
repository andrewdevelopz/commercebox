/**
 * @overview: This component is for the table rows.
 */

import React, { Component } from 'react'

// Semantic UI
import { Table, Image, Input, Form } from 'semantic-ui-react'

export default class TableRow extends Component {
    state = {
        inventory: this.props.inventory
    }

    // Update the state on form changes
    handleChange = (e, i) => {
        // set `name` && `value` from e.target and also the datakey from nested objects
        const { name, value } = e.target
        const datakey = e.target.getAttribute('data-key')

        // if datakey exists, set nested objects value
        if (datakey) {
            this.setState(prevState => {
                prevState.inventory[i][datakey][name] = value
                return {
                    inventory: prevState.inventory
                }
            })
        } else {
            this.setState(prevState => {
                prevState.inventory[i][name] = value
                return {
                    inventory: prevState.inventory
                }
            })
        }
    }

    // Truncate string 
    /**
     * @todo: currently only truncates for any reason. Make it so it truncates in specific conditions and the user is able to open it
     */
    truncateString = string => string = string.substring(0, 80)

    render() {
        const { inventory } = this.state
        // console.log('TableRow rendered')

        // generate the table based on conditions
        const generateRows = Object.keys(inventory).map(propKey => {
            // if editable form table
            if (this.props.editItems) {
                return (
                    <Table.Row key={propKey}>
                        <Table.Cell style={{ opacity: '0.5' }}>{parseInt(propKey) + 1}</Table.Cell>
                        {Object.keys(inventory[propKey]).map((childKey, i) => {
                            // set child properties
                            const child = inventory[propKey][childKey]

                            // if the child is a nested object
                            if (typeof child === 'object') {
                                return Object.keys(child).map((innerChild, i) => {
                                    // console.log('innerChild')
                                    return (
                                        <Table.Cell key={i}>
                                            <Form.Field>
                                                <div className='ui mini input'>
                                                    <input
                                                        type='text'
                                                        value={child[innerChild]}
                                                        name={innerChild}
                                                        placeholder={innerChild}
                                                        onChange={e => this.handleChange(e, propKey)}
                                                        data-key={childKey}
                                                    />
                                                </div>
                                            </Form.Field>
                                        </Table.Cell>
                                    )
                                })
                            } else {
                                return (
                                    <Table.Cell key={i}>
                                        <Form.Field>
                                            <Input
                                                value={inventory[propKey][childKey].toString()}
                                                name={childKey}
                                                placeholder={childKey}
                                                onChange={e => this.handleChange(e, propKey)}
                                                size='mini'
                                            />
                                        </Form.Field>
                                    </Table.Cell>
                                )
                            }
                        })}
                    </Table.Row>
                )
            } else {
                return (
                    <Table.Row key={propKey}>
                        <Table.Cell style={{ opacity: '0.5' }}>{parseInt(propKey) + 1}</Table.Cell>
                        {Object.keys(inventory[propKey]).map((childKey, i) => {
                            return (
                                childKey === 'image'
                                    ? <Table.Cell key={i}><Image src={inventory[propKey][childKey]} centered size='mini' /></Table.Cell>
                                    : <Table.Cell key={i}>{
                                        typeof inventory[propKey][childKey] === 'string'
                                            ? this.truncateString(inventory[propKey][childKey])
                                            : inventory[propKey][childKey].toString()
                                    }</Table.Cell>
                            )
                        })}
                    </Table.Row>
                )
            }
        })

        return (
            <React.Fragment>
                {generateRows}
            </React.Fragment>
        )
    }
}