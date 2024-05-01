import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const Sidebar = () => {
  const [members, setMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);

  // Function to toggle the visibility of the members list
  const viewHandler = () => {
    setShowMembers(!showMembers); // Toggle the visibility of the list
  };

  // Fetch members from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost:8080/api/members/')
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result)) { // Ensure it's an array
          setMembers(result); // Set the members state with the array
        } else {
          console.error('Expected an array but got something else:', result);
        }
      })
      .catch((error) => console.error('Error fetching members:', error));
  }, []); // Empty dependency array to fetch only on mount

  return (
    <div className="sidebar">
      <h1>Task Manager</h1>
      <div>
        <Button variant="secondary">Add</Button>
        <Button onClick={viewHandler}>
          {showMembers ? 'Hide Members' : 'View Members'}
        </Button>
      </div>

      {showMembers && (
        <div>
          {members.length > 0 ? (
            members.map((member) => (
              <div key={member.id}>{member.memberName}</div>
            ))
          ) : (
            <p>No members found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
