# Get Access

[labs.openai.com/waitlist](https://labs.openai.com/waitlist)

- Go to https://labs.openai.com/
- Open Network Tab in Developer Tools
- Type a promt and press "Generate"
- Look for fetch to https://labs.openai.com/api/labs/tasks
- In the request header look for authorization then get the Bearer Token


# Usage
```bash
npm install dalle-node
```
```javascript
import { Dalle } from "dalle-node";

const dalle = new Dalle("sess-xxxxxxxxxxxxxxxxxxxxxxxxx"); // Bearer Token 

const generations = await dalle.generate("a cat driving a car");

console.log(generations)
```

```
[
  {
    id: 'generation-sCnERSYDPP0Zu14fsdXEcKmL',
    object: 'generation',
    created: 1553332711,
    generation_type: 'ImageGeneration',
    generation: {
      image_path: 'https://openailabsprodscus.blob.core.windows.net/private/user-hadpVzldsfs28CwvEZYMUT/generations/generation...'
    },
    task_id: 'task-nERkiKsdjVCSZ50yD69qewID',
    prompt_id: 'prompt-2CtaLQsgUbJHHDoJQy9Lul3T',
    is_public: false
  },
  {
    id: 'generation-hZWt2Nasrx8R0tJjbaROfKVy',
    object: 'generation',
    created: 1553332711,
    generation_type: 'ImageGeneration',
    generation: {
      image_path: 'https://openailabsprodscus.blob.core.windows.net/private/user-hadpVzldsfs28CwvEZYMUT/generations/generation...'
    },
    task_id: 'task-nERkiKhjasdSZ50yD69qewID',
    prompt_id: 'prompt-2CtaLasdUbJHHfoJQy9Lul3T',
    is_public: false
  },
  // 2 more ... 
]
```

Example [Nextjs Application](https://github.com/1998code/DALLE-2-App)

