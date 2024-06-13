This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This demonstrates [an issue with nextjs api where](https://github.com/vercel/next.js/issues/66833) nextjs does not send a response stream if that stream contains compressed data for some reason.

Note that to compress streaming web content is easy in node, a working example is included in [not-next/gzip-response-stream.js](not-next/gzip-response-stream.js)


    node not-next/gzip-response-stream.js

then

    curl -s http://localhost:8888 | gunzip -c

gives us the expected `hello world` output.

I would expect the exact same thing to be possible with NextJs. Let's create a route [api/hello](./pages/api/hello.js) just to demonstrate that yes, writing to a stream (which is unusual but a good way to minimize memory overhad) does indeed work

```javascript
  export default function handler(req, res) {
    res.status(200)
    res.write(JSON.stringify({ message: 'bunnymen say hello' }))
    res.end();
  }
```

    npm run dev

and

    curl -s "http://localhost:3000/api/hello" | jq

gives us the expected json output


ok, now with compression we add [api/hello-compressed](./pages/api/hello-compressed.js)

```javascript
  const { createGzip } = require('zlib');
  export default function handler(req, res) {
    res.status(200)
    const gzip = createGzip()
    gzip.pipe(res)
    gzip.write(JSON.stringify({ message: 'fanny fatnugget says hello' }))
    gzip.end();
    res.end();
  }
```

and now


    curl -s localhost:3000/api/hello-compressed | gunzip | jq .

hmm, that fails, unexpected end of file

    curl -s http://localhost:3000/api/hello-compressed | wc -c

0 bytes! What's going on!?
