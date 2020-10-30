import React, { Component } from 'react';
import { Container } from 'reactstrap';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import logo from '../LogoMasGlobalHeader.png';

class EmployeeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], employeeId: '', showComponent: false };
        this.handleEmployIdSubmit = this.handleEmployIdSubmit.bind(this);
        this.EmployeeList = null;
    }
    async handleEmployIdSubmit(employee) {
        this.setState({ employeeId: employee.id, showComponent: false })
        await this.getEmployees(employee.id);
        this.EmployeeList = <EmployeeList data={this.state.data} />;
        this.forceUpdate();
    }
    async getEmployees(employeeId) {
        var apiUrl = process.env.REACT_APP_EMPLOYEES_API_URL
        let employeesData = [];
        if (employeeId) {
            apiUrl = apiUrl + "/" + employeeId
            await fetch(apiUrl)
                .then(res => res.json())
                .then(body => {
                    employeesData.push(body);
                    this.setState({ data: employeesData, showComponent: true });
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            await fetch(apiUrl)
                .then(res => res.json())
                .then(body => {
                    employeesData = body;
                    this.setState({ data: employeesData, showComponent: true });
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    render() {
        return [
            <div className="EmployeeContainer">
                <img src={logo} className='App-logo' />
                <Container>
                    <React.Fragment>
                        <EmployeeForm onActionSubmit={this.handleEmployIdSubmit} />
                        {this.state.showComponent ?
                            this.EmployeeList : null
                        }
                    </React.Fragment>
                </Container>
            </div>
        ];
    }
}

export default EmployeeContainer;
