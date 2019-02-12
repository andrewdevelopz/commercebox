/**
 * @overview: This component is a shared table frame for the application. It can be placed in any other component that needs
 * a table. It is able to display a basic table or a table with a from wrapped around it for submission.
 * 
 * @link - https://stackoverflow.com/questions/44707656/react-mapping-multiple-arrays (a much cleaner way to map arrays and objects to the DOM element)
 */

import React, { Component } from 'react'

// Import custom components
// import { fetchInventory } from '../../../shared/services/httpService'
import { loadToken } from '../../../auth/services/authService'

// Semantic UI
import { Table, Image, Input, Form, Button } from 'semantic-ui-react'

export default class TableFrame extends Component {
    state = {
        table: this.props.table
    }
    token

    // Update the state on form changes
    handleChange = (e, i) => {
        // set `name` && `value` from e.target and also the datakey from nested objects
        const { name, value } = e.target
        const datakey = e.target.getAttribute('data-key')

        // if datakey exists, set nested objects value
        if (datakey) {
            this.setState(prevState => {
                prevState.table.inventory[i][datakey][name] = value
                return {
                    table: prevState.table
                }
            })
        } else {
            this.setState(prevState => {
                prevState.table.inventory[i][name] = value
                return {
                    table: prevState.table
                }
            })
        }
    }

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

    // Truncate string 
    /**
     * @todo: currently only truncates for any reason. Make it so it truncates in specific conditions and the user is able to open it
     */
    truncateString = string => string = string.substring(0, 80)

    render() {
        const { table } = this.state
        const inventory = table.inventory

        const generateHeader = table.headers.map((item, i) => <Table.HeaderCell key={i} width={item[1]}>{item[0]}</Table.HeaderCell>)

        // genereate the table based on conditions
        const generateInventory = Object.keys(inventory).map(propKey => {
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

        // return table to render with form wrapped or no form wrapped
        const returnTable = () => {
            if (this.props.editItems) {
                return (
                    <Form onSubmit={this.handleFormSubmit}>
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
                        <Button type='submit' size='small' color='green' style={{ marginBottom: '1rem' }}>Submit</Button>
                    </Form>
                )
            } else {
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

        // Return the component to render
        return (
            <div style={{ overflowX: 'scroll' }}>
                {returnTable()}
            </div>
        )
    }
}