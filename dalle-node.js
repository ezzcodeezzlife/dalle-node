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
                        const generations = body.generations;
                        clearInterval(refreshIntervalId);
                        resolve(generations.data);
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
