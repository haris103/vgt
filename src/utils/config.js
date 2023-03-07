export const token = localStorage.getItem("token");
console.log(token);
export const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const URL = "https://dev1.pongstudios.ca/CustomerPortalService";
// export const URL = "https://cpqa.azurewebsites.net";
