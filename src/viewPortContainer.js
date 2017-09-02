import { connect } from 'react-redux'
import ViewPort from './viewPort.jsx'

const addItem = name => ({
  type: 'ADD_ITEM',
  name
});

const goToRoom = (dest, text) => ({
  type: 'GO_TO_ROOM',
  dest,
  text
});

const mapStateToProps = ({ rooms, player }) => {
  const { doors, items, name } = rooms[player.currentRoom];
  return {
    doors,
    items,
    name,
    rooms
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onItemClick: name => {
      dispatch(addItem(name))
    },
    onDoorClick: (dest, text) => {
      dispatch(goToRoom(dest, text))
    }
  }
};

const ViewPortContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPort)

export default ViewPortContainer;
