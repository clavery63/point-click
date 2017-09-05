import { connect } from 'react-redux'
import TextArea from './textArea.jsx'

const clearText = () => ({
  type: 'CLEAR_TEXT'
});

const setCharAction = char => ({
  type: 'SET_CHAR',
  char
});

const setLineAction = line => ({
  type: 'SET_LINE',
  line
});

const mapStateToProps = ({ text }) => {
  return { text }
};

const mapDispatchToProps = dispatch => {
  return {
    onTextClick: () => {
      dispatch(clearText())
    },
    setChar: char => {
      dispatch(setCharAction(char))
    },
    setLine: line => {
      dispatch(setLineAction(line))
    }
  }
}

const TextAreaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextArea)

export default TextAreaContainer;
