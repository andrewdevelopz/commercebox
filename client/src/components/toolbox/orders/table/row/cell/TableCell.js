/**
 * @overview: This component is for the table cells of each row.
 */

import React, { Component } from 'react';

// Semantic UI
import { Table, Form, Input, Image, Checkbox } from 'semantic-ui-react';

export default class TableCell extends Component {
    state = {
        item: this.props.item
    }

    shouldComponentUpdate(nextProps, nextState) {
        // if the state is different than nextState, then it should update
        return this.state !== nextState;
    }

    // Update the state on form changes
    handleChange = (e) => {
        // set `name` && `value` from e.target and also the datakey from nested objects
        const { name, value } = e.target;
        const datakey = e.target.getAttribute('data-key');

        // if datakey exists, set nested objects value
        if (datakey) {
            this.setState(prevState => {
                prevState.item[datakey][name] = value;
                return {
                    item: prevState.item
                }
            });
        } else {
            this.setState(prevState => {
                prevState.item[name] = value;
                prevState.item['changed'] = true;
                return {
                    item: prevState.item
                }
            });
        }
    }

    // Truncate string 
    /**
     * @todo: currently only truncates for any reason. Make it so it truncates in specific conditions and the user is able to open it
     */
    truncateString = string => string = string.substring(0, 80);

    render() {
        const { item } = this.state;

        const generateCell = () => {
            // if table is in form mode
            if (this.props.editItems) {
                return (
                    <React.Fragment>
                        <Table.Cell className='tableCheckboxCell' textAlign='center'><Checkbox /></Table.Cell>
                        <Table.Cell className='index' style={{ opacity: '0.5' }}>{parseInt(this.props.propKey) + 1}</Table.Cell>
                        {Object.keys(item).map((itemKey, i) => {
                            // nested objects of item object `item: { <nested>: ... }`
                            const nested = item[itemKey];

                            // if the item is a nested object
                            if (typeof nested === 'object') {
                                return Object.keys(nested).map((childProp, i) => {
                                    return (
                                        <Table.Cell key={i}>
                                            <Form.Field>
                                                {/* using standard html since semanticUI <Input /> does not accept data-key attr */}
                                                <div className='ui mini input'>
                                                    <input
                                                        type='text'
                                                        value={nested[childProp]}
                                                        name={childProp}
                                                        placeholder={childProp}
                                                        onChange={this.handleChange}
                                                        data-key={itemKey}
                                                    />
                                                </div>
                                            </Form.Field>
                                        </Table.Cell>
                                    );
                                })
                            } else {
                                // if it is a hidden cell and input
                                if (itemKey === '_id') {
                                    return (
                                        <Table.Cell key={i} style={{ display: 'none' }}>
                                            <Input
                                                id='itemID' // ID for mongo item in collections
                                                value={item[itemKey].toString()}
                                                name={itemKey}
                                                placeholder={itemKey}
                                                onChange={this.handleChange}
                                                type='hidden'
                                            />
                                        </Table.Cell>
                                    );
                                } else if (itemKey === 'changed') {
                                    // if `changed` property, do nothing. 
                                    // this property is only used to track which items have been changed
                                    return null;
                                } else {
                                    return (
                                        <Table.Cell key={i}>
                                            <Form.Field>
                                                <Input
                                                    value={item[itemKey].toString()}
                                                    name={itemKey}
                                                    placeholder={itemKey}
                                                    onChange={this.handleChange}
                                                    size='mini'
                                                />
                                            </Form.Field>
                                        </Table.Cell>
                                    );
                                }
                            }
                        })}
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <Table.Cell style={{ opacity: '0.5' }}>{parseInt(this.props.propKey) + 1}</Table.Cell>
                        {Object.keys(item).map((itemKey, i) => {
                            // nested objects of item object `item: { <nested>: ... }`
                            const nested = item[itemKey];

                            // if the item is a nested object
                            if (typeof nested === 'object') {
                                return Object.keys(nested).map((childProp, i) => {
                                    return (
                                        <Table.Cell key={i}>
                                            {nested[childProp]}
                                        </Table.Cell>
                                    );
                                })
                            } else {
                                if (itemKey === '_id') {
                                    return (
                                        <Table.Cell key={i} style={{ display: 'none' }}>
                                            <Input
                                                id='itemID' // ID for mongo item in collections
                                                value={item[itemKey].toString()}
                                                name={itemKey}
                                                placeholder={itemKey}
                                                onChange={this.handleChange}
                                                type='hidden'
                                            />
                                        </Table.Cell>
                                    );
                                } else if (itemKey === 'changed') {
                                    // if `changed` property, do nothing. 
                                    // this property is only used to track which items have been changed
                                    return null;
                                } else {
                                    return (
                                        itemKey === 'image'
                                            ? <Table.Cell key={i}><Image src={item[itemKey]} centered size='mini' /></Table.Cell>
                                            : <Table.Cell key={i}>{
                                                typeof item[itemKey] === 'string'
                                                    ? this.truncateString(item[itemKey])
                                                    : item[itemKey].toString()
                                            }</Table.Cell>
                                    );
                                }
                            }
                        })}
                    </React.Fragment>
                )
            }
        }

        return (
            <React.Fragment>
                {generateCell()}
            </React.Fragment>
        )
    }
}
