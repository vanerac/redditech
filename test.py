import json
import requests

def get_username(access_token):
    headers = {"Authorization": "bearer " + access_token, "User-agent": "quennelle 0.1"}
    response = requests.get("https://oauth.reddit.com/api/v1/me/friends", headers=headers)
    me_json = response.json()
    return me_json

data = get_username("774461482355-1PICmjkirVdLDZXjdmnRc1z7m8X37A")
print(json.dumps(data, indent=4))