import React from 'react';
import PropTypes from 'prop-types';
import Soundfont from 'soundfont-player';

class SoundfontProvider extends React.Component {
  static propTypes = {
    instrumentName: PropTypes.string.isRequired,
    hostname: PropTypes.string.isRequired,
    format: PropTypes.oneOf(['mp3', 'ogg']),
    soundfont: PropTypes.oneOf(['MusyngKite', 'FluidR3_GM']),
    audioContext: PropTypes.instanceOf(window.AudioContext),
    render: PropTypes.func,
  };

  static defaultProps = {
    format: 'mp3',
    soundfont: 'MusyngKite',
    instrumentName: 'acoustic_grand_piano',
  };

  constructor(props) {
    super(props);
    this.state = {
      activeAudioNodes: {},
      instrument: null,
    };
  }

  componentDidMount() {
    this.loadInstrument(this.props.instrumentName);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.instrumentName !== this.props.instrumentName) {
      this.loadInstrument(this.props.instrumentName);
    }
  }

  loadInstrument = (instrumentName) => {
    console.log('Loading instrument:', instrumentName);
    this.setState({
      instrument: null, // Reset instrument state while loading
    });

    Soundfont.instrument(this.props.audioContext, instrumentName, {
      format: this.props.format,
      soundfont: this.props.soundfont,
      nameToUrl: (name, soundfont, format) => {
        return `${this.props.hostname}/${soundfont}/${name}-${format}.js`;
      },
    }).then(instrument => {
      console.log('Instrument loaded:', instrument);
      this.setState({ instrument });
    }).catch(error => {
      console.error('Error loading instrument:', error);
    });
  };

  playNote = (midiNumber) => {
    const { audioContext } = this.props;
    console.log("Attempting to play note:", midiNumber);

    audioContext.resume().then(() => {
      const { instrument } = this.state;
      if (instrument) {
        const audioNode = instrument.play(midiNumber);
        this.setState((prevState) => ({
          activeAudioNodes: {
            ...prevState.activeAudioNodes,
            [midiNumber]: audioNode,
          },
        }));
      } else {
        console.error('Instrument is not loaded yet');
      }
    }).catch(error => {
      console.error("Error resuming AudioContext or playing note:", error);
    });
  };

  stopNote = (midiNumber) => {
    const { audioContext } = this.props;
    console.log("Attempting to stop note:", midiNumber);

    audioContext.resume().then(() => {
      const audioNode = this.state.activeAudioNodes[midiNumber];
      if (audioNode) {
        audioNode.stop();
        this.setState((prevState) => ({
          activeAudioNodes: {
            ...prevState.activeAudioNodes,
            [midiNumber]: null,
          },
        }));
      } else {
        console.warn(`No active audio node found for MIDI number: ${midiNumber}`);
      }
    }).catch(error => {
      console.error("Error stopping note or resuming AudioContext:", error);
    });
  };

  stopAllNotes = () => {
    const { audioContext } = this.props;
    console.log("Stopping all notes");

    audioContext.resume().then(() => {
      Object.values(this.state.activeAudioNodes).forEach((audioNode) => {
        if (audioNode) audioNode.stop();
      });
      this.setState({ activeAudioNodes: {} });
    }).catch(error => {
      console.error("Error stopping all notes or resuming AudioContext:", error);
    });
  };

  render() {
    return this.props.render({
      isLoading: !this.state.instrument,
      playNote: this.playNote,
      stopNote: this.stopNote,
      stopAllNotes: this.stopAllNotes,
    });
  }
}

export default SoundfontProvider;
