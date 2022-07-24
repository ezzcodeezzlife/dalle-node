import got from 'got';

export class Dalle {
  constructor(bearerToken) {
    this.bearerToken = bearerToken;
    this.url = "https://labs.openai.com/api/labs/tasks";
  }

  async generate(promt) {
    const task = await got.post(this.url, {
      json: {
        task_type: "text2im",
        prompt: {
          caption: promt,
          batch_size: 4,
        },
      },
      headers: {
        Authorization: `Bearer ${ this.bearerToken }`
      }
    }).json();

    const refreshIntervalId = await setInterval(() => {
      this.getTask(task.id).then(updatedTask => {
        switch (updatedTask.status) {
          case "succeeded":
            clearInterval(refreshIntervalId);
            return updatedTask.generations
          case "rejected":
            clearInterval(refreshIntervalId);
            return updatedTask.status_information;
          case "pending":
        }
      }).catch(error => {
        console.log(error);
        return error;
      })
    }, 2000);
  }

  async getTask(taskId) {
    return await got.get(`${ this.url }/${ taskId }`, {
      headers: {
        Authorization: "Bearer " + this.bearerToken,
      },
    }).json();
  }
}
