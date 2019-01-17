/**
 * @overview: This componenet is for the footer of the application.
 * 
 */

import React, { Component } from 'react'
import { Container, Segment, Icon, Grid, Item } from 'semantic-ui-react'

export default class Footer extends Component {
    state = {}

    render() {
        return (
            <footer className="footer">
                <Container fluid>
                    <Segment inverted style={{ background: '#111' }}>
                        <Container>
                            <Grid verticalAlign="middle">
                                <Grid.Row>
                                    <Grid.Column width={10}>
                                        <p>Copyright <Icon name="copyright outline" /> 2019 | All Rights Reserved</p>
                                    </Grid.Column>
                                    <Grid.Column width={6} textAlign="right">
                                        <Item href="https://www.facebook.com/" target="_blank">
                                            <Icon circular inverted link name='facebook f' />
                                        </Item>
                                        <Item href="https://www.instagram.com/" target="_blank">
                                            <Icon circular inverted link name='instagram' />
                                        </Item>
                                        <Item href="https://www.linkedin.com/" target="_blank">
                                            <Icon circular inverted link name='linkedin' />
                                        </Item>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Segment>
                </Container>
            </footer>
        )
    }
}
