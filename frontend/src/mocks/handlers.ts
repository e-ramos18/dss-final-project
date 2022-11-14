import { rest } from "msw";
export const baseAPIUrl = process.env.API_ENDPOINT;
export const handlers = [
  rest.post(`${baseAPIUrl}/users/login`, (req, res, ctx) => {
    return res(
      ctx.json({
        status: "success",
        data: null,
        message: "User logged in successfully.",
      }),
      ctx.delay(150)
    );
  }),
];
