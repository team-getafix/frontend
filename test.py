import requests
   
# Making a GET request
r = requests.get('http://localhost:4000/api/submission/subject/${subjectId}')
  
# check status code for response received
# success code - 200
print(r)
  
# print content of request
print(r.content)