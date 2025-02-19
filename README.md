## Getting Started

First, run the development server:

```bash
npm run dev
```
open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
the page auto-updates as you edit the file.


Second, update backend (for lockal developing):

```powershell
docker-compose pull
docker-compose up --build -d
```


## Learn More

To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


Backend documentation urls:
- localhost:4001/docs - auth docs
- localhost:4002/docs - class management docs

Url for connecting to the database:
- localhost:4000/api/<servicename>/<endpoint>

* servicenames:
auth - authentication api
class - class management api