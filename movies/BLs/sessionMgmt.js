exports.checkStatus = (session) => {
  console.log(session.credits);
  if (session.credits >= 1 && session.authenticated == true) {
    return true;
  } else {
    return false;
  }
};
