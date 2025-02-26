import requests
   
# Making a GET request
r = requests.get('http://localhost:4000/api/class/student/my-classes', headers={
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkMmU1ZTdhLTVhYmEtNDg5NS1hZWVlLWUzNjcyYWVjMjhiMSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzQwNTg4MzM0LCJleHAiOjE3NDA1OTE5MzR9.54u7hAaECfmYQgIkF3FLv5VEn9RU9LJP0G75MpJALvg'
})
  
# check status code for response received
# success code - 200
print(r)