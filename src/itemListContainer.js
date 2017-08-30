import { connect } from 'react-redux'
import ItemList from './ItemList.jsx'

const addItem = name => ({
  type: 'ADD_ITEM',
  name
});

const mapStateToProps = ({ items }) => ({ items });

const mapDispatchToProps = dispatch => {
  return {
    onItemClick: name => {
      dispatch(addItem(name))
    }
  }
};

const ItemListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList)

export default ItemListContainer;
