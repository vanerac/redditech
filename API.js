import { encode } from "base-64"

export const APIrequest = async (accessToken, request) => {
    return await fetch(request, {
      method: 'GET',
      headers: {"Authorization" : "bearer " + accessToken}, "User-agent": "redditech",
    })
    .then(response => response.json().then(data => {
      return data
    }))
    .catch((error) => {
      console.error(error);
    });
  }

export const getAccessToken = (responseCode) => {
  var formData = new FormData();
  formData.append("grant_type", "authorization_code");
  formData.append("code", responseCode);
  formData.append("redirect_uri", "exp://127.0.0.1:19000");

  fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {"Authorization": `Basic ${encode("e3t0ixFSw5lrApAqVPrGMA" + ':')}`},
    body: formData})
    .then(response => response.json().then( async data => {
      // console.log(data)
      var test = await APIrequest(data.access_token, 'https://oauth.reddit.com/api/v1/me')
      console.log(test.name)
    }))
};