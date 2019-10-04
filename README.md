# contactManager

## Summary
A simple React app to practice Redux managing state of contacts in a contact manager. App created with [Create React App](https://github.com/facebook/create-react-app).
This was just practice and easy reference of the data flow for Redux with an Express server connected to a PostgreSQL database.
The frontend is in the contactmanager folder and backend in server folder.

## Redux Purpose and Concept
The purpose of Redux is to share application level state between components. Each component can still have their own state,
which would be unshared data, though for state that needs to be passed up to other components, Redux facilitates the sharing 
of that data with connect, mapStateToProps, and mapDispatchToProps*. 
The Redux data flow is diagrammed below: 

                                Reducer  ------>    Store
                                  ^                   |
                                  |                   |
                                  |                   V
                               Action   <----  User Interface (UI)

Redux stores the state in a Store. Unlike other state managers (like Flux) Redux has only ONE Store. With only one Store, 
it makes keeping track of the state easier since you just take a "slice" of state (Dan Abramov's words) instead of keeping 
track of different Stores.  The state is propagated down to the components which populate the UI. When a user triggers
an event (add a contact, add a to do, etc) an Action is Dispatched to the Reducer. 

The Reducer takes in the Action and "reduces" state to whatever form is needed. Abramov said think of the Reducer as
similar to the reduce array method in JavaScript where we can "reduce" the state from one data structure to another.
The Reducer is a pure function. And as a pure function, the Reducer doesn't not modify data outside it's scope: 
with the same input, it will return the same output with no side-effects. As such, the Reducer does not mutate incoming 
State, but makes a copy of State, performs the required operations, and passes the new State to the Store, 
and in turn the UI is updated. 

Note: As a state manager, Redux can work with many frontend frameworks. It works very well with React (UI is a
function of state) though, because it wasn't specifically designed to work with React, it needs to be bound through
a specific library, React-Redux. 

## Redux connecting components
For a bare-bones connections from the Redux Store to a component, each component needs a connect function which takes 
in two parameters mapStateToProps and mapDispatchToProps. The component file exports the connect function with its parameters
and the component itself wrapped in parentheses.  mapStateToProps is just as its name implies, it is the Redux State passed down
to the component as Props. mapDispatchToProps is any Actions that will be Dispatched with a Type. 

```
const mapStateToProps = state => ({
  contacts: state.contact.contacts
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts);
```

The Type is generally a variable whose value is a string that describes the Action (ADD_CONTACT) and is declared 
as:
```
export const ADD_CONTACT = "ADD_CONTACT";
```

Why a string? From reading some docs, Medium posts, etc, generally a string is simple and no data will be lost when serialized. 
If you JSONify/stringify an object or array is "flattened" and any references are ignored. 

A mapDispatchToProps variable isn't always declared. A technique is to have an Action creator file, that will take in a Type,
create the Action (which can be an object with a Type and Payload), export to the component, and the second parameter
to the connect function is an object with the Action creator. 

```
const mapStateToProps = state => ({
  contacts: state.contact.contacts
});

const mapDispatchToProps = dispatch => ({
  getContacts: () => dispatch({ type: GET_CONTACTS })
});

export default connect(
  mapStateToProps,
  { getContacts }
)(Contacts);
```

Note: React is FLEXIBLE. There are many techniques to accomplish the same task. There might (or might not) be a 
mapDispatchToProps variable. There might (or might not) be an Action creator file, so that code must be written elsewhere
like in the component. 

## Challenge(s)/Learning Point
Bottom Line Up Front: EDIT contact through Forms. Basically, care has to be taken when pulling State to Props and setting the conditional logic to either that incoming data field or empty string. Not all fields are required and this effects any error objects that might get passed. Also, whether to put more of the code on the component side or on the backend. As per Dan Abramov's recommendation and make the frontend as database "agnostic" as possible, so it's easier to plug to any database (PostgreSQL, MongoDB, NoSQL, MySQL, etc, etc). Also, per Abramov, some components will have STATE, but it will be their own and does not mean it will be app STATE nor does the component state need to be shared with app state.

Basic pattern is passing STATE from parent component down as PROPS to child component. In a non-Redux/state management library, passing down the PROPS into setState function in a child component. Using Redux, state is passed down as props using a lifecycle method such as componentWillReceiveProps or (UNSAFE_ComponentWillReceiveProps) and pull the data out of nextProps. Can also use getDerivedFromState in conjunction with componentWillMount. This can get confusing between what is appropriate state to share with the App. 

Hence, does a component need to share state with Redux and therefore the app? If I need to share state, maybe I only need to share it with the parent component? As Abramov and a few others wrote/spoke about, it depends on the features and scope. Depending on what feature is needed, will determine what components need state, what components will then need Redux, and the components can be refactored to take state. And during the course of refactor, the components that don't need state can be made simpler or changed from a class component to a functional component.


