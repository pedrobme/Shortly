const joiSchemaValidation = (schema, value) => {
  const { error } = schema.validate(value, { abortEarly: false });

  if (error) {
    const errors = error.details.map(
      (validationError) => validationError.message
    );
    return errors;
  }

  return "successfull";
};

export default joiSchemaValidation;
