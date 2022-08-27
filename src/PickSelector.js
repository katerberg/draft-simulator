import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PropTypes from 'prop-types';

const Root = styled(Grid)({
  position: 'fixed',
  bottom: '30px',
  left: '50%',
});

export default function PickSelector({pickNumber, onPause, onPlay, isPaused}) {
  const handlePauseToggle = () => {
    if (isPaused) {
      onPlay(pickNumber);
    } else {
      onPause();
    }
  }

  return (
    <Root onClick={handlePauseToggle}>
      <Paper sx={{paddingLeft: 3, paddingRight: 3, paddingTop: 1, paddingBottom: 1}}>
        <IconButton color="primary" size="large">
          {isPaused ? <PlayCircleIcon fontSize='inherit'/>: <PauseCircleIcon fontSize='inherit'/>}
        </IconButton>
        <Typography align='center'>{pickNumber}</Typography>
      </Paper>
    </Root>
  );
}

PickSelector.propTypes = {
  isPaused: PropTypes.bool.isRequired,
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  pickNumber: PropTypes.number.isRequired,
};
