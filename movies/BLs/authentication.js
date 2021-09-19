var authentication = require("../DALs/getJsonData");

const authnticated = async (usr) => {
  let getUsers = await authentication.getJsonData(usr);
  let user = getUsers.find((x) => x.username === usr);
  return {authenticated : user.authenticated, admin : user.admin};
};

module.exports = { authnticated };
