// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class CanvasDigit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return null;
  }

  componentDidMount() {
    this.ctx = this.props.canvas.current.getContext('2d');
    this.draw();
  }

  componentDidUpdate(prevProps) {
    if (this.props.digit !== prevProps.digit) {
      this.draw();
    }
  }

  draw() {
    const itemNum = Math.floor(Math.random() * 800);
    const path = `http://www.mit.edu/~yewenpu/mnist_clock/datas/${this.props.digit}/${itemNum}.png`;
    const drawing = new Image();
    drawing.src = path;
    drawing.onload = (() =>
      this.ctx.drawImage(
        drawing,
        this.props.x, 0,
        28, 28));
  }
}

class Clock extends Component {
  static DIGIT_HEIGHT = 28;
  static DIGIT_WIDTH = 28;

  constructor(props) {
    super(props);
    this.state = {
      timeDigits: this.digitsFromDate()
    };
    this.canvas = React.createRef();
  }

  componentDidMount() {
    if (!this._frameId) {
      this._frameId = window.requestAnimationFrame(() => this.tick());
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this._frameID);
  }

  tick() {
    this.setState({
      timeDigits: this.digitsFromDate()
    });
    this._frameId = window.requestAnimationFrame(() => this.tick());
  }

  render() {
    const digits = [...Array(6).keys()].map(
      i =>
        <CanvasDigit
          canvas={this.canvas}
          x={Clock.DIGIT_WIDTH * i}
          digit={this.state.timeDigits[i]}
        />
    );
    const d = this.state.timeDigits;

    return (
      <div>
      <h1>
        {d[0]}{d[1]}:{d[2]}{d[3]}:{d[4]}{d[5]}
      </h1>

      <canvas ref={this.canvas} height={Clock.DIGIT_HEIGHT} width={Clock.DIGIT_WIDTH * 6}>
      </canvas>
      {digits}
      </div>
    );
  }

  digitsFromDate() {
    const time = new Date();
    let digits = [];

    digits.push(...this.numberAsTwoDigits(time.getHours()));
    digits.push(...this.numberAsTwoDigits(time.getMinutes()));
    digits.push(...this.numberAsTwoDigits(time.getSeconds()));

    return digits;
  }

  numberAsTwoDigits(n) {
    return [
      Math.floor(n / 10),
      n % 10
    ];
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Clock />
      </div>
    );
  }
}

export default App;
