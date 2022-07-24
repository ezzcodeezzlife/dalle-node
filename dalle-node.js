import request from "request";

export class Dalle {
  constructor(bearerToken) {
    this.bearerToken = bearerToken;
    this.url = "https://labs.openai.com/api/labs/tasks";
  }

  async generate(promt) {
    return new Promise((resolve, reject) => {
      request.post(
        {
          url: this.url,
          headers: {
            Authorization: "Bearer " + this.bearerToken,
          },
          json: true,
          body: {
            task_type: "text2im",
            prompt: {
              caption: promt,
              batch_size: 4,
            },
          },
        },
        (error, response, body) => {
          if (error) {
            console.log(error);
          } else {
            const taskId = body.id;

            const refreshIntervalId = setInterval(() => {
              this.getTask(taskId).then(task => {
                switch (task.status) {
                  case "succeeded":
                    clearInterval(refreshIntervalId);
                    resolve(task.generations);
                  case "rejected":
                    clearInterval(refreshIntervalId);
                    resolve(task.status_information);
                  case "pending":
                }
              }).catch(error => {
                console.log(error);
              })
            }, 2000);
          }
        }
      );
    });
  }

  async getTask(taskId) {
    return new Promise((resolve, reject) => {
      request.get(
        {
          url: `${ this.url }/${ taskId }`,
          headers: {
            Authorization: "Bearer " + this.bearerToken,
          },
          json: true,
        },
        (error, response, body) => {
          if (error) {
            return reject(error)
          } else {
            return resolve(body)
          }
        }
      );
    });
  }
}
