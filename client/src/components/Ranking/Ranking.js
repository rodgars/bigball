import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Table, Image, Alert, Panel, Glyphicon} from 'react-bootstrap';
import RankingResultList from './RankingResultList';
import PaymentAlert from '../Utils/PaymentAlert';
import TimeLine from '../Utils/TimeLine';
import RankingStatistics from './RankingStatistics';

class Ranking extends Component{
    

    render(){
        return (
                <Grid>
                    <Row className="showGrid">
                        <Col xs={6}>
                            <p><i class="trophy icon"></i> <u><b>Ranking</b></u></p>
                            <RankingStatistics />
                            <br />
                        </Col>
                        <Col xs={6}>
                            <PaymentAlert name={this.props.auth.name} isPaid={this.props.auth.isPaid} />
                        </Col>
                    </Row>
                    <Row className="showGrid">
                        <Col xs={12} md={12}>
                            <TimeLine />
                            <RankingResultList />
                            <br />
                        </Col>
                    </Row>
                </Grid>
        );
    }
}

function mapStateToProps({auth}){
    return {auth};
}

export default connect(mapStateToProps)(Ranking);