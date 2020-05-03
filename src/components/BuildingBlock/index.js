import React from 'react';
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

import MenuBookIcon from '@material-ui/icons/MenuBook';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import BuildIcon from '@material-ui/icons/Build';


import Checkbox from '@material-ui/core/Checkbox';
import MatchingContext from '../../contexts/matching';

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
    background: '#f1f1f1'
  },
  matched: {
    background: 'rgba(0, 255, 78, 0.25)'
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(false);
  const [menuId, setMenu] = React.useState(1);
  const [infos, setInfos ] = React.useState(props.bb.BlockCapabilities)

  const { selectBlock } = React.useContext(MatchingContext);

  const handleCheckClick = () => {
    setSelected(!selected);
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
    <Card className={classes.root}>
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
            checked={selected}
          />
        }
        title={bb.id + ': ' + bb.name}
        subheader={bb.type}
        className={classes.header}
      />
      <CardActions disableSpacing className={classes.actions}>
        <IconButton aria-label="add to favorites" onClick={() => selectMenu(1)} className={clsx({[classes.selected]: menuId === 1})}>
          <StyledBadge badgeContent={bb.BlockCapabilities.length} color="primary" showZero anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}> 
            <BuildIcon />
          </StyledBadge>
        </IconButton>

        <IconButton aria-label="add to favorites" onClick={() => selectMenu(2)} className={clsx({[classes.selected]: menuId === 2})}>
          <StyledBadge badgeContent={bb.BlockDependencies.length} color="primary" showZero  anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}>
            <MergeTypeIcon />
          </StyledBadge>
        </IconButton>

        <IconButton aria-label="add to favorites" onClick={() => selectMenu(3)} className={clsx({[classes.selected]: menuId === 3})}> 
          <StyledBadge badgeContent={bb.DependentBlocks.length} color="primary" showZero  anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}>
            <CallSplitIcon />
          </StyledBadge>
        </IconButton>

        <IconButton aria-label="settings" style={{marginLeft: 'auto'}} onClick={() => selectBlock(bb)}>
          <MenuBookIcon  />
        </IconButton>
        
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