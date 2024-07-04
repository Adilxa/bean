import ky from "ky";

export const httpClient = ky.create({
    prefixUrl: "https://jellybellywikiapi.onrender.com/api"
})