/**
 * @overview: This componenet controls the home page of the application. This homepage is accessible 
 * to the public and does not require you have a membership or account to view it.
 * 
 */

import React, { Component } from 'react'
import { Container, Grid, Header, Image, Segment } from 'semantic-ui-react'
import Hero from './hero/Hero'
import placeholderImg from '../../../assets/visuals/image.png'

export default class Home extends Component {
  state = {}
  
  render() {
    return (
      <div>
        <Container fluid>
          <Segment inverted>
            <Hero />
          </Segment>
        </Container>
        <Container style={{ margin: '2em 0 2em 0' }}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <Image src={placeholderImg} />
              </Grid.Column>
              <Grid.Column verticalAlign='middle' width={11}>
                <Container text>
                  <Header as='h3'>What can be acheived.</Header>
                  <p>Lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsumlorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsumlorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum</p>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}
