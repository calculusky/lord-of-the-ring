import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
    LordOfRingError,
    LordRingUnauthorizeError,
    LordRingValidationError,
    RateLimitError,
} from "./errors";
import {
    FetchOptions,
    FetchQueryResponse,
    LordOfTheRingConfigOptions,
    MovieResponseData,
    QuoteResponseData,
} from "./interfaces";
import { BASE_URL, MOVIE_PATH, QUOTE_PATH } from "./interfaces/constants";

export * from "./interfaces";

export default class LordOfTheRings {
    private axios: AxiosInstance = Axios.create({
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.instanceOptions.accessToken}`,
        },
    });

    constructor(protected instanceOptions: LordOfTheRingConfigOptions) {}

    async getManyMovies(options?: FetchOptions) {
        try {
            const urlQuery = this.buildUrlQuery(options, `${MOVIE_PATH}/`);
            const requestOptions: AxiosRequestConfig = {
                url: urlQuery,
                method: "GET",
            };

            const { data } = await this.axios(requestOptions);
            const resp: FetchQueryResponse<MovieResponseData[]> = {
                meta: {
                    total: data.total,
                    limit: data.limit,
                    page: data.page,
                    pages: data.pages,
                },
                data: data.docs,
            };
            return resp;
        } catch (error) {
            if (!Axios.isAxiosError(error)) {
                throw new LordOfRingError("Failed to fetch movies");
            }
            switch (true) {
                case error.response?.status == 429: {
                    throw new RateLimitError(error.response?.data.message);
                }
                case error instanceof LordRingValidationError: {
                    throw error;
                }
                case error.response?.status == 401: {
                    throw new LordRingUnauthorizeError(
                        error.response?.data.message
                    );
                }

                default: {
                    throw new LordOfRingError("Failed to fetch movies");
                }
            }
        }
    }

    async getSingleMovie(id: string) {
        try {
            if (!id) {
                throw new LordRingValidationError("Movie ID is required");
            }
            const requestOptions: AxiosRequestConfig = {
                url: `${MOVIE_PATH}/${id}`,
                method: "GET",
            };

            const { data } = await this.axios(requestOptions);
            const [movie] = data.docs;
            const resp: FetchQueryResponse<MovieResponseData> = {
                data: movie,
            };
            return resp;
        } catch (error) {
            if (!Axios.isAxiosError(error)) {
                throw new LordOfRingError("Failed to fetch movie");
            }
            switch (true) {
                case error.response?.status == 429: {
                    throw new RateLimitError(error.response?.data.message);
                }
                case error instanceof LordRingValidationError: {
                    throw error;
                }
                case error.response?.status == 401: {
                    throw new LordRingUnauthorizeError(
                        error.response?.data.message
                    );
                }

                default: {
                    throw new LordOfRingError("Failed to fetch movie");
                }
            }
        }
    }

    async getManyQuotes(options?: FetchOptions) {
        try {
            const urlQuery = this.buildUrlQuery(options, `${QUOTE_PATH}/`);
            const requestOptions: AxiosRequestConfig = {
                url: urlQuery,
                method: "GET",
            };

            const { data } = await this.axios(requestOptions);
            const resp: FetchQueryResponse<QuoteResponseData[]> = {
                meta: {
                    total: data.total,
                    limit: data.limit,
                    page: data.page,
                    pages: data.pages,
                },
                data: data.docs,
            };
            return resp;
        } catch (error) {
            if (!Axios.isAxiosError(error)) {
                throw new LordOfRingError("Failed to fetch quotes");
            }
            switch (true) {
                case error.response?.status == 429: {
                    throw new RateLimitError(error.response?.data.message);
                }
                case error instanceof LordRingValidationError: {
                    throw error;
                }
                case error.response?.status == 401: {
                    throw new LordRingUnauthorizeError(
                        error.response?.data.message
                    );
                }

                default: {
                    throw new LordOfRingError("Failed to fetch quotes");
                }
            }
        }
    }

    async getSingleQuote(id: string) {
        try {
            if (!id) {
                throw new LordRingValidationError("Quote ID is required");
            }
            const requestOptions: AxiosRequestConfig = {
                url: `${QUOTE_PATH}/${id}`,
                method: "GET",
            };

            const { data } = await this.axios(requestOptions);
            const [quote] = data.docs;
            const resp: FetchQueryResponse<QuoteResponseData> = {
                data: quote,
            };
            return resp;
        } catch (error) {
            console.log(error, "$$$$$$$$", error.status);
            if (!Axios.isAxiosError(error)) {
                throw new LordOfRingError("Unable to fetch quote");
            }
            switch (true) {
                case error.response?.status == 429: {
                    throw new RateLimitError(error.response?.data.message);
                }
                case error.response?.status == 401: {
                    throw new LordRingUnauthorizeError(
                        error.response?.data.message
                    );
                }

                case error instanceof LordRingValidationError: {
                    throw error;
                }

                default: {
                    throw new LordOfRingError("Failed to fetch quote");
                }
            }
        }
    }

    async getQuotesByMovieId(movieId: string, options: FetchOptions) {
        try {
            const urlQuery = this.buildUrlQuery(
                options,
                `${MOVIE_PATH}/${movieId}/${QUOTE_PATH}/`
            );
            const requestOptions: AxiosRequestConfig = {
                url: urlQuery,
                method: "GET",
            };

            const { data } = await this.axios(requestOptions);
            const resp: FetchQueryResponse<QuoteResponseData[]> = {
                meta: {
                    total: data.total,
                    limit: data.limit,
                    page: data.page,
                    pages: data.pages,
                },
                data: data.docs,
            };
            return resp;
        } catch (error) {
            if (!Axios.isAxiosError(error)) {
                throw new LordOfRingError("Failed to fetch movie quotes");
            }
            switch (true) {
                case error.response?.status == 429: {
                    throw new RateLimitError(error.response?.data.message);
                }
                case error instanceof LordRingValidationError: {
                    throw error;
                }
                case error.response?.status == 401: {
                    throw new LordRingUnauthorizeError(
                        error.response?.data.message
                    );
                }

                default: {
                    throw new LordOfRingError("Failed to fetch movie quotes");
                }
            }
        }
    }

    private buildUrlQuery(options: FetchOptions, url: string) {
        //pagination
        if (options.page) {
            url = `${url}&page=${options.page}`;
        }
        if (options.limit) {
            url = `${url}&limit=${options.limit}`;
        }
        if (options.offset) {
            url = `${url}&page=${options.offset}`;
        }

        //handle sort options
        if (options.sort && Object.keys(options.sort).length) {
            const arraySort = Object.entries(options.sort);
            url = arraySort.reduce((acc, val) => {
                return acc.concat(`&sort=${val[0]}:${val[1]}`);
            }, url);
        }

        //handle filter options
        if (options.filter && Object.keys(options.filter).length) {
            const arrayFilter = Object.entries(options.filter);
            url = arrayFilter.reduce((acc, val) => {
                const objArr = Object.entries(val[1]);
                const symbol = objArr[0][0];
                const value = objArr[0][1];
                const result = {
                    $eq: acc.concat(`&${val[0]}=${value}`),
                    $gt: acc.concat(`&${val[0]}>${value}`),
                    $lt: acc.concat(`&${val[0]}<${value}`),
                    $gte: acc.concat(`&${val[0]}>=${value}`),
                    $lte: acc.concat(`&${val[0]}<=${value}`),
                };
                if (!result[symbol]) {
                    throw new LordRingValidationError(
                        `Unknown filter symbol selected`
                    );
                }
                return result[symbol];
            }, url);
        }
        url = url.replace(/&/, "?");
        return url;
    }
}
