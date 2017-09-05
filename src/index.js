import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    BrowserRouter,
    Link,
    Switch, 
    Route
} from 'react-router-dom';

const TutorAPI = {
    tutors: [
        {number: 1, name: "Kyle", age: 18, subjects: ['Math: up to Algebra', 'English: All', 'Science: None'], availability: "M W F"},
        {number: 2, name: "Sheena", age: 18, subjects: ['Math: up to Algebra', 'English: All', 'Science: None'], availability: "M W F"},
        {number: 3, name: "Billiam", age: 18, subjects:  ['Math: up to Algebra', 'English: All', 'Science: None'],availability: "M W F"},
        {number: 4, name: "Johanna", age: 18, subjects:  ['Math: up to Algebra', 'English: All', 'Science: None'],availability: "M W F"},
        {number: 5, name: "Phil", age: 18, subjects:  ['Math: up to Algebra', 'English: All', 'Science: None'],availability: "M W F"}
    ],
  all: function() { return this.tutors},
  get: function(id) {
    const isTutor = p => p.number === id
    return this.tutors.find(isTutor)
  }
}



const Home = () => (
  <h1> Marquez Tutoring</h1>      
)


const Tutor = (props) => {
  const tutor = TutorAPI.get(
    parseInt(props.match.params.number, 10)
  )
  if (!tutor) {
    return <div>Sorry, but that tutor was not found</div>
  }
  return (
    <div>
      <h1>{tutor.name} (#{tutor.number})</h1>
      <h3>Age: {tutor.age}</h3>
      <h3> Subjects </h3>
      <div>
        <ul>
            {
                tutor.subjects.map(p => (
                <li>
                    {tutor.subjects}
                </li>
                ))
            }
        </ul>
  </div>
      <h3>Availability: {tutor.availability}</h3>
      <Link to='/tutors'>Back</Link>
    </div>
  )
}

const AllTutors = () => (
  <div>
    <ul>
      {
        TutorAPI.all().map(p => (
          <li key={p.number}>
            <Link to={`/tutor/${p.number}`}>{p.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
)


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/tutors' component={AllTutors}/>
      <Route path='/tutor/:number' component={Tutor}/>
    </Switch>
  </main>
)

const Header = () => (
    <nav className="mainbar navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="/">Marquez Tutoring</a>
            </div>
            <ul className="nav navbar-nav">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/tutors'>Tutors</Link></li>
            </ul>
        </div>
    </nav>
)


const App = () => (
  <div className="container">
    <Header />
    <Main />
  </div>
)



ReactDOM.render ((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));