import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {ButtonToolbar, Modal,Tabs,Tab} from 'react-bootstrap';

const statistic = (users, info) => {
    let total = _.size(users) - 1;
    if(total == 0) total = 1;

    let totalPending = _.filter(users, user => {
        return !user.isPaid
    }).length - 1;
    if (totalPending < 0) totalPending = 0;
    
    let totalPayment = total * 20 - (totalPending * 20);

    switch(info){
        case "totalUsers":
            return total;
            break;
        case "totalPayments":
            return totalPayment;
            break;
        case "totalPendingUsers":
            return totalPending;
            break;
    }
};

class RankingStatistic extends Component {
    constructor(props, context){
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
    
        this.state = {
          show: false
        };
   }

    componentDidMount(){
        this.props.fetchUserList("");
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleHide() {
        this.setState({ show: false });
    }

    render(){
        return(
            <ButtonToolbar>
                <button className="ui teal button" onClick={this.handleShow}>
                <i className="icon chart bar"></i> Estatísticas
                </button>

                <Modal
                {...this.props}
                show={this.state.show}
                onHide={this.handleHide}
                dialogClassName="custom-modal"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                    <i className="icon chart bar"></i>Estatísticas do Bolão
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Tabs defaultActiveKey={1} id="tabEstatistics">
                    <Tab eventKey={1} title="Geral">
                    <br/>
                    <div className="ui statistics">
                        <div className="statistic">
                            <div className="value">
                                <i className="users icon"></i> {statistic(this.props.users,"totalUsers")}
                            </div>
                            <div className="label">Usuários</div>
                        </div>
                        <div className="statistic">
                            <div className="value">
                                <i className="dollar sign icon"></i> {statistic(this.props.users,"totalPayments")}
                            </div>
                            <div className="label">Reais arrecadados</div>
                        </div>
                        <div className="statistic">
                            <div className="value">
                                <i className="thumbs down icon"></i> {statistic(this.props.users,"totalPendingUsers")}
                            </div>
                            <div className="label">Pendências<br/> pagamento</div>
                        </div>
                    </div>
                    </Tab>
                    <Tab eventKey={2} title="Radar">
                    <br/>
                    <h4>Em construção</h4>
                    <br/>
                    </Tab>
                </Tabs>
                </Modal.Body>
                </Modal>
            </ButtonToolbar>            
        );
    }
}

function mapStateToProps({users}){
    return {users};
}

export default connect(mapStateToProps, actions)(RankingStatistic);