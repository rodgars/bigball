import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Table, Image, Alert, Panel, Glyphicon} from 'react-bootstrap';
import RankingResultList from './RankingResultList';
import PaymentAlert from '../Utils/PaymentAlert';
import TimeLine from '../Utils/TimeLine';
import RankingStatistics from './RankingStatistics';
import * as actions from '../../actions';

class Ranking extends Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    componentDidMount(){
        this.props.fetchRanking();
    }

    render(){
        return (
                <Grid>
                    <Row className="showGrid">
                        <Col xs={6}>
                            <p><i className="trophy icon"></i> <u><b>Ranking</b></u></p>
                            <RankingStatistics />
                            <br />
                        </Col>
                        <Col xs={6}>
                            <PaymentAlert name={this.props.auth.name} isPaid={this.props.auth.isPaid} />
                        </Col>
                    </Row>
                    <Row className="showGrid">
                        <Col xs={12} md={12}>
                            <TimeLine stages={this.props.stages} />
                            <RankingResultList />
                            <br />
                        </Col>
                    </Row>
                </Grid>
        );
    }
}

function mapStateToProps({auth, stages}){
    return {auth, stages};
}

export default connect(mapStateToProps, actions)(Ranking);