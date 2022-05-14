import React from "react"
import './App2.css';
import Text from './components/text'
import KeyBoard from './components/keyBoard'
import Language from './components/language'
import Size from './components/size'
import Color from './components/color'
import Special from './components/special'
import UpperCase from './components/upperCase'

class typeApp extends React.Component {
  constructor() {
    super();
    this.state = {
      text: [],
      language: {
        English: [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='], ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '@', '!'], ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '%', '?', '#']],
        Hebrew: [[';', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '!'], ['/', "'", 'פ', 'ם', 'ן', 'ו', 'ט', 'א', 'ר', 'ק', ']', '[', '@', '#'], ['ף', 'ך', 'ל', 'ח', 'י', 'ע', 'כ', 'ג', 'ד', 'ש', ',', '?', '%', '^'], ['ץ', 'ת', 'צ', 'מ', 'נ', 'ה', 'ב', 'ס', 'ז', '/', '*', '(', ')', '+']],
        imugi: [['💔', '💞', '🧡', '🤍', '💛', '💗', '💕', '🖤', '💝', '💘', '💌'], ['😁', '😃', '😆', '😋', '😘', '😙', '🙂', '🤔', '🤩', '😏', '😮'], ['😂', '😄', '😓', '😞', '😢', '😩', '😤', '😖', '😬', '😎', "😇"], ['😷', '🤑', '😨', '🥺', '😞', '😲', '🤭', '🤕', '🤪', '🤥', '🥱']],
      },
      currentLanguage: "English",
      size: 18,
      color: "black",
      status: "lowerCase",
      undoLast: [],
    };
  };

  render() {
    return (<div className="all">
      <Text text={this.state.text} />
      <KeyBoard language={this.state.language[this.state.currentLanguage]} change={this.changeLetter} undo={this.undo} change1={this.delete} />
      <Language change={this.changeLanguage} />
      <UpperCase language={this.state.currentLanguage} change={this.changeStatus} status={this.state.status} />
      <Size change={this.setStyle} />
      <Color change={this.setStyle} />
      <Special clear={this.clearAll} low={this.setLowerAll} up={this.setUpperAll} />

    </div>);
  }
  changeLanguage = Language => {
    this.setState({ currentLanguage: Language })
  };
  changeStatus = curStatus => {
    this.setState({ status: curStatus })
    let boards = this.state.language;
    let keyBoard = this.state.language.English;
    boards.English = keyBoard.map(letters => letters.map(letter => curStatus === "lowerCase" ? letter.toLowerCase() : letter.toUpperCase()));
    this.setState({ language: boards });
  };

  changeLetter = (letter) => {
    let temp = this.state.text;
    temp.push({
      value: letter,
      color: this.state.color, size: this.state.size
    });
    this.setState({ text: temp })
    let last = this.state.undoLast;
    last.push({ type: "write", value: "" });
    this.setState({ undoLast: last });

  };

  setStyle = (key, value) => {
    this.setState({ [key]: value })
  }

  clearAll = (undo = true) => {
    if (undo) {
      let last = this.state.undoLast;
      last.push({ type: "clear", value: this.state.text });
      this.setState({ undoLast: last });
    }
    this.setState({ text: [] })
  }

  setUpperAll = (undo = true) => {
    if (undo) {
      let last = this.state.undoLast;
      last.push({ type: "upperAll", value: this.state.text });
      this.setState({ undoLast: last });
    }
    let arr = this.state.text;
    arr = arr.map(letter => { return (letter.value === "<br />" ? letter : { value: letter.value.toUpperCase(), color: letter.color, size: letter.size }) });
    this.setState({ text: arr })
  }

  setLowerAll = (undo = true) => {

    if (undo) {
      let last = this.state.undoLast;
      last.push({ type: "lowerAll", value: this.state.text });
      this.setState({ undoLast: last });
    }
    let arr = this.state.text;
    arr = arr.map(letter => { return (letter = { value: letter.value.toLowerCase(), color: letter.color, size: letter.size }) });
    this.setState({ text: arr })
  }

  delete = (undo = true) => {
    let arr = this.state.text;
    let tmp = arr.pop();
    if (undo) {
      let last = this.state.undoLast;
      last.push({ type: "delete", value: tmp });
      this.setState({ undoLast: last });
    }

    this.setState({ text: arr });
  }

  undo = () => {

    let undo = this.state.undoLast;
    if (undo.length) {
      let last = undo.pop();
      console.log(last);
      switch (last.type) {
        case "delete": {
          let NewText = this.state.text;
          NewText.push(last.value);
          this.setState({ text: NewText })
          break;
        }
        case "write": {
          this.delete(false);
          break;
        }
        case "clear":
          {
            this.setState({ text: last.value });
            break;
          }
        case "upperAll":
          {
            this.setState({ text: last.value });
            break;
          }
        case "lowerAll":
          {
            this.setState({ text: last.value });
          
            break;
          }
        default: return;
      }
    }
  }
}

export default typeApp;
