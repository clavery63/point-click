import { connect } from 'react-redux'
import ViewPort from './viewPort.jsx'

const addItem = name => ({
  type: 'ITEM_TO_PLAYER',
  name
});

const goToRoom = room => ({
  type: 'SET_ROOM',
  room
});

const setText = text => ({
  type: 'SET_TEXT',
  text
});

const startTransition = (dest, dir, text) => ({
  type: 'START_TRANSITION',
  dest,
  dir,
  text
});

const clearTransition = () => ({
  type: 'CLEAR_TRANSITION'
})

const mapStateToProps = ({ rooms, player, ui }) => {
  const { doors, items, name } = rooms[rooms.current];
  const { transition } = ui;
  return {
    doors,
    items,
    name,
    rooms,
    transition
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onItemClick: name => {
      dispatch(addItem(name));
    },
    onDoorClick: (dest, dir, text) => {
      dispatch(startTransition(dest, dir, text));
    },
    onTransitionMid: room => {
      dispatch(goToRoom(room));
    },
    onTransitionEnd: text => {
      dispatch(setText(text));
      dispatch(clearTransition());
    }
  }
};

const ViewPortContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPort)

export default ViewPortContainer;
