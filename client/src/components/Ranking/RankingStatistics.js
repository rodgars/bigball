import React, {Component} from 'react';
import {ButtonToolbar, Modal,Tabs,Tab} from 'react-bootstrap';
import {PieChart, Pie, Sector, Cell, Legend} from 'recharts';

const data = [{name: 'Pagantes', value: 18}, {name: 'Pendentes', value: 4}];
const COLORS = ['#0088FE', '#FF0000'];

const RADIAN = Math.PI / 180; 

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
    
    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
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
                <i class="icon chart bar"></i> Estatísticas
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
                    <div class="ui statistics">
                        <div class="statistic">
                            <div class="value">
                                <i class="users icon"></i> 22
                            </div>
                            <div class="label">Usuários</div>
                        </div>
                        <div class="statistic">
                            <div class="value">
                                <i class="dollar sign icon"></i> 250
                            </div>
                            <div class="label">Reais arrecadados</div>
                        </div>
                        <div class="statistic">
                            <div class="value">
                                <i class="thumbs down icon"></i> 8
                            </div>
                            <div class="label">Pendências<br/> pagamento</div>
                        </div>
                    </div>
                    <div className="ui segment">
                    <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
                        <Pie
                        data={data} 
                        outerRadius={80}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        fill="#8884d8"
                        >
                            {
                                data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                            }
                        </Pie>
                        <Legend align="left" verticalAlign="middle"  height={36}/>
                    </PieChart>
                    </div>
                    </Tab>
                    <Tab eventKey={2} title="Radar">
                    <br/>
                    <h4>Em construção</h4>
                    <p>
                    Radar mais votados em breve
                    </p>
                    </Tab>
                </Tabs>
                </Modal.Body>
                </Modal>
            </ButtonToolbar>            
        );
    }

}

export default RankingStatistic;