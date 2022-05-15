import React from 'react'
import './App.css';
import Player1 from './components/Player1';
import Title from './components/Title';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      statusGame: false,
      statusStart: true
    }
  }

 render() {
    return (
      <div className="App">
        <Title startGame={this.startGame} addUser={this.addUser} isAble={this.state.statusGame} isAble2={this.state.statusStart} />

        <Player1 action={this.action} details={this.state.users} out={this.out} newGame={this.newGame} sup ={this.suprise}/>

      </div>
    )
  }

  startGame = () => {
    let details = this.state.users;
    details.map((user, i) => this.newGame(i));
    this.setState({ users: details });
    details[0].status = "yourTurn";
    this.setState({ statusGame: true })
  }
  newGame = index => {
    let details = this.state.users;
    details[index].number = Math.floor(Math.random() * 100);
    details[index].scores.push(1000);
    details[index].steps = 0;
    details[index].status = "notTurn";

    this.setState({ users: details });
  }

  addUser = () => {
    const arr = this.state.users;
    let newUser = prompt("enter new user:");
    arr.push({ name: newUser, scores: [], number: 0, steps: 0, status: "notTurn"});
    this.setState({ users: arr });
    if (arr.length > 1)
      this.setState({ statusStart: false });
  }

  addStep = key => {
    let details = this.state.users[key]
    ++details.steps;
    details.scores[details.scores.length - 1] -= 10;;
    this.setState({ details: details })
  }


  action = (num, key) => {
    let arr = this.state.users;
    arr[key].number = num;
    if (arr.length > 1) {
      if (arr[key].number === 100) {
        arr[key].status = "win";
      }
      else {
        arr[key].status = "notTurn";
      }
      if (arr[key].steps && !(arr[key].steps % 15)) {
        arr[key].scores[arr[key].scores.length-1]=  Math.floor(arr[key].scores[arr[key].scores.length-1]/10);
        console.log()
      }
      let index = key;
      let countWin = 0
      while (arr[(index + 1) % arr.length].status === "win" && countWin + 1 !== this.state.users.length) {
        ++index;
        ++countWin;
      }
      if (arr[(index + 1) % arr.length].status !== "win") {
        arr[(index + 1) % arr.length].status = "yourTurn";
      }
      else {
        arr.map((user, i) => user.status = "notTurn");
        this.setState({ statusGame: false });
      }
    }
    this.setState({ users: arr })
    this.addStep(key);
  }

  out = index => {
    let players = this.state.users;
    players.splice(index, 1);
    this.setState({ users: players })
  }
  suprise= index=>{
    let num = Math.floor(Math.random() * 4);
    let use = this.state.users;
    switch (num) {
      case 0:
        use[index].scores[use[index].scores.length - 1] -= 200;
        alert("you miss 200 scores")
        break;
      case 1:
        use[index].scores[use[index].scores.length - 1] += 100;
        alert("you gain 100 scores ")
        break;
      case 2:
        use[index].number = Math.floor(Math.random() * 100)
        alert("you have a new number ")
        break;
      case 3:
        use[index].scores[use[index].scores.length - 1] *= 2;
        alert(`Your scores have been doubled }`)
        break;
      default:
        break;
    }
    this.setState({users:use})
  }
}

export default App;