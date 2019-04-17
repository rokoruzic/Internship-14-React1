import React, { Component } from 'react';
import GroceriesList from './components/GroceriesList';
import './components/style.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: [""],
      removeAllGroceries: false,
      groceryIndexes: [],
      textDecoration: "none",
      groceryToStrike: -1

    };

  }
  handleRemoveGrocery = (event) => {
    var groceryToRemove = event.target.dataset.value;
    console.log(groceryToRemove);
    var listOfGroceries = this.state.index;
    listOfGroceries.forEach(function (item, i) {
      if (parseInt(item.replace(/[^0-9\.]+/g, "").trim(), 10) === 1 && item.replace(/[0-9]/g, '').trim() == groceryToRemove.replace(/[0-9]/g, '').trim())
        listOfGroceries.splice(i, 1);
      else if ((item.replace(/[0-9]/g, '').trim() == groceryToRemove.replace(/[0-9]/g, '').trim()) && !isNaN(parseInt(item.replace(/[^0-9\.]+/g, "").trim(), 10)))
        listOfGroceries[i] = `${item.replace(/[0-9]/g, '').trim()} ${parseInt(item.replace(/[^0-9\.]+/g, "").trim(), 10) - 1}`

    });
    this.setState({
      index: listOfGroceries,
    });
    event.stopPropagation();
  }
  handleRemoveAllGroceries = () => {
    this.setState({
      index: [""],
      removeAllGroceries: true,
      groceryIndexes: []

    });
  }
  handleGroceryClick = (event) => {
    console.log(event.target.style)


    event.target.style.textDecoration = "line-through"


  }

  handleAddGroceries = (event) => {


    var groceryIndexList = this.state.groceryIndexes.concat(event.target.dataset.index)

    var checker = true;
    var filter = function (value, index) {
      return this.indexOf(value) === index
    };
    var groceryToAdd = event.target.dataset.value;
    groceryIndexList = groceryIndexList.filter(filter, groceryIndexList);

    this.state.groceryIndexes.forEach(function (element) {
      if (element.includes(event.target.dataset.index))
        checker = false

    })
    if (checker)
      event.target.dataset.quantity = 1;

    var quantityNumber = 0;
    this.state.index.forEach(function (element) {
      if (element.includes(event.target.dataset.value)) {
        quantityNumber = parseInt(element.replace(/[^0-9\.]+/g, "").trim(), 10)

      }
    })
    var listToAdd = this.state.index.concat(`${groceryToAdd} ${1}`);
    this.state.index.forEach(function (element) {
      if (element.includes(event.target.dataset.value)) {
        event.target.dataset.quantity = quantityNumber + 1;
        listToAdd.forEach(function (item, i) {
          if (item.replace(/[0-9]/g, '').trim() == groceryToAdd)
            listToAdd[i] = `${groceryToAdd} ${event.target.dataset.quantity}`;
        });
      }

    })


    listToAdd = listToAdd.filter(filter, listToAdd);
    this.setState({
      index: listToAdd,
      removeAllGroceries: checker,
      groceryIndexes: groceryIndexList
    });




  };

  render() {
    var strikeClass = {
      textDecoration: this.state.textDecoration
    }

    var namesList = GroceriesList.map((grocery, index) =>
      <div key={index} className="item" >
        {grocery.name} < button className="item__button" onClick={this.handleAddGroceries} key={index} data-value={grocery.name} data-index={index} data-quantity={grocery.quantity}
        >+</button>
      </div>

    );

    var basketList = this.state.index.map((grocery, index) =>
      <div style={strikeClass} onClick={this.handleGroceryClick} key={index} data-value={grocery} className="item">
        {grocery} <button className="item__button" onClick={this.handleRemoveGrocery} key={index} data-value={grocery}>-</button>
      </div>

    );

    console.log(this.state.strike)
    console.log(this.state.index)
    return (
      <>
        <div>
          <h1>Groceries</h1>
          <div >
            {namesList}
          </div>
        </div>
        <h1>Basket</h1>
        {basketList.length < 2 ? <button id="clear__button__hidden"></button> : <button onClick={this.handleRemoveAllGroceries} id="clear__button">Empty basket</button>}
        <div  >
          {basketList.length < 2 ? "Basket is empty" : basketList}
        </div>
      </>
    );
  }
}

export default App;
