import React, {Component} from 'react';
import {Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import MyGameForm from './MyGameForm';
import MyGameProfile from './MyGameProfile';

class MyGame extends Component{
    render(){
        return (
            <Grid>
                <Row className="showGrid">
                    <Col xs={6}>
                        <p><i className="futbol icon"></i> <u><b>Meu Jogo</b></u></p>
                        <br />
                    </Col>
                    <Col xs={6}></Col>
                </Row>
                <Row className="showGrid">
                    <Col md={3} xs={12}>
                        <MyGameProfile id={this.props.match.params.id}/>
                    </Col>
                    <Col md={9} xs={12}>
                        <MyGameForm id={this.props.match.params.id} />                 
                    </Col>
                </Row>
                <br /><br />
            </Grid>
        );
    }
}

export default MyGame;