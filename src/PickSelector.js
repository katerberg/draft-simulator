import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PropTypes from 'prop-types';

const Root = styled(Grid)({
  position: 'fixed',
  bottom: '30px',
  left: '50%',
});

export default function PickSelector({pickNumber, onPause, onPlay, isPaused, onSkip}) {
  const handlePauseToggle = () => {
    if (isPaused) {
      onPlay(pickNumber);
    } else {
      onPause();
    }
  }

  return (
    <Root>
      <Paper sx={{paddingLeft: 1, paddingRight: 1, paddingTop: 1, paddingBottom: 1}}>
        <IconButton color="primary" size="large" onClick={handlePauseToggle}>
          {isPaused ? <PlayCircleIcon fontSize='inherit'/>: <PauseCircleIcon fontSize='inherit'/>}
        </IconButton>
        <IconButton color="primary" size="large" onClick={onSkip}>
          <SkipNextIcon fontSize='inherit'/>
        </IconButton>
      </Paper>
    </Root>
  );
}

PickSelector.propTypes = {
  isPaused: PropTypes.bool.isRequired,
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
  pickNumber: PropTypes.number.isRequired,
};
