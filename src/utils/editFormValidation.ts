export const validateInput = (
  userName: string,
): {firstName: string; lastName: string} => {
  const trimmedText = userName.trim();
  let firstName = '';
  let lastName = '';

  if (trimmedText.lastIndexOf(' ') === -1) {
    firstName = trimmedText;
    lastName = '_';
  } else if (trimmedText.lastIndexOf(' ') > 1) {
    firstName = trimmedText.substring(0, trimmedText.lastIndexOf(' '));
    lastName = trimmedText.substring(trimmedText.lastIndexOf(' ') + 1);
  } else {
    firstName = trimmedText;
    lastName = '_';
  }

  return {firstName, lastName};
};
