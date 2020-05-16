export default function (id, str) {
  const errors = { [id]: [] };

  if (str.trim().length === 0) {
    errors[id] = ["Field cannot be empty"];
  }

  if (str.length > 255) {
    errors[id] = "Field contains too many characters";
  }

  return errors;
}
