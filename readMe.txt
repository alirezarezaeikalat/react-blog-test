1. To give inline style in react, you can give dynamic object:


  <a style={{
    color: "red"
  }}></a>

2. If you want to pass argument to the function for handling the events, you can wrap the function inside anonymmous function:

    <button onClick={()=>{handleClick('alireza')}}></button>

3. There is the difference between normal variables in components and state in components. React watches changes for a state in a components. It means if you change the 
    state, the DOM will be updated, but If you change the normal variables, the DOM won't get updated.

        import {useState} from 'react'
        [name, setName] = useState('ghasem')

4. There is important concept in react, and you can pass function to props of the component, by passing function to the props, you can change the data of the parent 
    component.

5. We can use useEffect hook, instead of componentDidMount and componentDidUpdate life cycle hooks:

      import {useEffect} from 'react'

      useEffect(() => {console.log('useEffect ran')})

      [ATTENTION]
      useEffect runs with every render.

6. we can define useEffect dependencies:

      useEffect(() => { console.log('ghasem') }, [])    if we pass empty array, it will run only at first render, but you can also add variable to this array.

7. we can use json server to make virtual rest api:

      a. first we have to install or run the package:

          npx json-server --watch data/db.json --port 8000

8. check this syntax for error prevention of null:

    {blogs && ...}    if blogs is false, it is not going to evaluate the right hand side of && operator

[VERY IMPORTANT JAVASCRIPT TIP]
9. There has traditionally been no implicit return in JavaScript functions. If you write a function using the --function keyword--, this remains true:

      function needsReturn() { 'awesome' }
      needsReturn()    // returns undefined

      Functions without a return statement return --undefined by default--.
      --This changes with arrow functions, which can potentially have an implicit return.--
    

      In the case that your arrow function has a single --expression-- as the function body, that expression will be executed, and the resulting value will be implicitly
      returned when the function is called.


      And as soon as you have curly braces surrounding your function body, returns are no longer implicit – for either statements or expressions.

      const explicit = () => { return 'awesome' }
      explicit()     // returns 'awesome'

      const broken = () => { 'nicht awesome' }
      broken()       // returns undefined

10. About javascript:

    A --single threaded--, --non-blocking--, --asynchronous--, concurrent language.

    javascript has a --call stack--, an --event loop--, a --call back queue--, and some other apis and stuff.

     javascript runtime environment, like V8 in chrome, has two section:

          heap            call stack                  Web APIs:
                                                      DOM
                                                      Ajax
                                                      SetTime out

          event loop


          callback
          queue

  
  one thread = one call stack = one thing at the time

  [ATTENTION]
  When the function returns something, it removed from the call stack
  when we do --sync task-- in call stack, the browser can't do anything else, it can't render something, or it can't run another code. so it get stuck. 

  [How]
  So how does the browser, run the async call?

  The async call appears in the call stack, and send to the call back queue by event loop, and --when the stack is empty-- the event loop take back the call back function from 
  call back queue and brings it to the call stack


11. making custom hook for code reuse in react:

      a. to make custom hook, you just have to create a function with use as the first part of its name.

      b. return the data you want from the function

      import { useState, useEffect } from "react";
      const useFetch = (url) => {
        const [data, setData] = useState(null);
        const [isPending, setIsPending] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
          fetch(url)
            .then(res => {
              if (!res.ok) {
                throw Error("Could not fetch data for that resource");
              }
              return res.json()
            }).then(data => {
              setData(data);
              setIsPending(false);
              setError(null);
            }).catch(err => {
              setIsPending(false);
              setError(err.message)
            })
        }, [url])

        return {data, isPending, error};
      }
      
      export default useFetch;

12. Using react router:

      a. first install it:

          npm install react-router-dom
      
      b. import three components in the main App component: 

          import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

          function App() {
            return (
              <Router>
                <div className="App">
                  <Navbar></Navbar>
                  <div className="content">
                    <Switch>
                      <Route exact path="/">
                        <Home></Home>
                      </Route>
                    </Switch>
                  </div>
                </div>
              </Router>
            );
          }

13. a tags still send request to the server, we need to use Link component from react-router-dom:

      import { Link } from 'react-router-dom';

      <Link to="/"></Link>

14. [Very important attention]

    as you can see in this app, we use useFetch in the Home component, and useFetch performs async task, and if you change your component very fast using Link tag
    from react router, you see a error in the console:

        Warning: Can't perform a React state update on an unmounted component. This is no-op, but it indicates the a memory leak in your application. To fix, 
        cancel all subscriptions and async tasks in --useEffect cleanup function--. (useEffect cleanup function is just like --componentWillUnmount-- function)

        --cleanup function-- is just a function that returns from useEffect hook, to cancel fetch request in cleanup function, we can use AbortController in js:

        useEffect(() => {
          const abortController = new AbortController();
          fetch(url, {signal: abortController.signal})
            .then(res => {
              if (!res.ok) {
                throw Error("Could not fetch data for that resource");
              }
              return res.json()
            }).then(data => {
              setData(data);
              setIsPending(false);
              setError(null);
            }).catch(err => {
              if (err.name === "AbortError") {
                console.log("fetch abroted")
              }
              else {
                setIsPending(false);
                setError(err.message)
              }
            })
          return () => abortController.abort();
        }, [url]) 

15. route parameters:

      a. in the router:

          <Route exact path="/blogs/:id">
              <BlogDetails></BlogDetails>
          </Route>
      
      b. in the component:

          import { useParams } from "react-router";
          const BlogDetails = () => {
            const { id } = useParams();
            return ( 
              <div className="blog-details">
                <h2>Blog details { id }</h2>
              </div>
            );
          }
          
          export default BlogDetails;

16. to bind the input to the state value, we can use onChange for an input:

      const Create = () => {
      const [title, setTitle] = useState('');
      const [body, setBody] = useState('');
      const [author, setAuthor] = useState('mario')

      return ( 
        <div className="create">
          <h2>Add a New Blog</h2>
          <form>
            <label>Blog title:</label>
            <input 
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              />
            <label>Blog body</label>
            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
            >
            </textarea>
            <label>
              Blog author:
            </label>
            <select
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            >
              <option value="mario">mario</option>
              <option value="yoshi">yoshi</option>
            </select>
            <button>Add blog</button>
          </form>
        </div>
      );
    }
    
    export default Create;

17. we can use useHistory for redirects in react:

    import {useHistory} from 'react-router-dom';

    const history = useHistory();

    history.go(-1)    // go to the last page
    history.push("/") // go to the home page