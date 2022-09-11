import React from 'react';
import { useState } from 'react';

const useForm = () => {
  const [values, setValues] = useState();
  const [errors, setErrors] = useState({});

  return <div>useForm</div>;
};

export default useForm;
