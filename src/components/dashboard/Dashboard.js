import React from 'react';
import axios from 'axios';

const Dashboard = () => {
    const getUsers = (values) => {
        axios
            .get('api/user/listuser', values)
            .then((res) => {
                console.log(res);
            })
            .catch((e) => console.error(e));
    };
    return (
        <div>
            Dashboard <button onClick={getUsers}>Get users</button>
        </div>
    );
};

export default Dashboard;
