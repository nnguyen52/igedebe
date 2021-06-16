import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const Testing = () => {
  const params = new URLSearchParams(window.location.search);
  const history = useHistory();
  const [form, setForm] = useState({
    name: null,
    age: null,
  });
  const onchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSub = (e) => {
    e.preventDefault();
    history.push(`/testing/${name}`);
  };
  const { name, age } = form;
  return (
    <Form onSubmit={onSub}>
      <Button onClick={(e) => console.log(params.get("name"))}>log</Button>
      <Form.Control
        name="name"
        placeholder="name"
        value={name}
        onChange={onchange}
      />
      <Form.Control
        name="age"
        value={age}
        placeholder="age"
        onChange={onchange}
      />
      <Button type="submit">submit</Button>
    </Form>
  );
};

export default Testing;
