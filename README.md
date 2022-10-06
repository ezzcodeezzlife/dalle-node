# Setup

1. Go to https://openai.com/dall-e-2/
2. Create a OpenAI Account
3. Go to https://labs.openai.com/
4. Open the Network Tab in Developer Tools
5. Type a prompt and press "Generate"
6. Look for fetch to https://labs.openai.com/api/labs/tasks
7. In the request header look for authorization then get the Bearer Token


# Usage
```bash
npm install dalle-node
```
```javascript
import { Dalle } from "dalle-node";

const dalle = new Dalle("sess-xxxxxxxxxxxxxxxxxxxxxxxxx"); // Bearer Token 

(async () => {
  const generations = await dalle.generate("a cat driving a car");

  console.log(generations)
})();
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
  // 3 more ... 
]
```

## Functions

### `constructor`

```javascript
import { Dalle } from "dalle-node";

const dalle = new Dalle("sess-xxxxxxxxxxxxxxxxxxxxxxxxx"); // Bearer Token 
```

### `generate(prompt: string)`

Generate Dall-e images using the prompt passed in.

```javascript
const generations = await dalle.generate("a cat driving a car");
```

Returns an array of generations.

### `list({ limit: number, fromTs: number })`

Get previous tasks.

```javascript
const last10Runs= await dalle.list({ limit: 10 });
```

```javascript
const allRunsAfterTimestamp = await dalle.list({ fromTs: 1553456789 });
```

Returns an array of tasks. Note - what generate() returns is consider a single task. Each image inside a task is a "generation". The objects in the returned array will have a `prompt` property, a `generations` array, as well as other properties.

### `getTask(taskId: string)`

```javascript
const task = await dalle.getTask("task-nERkiKsdjVCasdyD69qewID");
```

Returns a task object.

### `getCredits()`

```javascript
const creditsSummary = await dalle.getCredits();
const totalCreditsLeft = creditsSummary.aggregate_credits;
```

Returns an object with the following properties.

```json
{
  "aggregate_credits": 180,
  "next_grant_ts": 123456789,
  "breakdown": {
    "free": 0,
    "grant_beta_tester": 65,
    "paid_dalle_15_115": 115
  },
  "object": "credit_summary"
}
```

To get the date + time that the free credits will refresh:

```javascript
const credits = await dalle.getCredits()
console.log('Free credits refresh on:', new Date(credits.next_grant_ts * 1000).toLocaleString());
```

# Examples

[Nextjs Application](https://github.com/1998code/DALLE-2-App)

# Other languages

[Repo for the same thing as Python Package "ezzcodeezzlife/dalle2-in-python"](https://github.com/ezzcodeezzlife/dalle2-in-python)
