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
  
  async list({ limit = 50, fromTs = 0 }) {
    return new Promise((resolve, reject) => {
      request.get(
        {
          url: `${ this.url }?limit=${ limit }${ fromTs ? `&from_ts=${ fromTs }` : '' }`,
          headers: {
            Authorization: "Bearer " + this.bearerToken,
          },
          json: true,
        },
        (error, response, body) => {
          if (error) {
            console.log(error);
          } else {
            console.log(response.statusCode, body);
            const taskId = body.id;

            const refreshIntervalId = setInterval(() => {
                request.get(
                    {
                      url: this.url + '/' + taskId,
                      headers: {
                        Authorization: "Bearer " + this.bearerToken,
                      },
                      json: true,
                    },
                    (error, response, body) => {
                      if (error) {
                        console.log(error);
                      } else if (body.status === "rejected") {
                        clearInterval(refreshIntervalId);
                        resolve(body.status_information);
                      } else if (body.status === "succeeded") {
                        const runs = body.data;
                        clearInterval(refreshIntervalId);
                        resolve(runs.body);
                      }
                    }
                  );

            }, 3000);
          }
        }
      );
    });
  }
}
