import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => {

    return (
        <div className={classes.BuildControl} >
            <p className={classes.Label}>{props.label}</p>
            <button className={classes.More} onClick = {props.added}>MORE</button>
            <button className={classes.Less} onClick = {props.removed} disabled = {props.disabled}>LESS</button>
        </div>
    );

};

export default buildControl;