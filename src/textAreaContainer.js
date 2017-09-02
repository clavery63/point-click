import { connect } from 'react-redux'
import TextArea from './textArea.jsx'

const nudgeText = () => ({
  type: 'NUDGE_TEXT'
});

const mapStateToProps = ({ text }) => {
  return { text }
};

const mapDispatchToProps = dispatch => {
  return {
    onTextClick: () => {
      dispatch(nudgeText())
    }
  }
}

const TextAreaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextArea)

export default TextAreaContainer;
