import { connect } from 'react-redux'
import ItemList from './ItemList.jsx'



const setPage = page => ({
  type: 'SET_PAGE',
  page
});

const mapStateToProps = state => {
  const {
    player: { items },
    ui
  } = state;
  return { items, ui }
};

const mapDispatchToProps = dispatch => {
  return {
    onItemClick: name => {
    },
    onPageClick: page => {
      dispatch(setPage(page))
    }
  }
};

const ItemListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList)

export default ItemListContainer;
