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

export default connect(
  mapStateToProps,
  { getContacts }
)(Contacts);
```

Note: React is FLEXIBLE. There are many techniques to accomplish the same task. There might (or might not) be a 
mapDispatchToProps variable. There might (or might not) be an Action creator file, so that code must be written elsewhere
like in the component. 

## Challenge(s)
Bottom Line Up Front: EDIT contact through Forms. Going through this exercise illustrated how challenging it is
to pre-populate data in the EDIT form fields.  Because data flows in one direction from Store to UI/Components 
as State to Props, the issue comes up as how to edit ONLY CERTAIN fields through forms with the backend route 
would be a PATCH route (versus a PUT route when you create a contact).   
The default is make all fields required on the Edit form and everything gets updated. The obvious issue is typographical
errors or forgetting to enter a field and the current value gets overwritten with an blank 
space (or empty string, or null, etc).
An alternative is to create Refs and use defaultValues. The issue becomes getting that particular
element, then modifying the data to use Refs, then updating the data and component. The other alternative is to use a 
library like Redux Forms. The code and data flow get messy (at this time). This app is practice and a work-in-progress,
so my goal is to get a working EDIT form up and running.


