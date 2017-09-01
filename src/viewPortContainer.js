import { connect } from 'react-redux'
import ViewPort from './viewPort.jsx'

const addItem = name => ({
  type: 'ADD_ITEM',
  name
});

const mapStateToProps = ({ rooms, player }) => {
  const currentRoom = rooms[player.currentRoom];
  return {
    items: currentRoom.items
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
