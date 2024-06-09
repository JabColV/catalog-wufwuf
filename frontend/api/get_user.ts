const fetchUser = async () => {
    try {
      console.log("fetchUser");
      const apiRes = await fetch(`/service-users/api/users/cookieExtractor/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!apiRes.ok) {
        throw new Error(`user/ fetch not ok`);
      }
  
      const data = await apiRes.json();
      console.log("fetchUser data:", data.data);
      return data;
    } catch (error) {
      console.error("Error en fetchUser:", error);
      throw new Error("Error en fetchUser: " + error);
    }
  };
  
  export default fetchUser;
