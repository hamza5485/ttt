import React, { useEffect } from 'react';
import Circle from '@material-ui/icons/RadioButtonUnchecked';
import Cross from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core';
import { PLAYERS } from '../../../lib/common/helper';

const useStyles = makeStyles(() => ({
    root: {
        padding: `1.5em`,
        textAlign: 'center'
    },
    icon: {
        fontSize: '3.5rem'
    },
    invi: {
        fontSize: '3.5rem',
        color: 'white'
    }
}));

const Marker = props => {
    const classes = useStyles();

    useEffect(() => {
    }, [props]);

    return (
        <div className={classes.root}>
            {props.value === PLAYERS.HUMAN && <Cross className={classes.icon} />}
            {props.value === PLAYERS.AI && <Circle className={classes.icon} />}
            {props.value === '' && <Cross className={classes.invi} />}
        </div>
    );
};

export default Marker;