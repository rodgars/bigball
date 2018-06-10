import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import MyGameForm from './MyGameForm';
import MyGameProfile from './MyGameProfile';
import * as actions from '../../actions';

class MyGame extends Component{
    componentDidMount(){
        const {id} = this.props.match.params;

        console.log("params", this.props.match.params);

        this.props.fetchTeam();
        this.props.fetchPlayer();
        this.props.fetchGuess(id);
    }

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
                        <MyGameProfile />
                    </Col>
                    <Col md={9} xs={12}>
                        <MyGameForm id={this.props.match.params} />                 
                    </Col>
                </Row>
                <br /><br />
            </Grid>
        );
    }
}

function mapStateToProps({auth, guess}){
    return {auth, guess};
}

export default connect(mapStateToProps, actions)(MyGame);