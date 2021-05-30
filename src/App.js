import React from "react";
import "./App.css";
import Child from "./Child";
import ErrorComp from "./ErrorComp";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      b: 2,
      posts: [],
      errorMsg: "",
    };
    this.listRef = React.createRef();
  }

  componentDidCatch(error, errorInfo) {
    console.log("componentDidCatch", error, errorInfo);
    this.setState({ errorMsg: "Ошибка" });
  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps", props, state);
    return props;
  }

  render() {
    if (this.state.errorMsg) {
      return <h1>Ошибка</h1>;
    }
    return (
      <div className="App">
        <p>{this.state.a}</p>
        <p>{this.state.b}</p>
        {this.state.a > 3 && <ErrorComp />}
        <button
          onClick={() => {
            console.log(this.state);
          }}
        >
          Просмотреть состояние
        </button>
        {this.state.a < 2 && <Child />}
        <ul>
          {this.state.posts.map((post) => {
            return <li key={post.id}>{post.title}</li>;
          })}
        </ul>
      </div>
    );
  }

  // getSnapshotBeforeUpdate(prevProps, prevState){
  //   if (prevState) {}
  //   return prevState.a % 2 == 0 ? : null
  // }

  componentDidMount() {
    console.log("componentDidMount()");
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((json) => {
        const { posts } = this.state;
        posts.push(json);
        this.setState({ posts });
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate()");
    return nextProps.a === nextState.a;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate()");
    if (prevProps.a !== this.props.a) {
      fetch("https://jsonplaceholder.typicode.com/posts/" + this.props.a + 1)
        .then((response) => response.json())
        .then((json) => {
          const { posts } = this.state;
          posts.push(json);
          this.setState({ posts });
        });
    }
  }
}

export default App;
