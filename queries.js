function insertuser(firstName,lastName,nickName,type,Drinking,Food_allergy){
  return `INSERT INTO userhomecoming (firstName,lastName,nickName,[type],Drinking,Food_allergy) VALUES ('${firstName}','${lastName}','${nickName}','${type}','${Drinking}','${Food_allergy}')`
}
 module.exports = {
    insertuser
};
  