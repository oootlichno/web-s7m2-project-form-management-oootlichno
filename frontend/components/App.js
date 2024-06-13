

// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react';

let id = 0;
const getId = () => ++id;

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
];

export default function App() {
  const [members, setMembers] = useState(teamMembers);
  const [editing, setEditing] = useState(null);
  const [formValue, setFormValue] = useState({ id: '', fname: '', lname: '', bio: '' });
  // ✨ Create a third state to track the values of the inputs

  useEffect(() => {
    if (editing !== null) {
      const memberToEdit = members.find(mem => mem.id === editing);
      setFormValue(memberToEdit);
    } else {
      setFormValue({
        fname: '',
        lname: '',
        bio: '',
      });
    }
  }, [editing]);

  const onChange = evt => {
    const { id, value } = evt.target; 
    setFormValue({ ...formValue, [id]: value });

    // ✨ This is the change handler for your text inputs and your textarea.
    // You can check `evt.target.id` to know which input changed
    // and then you can use `evt.target.value` to update the state of the form
  };

  const edit = id => {
    setEditing(id);
    // ✨ Put this function inside a click handler for the <button>Edit</button>.
    // It should change the value of `editing` state to be the id of the member
    // whose Edit button was clicked
  };

  const submitNewMember = () => {
    const newMember = { 
      id: getId(),
      fname: formValue.fname.trim(),
      lname: formValue.lname.trim(),
      bio: formValue.bio.trim(),
    };
    setMembers([...members, newMember]);
    setEditing(null);
    // This takes the values of the form and constructs a new member object,
    // which is then concatenated at the end of the `members` state
  };

  const editExistingMember = () => {
    setMembers(members.map(mem => (mem.id === editing ? formValue : mem)));
    setEditing(null);
    // ✨ This takes the values of the form and replaces the data of the
    // member in the `members` state whose id matches the `editing` state
  };

  const onSubmit = evt => {
    evt.preventDefault();
    if (editing === null) {
      submitNewMember();
    } else {
      editExistingMember();
    }
    // ✨ This is the submit handler for your form element.
    // It will call either `submitNewMember` or `editExistingMember`
    // depending on whether the `editing` state is null or has an id in it.
    // Don't allow the page to reload! Prevent the default behavior
    // and clean up the form after submitting
  };

  return (
    <div>{/* ✨ Fix the JSX by wiring the necessary values and event handlers */}
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {
            members.map(mem => (
              <div key={mem.id} className="member">
                <div>
                  <h4>{mem.fname} {mem.lname}</h4>
                  <p>{mem.bio}</p>
                </div>
                <button onClick={() => edit(mem.id)}>Edit</button> 
              </div>
            ))
          }
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}> 
          <div>
            <label htmlFor="fname">First Name </label>
            <input
              id="fname"
              name="fname"
              type="text"
              placeholder="Type First Name"
              value={formValue.fname}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input
              id="lname"
              name="lname" 
              type="text"
              placeholder="Type Last Name"
              value={formValue.lname}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea
              id="bio"
              name="bio" 
              placeholder="Type Bio"
              value={formValue.bio}
              onChange={onChange}
            />
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}