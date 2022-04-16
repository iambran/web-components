const randomID = () => {
  return Math.random() // 1. Math.random()
    .toString(36)      // 2. toString
    .substring(2, 10); // 3. substring
}

export default randomID;
