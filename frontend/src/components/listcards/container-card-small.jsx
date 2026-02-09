import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchDepositsForContainer } from 'src/redux/actions/group.action';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    backgroundColor: 'transparent',
    borderRadius: '1rem',
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '0.8rem',
      padding: theme.spacing(1.5),
    },
  },
  text: {
    flexShrink: 0,
  },
  image: {
    marginBottom: '0.5rem',
    height: '5rem',
    width: '10rem',
    borderRadius: '0.5rem',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
      maxWidth: '15rem',
    },
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '40%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      alignItems: 'center',
    },
  },
  about: {
    fontWeight: 500,
    fontSize: '0.7rem',
    color: '#444',
    marginBottom: '0.2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
  },
  collection: {
    fontWeight: 600,
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
      marginBottom: '0.3rem',
    },
  },
  signed: {
    fontWeight: 500,
    fontSize: '0.7rem',
    color: '#666',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
  },
  buttonSpacer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      bottom: '1.5rem',
      right: '-0.5rem',
    },
  },
  button: {
    color: '#90C434',
    fontWeight: 400,
    fontSize: '0.8rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
      width: '100%',
      maxWidth: '10rem',
    },
  },
}));

const ContainerCardSmall = ({ data, index, user, pic, collection, about, signed, containerName }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className={classes.row}>
      <div className={classes.text}>
        <img src={pic} className={classes.image} alt="container image" />
      </div>

      <div className={classes.infoBox}>
        <div className={classes.about}>{about}</div>
        <div className={classes.collection}>{collection}</div>
        <div className={classes.signed}>{signed}</div>
      </div>

      <div className={classes.buttonSpacer}>
        <Button
          className={classes.button}
          onClick={() => {
            setLoading(true);
            dispatch(fetchDepositsForContainer(containerName, navigate));
            setTimeout(() => setLoading(false), 3000);
          }}
        >
          {loading ? 'Loading...' : 'View'}
        </Button>
      </div>
    </div>
  );
};

export default ContainerCardSmall;
