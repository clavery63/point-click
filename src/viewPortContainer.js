import { connect } from 'react-redux'
import ViewPort from './ViewPort.jsx'

const addItem = name => ({
  type: 'ADD_ITEM',
  name
});

const mapStateToProps = ({ room }) => {
  return {
    items: room.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onItemClick: name => {
      dispatch(addItem(name))
    }
  }
};

const ViewPortContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPort)

export default ViewPortContainer;
