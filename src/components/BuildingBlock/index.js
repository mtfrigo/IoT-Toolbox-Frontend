import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import BuildIcon from '@material-ui/icons/Build';
import { FiCodesandbox } from 'react-icons/fi';

import Checkbox from '@material-ui/core/Checkbox';
import MatchingContext from '../../contexts/matching';

import BBICard from '../../components/BBI'

import './styles.css'

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -6,
    top: 7,
    padding: '0 5px',
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 190,
    marginTop: 24,
    display: 'flex',
    flexDirection: 'column', 
    // border: '2px solid rgba(0, 0, 0, 0) '
  },
  header: {

    paddingBottom: 2 
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  select: {
    marginLeft: 'auto',
  },
  content: {
    paddingTop: 5,
    paddingBottom: 0,
    flexGrow: 2,
    overflowY: 'hidden',
    overflowX: 'hidden',
    marginTop: 0,
    "&:last-child": {
      paddingBottom: 5
    },
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    paddingTop: 2,
    paddingBottom: 0,
  },
  expandOpen: {
  },
  avatar: {
    backgroundColor: red[500],
  },
  justified: {
    justifyContent: 'center',
  },
  item: {
    background: '#f1f1f1',
    color: 'rgba(0, 0, 0, 0.70);',
    margin: 2,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    position: 'relative',
    fontSize: 12,
    width: '110%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: 16,
    paddingLeft: 12,
    paddingTop: 2,
    paddingBottom: 2,
  },
  selected: {
    border: '2px solid rgb(245, 16, 97) !important'
  },
  recommended: {
    border: '2px solid rgb(93, 26, 255)'
  },
  btnSelected: {
    background: '#f1f1f1',
  },
  matched: {
    border: '2px solid rgb(63, 81, 181)'
  },
}));

export default function BuildingBlockCard(props) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(false);
  const [menuId, setMenu] = React.useState(1);

  const [counter, setCounter] = React.useState(0);

  const [infos, setInfos ] = React.useState(props.bb.BlockCapabilities)

  const { selectBlock, recommendedBlocks } = React.useContext(MatchingContext);
  const { selectedBlocks, selectBlocks } = React.useContext(MatchingContext);

  let history = useHistory();

  useEffect(() =>  {

  }, [selectedBlocks])

  const handleCheckClick = () => {
    
    let selectedIndex = selectedBlocks.indexOf(bb.id);
    let newSelectBlocks = selectedBlocks;

    if(selectedIndex === -1) {
      newSelectBlocks.push(bb.id)
    } else if(selectedBlocks.length > 0){
      newSelectBlocks.splice(selectedIndex, 1)
    } else {
      newSelectBlocks = []
    }

    selectBlocks(newSelectBlocks)
    setCounter(newSelectBlocks.length)
  };


  const bb = props.bb;

  function selectMenu(id) {
    switch (id) {
      case 1:
        setInfos(bb.BlockCapabilities);
        setMenu(1);
        break;
      case 2:
        setInfos(bb.BlockDependencies);
        setMenu(2);
        break;
      case 3:
        setInfos(bb.DependentBlocks);
        setMenu(3);
        break;
      default:
        break;
    }
  }

  return (
    <Card className={clsx(classes.root, {[classes.selected]: (selectedBlocks.indexOf(bb.id) !== -1), [classes.recommended]: (recommendedBlocks.indexOf(bb.id) !== -1)})}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {bb.name.charAt(0)}
          </Avatar>
        }
        action={

          <Checkbox
            className={classes.select}
            onClick={handleCheckClick}
            aria-expanded={selected}
            aria-label="show more"
            checked={(selectedBlocks.indexOf(bb.id) !== -1)}
          />
        }
        title={bb.id + ': ' + bb.name}
        subheader={bb.type}
        className={classes.header}
      />
      <CardActions disableSpacing className={classes.actions}>
        <Tooltip title="Capabilities">
          <IconButton aria-label="add to favorites" onClick={() => selectMenu(1)} className={clsx({[classes.btnSelected]: menuId === 1})}>
            <StyledBadge badgeContent={bb.BlockCapabilities.length} color="primary" showZero anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}> 
              <BuildIcon />
            </StyledBadge>
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Dependencies">
          <IconButton aria-label="add to favorites" onClick={() => selectMenu(2)} className={clsx({[classes.btnSelected]: menuId === 2})}>
            <StyledBadge badgeContent={bb.BlockDependencies.length} color="primary" showZero  anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}>
              <MergeTypeIcon />
            </StyledBadge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Dependents">
          <IconButton aria-label="add to favorites" onClick={() => selectMenu(3)} className={clsx({[classes.btnSelected]: menuId === 3})}> 
            <StyledBadge badgeContent={bb.DependentBlocks.length} color="primary" showZero  anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}>
              <CallSplitIcon />
            </StyledBadge>
          </IconButton>
        </Tooltip>

        <Tooltip title="BBI">
          <IconButton aria-label="add to favorites" onClick={() => history.push('/bbis/' + bb.id)} > 
            <StyledBadge badgeContent={bb.ImplementedBy.length}  color="primary" showZero  anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}>
              <FiCodesandbox />
            </StyledBadge>
          </IconButton>
        </Tooltip>


        <Tooltip title="Details">
          <IconButton aria-label="settings" style={{marginLeft: 'auto'}} onClick={() => selectBlock(bb)}>
            <MenuBookIcon  />
          </IconButton>
        </Tooltip>
        
      </CardActions>
      <CardContent className={clsx(classes.content, {[classes.justified]: infos.length < 3})} >
        <Typography variant="body2" color="textPrimary" component="div">
          {
            infos.length > 0 ? infos.map((info, i) => <p className={classes.item} key={i}> {info.name}</p>) : <p className={classes.item} style={{background: 'rgb(255, 226, 236)', color: 'red'}}>No data</p>
          }
        </Typography>
      </CardContent>
      
    </Card>
  );
}