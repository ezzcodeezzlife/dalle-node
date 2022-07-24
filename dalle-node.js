import got from 'got';

export class Dalle {
  constructor(bearerToken) {
    this.bearerToken = bearerToken;
    this.url = "https://labs.openai.com/api/labs/tasks";
  }

  async generate(prompt) {
    let task = await got.post(this.url, {
      json: {
        task_type: "text2im",
        prompt: {
          caption: prompt,
          batch_size: 4,
        },
      },
      headers: {
        Authorization: `Bearer ${ this.bearerToken }`
      }
    }).json();

    return await new Promise(resolve => {
      const refreshIntervalId = setInterval(async () => {
        task = await this.getTask(task.id)

        switch (task.status) {
          case "succeeded":
            clearInterval(refreshIntervalId);
            return resolve(task.generations)
          case "rejected":
            clearInterval(refreshIntervalId);
            throw new Error(task);
          case "pending":
        }
      }, 2000);
    })
  }

  async getTask(taskId) {
    return await got.get(`${ this.url }/${ taskId }`, {
      headers: {
        Authorization: "Bearer " + this.bearerToken,
      },
    }).json();
  }
  
  async list(options = { limit: 50, fromTs: 0 }) {
    return await got.get(`${ this.url }?limit=${ options.limit }${ options.fromTs ? `&from_ts=${ options.fromTs }` : '' }`, {
        headers: {
          Authorization: "Bearer " + this.bearerToken,
        },
      }).json();
  }
}
