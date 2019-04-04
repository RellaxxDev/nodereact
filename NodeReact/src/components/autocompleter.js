import React, { Component } from "react";
import '../styles/autocompleter.css';

class Autocompleter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '', // текст, вводимый пользователем
      clicked: false, // произошел клик
      clickedVal: '', // текст дива, на котором был клик
      active: '', // текст дива с активным фокусом
      keyCode: undefined // произошло нажатие клавишы
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.setClickedFalse = this.setClickedFalse.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onTextChange(inputText) {
    this.setState({
      inputText: inputText
    });
  }

  onItemClick(val) {
    this.setState({
      clicked: true,
      clickedVal: val
    });
  }

  setClickedFalse() {
    this.setState({
      clicked: false,
      clickedVal: ''
    });
  }

  setActive(val) {
    this.setState({
      active: val
    });
  }

  onKeyDown(key) {
    this.setState({
      keyCode: key
    });
  }

  render() {
    return (
      <div>
          <h1>Autocomplete Input</h1>
          <div className="wrapper">
              <InputField
                inputText={this.state.inputText}
                clicked={this.state.clicked}
                clickedVal={this.state.clickedVal}
                onTextChange={this.onTextChange}
                setClickedFalse={this.setClickedFalse}
                onItemClick={this.onItemClick}
                keyDown={this.onKeyDown}
              />
              <ItemsList
                countries={this.props.countries}
                inputText={this.state.inputText}
                clicked={this.state.clicked}
                active={this.state.active}
                onItemClick={this.onItemClick}
                keyCode={this.state.KeyCode}
              />
          </div>
      </div>
    );
  }
}

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.onTextChange = this.onTextChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onTextChange(e) {
    this.props.onTextChange(e.target.value);
    this.props.setClickedFalse();
  }

  onKeyDown(e) {
        // key DOWN        // key UP          // key ENTER
    if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13) {
      this.props.keyDown(e.keyCode);
    }
  }

  render() {
    let val = this.props.inputText;
    if (this.props.clicked) {
      val = this.props.clickedVal;
    }
    return (
      <input
        id="autocompleteInput"
        type="text"
        placeholder="Country"
        value={val}
        onKeyDown={this.onKeyDown}
        onChange={this.onTextChange}
      />
    );
  }
}

class ItemsList extends React.Component {
  render() {
    const inputText = this.props.inputText;
    const rows = [];
    const keyCode = this.props.keyCode;
    const countries = this.props.countries;
    let active = this.props.active;
    // возможно вычисление активного элемента нужно перенести в Autocompleter
    let activeIndex = -1;

    if (!inputText || this.props.clicked || keyCode === 13) return null;

    // активируется первый элемент, если активных еще нет и нажата клавиша
    if (!active && keyCode) {
      activeIndex = 0;
    }
    
    if (active && keyCode) {
      // уменьшаем или увеличиваем индекс, если нажато UP или DOWN соответственно 
      activeIndex = countries.indexOf(active) + (keyCode === 38 ? 1 : -1);
    }
    
    // если вышли за длинну массива, фиксируем максимальный индекс
    if (activeIndex > countries.length-1) {
      activeIndex = countries.length-1;
    }

    // обнуляем активный элемент или находим его по индексу
    active = activeIndex !== -1 ? countries[activeIndex] : '';

    /*for (let i = 0; i < countries.length; i++) {
      if (country[i].substr(0, inputText.length).toUpperCase() !== inputText.toUpperCase()) continue;

      rows.push(
        <Item
          key={country[i]}
          focus={active === country[i] ? true : false} // данный элемент является активным
          //active={this.props.active}
          //keyCode={keyCode}
          contentBold={country[i].substr(0, inputText.length)}
          content={country[i].substr(inputText.length)}
          onItemClick={this.props.onItemClick}
        />
      );
    }*/

    this.props.countries.forEach((country) => {
      if (country.substr(0, inputText.length).toUpperCase() == inputText.toUpperCase()) {
        if (!active && keyCode) active = country; // активируется первый элемент, если активных еще нет и нажата клавиша
        
        rows.push(
          <Item
            key={country}
            focus={active === country ? true : false} // данный элемент является активным
            //active={this.props.active}
            //keyCode={keyCode}
            contentBold={country.substr(0, inputText.length)}
            content={country.substr(inputText.length)}
            onItemClick={this.props.onItemClick}
          />
        );
      }
    });

    if (!rows.length) return null;

    return(
      <div className='items-list'>
        {rows}
      </div>
    );
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(e) {
    this.props.onItemClick(e.target.className === 'item' ? e.target.innerText : e.target.parentElement.innerText);
  }

  render() {    
    return(
      <div
        className={this.props.focus ? 'item hover' : 'item'}
        onClick={this.onItemClick}>
          <strong>{this.props.contentBold}</strong>{this.props.content}
      </div>
    );
  }
}

export default Autocompleter;