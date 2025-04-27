import React, { useState } from "react";

function DynamicEmailForm() {
  const [emails, setEmails] = useState([{ id: Date.now(), value: "" }]);

  const handleChange = (id, value) => {
    setEmails(emails.map(email => email.id === id ? { ...email, value } : email));
  };

  const addEmailField = () => {
    setEmails([...emails, { id: Date.now(), value: "" }]);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div>
      <form>
        {emails.map((email) => (
          <div key={email.id}>
            <input
              type="email"
              value={email.value}
              placeholder="Enter email"
              onChange={(e) => handleChange(email.id, e.target.value)}
            />
            {!validateEmail(email.value) && email.value && (
              <span style={{ color: "red" }}>Invalid Email</span>
            )}
          </div>
        ))}
      </form>
      <button onClick={addEmailField}>Add Email</button>

      <h3>Emails Entered:</h3>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>{email.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default DynamicEmailForm;