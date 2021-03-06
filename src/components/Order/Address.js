import React from 'react';
import classes from './Address.module.css';

const address = (props) => {

    return(
        <div className={classes.Table}>
            <table>
                <thead>
                    <tr>
                        <th>COUNTRY</th>
                        <th>STREET</th>
                        <th>Zip Code</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{props.country}</td>
                        <td>{props.street}</td>
                        <td>{props.zipCode}</td>
                    </tr>
                </tbody>

            </table>
        </div>

    );
};

export default address;