import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import MyGameForm from './MyGameForm';
import MyGameProfile from './MyGameProfile';
import * as actions from '../../actions';

class MyGame extends Component{

    componentDidMount(){
        this.props.fetchTeam();
        this.props.fetchPlayer();
    }

    render(){
        return (
            <Grid>
                <Row className="showGrid">
                    <Col xs={6}>
                        <p><i class="futbol icon"></i> <u><b>Meu Jogo</b></u></p>
                        <br />
                    </Col>
                    <Col xs={6}></Col>
                </Row>
                <Row className="showGrid">
                    <Col md={3} xs={12}>
                        <MyGameProfile auth={this.props.auth} />
                    </Col>
                    <Col md={9} xs={12}>
                        <MyGameForm />                 
                    </Col>
                </Row>
                <br /><br />
            </Grid>
        );
    }
}

function mapStateToProps({auth}){
    return {auth};
}

export default connect(mapStateToProps, actions)(MyGame);